var mongoose = require('mongoose');

var pigSchema = mongoose.Schema({

	name: String,
	age: Number,
	type: String

});

module.exports = mongoose.model('Pig', pigSchema);
