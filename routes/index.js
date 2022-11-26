const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../middlewares/validators');
const NotFoundError = require('../errors/not-found-err');

// роуты, не требующие авторизации
router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
// авторизация
router.use(auth);
// роуты, которым авторизация нужна
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
