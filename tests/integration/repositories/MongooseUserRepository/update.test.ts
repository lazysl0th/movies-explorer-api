import { beforeEach, describe, expect, it } from 'vitest'

import BadRequestError from '@domain/errors/BadRequestError.js'
import UserModel from '@infrastructure/persistence/mongodb/UserModel.js'

import { fakeLocalCredetials, fakeUser, userRepository } from './setup.js'

describe('MongooseUserRepository - update', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({})
    await UserModel.create({
      name: fakeUser.name,
      email: fakeUser.email,
      password: fakeLocalCredetials.passwordHash,
      _id: fakeUser.id,
    })
  })

  it('should successfully update user by id and return domain entity', async () => {
    const user = await userRepository.findById(fakeUser.id)

    expect(user).not.toBeNull()
    expect(user?.id).toBe(fakeUser.id)
    expect(user?.email).toBe('test@example.com')
    expect(user?.name).toBe('John Doe')
  })

  it('should return null if user is not found', async () => {
    const nonExistingId = userRepository.generateId()
    const user = await userRepository.findById(nonExistingId)
    expect(user).toBeNull()
  })

  it('should throw if user is not found', async () => {
    const action = userRepository.findById('qwert')
    await expect(action).rejects.toThrow(BadRequestError)
  })
})
