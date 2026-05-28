import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongooseError } from 'mongoose'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import User from '@domain/entities/User.js'
import BadRequestError from '@domain/errors/BadRequestError.js'
import ConflictError from '@domain/errors/ConflictError.js'
import PasswordHash from '@domain/value-objects/user/PasswordHash.js'
import UserModel from '@infrastructure/persistence/mongodb/UserModel.js'
import MongooseUserRepository from '@infrastructure/persistence/repositories/MongooseUserRepository.js'
import MongooseService from '@infrastructure/services/MongooseService.js'

import type { MockInstance } from 'vitest'

import type {
  IUserRepository,
  TNewUser,
} from '@app/interfaces/repositories/IUserRepository.js'
import type { IDBService } from '@app/interfaces/services/IDBService.js'

describe('MongooseUserRepository', () => {
  let mongoServer: MongoMemoryServer
  let mongooseService: IDBService
  let userRepository: IUserRepository
  let consoleSpies: MockInstance[] = []
  const fakeNewUser: TNewUser = {
    email: 'test@example.com',
    name: 'John Doe',
    passwordHash: new PasswordHash('Hashed_password_123'),
  }

  beforeAll(async () => {
    consoleSpies = [
      vi.spyOn(console, 'log').mockImplementation(() => {}),
      vi.spyOn(console, 'warn').mockImplementation(() => {}),
      vi.spyOn(console, 'error').mockImplementation(() => {}),
    ]
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    mongooseService = new MongooseService(uri)
    await mongooseService.connect()
    userRepository = new MongooseUserRepository(UserModel)
  })

  afterAll(async () => {
    await UserModel.deleteMany({})
    await mongooseService.disconnect()
    await mongoServer.stop()
    consoleSpies.forEach((spy) => spy.mockRestore())
  })

  beforeEach(async () => {
    await UserModel.create({ ...fakeNewUser, password: 'Hashed_password_123' })
  })

  afterEach(async () => {
    await UserModel.deleteMany({})
  })

  it('should be successfully find user by email and return domain entity', async () => {
    const user = await userRepository.findUserByCredentials('test@example.com')

    expect(user).not.toBeNull()
    expect(user?.email).toBe('test@example.com')
    expect(user?.name).toBe('John Doe')
    expect(user?.passwordHash.value).toBe('Hashed_password_123')
  })

  it('should be return null if user not found', async () => {
    const user = await userRepository.findUserByCredentials(
      'notfound@example.com',
    )
    expect(user).toBeNull()
  })

  it('should be throw ConflictError error if user already exists', async () => {
    const action = userRepository.create(fakeNewUser)
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
    const action = userRepository.create(fakeNewUser)
    await expect(action).rejects.toThrow(BadRequestError)
    spy.mockRestore()
  })

  it('should be create new user', async () => {
    await UserModel.deleteMany({})
    const action = userRepository.create(fakeNewUser)
    await expect(action).resolves.toBeInstanceOf(User)
  })
})
