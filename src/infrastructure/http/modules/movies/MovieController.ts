import { inject, injectable } from 'tsyringe'

import AddMovie from '@app/use-cases/movies/AddMovie.js'
import DeleteMovie from '@app/use-cases/movies/DeleteMovie.js'
import GetUserMovies from '@app/use-cases/movies/GetUserMovies.js'
import UnauthorizedError from '@domain/errors/UnauthorizedError.js'
import HttpStatusCode from '@infrastructure/constants/https-status-code.js'

import type {
  TAddMovieHandler,
  TDeleteMovieHandler,
  TGetMoviesHandler,
} from './types.js'

@injectable()
export default class MovieController {
  constructor(
    @inject('GetUserMovies') private readonly getUserSavedMovies: GetUserMovies,
    @inject('AddMovie') private readonly addMovie: AddMovie,
    @inject('DeleteMovie') private readonly deleteMovie: DeleteMovie,
  ) {}

  getUserMovies: TGetMoviesHandler = async (req, res) => {
    const id = req.user?.id
    if (!id) throw new UnauthorizedError()
    const movies = await this.getUserSavedMovies.execute(id)
    res.status(HttpStatusCode.Ok).send(movies)
  }

  saveMovie: TAddMovieHandler = async (req, res) => {
    const id = req.user?.id
    if (!id) throw new UnauthorizedError()
    const movieData = req.body
    const movie = await this.addMovie.execute({ ...movieData, owner: id })
    res.status(HttpStatusCode.Ok).send(movie)
  }

  deleteMovieByCredentials: TDeleteMovieHandler = async (req, res) => {
    const { movieId } = req.params
    const id = req.user?.id
    if (!id) throw new UnauthorizedError()
    const movie = await this.deleteMovie.execute({ movieId, userId: id })
    res.status(HttpStatusCode.Ok).send(movie)
  }
}
