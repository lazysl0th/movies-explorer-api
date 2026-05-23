import type { Express } from 'express'

export interface IApp {
  start: (port: number) => Promise<void>
}
