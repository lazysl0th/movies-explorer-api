import { beforeEach, describe, expect, it } from 'vitest'

import { resetWithDefaultUser, userRepository } from './setup.js'

describe('MongooseUserRepository - findUserByCredentials', () => {
  beforeEach(async () => {
    await resetWithDefaultUser()
  })

  it('should successfully find user by email and return domain entity', async () => {
    const user = await userRepository.findUserByCredentials('test@example.com')

    expect(user).not.toBeNull()
    expect(user?.email).toBe('test@example.com')
    expect(user?.name).toBe('John Doe')
    expect(user?.passwordHash.value).toBe('Hashed_password_123')
  })

  it('should return null if user is not found', async () => {
    const user = await userRepository.findUserByCredentials(
      'notfound@example.com',
    )
    expect(user).toBeNull()
  })
})
