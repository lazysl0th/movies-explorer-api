import { mongo, MongooseError, Types } from 'mongoose'

import LocalCredentials from '@domain/entities/LocalCredentials.js'
import User from '@domain/entities/User.js'
import BadRequestError from '@domain/errors/BadRequestError.js'
import ConflictError from '@domain/errors/ConflictError.js'

import type {
  IUserRepository,
  IUserWithLocalCredentials,
} from '@app/interfaces/repositories/IUserRepository.js'

import type { TUserModel } from '../mongodb/UserModel.js'

export default class MongooseUserRepository implements IUserRepository {
  constructor(private readonly userModel: TUserModel) {}

  // eslint-disable-next-line class-methods-use-this
  public generateId(): string {
    return new Types.ObjectId().toHexString()
  }

  // eslint-disable-next-line class-methods-use-this
  private handleError(e: unknown): never {
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

  async getByCredentials(
    email: string,
  ): Promise<IUserWithLocalCredentials | null> {
    const userData = await this.userModel.findOne({ email }).select('+password')
    if (!userData) return null
    const user = new User({
      id: userData._id.toString(),
      email: userData.email,
      name: userData.name,
    })
    const localCredentials = LocalCredentials.restore({
      id: userData._id.toString(),
      password: userData.password,
    })
    return { user, localCredentials }
  }

  async create({
    user,
    localCredentials,
  }: IUserWithLocalCredentials): Promise<User> {
    try {
      const userData = await this.userModel.create({
        _id: user.id,
        name: user.name,
        email: user.email,
        password: localCredentials.passwordHash,
      })
      return new User({
        id: userData._id.toString(),
        email: userData.email,
        name: userData.name,
      })
    } catch (e) {
      return this.handleError(e)
    }
  }

  async getById(id: string): Promise<User | null> {
    try {
      const userData = await this.userModel.findById(id)
      if (!userData) return null
      return new User({
        id: userData._id.toString(),
        email: userData.email,
        name: userData.name,
      })
    } catch (e) {
      return this.handleError(e)
    }
  }

  async update(user: User): Promise<User | null> {
    try {
      const userData = await this.userModel.findByIdAndUpdate(
        user.id,
        { name: user.name, email: user.email },
        { returnDocument: 'after' },
      )
      if (!userData) return null
      return new User({
        id: userData._id.toString(),
        email: userData.email,
        name: userData.name,
      })
    } catch (e) {
      return this.handleError(e)
    }
  }
}
