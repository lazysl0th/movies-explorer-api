import { beforeEach, describe, expect, it, vi } from 'vitest'

import Register from '@app/use-cases/auth/Register.js'
import LocalCredentials from '@domain/entities/LocalCredentials.js'
import User from '@domain/entities/User.js'
import PasswordHash from '@domain/value-objects/user/PasswordHash.js'

import type { TRegisterBodyDto } from '@infrastructure/http/modules/auth/auth.validationsSchemas.js'
import type { Mocked } from 'vitest'

import type { IRegisterUserRepository } from '@app/interfaces/repositories/IUserRepository.js'
import type { THashGeneratorService } from '@app/interfaces/services/IHashService.js'

describe('Register Use Case', () => {
  let registerRepository: Mocked<IRegisterUserRepository>
  let fakeHashGenerateService: Mocked<THashGeneratorService>
  let register: Register
  const fakeRegisterBodyDto: TRegisterBodyDto = {
    name: 'John Doe',
    email: 'test@example.com',
    password: 'password_123',
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

  const fakeResult: User = fakeUser

  beforeEach(() => {
    registerRepository = {
      create: vi.fn().mockResolvedValue(fakeUser),
      generateId: vi.fn().mockReturnValue('1'),
    }
    fakeHashGenerateService = {
      generate: vi.fn().mockResolvedValue('Hashed_password_123'),
    }

    register = new Register(registerRepository, fakeHashGenerateService)

    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('should register user', async () => {
    const result = await register.execute({
      name: fakeRegisterBodyDto.name,
      email: fakeRegisterBodyDto.email,
      password: fakeRegisterBodyDto.password,
    })
    expect(result).toStrictEqual(fakeResult)
    expect(registerRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        user: fakeUser,
        localCredentials: fakeLocalCredentials,
      }),
    )
    expect(fakeHashGenerateService.generate).toHaveBeenCalledTimes(1)
  })
})
