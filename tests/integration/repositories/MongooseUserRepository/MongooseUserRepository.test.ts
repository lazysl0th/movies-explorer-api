import { MongooseError } from 'mongoose'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import User from '@domain/entities/User.js'
import BadRequestError from '@domain/errors/BadRequestError.js'
import ConflictError from '@domain/errors/ConflictError.js'
import UserModel from '@infrastructure/persistence/mongodb/UserModel.js'

import {
  fakeLocalCredetials,
  fakeUser,
  resetWithDefaultUser,
  userRepository,
} from './setup.js'

describe('MongooseUserRepository', () => {
  beforeEach(async () => {
    await resetWithDefaultUser()
  })

  afterEach(async () => {
    await UserModel.deleteMany({})
  })

  it('should be successfully find user by email and return domain entity', async () => {
    const userWithCredentials =
      await userRepository.findUserByCredentials('test@example.com')
    expect(userWithCredentials?.user).not.toBeNull()
    expect(userWithCredentials?.user?.email).toBe('test@example.com')
    expect(userWithCredentials?.user?.name).toBe('John Doe')
    expect(userWithCredentials?.localCredentials).not.toBeNull()
    expect(userWithCredentials?.localCredentials?.passwordHash).toBe(
      'Hashed_password_123',
    )
  })

  it('should be return null if user not found', async () => {
    const user = await userRepository.findUserByCredentials(
      'notfound@example.com',
    )
    expect(user).toBeNull()
  })

  it('should be throw ConflictError error if user already exists', async () => {
    const action = userRepository.create({
      user: fakeUser,
      localCredentials: fakeLocalCredetials,
    })
    await expect(action).rejects.toThrow(ConflictError)
  })

  it('should throw BadRequestError if name violates minlength constraint', async () => {
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

  it('should be create new user', async () => {
    await UserModel.deleteMany({})
    const action = userRepository.create({
      user: fakeUser,
      localCredentials: fakeLocalCredetials,
    })
    await expect(action).resolves.toBeInstanceOf(User)
  })
})
