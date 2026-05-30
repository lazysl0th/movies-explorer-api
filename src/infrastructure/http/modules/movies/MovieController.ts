import HttpStatusCode from '@infrastructure/constants/https-status-code.js'

import type GetUserMovies from '@app/use-cases/movies/GetUserMovies.js'

import type { TGetMoviesHandler } from './types.js'

export default class MovieController {
  constructor(private readonly getUserSavedMovies: GetUserMovies) {}

  getUserMovies: TGetMoviesHandler = async (req, res) => {
    const { id } = req.user
    const movies = await this.getUserSavedMovies.execute(id)
    // console.log(movies)
    res.status(HttpStatusCode.Ok).send(movies)
  }
}
