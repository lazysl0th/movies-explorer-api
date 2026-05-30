import { beforeEach, describe, expect, it } from 'vitest'

import MovieModel from '@infrastructure/persistence/mongodb/MovieModel.js'

import {
  createTestId,
  fakeMovie,
  movieRepository,
  resetWithDefaultUser,
} from '../setup.js'

describe('MongooseMovieRepository - getById', () => {
  beforeEach(async () => {
    await resetWithDefaultUser()
    const { id, ...movieData } = fakeMovie
    await MovieModel.create({ ...movieData, _id: id })
  })

  it('should successfully find a movie by id and return domain entity', async () => {
    const movie = await movieRepository.getById(fakeMovie.id)
    expect(movie).not.toBeNull()
    expect(movie?.id).toBe(fakeMovie.id)
    expect(movie?.nameEN).toBe(fakeMovie.nameEN)
    expect(movie?.director).toBe(fakeMovie.director)

    expect(movie?.owner).toBeDefined()
  })

  it('should return null if movie does not exist', async () => {
    const nonExistingMovieId = createTestId(999)
    const movie = await movieRepository.getById(nonExistingMovieId)
    expect(movie).toBeNull()
  })

  it('should handle and catch errors when an invalid ID format is passed', async () => {
    const invalidId = 'not-a-valid-object-id'
    await expect(movieRepository.getById(invalidId)).rejects.toThrow(
      'Incorrect data provided',
    )
  })
})
