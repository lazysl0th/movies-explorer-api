import LocalCredentials from '@domain/entities/LocalCredentials.js'
import User from '@domain/entities/User.js'

import type { TRegisterBodyDto } from '@app/dtos/AuthDto.js'
import type { IRegisterUserRepository } from '@app/interfaces/repositories/IUserRepository.js'
import type { THashGeneratorService } from '@app/interfaces/services/IHashService.js'

export default class Register {
  constructor(
    private readonly registerRepository: IRegisterUserRepository,
    private readonly hashGeneratorService: THashGeneratorService,
  ) {}

  async execute({ name, email, password }: TRegisterBodyDto): Promise<User> {
    const id = this.registerRepository.generateId()
    const user = new User({ id, name, email })
    const localCredentials = await LocalCredentials.create({
      id,
      password,
      hashGenerateService: this.hashGeneratorService,
    })
    return this.registerRepository.create({
      user,
      localCredentials,
    })
  }
}
