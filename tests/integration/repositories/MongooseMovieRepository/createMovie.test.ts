import mongoose from 'mongoose'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Movie from '@domain/entities/Movies.js'
import BadRequestError from '@domain/errors/BadRequestError.js'
import MovieModel from '@infrastructure/persistence/mongodb/MovieModel.js'

import { fakeMovie, movieRepository, resetWithDefaultUser } from '../setup.js'

describe('MongooseMovieRepository - Create Movie', () => {
  beforeEach(async () => {
    await resetWithDefaultUser()
    await MovieModel.deleteMany({})
  })

  it('should throw BadRequestError if name violates validation constraints', async () => {
    const validationError = new mongoose.Error.ValidationError()
    validationError.errors = {
      name: new mongoose.Error.ValidatorError({
        message: 'Path `name` is required.',
      }),
    }

    vi.spyOn(MovieModel, 'create').mockRejectedValueOnce(validationError)

    await MovieModel.deleteMany({})

    const action = movieRepository.create(fakeMovie)
    await expect(action).rejects.toThrow(BadRequestError)
  })

  it('should create a new movie and return domain entity instance', async () => {
    await MovieModel.deleteMany({})

    const action = movieRepository.create(fakeMovie)
    await expect(action).resolves.toBeInstanceOf(Movie)
  })
})
