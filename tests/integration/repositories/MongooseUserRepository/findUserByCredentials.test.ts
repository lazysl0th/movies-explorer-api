import { beforeEach, describe, expect, it } from 'vitest'

import { resetWithDefaultUser, userRepository } from './setup.js'

describe('MongooseUserRepository - findUserByCredentials', () => {
  beforeEach(async () => {
    await resetWithDefaultUser()
  })

  it('should successfully find user by email and return domain entity', async () => {
    const userWithCredentials =
      await userRepository.findUserByCredentials('test@example.com')

    expect(userWithCredentials?.user).not.toBeNull()
    expect(userWithCredentials?.user?.email).toBe('test@example.com')
    expect(userWithCredentials?.user?.name).toBe('John Doe')
  })

  it('should return null if user is not found', async () => {
    const userWithCredentials = await userRepository.findUserByCredentials(
      'notfound@example.com',
    )
    expect(userWithCredentials).toBeNull()
  })
})
