import { MongoMemoryServer } from 'mongodb-memory-server'
import { Types } from 'mongoose'
import { afterAll, beforeAll, vi } from 'vitest'

import LocalCredentials from '@domain/entities/LocalCredentials.js'
import User from '@domain/entities/User.js'
import PasswordHash from '@domain/value-objects/user/PasswordHash.js'
import UserModel from '@infrastructure/persistence/mongodb/UserModel.js'
import MongooseUserRepository from '@infrastructure/persistence/repositories/MongooseUserRepository.js'
import MongooseService from '@infrastructure/services/MongooseService.js'

import type { MockInstance } from 'vitest'

import type { IUserRepository } from '@app/interfaces/repositories/IUserRepository.js'
import type { IDBService } from '@app/interfaces/services/IDBService.js'

export const userRepository: IUserRepository = new MongooseUserRepository(
  UserModel,
)

export const fakeUser = new User({
  id: userRepository.generateId(),
  email: 'test@example.com',
  name: 'John Doe',
})

export const fakeLocalCredetials = new LocalCredentials({
  id: fakeUser.id,
  passwordHash: new PasswordHash('Hashed_password_123'),
})

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
  UserModel.init()
})

afterAll(async () => {
  await UserModel.deleteMany({})
  await mongooseService.disconnect()
  await mongoServer.stop()
  consoleSpies.forEach((spy) => spy.mockRestore())
})

export const resetWithDefaultUser = async (): Promise<void> => {
  await UserModel.deleteMany({})
  await UserModel.create({
    _id: fakeUser.id,
    name: fakeUser.name,
    email: fakeUser.email,
    password: fakeLocalCredetials.passwordHash,
  })
}

export const createTestId = (id: number | string): string => {
  const hex = id.toString(16).padStart(24, '0')
  return new Types.ObjectId(hex).toString()
}
