import { beforeEach, describe, expect, it, vi } from 'vitest'

import Database from '@infrastructure/persistence/database.module.js'

import type { Mocked } from 'vitest'

import type {
  IDBModule,
  IDBService,
  TCheckConnectionsResult,
} from '@app/interfaces/services/IDBService.js'

describe('chech DB module', () => {
  let fakeIDBService: Mocked<IDBService>
  let dbModule: IDBModule
  let fakeCheckConnectionsResult: TCheckConnectionsResult

  beforeEach(() => {
    fakeCheckConnectionsResult = { Mongoose: true }
    fakeIDBService = {
      serviceName: 'Mongoose',
      connect: vi.fn().mockResolvedValue(undefined),
      checkConnection: vi.fn().mockResolvedValue(true),
      disconnect: vi.fn().mockResolvedValue(undefined),
    }
    dbModule = new Database(fakeIDBService)
    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('check connects', () => {
    it('should call fakeIDBService.connect() when call dbModule.connects', async () => {
      await expect(dbModule.connects()).resolves.not.toThrow()
      expect(fakeIDBService.connect).toHaveBeenCalledTimes(1)
    })
  })

  describe('check connections', () => {
    it('should return true fakeCheckConnectionsResult', async () => {
      await expect(dbModule.checkConnections()).resolves.toStrictEqual(
        fakeCheckConnectionsResult,
      )
      expect(fakeIDBService.checkConnection).toHaveBeenCalledTimes(1)
    })
    it('should return false fakeCheckConnectionsResult', async () => {
      fakeCheckConnectionsResult = { Mongoose: false }
      fakeIDBService.checkConnection.mockResolvedValue(false)
      await expect(dbModule.checkConnections()).resolves.toStrictEqual(
        fakeCheckConnectionsResult,
      )
      expect(fakeIDBService.checkConnection).toHaveBeenCalledTimes(1)
    })
  })

  describe('check disconnects', () => {
    it('should call fakeIDBService.disconnect() when call dbModule.disconnects', async () => {
      await expect(dbModule.disconnects()).resolves.not.toThrow()
      expect(fakeIDBService.disconnect).toHaveBeenCalledTimes(1)
    })
  })
})
