import { beforeEach, describe, expect, it } from 'vitest'

import BadRequestError from '@domain/errors/BadRequestError.js'
import UserModel from '@infrastructure/persistence/mongodb/UserModel.js'

import { createTestId, fakeNewUser, userRepository } from './setup.js'

describe('MongooseUserRepository - findById', () => {
  const userId = createTestId(1)

  beforeEach(async () => {
    await UserModel.deleteMany({})
    await UserModel.create({
      ...fakeNewUser,
      password: fakeNewUser.passwordHash.value,
      _id: userId,
    })
  })

  it('should successfully find user by id and return domain entity', async () => {
    const user = await userRepository.findById(userId)
    console.log(user)

    expect(user).not.toBeNull()
    expect(user?.id).toBe(userId)
    expect(user?.email).toBe('test@example.com')
    expect(user?.name).toBe('John Doe')
    expect(user?.passwordHash.value).toBeUndefined()
  })

  it('should return null if user is not found', async () => {
    const nonExistingId = createTestId(2)
    const user = await userRepository.findById(nonExistingId)
    expect(user).toBeNull()
  })

  it('should throw if user is not found', async () => {
    const action = userRepository.findById('qwert')
    await expect(action).rejects.toThrow(BadRequestError)
  })
})
