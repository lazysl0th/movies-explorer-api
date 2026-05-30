import { MongooseError } from 'mongoose'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import User from '@domain/entities/User.js'
import BadRequestError from '@domain/errors/BadRequestError.js'
import ConflictError from '@domain/errors/ConflictError.js'
import UserModel from '@infrastructure/persistence/mongodb/UserModel.js'

import {
  fakeLocalCredetials,
  fakeUser,
  resetWithDefaultUser,
  userRepository,
} from '../setup.js'

describe('MongooseUserRepository - create', () => {
  beforeEach(async () => {
    await resetWithDefaultUser()
  })

  it('should throw ConflictError if user already exists', async () => {
    const action = userRepository.create({
      user: fakeUser,
      localCredentials: fakeLocalCredetials,
    })
    await expect(action).rejects.toThrow(ConflictError)
  })

  it('should throw BadRequestError if name violates validation constraints', async () => {
    const validationError = Object.create(MongooseError.prototype, {
      name: { value: 'ValidationError', writable: true },
      message: { value: 'Mongoose validation failed', writable: true },
    })

    const spy = vi
      .spyOn(UserModel, 'create')
      .mockRejectedValueOnce(validationError)

    await UserModel.deleteMany({})

    const action = userRepository.create({
      user: fakeUser,
      localCredentials: fakeLocalCredetials,
    })
    await expect(action).rejects.toThrow(BadRequestError)

    spy.mockRestore()
  })

  it('should create a new user and return domain entity instance', async () => {
    await UserModel.deleteMany({})

    const action = userRepository.create({
      user: fakeUser,
      localCredentials: fakeLocalCredetials,
    })
    await expect(action).resolves.toBeInstanceOf(User)
  })
})
