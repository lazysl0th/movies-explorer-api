import ForbiddenError from '@domain/errors/ForbiddenError.js'
import NotFoundError from '@domain/errors/NotFoundError.js'

import type {
  IDeleteCredentials,
  TDeleteMovieRepository,
} from '@app/interfaces/repositories/IMovieRepository.js'
import type Movie from '@domain/entities/Movies.js'

export default class DeleteMovie {
  constructor(private readonly deleteMovieRepository: TDeleteMovieRepository) {}

  async execute({ movieId, userId }: IDeleteCredentials): Promise<Movie> {
    const movie = await this.deleteMovieRepository.getById(movieId)
    if (!movie) throw new NotFoundError('Movie')
    if (!movie.isOwnedBy(userId)) throw new ForbiddenError()
    await this.deleteMovieRepository.delete(movieId)
    return movie
  }
}
