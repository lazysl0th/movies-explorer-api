import type { TGetMoviesRepository } from '@app/interfaces/repositories/IMovieRepository.js'
import type Movie from '@domain/entities/Movies.js'

export default class GetUserMovies {
  constructor(private readonly getMoviesRepository: TGetMoviesRepository) {}

  async execute(userId: string): Promise<Movie[]> {
    const movies = await this.getMoviesRepository.getAll(userId)
    return movies
  }
}
