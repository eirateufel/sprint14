const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();
const path = require('path');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

mongoose.connect('mongodb://localhost:27017/mestodb', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
})
	.then(() => console.log('Соединение с базой данных установлено'))
	.catch((err) => console.log(err.message));

app.use((req, res, next) => {
	req.user = {
		_id: '5e80f03e42ed865048e4e58a',
	};

	next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/', cardsRouter);
app.use('/', usersRouter);

app.listen(PORT, () => {
	// console.log('Im running');
});
