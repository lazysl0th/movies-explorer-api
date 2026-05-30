import { beforeEach, describe, expect, it } from 'vitest'

import BadRequestError from '@domain/errors/BadRequestError.js'
import UserModel from '@infrastructure/persistence/mongodb/UserModel.js'

import {
  createTestId,
  fakeLocalCredetials,
  fakeUser,
  userRepository,
} from '../setup.js'

describe('MongooseUserRepository - getById', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({})
    await UserModel.create({
      _id: fakeUser.id,
      name: fakeUser.name,
      email: fakeUser.email,
      password: fakeLocalCredetials.passwordHash,
    })
  })

  it('should successfully find user by id and return domain entity', async () => {
    const user = await userRepository.getById(fakeUser.id)

    expect(user).not.toBeNull()
    expect(user?.id).toBe(fakeUser.id)
    expect(user?.email).toBe('test@example.com')
    expect(user?.name).toBe('John Doe')
  })

  it('should return null if user is not found', async () => {
    const nonExistingId = createTestId(2)
    const user = await userRepository.getById(nonExistingId)
    expect(user).toBeNull()
  })

  it('should throw if user is not found', async () => {
    const action = userRepository.getById('qwert')
    await expect(action).rejects.toThrow(BadRequestError)
  })
})
