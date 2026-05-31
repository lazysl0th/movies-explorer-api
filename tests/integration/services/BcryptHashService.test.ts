import { describe, expect, it } from 'vitest'

import BcryptHashService from '@infrastructure/services/BcryptHashService.js'

import type { TBcryptServiceConfig } from '@infrastructure/config/env.config.js'

describe('check BcryptHashService', () => {
  const config: TBcryptServiceConfig = {
    SALT_ROUNDS: 1,
  }
  const hashService = new BcryptHashService(config)
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
