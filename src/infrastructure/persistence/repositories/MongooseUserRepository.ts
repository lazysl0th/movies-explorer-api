import User from '@domain/entities/User.js'
import PasswordHash from '@domain/value-objects/user/PasswordHash.js'

import type IUserRepository from '@app/interfaces/repositories/IUserRepository.js'

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
}
