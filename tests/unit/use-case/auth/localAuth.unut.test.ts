import { beforeEach, describe, expect, it, vi } from 'vitest'

import LocalAuth from '@app/use-cases/auth/LocalAuth.js'
import InvalidCredentialsError from '@domain/errors/InvalidCredentialsError.js'

import type { Mocked } from 'vitest'

import type { TLoginBodyDto } from '@app/dtos/UserDTO.js'
import type IUserRepository from '@app/interfaces/repositories/IUserRepository.js'
import type { THashComparerService } from '@app/interfaces/services/IHashService.js'
import type { TTokenGenerateService } from '@app/interfaces/services/ITokenService.js'
import type User from '@domain/entities/User.js'

describe('check local auth', () => {
  let userRepository: Mocked<IUserRepository>
  let fakeHashComparerService: Mocked<THashComparerService>
  let fakeGenerateTokenService: Mocked<TTokenGenerateService>
  let localAuth: LocalAuth
  const fakeLoginBodyDto: TLoginBodyDto = {
    email: 'qwerty@qwerty.com',
    password: 'string',
  }
  const fakeUser: User = {
    email: 'qwerty@qwerty.com',
    id: 'string',
    passwordHash: { value: 'string' },
    name: 'string',
    toJSON: vi.fn(),
  }
  const fakeResult: { user: Partial<User>; token: string } = {
    user: fakeUser,
    token: 'jwt',
  }

  beforeEach(() => {
    userRepository = {
      findUserByCredentials: vi.fn().mockResolvedValue(fakeUser),
    }
    fakeHashComparerService = {
      compare: vi.fn().mockResolvedValue(true),
    }
    fakeGenerateTokenService = {
      generate: vi.fn().mockReturnValue('jwt'),
    }

    localAuth = new LocalAuth(
      userRepository,
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
    expect(userRepository.findUserByCredentials).toHaveBeenCalledWith(
      fakeLoginBodyDto.email,
    )
    expect(fakeHashComparerService.compare).toHaveBeenCalledTimes(1)
    expect(fakeGenerateTokenService.generate).toHaveBeenCalledTimes(1)
  })
  it('should throw when user not found', async () => {
    userRepository.findUserByCredentials.mockResolvedValue(null)
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
