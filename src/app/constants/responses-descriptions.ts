export const movieResponseDescription = {
  countryDescription: 'Country where the movie was produced',
  countryExample: 'USA',

  directorDescription: 'Name of the movie director',
  directorExample: 'Christopher Nolan',

  durationDescription: 'Movie duration in minutes',
  durationExample: 148,

  yearDescription: 'Release year of the movie',
  yearExample: '2010',

  descriptionDescription: 'Synopsis or plot summary of the movie',
  descriptionExample:
    'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',

  imageDescription: 'URL path to the main movie poster or image',
  imageExample: 'https://api.nomoreparties.co/uploads/inception_poster.jpeg',

  trailerDescription: 'URL link to the official movie trailer',
  trailerExample: 'https://www.youtube.com/watch?v=YoHD9XEInc0',

  thumbnailDescription: 'URL path to the small preview thumbnail image',
  thumbnailExample:
    'https://api.nomoreparties.co/uploads/thumbnails/inception_small.jpeg',

  ownerDescription:
    'MongoDB ObjectId of the user who added the movie to their collection',
  ownerExample: '65cb3d4f1a2b3c4d5e6f7a8b',

  movieIdDescription:
    'Unique identifier of the movie from the external movies API',
  movieIdExample: 12345,

  nameRUDescription: 'Title of the movie in Russian',
  nameRUExample: 'Начало',

  nameENDescription: 'Title of the movie in English',
  nameENExample: 'Inception',
}

export const authResponseDescription = {
  idDescription: 'Unique identifier of the authenticated user',
  idExample: '65cb3d4f1a2b3c4d5e6f7a8b',
  emailDescription: 'Verified email address associated with the account',
  emailExample: 'john@example.com',
  nameDescription: 'Name of the user',
  nameExample: 'John',
}
