import { mongo, MongooseError } from 'mongoose'

import User from '@domain/entities/User.js'
import BadRequestError from '@domain/errors/BadRequestError.js'
import ConflictError from '@domain/errors/ConflictError.js'
import PasswordHash from '@domain/value-objects/user/PasswordHash.js'

import type {
  IUserRepository,
  TNewUser,
} from '@app/interfaces/repositories/IUserRepository.js'

import type { TUserModel } from '../mongodb/UserModel.js'

export default class MongooseUserRepository implements IUserRepository {
  constructor(private readonly userModel: TUserModel) {}

  async findUserByCredentials(email: string): Promise<User | null> {
    const userData = await this.userModel.findOne({ email }).select('+password')
    if (!userData) return null
    return new User(
      userData._id.toString(),
      userData.email,
      userData.name,
      new PasswordHash(userData.password),
    )
  }

  async create(newUser: TNewUser): Promise<User> {
    try {
      const userData = await this.userModel.create({
        name: newUser.name,
        email: newUser.email,
        password: newUser.passwordHash.value,
      })
      return new User(
        userData._id.toString(),
        userData.email,
        userData.name,
        new PasswordHash(userData.password),
      )
    } catch (e) {
      if (e instanceof mongo.MongoServerError && e.code === 11000) {
        throw new ConflictError('User')
      }
      if (
        e instanceof MongooseError &&
        (e.name === 'CastError' || e.name === 'ValidationError')
      ) {
        throw new BadRequestError()
      }
      throw e
    }
  }
}
