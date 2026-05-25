import mongoose from 'mongoose'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Mongoose from '@infrastructure/database/mongoose.service.js'
import config from '@shared/config/env.js'

import type { Mocked } from 'vitest'

import type { IDBService } from '@shared/base/db.base.js'

const { mockContext } = vi.hoisted(() => ({
  mockContext: {
    readyState: 0,
    ping: vi.fn().mockResolvedValue({ ok: 1 }),
  },
}))

vi.mock('mongoose', () => ({
  default: {
    connect: vi.fn(),
    connection: {
      on: vi.fn(),
      get readyState() {
        return mockContext.readyState
      },
      db: {
        admin: vi.fn().mockReturnValue({
          get ping() {
            return mockContext.ping
          },
        }),
      },
    },
  },
}))

describe('chech mongoose', () => {
  let fakeMongoose: IDBService

  beforeEach(() => {
    fakeMongoose = new Mongoose(config.MONGODB_URI)
    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('check connect', () => {
    it('call with correct uri', async () => {
      await fakeMongoose.connect()
      expect(mongoose.connect).toHaveBeenCalledWith(config.MONGODB_URI)
    })
    it('call connection.on', async () => {
      await fakeMongoose.connect()
      expect(mongoose.connection.on).toHaveBeenCalledWith(
        'connecting',
        expect.any(Function),
      )
      expect(mongoose.connection.on).toHaveBeenCalledWith(
        'connected',
        expect.any(Function),
      )
      expect(mongoose.connection.on).toHaveBeenCalledWith(
        'open',
        expect.any(Function),
      )
      expect(mongoose.connection.on).toHaveBeenCalledWith(
        'error',
        expect.any(Function),
      )
      expect(mongoose.connection.on).toHaveBeenCalledWith(
        'disconnected',
        expect.any(Function),
      )
      expect(mongoose.connection.on).toHaveBeenCalledWith(
        'reconnected',
        expect.any(Function),
      )
      expect(mongoose.connection.on).toHaveBeenCalledWith(
        'disconnecting',
        expect.any(Function),
      )
      expect(mongoose.connection.on).toHaveBeenCalledWith(
        'close',
        expect.any(Function),
      )
    })
  })

  describe('check connection', () => {
    it('should return false', async () => {
      const result = await fakeMongoose.checkConnection()
      expect(result).toBe(false)
    })
    it('should return true if connected and ping success', async () => {
      mockContext.readyState = 1
      const result = await fakeMongoose.checkConnection()
      await expect(mongoose.connection.db?.admin().ping()).resolves.toEqual({
        ok: 1,
      })
      expect(result).toBe(true)
    })
    it('should return false if ping fails', async () => {
      mockContext.readyState = 1
      mockContext.ping.mockRejectedValue(new Error())
      const result = await fakeMongoose.checkConnection()
      await expect(mongoose.connection.db?.admin().ping()).rejects.toThrow()
      expect(result).toBe(false)
    })
  })
})
