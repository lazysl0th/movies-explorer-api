import { MongoMemoryServer } from 'mongodb-memory-server'
import { Types } from 'mongoose'
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest'

import LocalCredentials from '@domain/entities/LocalCredentials.js'
import Movie from '@domain/entities/Movies.js'
import User from '@domain/entities/User.js'
import PasswordHash from '@domain/value-objects/user/PasswordHash.js'
import MovieModel from '@infrastructure/persistence/mongodb/MovieModel.js'
import UserModel from '@infrastructure/persistence/mongodb/UserModel.js'
import MongooseMovieRepository from '@infrastructure/persistence/repositories/MongooseMovieRepository.js'
import MongooseUserRepository from '@infrastructure/persistence/repositories/MongooseUserRepository.js'
import MongooseService from '@infrastructure/services/MongooseService.js'

import type { IDBService } from '@app/interfaces/services/IDBService.js'

export const userRepository = new MongooseUserRepository(UserModel)

export const movieRepository = new MongooseMovieRepository(MovieModel)

export const fakeUser = new User({
  id: userRepository.generateId(),
  email: 'test@example.com',
  name: 'John Doe',
})

export const fakeMovie = new Movie({
  nameRU: 'The Matrix',
  nameEN: 'The Matrix',
  id: movieRepository.generateId(),
  description: 'A computer hacker learns from mysterious...',
  director: 'Lana Wachowski',
  duration: 136,
  year: '1999',
  country: 'USA',
  image:
    'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  thumbnail:
    'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  trailer: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
  owner: fakeUser.id,
  movieId: 1,
})

export const fakeLocalCredetials = new LocalCredentials({
  id: fakeUser.id,
  passwordHash: new PasswordHash('Hashed_password_123'),
})

let mongoServer: MongoMemoryServer
let mongooseService: IDBService

const initDatabase = async (): Promise<void> => {
  await Promise.all([UserModel.init(), MovieModel.init()])
}

beforeAll(async () => {
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})

  mongoServer = await MongoMemoryServer.create()
  mongooseService = new MongooseService({ MONGODB_URI: mongoServer.getUri() })
  await mongooseService.connect()
  await initDatabase()
})

export const clearDatabase = async (): Promise<void> => {
  await Promise.all([UserModel.deleteMany({}), MovieModel.deleteMany({})])
}

afterAll(async () => {
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
  await clearDatabase()
  await mongooseService.disconnect()
  await mongoServer.stop()
  vi.restoreAllMocks()
})

beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

export const resetWithDefaultUser = async (): Promise<void> => {
  await clearDatabase()
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
