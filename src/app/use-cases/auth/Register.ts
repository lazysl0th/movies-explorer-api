import PasswordHash from '@domain/value-objects/user/PasswordHash.js'

import type { IRegisterUserRepository } from '@app/interfaces/repositories/IUserRepository.js'
import type { THashGeneratorService } from '@app/interfaces/services/IHashService.js'
import type User from '@domain/entities/User.js'

export default class Register {
  constructor(
    private readonly registerRepository: IRegisterUserRepository,
    private readonly hashGeneratorService: THashGeneratorService,
  ) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const hash = await this.hashGeneratorService.generate(password)
    return this.registerRepository.create({
      name,
      email,
      passwordHash: new PasswordHash(hash),
    })
  }
}
