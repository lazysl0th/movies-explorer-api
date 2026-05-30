import { beforeEach, describe, expect, it, vi } from 'vitest'

import GetProfile from '@app/use-cases/users/GetProfile.js'
import User from '@domain/entities/User.js'
import NotFoundError from '@domain/errors/NotFoundError.js'

import type { Mocked } from 'vitest'

import type { TRequestUser } from '@app/dtos/UserDto.js'
import type { IGetByIdUserRepository } from '@app/interfaces/repositories/IUserRepository.js'

describe('GetProfile Use Case', () => {
  let getUserRepository: Mocked<IGetByIdUserRepository>
  let getProfile: GetProfile
  const fakeUserReq: TRequestUser = {
    id: '1',
  }
  const fakeUser = new User({
    id: '1',
    email: 'test@example.com',
    name: 'John Doe',
  })

  const fakeResult: User = fakeUser

  beforeEach(() => {
    getUserRepository = {
      getById: vi.fn().mockResolvedValue(fakeUser),
    }

    getProfile = new GetProfile(getUserRepository)

    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('should find user', async () => {
    const action = await getProfile.execute(fakeUserReq.id)
    expect(action).toStrictEqual(fakeResult)
    expect(getUserRepository.getById).toHaveBeenCalledWith(fakeUserReq.id)
  })
  it('should throw when user not found', async () => {
    getUserRepository.getById.mockResolvedValue(null)
    const action = getProfile.execute(fakeUserReq.id)
    await expect(action).rejects.toThrow(NotFoundError)
  })
})
