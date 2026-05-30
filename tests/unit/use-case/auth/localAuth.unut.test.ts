import { beforeEach, describe, expect, it, vi } from 'vitest'

import LocalAuth from '@app/use-cases/auth/LocalAuth.js'
import LocalCredentials from '@domain/entities/LocalCredentials.js'
import User from '@domain/entities/User.js'
import InvalidCredentialsError from '@domain/errors/InvalidCredentialsError.js'
import PasswordHash from '@domain/value-objects/user/PasswordHash.js'

import type {
  TAuthResponseDto,
  TLoginBodyDto,
} from '@infrastructure/http/modules/auth/auth.validationsSchemas.js'
import type { Mocked } from 'vitest'

import type { ILoginUserRepository } from '@app/interfaces/repositories/IUserRepository.js'
import type { THashComparerService } from '@app/interfaces/services/IHashService.js'
import type { TTokenGenerateService } from '@app/interfaces/services/ITokenService.js'

describe('LocalAuth Use Case', () => {
  let loginRepository: Mocked<ILoginUserRepository>
  let fakeHashComparerService: Mocked<THashComparerService>
  let fakeGenerateTokenService: Mocked<TTokenGenerateService>
  let localAuth: LocalAuth
  const fakeLoginBodyDto: TLoginBodyDto = {
    email: 'test@example.com',
    password: 'Hashed_password_123',
  }
  const fakeUser = new User({
    id: '1',
    email: 'test@example.com',
    name: 'John Doe',
  })
  const fakeLocalCredentials = new LocalCredentials({
    id: '1',
    passwordHash: new PasswordHash('Hashed_password_123'),
  })

  const fakeResult: { user: TAuthResponseDto; token: string } = {
    user: fakeUser,
    token: 'jwt',
  }

  beforeEach(() => {
    loginRepository = {
      findUserByCredentials: vi.fn().mockResolvedValue({
        user: fakeUser,
        localCredentials: fakeLocalCredentials,
      }),
    }
    fakeHashComparerService = {
      compare: vi.fn().mockResolvedValue(true),
    }
    fakeGenerateTokenService = {
      generate: vi.fn().mockReturnValue('jwt'),
    }
    fakeLocalCredentials.comparePassword = vi.fn().mockResolvedValue(true)

    localAuth = new LocalAuth(
      loginRepository,
      fakeHashComparerService,
      fakeGenerateTokenService,
    )

    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('should login user', async () => {
    const result = await localAuth.execute({
      email: fakeLoginBodyDto.email,
      password: fakeLoginBodyDto.password,
    })
    expect(result).toStrictEqual(fakeResult)
    expect(loginRepository.findUserByCredentials).toHaveBeenCalledWith(
      fakeLoginBodyDto.email,
    )
    expect(fakeLocalCredentials.comparePassword).toHaveBeenCalledWith(
      fakeLoginBodyDto.password,
      fakeHashComparerService,
    )
    expect(fakeGenerateTokenService.generate).toHaveBeenCalledTimes(1)
  })

  it('should throw when user not found', async () => {
    loginRepository.findUserByCredentials.mockResolvedValue(null)
    const action = localAuth.execute({
      email: fakeLoginBodyDto.email,
      password: fakeLoginBodyDto.password,
    })
    await expect(action).rejects.toThrow(InvalidCredentialsError)
    expect(fakeHashComparerService.compare).not.toHaveBeenCalled()
  })

  it('should throw when password invalid', async () => {
    fakeHashComparerService.compare.mockResolvedValue(false)
    fakeLocalCredentials.comparePassword = vi.fn().mockResolvedValueOnce(false)
    const action = localAuth.execute({
      email: fakeLoginBodyDto.email,
      password: fakeLoginBodyDto.password,
    })
    await expect(action).rejects.toThrow(InvalidCredentialsError)
    expect(fakeGenerateTokenService.generate).not.toHaveBeenCalled()
  })
})
