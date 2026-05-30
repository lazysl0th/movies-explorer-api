import { beforeEach, describe, expect, it } from 'vitest'

import User from '@domain/entities/User.js'
import BadRequestError from '@domain/errors/BadRequestError.js'
import UserModel from '@infrastructure/persistence/mongodb/UserModel.js'

import { fakeLocalCredetials, fakeUser, userRepository } from '../setup.js'

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
    const user = new User({
      id: fakeUser.id,
      name: 'New Name',
      email: 'new@example.com',
    })
    const updatedUser = await userRepository.update(user)

    expect(updatedUser).not.toBeNull()
    expect(updatedUser?.id).toBe(fakeUser.id)
    expect(updatedUser?.email).toBe('new@example.com')
    expect(updatedUser?.name).toBe('New Name')
    const userInDb = await UserModel.findById(fakeUser.id)
    expect(userInDb?.name).toBe('New Name')
  })

  it('should return null if user is not found', async () => {
    const nonExistingId = userRepository.generateId()
    const user = await userRepository.getById(nonExistingId)
    expect(user).toBeNull()
  })

  it('should throw if user is not found', async () => {
    const action = userRepository.getById('qwert')
    await expect(action).rejects.toThrow(BadRequestError)
  })
})
