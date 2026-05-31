import { mongo, MongooseError, Types } from 'mongoose'
import { inject, injectable } from 'tsyringe'

import LocalCredentials from '@domain/entities/LocalCredentials.js'
import User from '@domain/entities/User.js'
import BadRequestError from '@domain/errors/BadRequestError.js'
import ConflictError from '@domain/errors/ConflictError.js'

import type {
  IUserRepository,
  IUserWithLocalCredentials,
} from '@app/interfaces/repositories/IUserRepository.js'

import type { TUserDocument, TUserModel } from '../mongodb/UserModel.js'

@injectable()
export default class MongooseUserRepository implements IUserRepository {
  constructor(@inject('UserModel') private readonly userModel: TUserModel) {}

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

  // eslint-disable-next-line class-methods-use-this
  private createUser(userData: TUserDocument): User {
    return new User({
      id: userData._id.toString(),
      email: userData.email,
      name: userData.name,
    })
  }

  async getByCredentials(
    email: string,
  ): Promise<IUserWithLocalCredentials | null> {
    const userDocument = await this.userModel
      .findOne({ email })
      .select('+password')
    if (!userDocument) return null
    const user = this.createUser(userDocument)
    const localCredentials = LocalCredentials.restore({
      id: userDocument._id.toString(),
      password: userDocument.password,
    })
    return { user, localCredentials }
  }

  async create({
    user,
    localCredentials,
  }: IUserWithLocalCredentials): Promise<User> {
    try {
      const userDocument = await this.userModel.create({
        _id: user.id,
        name: user.name,
        email: user.email,
        password: localCredentials.passwordHash,
      })
      return this.createUser(userDocument)
    } catch (e) {
      return this.handleError(e)
    }
  }

  async getById(id: string): Promise<User | null> {
    try {
      const userDocument = await this.userModel.findById(id)
      if (!userDocument) return null
      return this.createUser(userDocument)
    } catch (e) {
      return this.handleError(e)
    }
  }

  async update(user: User): Promise<User | null> {
    try {
      const userDocument = await this.userModel.findByIdAndUpdate(
        user.id,
        { name: user.name, email: user.email },
        { returnDocument: 'after' },
      )
      if (!userDocument) return null
      return this.createUser(userDocument)
    } catch (e) {
      return this.handleError(e)
    }
  }
}
