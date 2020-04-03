const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
	User.find({})
		.then((users) => res.send({ data: users }))
		.catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
	const { id } = req.body;
	User.findOne({ ObjectId: id })
		.then((user) => res.send({ data: user }))
		.catch(() => res.status(404).send({ message: 'Пользователь не найден' }));
};

module.exports.createUser = (req, res) => {
	const {
		name, about, avatar, email,
	} = req.body;
	bcrypt.hash(req.body.password, 10)
		.then((hash) => User.create({
			name, about, avatar, email, password: hash,
		}))
		.then((user) => res.send({ data: user }))
		.catch((err) => {
			if (err.name === 'ValidationError') {
				res.status(400).send({ message: `Введенные данные некорректны: ${err.message}` });
			} else if (err.message.includes('E11000 duplicate key error')) {
				res.status(500).send({ message: 'Пользователь с таким имейлом уже зарегистрирован' });
			} else {
				res.status(500).send({ message: err.message });
			}
		});
};
