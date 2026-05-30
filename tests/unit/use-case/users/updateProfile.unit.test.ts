import { beforeEach, describe, expect, it, vi } from 'vitest'

import UpdateProfile from '@app/use-cases/users/UpdateProfile.js'
import User from '@domain/entities/User.js'
import NotFoundError from '@domain/errors/NotFoundError.js'

import type { Mocked } from 'vitest'

import type { IUpdateUserRepository } from '@app/interfaces/repositories/IUserRepository.js'

describe('UpdateProfile Use Case', () => {
  let mockUserRepository: Mocked<IUpdateUserRepository>
  let mockUser: User
  let updateProfile: UpdateProfile

  beforeEach(() => {
    mockUser = new User({ id: 'user-123', name: 'Old', email: 'old@test.com' })

    vi.spyOn(mockUser, 'changeName')
    vi.spyOn(mockUser, 'changeEmail')

    mockUserRepository = {
      getById: vi.fn(),
      update: vi.fn(),
    }

    updateProfile = new UpdateProfile(mockUserRepository)
  })

  it('should successfully update user profile', async () => {
    const userId = 'user-123'
    const newName = 'John Doe'
    const newEmail = 'john@example.com'

    mockUserRepository.getById.mockResolvedValue(mockUser)
    mockUserRepository.update.mockResolvedValue(mockUser)

    const result = await updateProfile.execute({
      id: userId,
      name: newName,
      email: newEmail,
    })

    expect(mockUserRepository.getById).toHaveBeenCalledWith(userId)
    expect(mockUser.changeName).toHaveBeenCalledWith(newName)
    expect(mockUser.changeEmail).toHaveBeenCalledWith(newEmail)
    expect(mockUserRepository.update).toHaveBeenCalledWith(mockUser)
    expect(result).toBe(mockUser)
  })

  it('should throw NotFoundError if user is not found', async () => {
    mockUserRepository.getById.mockResolvedValue(null)

    await expect(
      updateProfile.execute({
        id: 'invalid-id',
        name: 'Name',
        email: 'email@test.com',
      }),
    ).rejects.toThrow(NotFoundError)

    expect(mockUserRepository.getById).toHaveBeenCalledWith('invalid-id')
  })

  it('should throw NotFoundError, if findByIdAndUpdate return null', async () => {
    mockUserRepository.getById.mockResolvedValue(mockUser)
    mockUserRepository.update.mockResolvedValue(null)

    await expect(
      updateProfile.execute({
        id: 'user-123',
        name: 'Name',
        email: 'email@test.com',
      }),
    ).rejects.toThrow(NotFoundError)

    expect(mockUser.changeName).toHaveBeenCalled()
    expect(mockUser.changeEmail).toHaveBeenCalled()
  })
})
