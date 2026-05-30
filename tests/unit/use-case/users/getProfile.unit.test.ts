import { beforeEach, describe, expect, it, vi } from 'vitest'

import GetProfile from '@app/use-cases/users/GetProfile.js'
import User from '@domain/entities/User.js'
import NotFoundError from '@domain/errors/NotFoundError.js'

import type { TRequestUser } from '@infrastructure/http/modules/user/user.validationsSchemas.js'
import type { Mocked } from 'vitest'

import type { IFindByIdUserRepository } from '@app/interfaces/repositories/IUserRepository.js'

describe('GetProfile Use Case', () => {
  let findRepository: Mocked<IFindByIdUserRepository>
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
    findRepository = {
      findById: vi.fn().mockResolvedValue(fakeUser),
    }

    getProfile = new GetProfile(findRepository)

    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('should find user', async () => {
    const action = await getProfile.execute(fakeUserReq.id)
    expect(action).toStrictEqual(fakeResult)
    expect(findRepository.findById).toHaveBeenCalledWith(fakeUserReq.id)
  })
  it('should throw when user not found', async () => {
    findRepository.findById.mockResolvedValue(null)
    const action = getProfile.execute(fakeUserReq.id)
    await expect(action).rejects.toThrow(NotFoundError)
  })
})
