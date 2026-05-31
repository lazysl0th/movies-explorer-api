import { TokenExpiredError } from 'jsonwebtoken'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import JwtTokenService from '@infrastructure/services/JwtTokenService.js'

import type { SignOptions } from 'jsonwebtoken'

import type ITokenService from '@app/interfaces/services/ITokenService.js'
import type { TJwtServiceConfig } from '@infrastructure/config/env.config.js'

describe('check JwtTokenService', () => {
  const jwtSecret: TJwtServiceConfig = {
    JWT_SECRET: 'secret',
  }
  let signOptions: SignOptions = { expiresIn: '7d' }
  const jwtTokenService: ITokenService = new JwtTokenService(jwtSecret)
  const payload: object = { id: '1' }

  describe('should successfully sign and verify an object', () => {
    let token: string
    beforeEach(() => {
      token = jwtTokenService.generate(payload, signOptions)
    })
    it('successfully sign', () => {
      expect(token).toBeDefined()
      expect(token).not.toBe(payload)
    })
    it('successfully verify', () => {
      const isValidToken = jwtTokenService.verify(token)
      expect(isValidToken).toStrictEqual(expect.objectContaining(payload))
    })
  })

  describe('check JwtTokenService expiration', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should throw when verify invalid token', () => {
      signOptions = { expiresIn: '10s' }
      const token = jwtTokenService.generate(payload, signOptions)
      vi.advanceTimersByTime(11000)
      expect(() => jwtTokenService.verify(token)).toThrow(TokenExpiredError)
    })
  })
})
