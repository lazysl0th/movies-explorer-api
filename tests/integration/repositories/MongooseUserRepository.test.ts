import { MongoMemoryServer } from 'mongodb-memory-server'
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import UserModel from '@infrastructure/persistence/mongodb/UserModel.js'
import MongooseUserRepository from '@infrastructure/persistence/repositories/MongooseUserRepository.js'
import MongooseService from '@infrastructure/services/MongooseService.js'

import type { MockInstance } from 'vitest'

import type IUserRepository from '@app/interfaces/repositories/IUserRepository.js'
import type { IDBService } from '@app/interfaces/services/IDBService.js'

describe('MongooseUserRepository', () => {
  let mongoServer: MongoMemoryServer
  let mongooseService: IDBService
  let userRepository: IUserRepository
  let consoleSpies: MockInstance[] = []

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
    await UserModel.deleteMany({})
  })

  it('should be successfully find user by email and return domain entity', async () => {
    await UserModel.create({
      email: 'test@example.com',
      name: 'John Doe',
      password: 'Hashed_password_123,',
    })

    const user = await userRepository.findUserByCredentials('test@example.com')

    expect(user).not.toBeNull()
    expect(user?.email).toBe('test@example.com')
    expect(user?.name).toBe('John Doe')
    expect(user?.passwordHash.value).toBe('Hashed_password_123,')
  })

  it('should be return null if user not found', async () => {
    const user = await userRepository.findUserByCredentials(
      'notfound@example.com',
    )
    expect(user).toBeNull()
  })
})
