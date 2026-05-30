import type User from './User.js'

interface IMovieData {
  id: string
  country: string
  director: string
  duration: number
  year: string
  description: string
  image: string
  trailer: string
  thumbnail: string
  owner: string
  movieId: number
  nameRU: string
  nameEN: string
}

export default class Movie {
  public readonly id: string

  public readonly country: string

  public readonly director: string

  public readonly duration: number

  public readonly year: string

  public readonly description: string

  public readonly image: string

  public readonly trailer: string

  public readonly thumbnail: string

  public readonly owner: string

  public readonly movieId: number

  public readonly nameRU: string

  public readonly nameEN: string

  constructor({
    id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  }: IMovieData) {
    this.id = id
    this.country = country
    this.director = director
    this.duration = duration
    this.year = year
    this.description = description
    this.image = image
    this.trailer = trailer
    this.thumbnail = thumbnail
    this.owner = owner
    this.movieId = movieId
    this.nameRU = nameRU
    this.nameEN = nameEN
  }

  public toJSON() {
    return {
      _id: this.id,
      country: this.country,
      director: this.director,
      duration: this.duration,
      year: this.year,
      description: this.description,
      image: this.image,
      trailer: this.trailer,
      thumbnail: this.thumbnail,
      owner: this.owner,
      movieId: this.movieId,
      nameRU: this.nameRU,
      nameEN: this.nameEN,
    }
  }
}
