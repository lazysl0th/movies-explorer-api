import Movie from '@domain/entities/Movies.js'

import type { TAddMovieDto } from '@app/dtos/MovieDto.js'
import type { TCreateMovieRepository } from '@app/interfaces/repositories/IMovieRepository.js'

export default class AddMovie {
  constructor(private readonly createMovieRepository: TCreateMovieRepository) {}

  async execute(movieData: TAddMovieDto): Promise<Movie> {
    const id = this.createMovieRepository.generateId()
    const movie = new Movie({ ...movieData, id })
    return this.createMovieRepository.create(movie)
  }
}
