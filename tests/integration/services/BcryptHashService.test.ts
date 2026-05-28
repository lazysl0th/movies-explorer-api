import { describe, expect, it } from 'vitest'

import BcryptHashService from '@infrastructure/services/BcryptHashService.js'

describe('check BcryptHashService', () => {
  const saltRounds = 1
  const hashService = new BcryptHashService(saltRounds)
  const password = 'my-secret-password'

  it('should successfully hash a string and verify it', async () => {
    const hash = await hashService.generate(password)
    expect(hash).toBeDefined()
    expect(hash).not.toBe(password)

    const isMatch = await hashService.compare(password, hash)
    expect(isMatch).toBe(true)

    const isWrongMatch = await hashService.compare('wrong-password', hash)
    expect(isWrongMatch).toBe(false)
  })
})
