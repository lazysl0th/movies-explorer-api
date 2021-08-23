const router = require('express').Router();
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFound');
const { NOT_FOUND } = require('../constant');
const { signinValidation, signupValidationd } = require('../middlewares/validation');

router.post('/signin', signinValidation, login);

router.post('/signup', signupValidationd, createUser);

router.get('/signout', logout);

router.use(auth);

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

router.get('/*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND.text));
});

module.exports = router;
