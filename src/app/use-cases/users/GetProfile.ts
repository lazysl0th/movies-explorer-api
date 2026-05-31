import { inject, injectable } from 'tsyringe'

import NotFoundError from '@domain/errors/NotFoundError.js'

import type { IGetByIdUserRepository } from '@app/interfaces/repositories/IUserRepository.js'
import type User from '@domain/entities/User.js'

@injectable()
export default class GetProfile {
  constructor(
    @inject('UserRepository')
    private readonly getUserRepository: IGetByIdUserRepository,
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this.getUserRepository.getById(userId)
    if (!user) throw new NotFoundError('User')
    return user
  }
}
