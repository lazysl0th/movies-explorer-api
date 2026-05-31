import { inject, injectable } from 'tsyringe'

import type {
  IDBModule,
  IDBService,
  TCheckConnectionsResult,
} from '../../app/interfaces/services/IDBService.js'

@injectable()
export default class Database implements IDBModule {
  constructor(
    @inject('MongooseService') private readonly mongoose: IDBService,
  ) {}

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
