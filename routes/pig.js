var _ = require('lodash');
var Pig = require('../models/pig.js');

module.exports = function(app) {

	/* Create */
	app.post('/pig', function (req, res) {
		var newPig = new Pig(req.body);
		newPig.save(function(err) {
			if (err) {
				res.json({info: 'error during pig create', error: err});
			};
			res.json({info: 'pig created successfully'});
		});
	});

	/* Read */
	app.get('/pig', function (req, res) {
		Pig.find(function(err, pigs) {
			if (err) {
				res.json({info: 'error during find pigs', error: err});
			};
			res.json({info: 'pigs found successfully', data: pigs});
		});
	});

	app.get('/pig/:id', function (req, res){
		Pig.findById(req.params.id, function(err, pig) {
			if (err) {
				res.json({info: 'error during find pig', error: err});
			};
			if (pig) {
				res.json({info: 'pig found successfully', data: pig});
			// 	setTimeout(function(){
			// 	res.json({info: 'ducks found successfully', data: pig});
			// }, 10000);
			} else {
				res.json({info: 'pig not found'});
			}
		});
	})

	/* Update */
	app.put('/pig/:id', function (req, res) {
		Pig.findById(req.params.id, function(err, pig) {
			if (err) {
				res.json({info: 'error during find pig', error: err});
			};
			if (pig) {
				_.merge(pig, req.body);
				pig.save(function(err) {
					if (err) {
						res.json({info: 'error druing pig update', error: err});
					};
					res.json({info: 'pig updated successfully'});
				});
			} else {
				res.json({info: 'pig not found'});
			}
		});	
	});

	/* Delete */
	app.delete('/pig/:id', function (req, res) {
		Pig.findByIdAndRemove(req.params.id, function(err) {
			if (err) {
				res.json({info: 'error during remove pig', error: err});
			};
			res.json({info: 'pig removed successfully'});
		});
	});
}