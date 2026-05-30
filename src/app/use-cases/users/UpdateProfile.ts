import NotFoundError from '@domain/errors/NotFoundError.js'

import type { TUpdateUserProfileBodyDto } from '@app/dtos/UserDto.js'
import type { IFindByIdAndUpdateUserRepository } from '@app/interfaces/repositories/IUserRepository.js'
import type User from '@domain/entities/User.js'

export default class UpdateProfile {
  constructor(
    private readonly findAndUpdateRepository: IFindByIdAndUpdateUserRepository,
  ) {}

  async execute({ id, name, email }: TUpdateUserProfileBodyDto): Promise<User> {
    const user = await this.findAndUpdateRepository.findById(id)
    if (!user) throw new NotFoundError('User')
    user.changeName(name)
    user.changeEmail(email)
    const updatedUser =
      await this.findAndUpdateRepository.findByIdAndUpdate(user)
    if (!updatedUser) throw new NotFoundError('User')
    return updatedUser
  }
}
