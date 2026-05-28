import { beforeEach, describe, expect, it, vi } from 'vitest'

import LocalAuth from '@app/use-cases/auth/LocalAuth.js'
import User from '@domain/entities/User.js'
import InvalidCredentialsError from '@domain/errors/InvalidCredentialsError.js'
import PasswordHash from '@domain/value-objects/user/PasswordHash.js'

import type { Mocked } from 'vitest'

import type { TAuthResponseDto, TLoginBodyDto } from '@app/dtos/AuthDTO.js'
import type { ILoginUserRepository } from '@app/interfaces/repositories/IUserRepository.js'
import type { THashComparerService } from '@app/interfaces/services/IHashService.js'
import type { TTokenGenerateService } from '@app/interfaces/services/ITokenService.js'

describe('check local auth', () => {
  let loginRepository: Mocked<ILoginUserRepository>
  let fakeHashComparerService: Mocked<THashComparerService>
  let fakeGenerateTokenService: Mocked<TTokenGenerateService>
  let localAuth: LocalAuth
  const fakeLoginBodyDto: TLoginBodyDto = {
    email: 'test@example.com',
    password: 'Hashed_password_123',
  }
  const fakeUser = new User(
    '1',
    'test@example.com',
    'John Doe',
    new PasswordHash('Hashed_password_123'),
  )

  const fakeResult: { user: TAuthResponseDto; token: string } = {
    user: fakeUser,
    token: 'jwt',
  }

  beforeEach(() => {
    loginRepository = {
      findUserByCredentials: vi.fn().mockResolvedValue(fakeUser),
    }
    fakeHashComparerService = {
      compare: vi.fn().mockResolvedValue(true),
    }
    fakeGenerateTokenService = {
      generate: vi.fn().mockReturnValue('jwt'),
    }

    localAuth = new LocalAuth(
      loginRepository,
      fakeHashComparerService,
      fakeGenerateTokenService,
    )

    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('should login user', async () => {
    const result = await localAuth.execute(
      fakeLoginBodyDto.email,
      fakeLoginBodyDto.password,
    )
    expect(result).toStrictEqual(fakeResult)
    expect(loginRepository.findUserByCredentials).toHaveBeenCalledWith(
      fakeLoginBodyDto.email,
    )
    expect(fakeHashComparerService.compare).toHaveBeenCalledTimes(1)
    expect(fakeGenerateTokenService.generate).toHaveBeenCalledTimes(1)
  })
  it('should throw when user not found', async () => {
    loginRepository.findUserByCredentials.mockResolvedValue(null)
    const action = localAuth.execute(
      fakeLoginBodyDto.email,
      fakeLoginBodyDto.password,
    )
    await expect(action).rejects.toThrow(InvalidCredentialsError)
    expect(fakeHashComparerService.compare).not.toHaveBeenCalled()
  })

  it('should throw when password invalid', async () => {
    fakeHashComparerService.compare.mockResolvedValue(false)
    const action = localAuth.execute(
      fakeLoginBodyDto.email,
      fakeLoginBodyDto.password,
    )
    await expect(action).rejects.toThrow(InvalidCredentialsError)
    expect(fakeGenerateTokenService.generate).not.toHaveBeenCalled()
  })
})
