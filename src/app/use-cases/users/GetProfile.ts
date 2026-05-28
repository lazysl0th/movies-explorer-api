import InvalidCredentialsError from '@domain/errors/InvalidCredentialsError.js'
import NotFoundError from '@domain/errors/NotFoundError.js'

import type { IFindByIdUserRepository } from '@app/interfaces/repositories/IUserRepository.js'
import type User from '@domain/entities/User.js'

export default class GetProfile {
  constructor(private readonly findRepository: IFindByIdUserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.findRepository.findById(id)
    if (!user) throw new NotFoundError('User')
    return user
  }
}
