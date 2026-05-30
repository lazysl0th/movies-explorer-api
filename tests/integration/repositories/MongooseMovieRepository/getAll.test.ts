import { beforeEach, describe, expect, it } from 'vitest'

import MovieModel from '@infrastructure/persistence/mongodb/MovieModel.js'

import {
  createTestId,
  fakeMovie,
  fakeUser,
  movieRepository,
  resetWithDefaultUser,
} from '../setup.js'

describe('MongooseMovieRepository - getAll', () => {
  beforeEach(async () => {
    resetWithDefaultUser()
    const { id, ...movieData } = fakeMovie
    await MovieModel.create({ ...movieData, owner: fakeUser.id })
    await MovieModel.create({ ...movieData, owner: createTestId(2) })
  })

  it('should successfully find all movies by id and return domain entity', async () => {
    const movies = await movieRepository.getAll(fakeUser.id)
    expect(movies).toBeInstanceOf(Array)
    expect(movies).toHaveLength(1)
    const [targetMovie] = movies
    expect(targetMovie?.owner.id).toBe(fakeUser.id)
    expect(targetMovie?.nameEN).toBe(fakeMovie.nameEN)
    expect(targetMovie?.director).toBe(fakeMovie.director)
    expect(targetMovie?.id).toBeDefined()
  })

  it('should return empty array if not movies where user is owner', async () => {
    const nonExistingOwnerId = createTestId(999)
    const movies = await movieRepository.getAll(nonExistingOwnerId)
    expect(movies).toEqual([])
    expect(movies).toHaveLength(0)
  })

  it('should return multiple movies if the user owns more than one movie', async () => {
    const { id, ...movieData } = fakeMovie
    await MovieModel.create({
      ...movieData,
      nameEN: 'Second Movie',
      owner: fakeUser.id,
    })
    const movies = await movieRepository.getAll(fakeUser.id)
    expect(movies).toHaveLength(2) // Массив должен содержать 2 элемента
    movies.forEach((movie) => {
      expect(movie.owner.id).toBe(fakeUser.id)
      expect(movie.id).toBeDefined()
    })
  })
})
