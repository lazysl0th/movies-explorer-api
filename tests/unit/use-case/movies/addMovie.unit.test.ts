import { beforeEach, describe, expect, it, vi } from 'vitest'

import AddMovie from '@app/use-cases/movies/AddMovie.js'
import Movie from '@domain/entities/Movies.js'

import type { Mocked } from 'vitest'

import type { TAddMovieDto } from '@app/dtos/MovieDto.js'
import type { TCreateMovieRepository } from '@app/interfaces/repositories/IMovieRepository.js'

describe('AddMovie Use Case', () => {
  let mockRepository: Mocked<TCreateMovieRepository>
  let addMovie: AddMovie

  const fakeMovieId = 'mocked-uuid-1234'

  const fakeMovieData: TAddMovieDto = {
    nameRU: 'The Matrix',
    nameEN: 'The Matrix',
    description: 'A computer hacker learns from mysterious...',
    director: 'Lana Wachowski',
    duration: 136,
    year: '1999',
    country: 'USA',
    image:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    thumbnail:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    trailer: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
    owner: '1',
    movieId: 1,
  }

  const fakeMovie = new Movie({ ...fakeMovieData, id: fakeMovieId })

  beforeEach(() => {
    mockRepository = {
      generateId: vi.fn().mockReturnValue(fakeMovieId),
      create: vi.fn().mockResolvedValue(fakeMovie),
    }

    addMovie = new AddMovie(mockRepository)
  })

  it('shold successfully create a movie, generate an ID, and save it to the repository', async () => {
    const result = await addMovie.execute(fakeMovieData)
    expect(mockRepository.generateId).toHaveBeenCalledTimes(1)
    expect(mockRepository.create).toHaveBeenCalledTimes(1)
    expect(mockRepository.create).toHaveBeenCalledWith(expect.any(Movie))
    expect(result).toEqual(
      expect.objectContaining({ ...fakeMovieData, id: fakeMovieId }),
    )
  })
})
