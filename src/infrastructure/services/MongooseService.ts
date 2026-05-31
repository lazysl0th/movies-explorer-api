import mongoose from 'mongoose'
import { inject, injectable } from 'tsyringe'

import DB_LOGS from '@infrastructure/constants/db-logs.constants.js'

import type { TMogooseServiceConfig } from '@infrastructure/config/env.config.js'

import type {
  IDBService,
  TDBServiceName,
} from '../../app/interfaces/services/IDBService.js'

@injectable()
export default class MongooseService implements IDBService {
  public readonly serviceName: TDBServiceName = 'Mongoose'

  private readonly mongooseConnection = mongoose.connection

  constructor(
    @inject('Config') private readonly config: TMogooseServiceConfig,
  ) {}

  private registered = false

  public async connect(): Promise<void> {
    this.registerEvents()
    await mongoose.connect(this.config.MONGODB_URI)
  }

  public async checkConnection(): Promise<boolean> {
    const connected: typeof this.mongooseConnection.readyState = 1
    if (this.mongooseConnection.readyState !== connected) return false
    try {
      await this.mongooseConnection.db?.admin().ping()
      return true
    } catch {
      return false
    }
  }

  private registerEvents(): void {
    if (this.registered) return
    this.registered = true
    this.mongooseConnection.on('connecting', () => {
      console.log(DB_LOGS.CONNECTING(this.serviceName))
    })

    this.mongooseConnection.on('connected', () => {
      console.log(DB_LOGS.CONNECTED(this.serviceName))
    })

    this.mongooseConnection.on('open', () => {
      console.log(DB_LOGS.OPEN(this.serviceName))
    })

    this.mongooseConnection.on('error', (err) => {
      console.error(DB_LOGS.ERROR(err, this.serviceName))
    })

    this.mongooseConnection.on('disconnected', () => {
      console.warn(DB_LOGS.DISCONNECTED(this.serviceName))
    })

    this.mongooseConnection.on('reconnected', () => {
      console.log(DB_LOGS.RECONNECTED(this.serviceName))
    })

    this.mongooseConnection.on('disconnecting', () => {
      console.log(DB_LOGS.DISCONNECTING(this.serviceName))
    })

    this.mongooseConnection.on('close', () => {
      console.log(DB_LOGS.CLOSE(this.serviceName))
    })
  }

  public async disconnect(): Promise<void> {
    await this.mongooseConnection.close()
  }
}
