export type TDBServiceName = 'Mongoose'

export type TCheckConnectionsResult = Record<TDBServiceName, boolean>
export interface IDBModule {
  connects: () => Promise<void>
  checkConnections: () => Promise<TCheckConnectionsResult>
  disconnects: () => Promise<void>
}

export interface IDBService {
  serviceName: TDBServiceName
  connect: () => Promise<void>
  checkConnection: () => Promise<boolean>
  disconnect: () => Promise<void>
}
