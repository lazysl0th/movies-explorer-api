import type { IncomingMessage, ServerResponse } from 'node:http'

import type { Express } from 'express'

export interface IApp {
  express: Express
  start: (port: number) => Promise<void>
  stop: () => Promise<void>
  healthCheck: () => boolean
  // readyCheck(): Promise<{ db: boolean; redis: boolean }>; // раскомментируешь потом
}

export type TTerminusApp = Pick<IApp, 'stop' | 'healthCheck'>
