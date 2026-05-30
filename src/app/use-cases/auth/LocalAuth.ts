import InvalidCredentialsError from '@domain/errors/InvalidCredentialsError.js'

import type { ILocalAuthResponseDto, TLoginBodyDto } from '@app/dtos/AuthDto.js'
import type { ILoginUserRepository } from '@app/interfaces/repositories/IUserRepository.js'
import type { THashComparerService } from '@app/interfaces/services/IHashService.js'
import type { TTokenGenerateService } from '@app/interfaces/services/ITokenService.js'

export default class LocalAuth {
  constructor(
    private readonly loginRepository: ILoginUserRepository,
    private readonly hashComparerService: THashComparerService,
    private readonly tokenGenerateService: TTokenGenerateService,
  ) {}

  async execute({
    email,
    password,
  }: TLoginBodyDto): Promise<ILocalAuthResponseDto> {
    const userWithCredentials =
      await this.loginRepository.getByCredentials(email)
    if (!userWithCredentials) throw new InvalidCredentialsError()
    const { user, localCredentials } = userWithCredentials
    if (
      !(await localCredentials.comparePassword(
        password,
        this.hashComparerService,
      ))
    )
      throw new InvalidCredentialsError()
    const token = this.tokenGenerateService.generate(
      { id: user.id },
      { expiresIn: '7d' },
    )
    return { user, token }
  }
}
