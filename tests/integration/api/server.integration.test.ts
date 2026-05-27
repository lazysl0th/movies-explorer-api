import http from 'node:http'

import { createTerminus } from '@godaddy/terminus'
import express from 'express'
import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'

import getTerminusOptions from '@infrastructure/config/terminus.config.js'

import type { IApp } from '@app/interfaces/base/app.js'

describe('Integration HTTP-server with Terminus', () => {
  it('should respond with 200 on /healthz', async () => {
    const fakeApp: IApp = {
      express: express(),
      start: vi.fn().mockResolvedValue(undefined),
      stop: vi.fn().mockResolvedValue(undefined),
      healthCheck: vi.fn().mockReturnValue(true),
    }
    const server = http.createServer(fakeApp.express)
    createTerminus(server, getTerminusOptions(fakeApp))
    const response = await request(server).get('/healthz')
    expect(response.status).toBe(200)
    expect(fakeApp.healthCheck).toHaveBeenCalledTimes(1)
  })
})
