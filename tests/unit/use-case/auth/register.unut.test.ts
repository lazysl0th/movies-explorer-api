import { beforeEach, describe, expect, it, vi } from 'vitest'

import Register from '@app/use-cases/auth/Register.js'
import User from '@domain/entities/User.js'
import PasswordHash from '@domain/value-objects/user/PasswordHash.js'

import type { Mocked } from 'vitest'

import type { TRegisterBodyDto } from '@app/dtos/AuthDto.js'
import type { IRegisterUserRepository } from '@app/interfaces/repositories/IUserRepository.js'
import type { THashGeneratorService } from '@app/interfaces/services/IHashService.js'

describe('check register', () => {
  let registerRepository: Mocked<IRegisterUserRepository>
  let fakeHashGenerateService: Mocked<THashGeneratorService>
  let register: Register
  const fakeRegisterBodyDto: TRegisterBodyDto = {
    name: 'John Doe',
    email: 'test@example.com',
    password: 'password_123',
  }
  const fakeUser = new User(
    '1',
    'test@example.com',
    'John Doe',
    new PasswordHash('Hashed_password_123'),
  )

  const fakeResult: User = fakeUser

  beforeEach(() => {
    registerRepository = {
      create: vi.fn().mockResolvedValue(fakeUser),
    }
    fakeHashGenerateService = {
      generate: vi.fn().mockResolvedValue('Hashed_password_123'),
    }

    register = new Register(registerRepository, fakeHashGenerateService)

    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('should register user', async () => {
    const result = await register.execute(
      fakeRegisterBodyDto.name,
      fakeRegisterBodyDto.email,
      fakeRegisterBodyDto.password,
    )
    expect(result).toStrictEqual(fakeResult)
    expect(registerRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: fakeRegisterBodyDto.name,
        email: fakeRegisterBodyDto.email,
        passwordHash: expect.objectContaining({
          value: 'Hashed_password_123',
        }),
      }),
    )
    expect(fakeHashGenerateService.generate).toHaveBeenCalledTimes(1)
  })
})
