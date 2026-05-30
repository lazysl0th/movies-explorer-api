import { beforeEach, describe, expect, it } from 'vitest'

import MovieModel from '@infrastructure/persistence/mongodb/MovieModel.js'

import {
  createTestId,
  fakeMovie,
  movieRepository,
  resetWithDefaultUser,
} from '../setup.js'

describe('MongooseMovieRepository - delete', () => {
  beforeEach(async () => {
    await resetWithDefaultUser()
    const { id, ...movieData } = fakeMovie
    await MovieModel.create({ ...movieData, _id: id })
  })

  it('should successfully delete an existing movie and return delete result', async () => {
    const result = await movieRepository.delete(fakeMovie.id)
    expect(result).toBeDefined()
    expect(result.deletedCount).toBe(1)
    const deletedMovie = await MovieModel.findById(fakeMovie.id)
    expect(deletedMovie).toBeNull()
  })

  it('should return delete result with deletedCount 0 if movie does not exist', async () => {
    const nonExistingMovieId = createTestId(999)
    const result = await movieRepository.delete(nonExistingMovieId)

    expect(result).toBeDefined()
    expect(result.deletedCount).toBe(0)

    const initialMovie = await MovieModel.findById(fakeMovie.id)
    expect(initialMovie).not.toBeNull()
  })

  it('should throw BadRequestError when an invalid ID format is passed', async () => {
    const invalidId = 'not-a-valid-object-id'
    await expect(movieRepository.delete(invalidId)).rejects.toThrow(
      'Incorrect data provided',
    )
  })
})
