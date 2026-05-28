import InvalidCredentialsError from '@domain/errors/InvalidCredentialsError.js'

import type { ILoginUserRepository } from '@app/interfaces/repositories/IUserRepository.js'
import type { THashComparerService } from '@app/interfaces/services/IHashService.js'
import type { TTokenGenerateService } from '@app/interfaces/services/ITokenService.js'
import type User from '@domain/entities/User.js'

export default class LocalAuth {
  constructor(
    private readonly loginRepository: ILoginUserRepository,
    private readonly hashComparerService: THashComparerService,
    private readonly tokenGenerateService: TTokenGenerateService,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    const user = await this.loginRepository.findUserByCredentials(email)
    if (!user) throw new InvalidCredentialsError()
    const isMatched = await this.hashComparerService.compare(
      password,
      user.passwordHash.value,
    )
    if (!isMatched) throw new InvalidCredentialsError()
    const token = this.tokenGenerateService.generate(
      { id: user.id },
      { expiresIn: '7d' },
    )
    return { user, token }
  }
}
