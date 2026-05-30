import HttpStatusCode from '@infrastructure/constants/https-status-code.js'

import type AddMovie from '@app/use-cases/movies/AddMovie.js'
import type GetUserMovies from '@app/use-cases/movies/GetUserMovies.js'

import type { TAddMovieHandler, TGetMoviesHandler } from './types.js'

export default class MovieController {
  constructor(
    private readonly getUserSavedMovies: GetUserMovies,
    private readonly addMovie: AddMovie,
  ) {}

  getUserMovies: TGetMoviesHandler = async (req, res) => {
    const { id } = req.user
    const movies = await this.getUserSavedMovies.execute(id)
    res.status(HttpStatusCode.Ok).send(movies)
  }

  saveMovie: TAddMovieHandler = async (req, res) => {
    const { id } = req.user
    const movieData = req.body
    const movie = await this.addMovie.execute({ ...movieData, owner: id })
    res.status(HttpStatusCode.Ok).send(movie)
  }
}
