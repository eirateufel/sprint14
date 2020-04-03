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
	const { name, about, avatar } = req.body;

	User.create({ name, about, avatar })
		.then((user) => res.send({ data: user }))
		.catch((err) => {
			if (err.name === 'ValidationError') {
				res.status(400).send({ message: `Введенные данные некорректны: ${err.message}` });
			} else {
				res.status(500).send({ message: err });
			}
		});
};
