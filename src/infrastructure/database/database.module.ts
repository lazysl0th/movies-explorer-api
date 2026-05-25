import type {
  IDBModule,
  IDBService,
  TCheckConnectionsResult,
} from '../../shared/base/db.base.js'

export default class Database implements IDBModule {
  constructor(private readonly mongoose: IDBService) {}

  public async connects(): Promise<void> {
    await this.mongoose.connect()
  }

  public async checkConnections(): Promise<TCheckConnectionsResult> {
    const mongooseState = await this.mongoose.checkConnection()
    return {
      [this.mongoose.serviceName]: mongooseState,
    }
  }

  public async disconnects(): Promise<void> {
    await this.mongoose.disconnect()
  }
}
