import { beforeEach, describe, expect, it, vi } from 'vitest'

import GetUserMovies from '@app/use-cases/movies/GetUserMovies.js' // скорректируйте путь, если он отличается
import Movie from '@domain/entities/Movies.js'

import type { Mocked } from 'vitest'

import type { TGetMoviesRepository } from '@app/interfaces/repositories/IMovieRepository.js'

describe('GetUserMovies Use Case', () => {
  let mockRepository: Mocked<TGetMoviesRepository>
  let getUserMovies: GetUserMovies

  const fakeUserId = 'user-uuid-1234'

  const fakeMoviesData = [
    {
      id: 'mocked-uuid-1',
      nameRU: 'Матрица',
      nameEN: 'The Matrix',
      description: 'A computer hacker learns from mysterious...',
      director: 'Lana Wachowski',
      duration: 136,
      year: '1999',
      country: 'USA',
      image: 'https://example.com/image.jpg',
      thumbnail: 'https://example.com/thumb.jpg',
      trailer: 'https://example.com/trailer',
      owner: fakeUserId,
      movieId: 1,
    },
    {
      id: 'mocked-uuid-2',
      nameRU: 'Интерстеллар',
      nameEN: 'Interstellar',
      description: 'A team of explorers travel through a wormhole...',
      director: 'Christopher Nolan',
      duration: 169,
      year: '2014',
      country: 'USA',
      image: 'https://example.com/image.jpg',
      thumbnail: 'https://example.com/thumb.jpg',
      trailer: 'https://example.com/trailer',
      owner: fakeUserId,
      movieId: 2,
    },
  ]

  const fakeMovies = fakeMoviesData.map((data) => new Movie(data))

  beforeEach(() => {
    mockRepository = {
      getAll: vi.fn().mockResolvedValue(fakeMovies),
    }

    getUserMovies = new GetUserMovies(mockRepository)
  })

  it('should successfully fetch all movies for a given userId from the repository', async () => {
    const result = await getUserMovies.execute(fakeUserId)
    expect(mockRepository.getAll).toHaveBeenCalledTimes(1)
    expect(mockRepository.getAll).toHaveBeenCalledWith(fakeUserId)
    expect(result).toEqual(fakeMovies)
    expect(result).toHaveLength(2)
  })
})
