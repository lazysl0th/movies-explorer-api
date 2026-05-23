const response = {
  OK: {
    statusCode: 200,
  },
  CREATED: {
    statusCode: 201,
  },
  BAD_REQUEST: {
    statusCode: 400,
    text: 'Переданы некорректные данные',
  },
  UNAUTHORIZED: {
    statusCode: 401,
    text: 'Необходима авторизация',
  },
  FORBIDDEN: {
    statusCode: 403,
    text: 'Доступ запрещен',
  },
  NOT_FOUND: {
    statusCode: 404,
    text: 'Ничего не найдено',
  },
  CONFLICT: {
    statusCode: 409,
    text: 'Пользователь с таким email уже существует',
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    text: 'На сервере произошла ошибка',
  },
}

export default response
