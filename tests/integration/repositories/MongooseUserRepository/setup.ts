import { MongoMemoryServer } from 'mongodb-memory-server'
import { Types } from 'mongoose'
import { afterAll, beforeAll, vi } from 'vitest'

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

export const fakeNewUser: TNewUser = {
  email: 'test@example.com',
  name: 'John Doe',
  passwordHash: new PasswordHash('Hashed_password_123'),
}

export const userRepository: IUserRepository = new MongooseUserRepository(
  UserModel,
)

let mongoServer: MongoMemoryServer
let mongooseService: IDBService
let consoleSpies: MockInstance[] = []

beforeAll(async () => {
  consoleSpies = [
    vi.spyOn(console, 'log').mockImplementation(() => {}),
    vi.spyOn(console, 'warn').mockImplementation(() => {}),
    vi.spyOn(console, 'error').mockImplementation(() => {}),
  ]

  mongoServer = await MongoMemoryServer.create()
  mongooseService = new MongooseService(mongoServer.getUri())
  await mongooseService.connect()
})

afterAll(async () => {
  await UserModel.deleteMany({})
  await mongooseService.disconnect()
  await mongoServer.stop()
  consoleSpies.forEach((spy) => spy.mockRestore())
})

export const resetWithDefaultUser = async () => {
  await UserModel.deleteMany({})
  await UserModel.create({
    ...fakeNewUser,
    password: fakeNewUser.passwordHash.value,
  })
}

export const createTestId = (id: number | string): string => {
  const hex = id.toString(16).padStart(24, '0')
  return new Types.ObjectId(hex).toString()
}
