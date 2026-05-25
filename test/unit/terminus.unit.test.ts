import { HealthCheckError } from '@godaddy/terminus'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import getTerminusOptions from '../../src/app/config/terminus.config.js'

import type { Mocked } from 'vitest'

import type { TTerminusApp } from '../../src/shared/base/app.base.js'

describe('Terminus configuration', () => {
  let fakeApp: Mocked<TTerminusApp>

  beforeEach(() => {
    fakeApp = {
      stop: vi.fn().mockResolvedValue(undefined),
      healthCheck: vi.fn().mockReturnValue(true),
    }
    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('health check', () => {
    it('should return true', async () => {
      const options = getTerminusOptions(fakeApp)
      const handler = options.healthChecks?.['/healthz']
      if (typeof handler === 'function') {
        await expect(
          handler({ state: { isShuttingDown: false } }),
        ).resolves.not.toThrow()
        expect(fakeApp.healthCheck).toHaveBeenCalledTimes(1)
      }
    })
    it('should throw HealthCheckError when app is unavailable', async () => {
      fakeApp.healthCheck.mockReturnValue(false)
      const options = getTerminusOptions(fakeApp)
      const handler = options.healthChecks?.['/healthz']
      if (typeof handler === 'function') {
        await expect(
          handler({ state: { isShuttingDown: false } }),
        ).rejects.toThrow(HealthCheckError)
        expect(fakeApp.healthCheck).toHaveBeenCalledTimes(1)
      }
    })
  })

  describe('Graceful shutdown', () => {
    it('should call app.stop() when onSignal is triggered', async () => {
      const options = getTerminusOptions(fakeApp)
      const handler = options.onSignal
      if (typeof handler === 'function') {
        await handler()
        expect(fakeApp.stop).toHaveBeenCalledTimes(1)
      }
    })
  })
})
