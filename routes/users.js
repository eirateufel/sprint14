const usersRouter = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/users');

usersRouter.get('/users/:id', getUser);

usersRouter.get('/users', getUsers);

usersRouter.post('/users', createUser);

usersRouter.get('/:nonexistent', (req, res) => {
	res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = usersRouter;
