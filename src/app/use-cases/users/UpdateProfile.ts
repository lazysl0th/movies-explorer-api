import NotFoundError from '@domain/errors/NotFoundError.js'

import type {
  IUpdateUserCredentials,
  IUpdateUserRepository,
} from '@app/interfaces/repositories/IUserRepository.js'
import type User from '@domain/entities/User.js'

export default class UpdateProfile {
  constructor(private readonly updateRepository: IUpdateUserRepository) {}

  async execute({ id, name, email }: IUpdateUserCredentials): Promise<User> {
    const user = await this.updateRepository.getById(id)
    if (!user) throw new NotFoundError('User')
    user.changeName(name)
    user.changeEmail(email)
    const updatedUser = await this.updateRepository.update(user)
    if (!updatedUser) throw new NotFoundError('User')
    return updatedUser
  }
}
