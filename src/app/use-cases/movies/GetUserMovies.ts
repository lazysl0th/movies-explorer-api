import { inject, injectable } from 'tsyringe'

import type { TGetMoviesRepository } from '@app/interfaces/repositories/IMovieRepository.js'
import type Movie from '@domain/entities/Movies.js'

@injectable()
export default class GetUserMovies {
  constructor(
    @inject('MovieRepository')
    private readonly getMoviesRepository: TGetMoviesRepository,
  ) {}

  async execute(userId: string): Promise<Movie[]> {
    const movies = await this.getMoviesRepository.getAll(userId)
    return movies
  }
}
