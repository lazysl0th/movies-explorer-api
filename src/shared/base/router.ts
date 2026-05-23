import type { RequestHandler } from 'express'

export interface IRouter {
  requestHandler: RequestHandler
}
