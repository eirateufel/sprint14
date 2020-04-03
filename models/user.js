const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 2,
		maxlength: 30,
		required: true,
	},
	about: {
		type: String,
		minlength: 2,
		maxlength: 30,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
		validate: {
			validator(v) {
				const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
				return urlRegex.test(v);
			},
			message: (props) => `${props.value} is not a valid url!`,
		},
	},
});

module.exports = mongoose.model('user', userSchema);
