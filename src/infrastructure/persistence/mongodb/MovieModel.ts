import mongoose, { model, Types } from 'mongoose'

import type { HydratedDocument, InferSchemaType } from 'mongoose'

const movieSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
})

type TDbMovie = InferSchemaType<typeof movieSchema>

export type TMovieDocument = HydratedDocument<TDbMovie>

const MovieModel = model<TDbMovie>('Movie', movieSchema)

export type TMovieModel = typeof MovieModel

export default MovieModel
