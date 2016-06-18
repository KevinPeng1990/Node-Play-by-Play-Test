var _ = require('lodash');
var Duck = require('../models/duck.js');

module.exports = function(app) {

	/* Create */
	app.post('/duck', function (req, res) {
		var newDuck = new Duck(req.body);
		newDuck.save(function(err) {
			if (err) {
				res.json({info: 'error during duck create', error: err});
			};
			res.json({info: 'duck created successfully'});
		});
	});

	/* Read */
	app.get('/duck', function (req, res) {
		Duck.find(function(err, ducks) {
			if (err) {
				res.json({info: 'error during find ducks', error: err});
			};
			res.json({info: 'ducks found successfully', data: ducks});
			// setTimeout(function(){
			// 	res.json({info: 'ducks found successfully', data: ducks});
			// }, 10000);
		});
	});

	app.get('/duck/:id', function (req, res){
		Duck.findById(req.params.id, function(err, duck) {
			if (err) {
				res.json({info: 'error during find duck', error: err});
			};
			if (duck) {
				res.json({info: 'duck found successfully', data: duck});
			} else {
				res.json({info: 'duck not found'});
			}
		});
	})

	/* Update */
	app.put('/duck/:id', function (req, res) {
		Duck.findById(req.params.id, function(err, duck) {
			if (err) {
				res.json({info: 'error during find duck', error: err});
			};
			if (duck) {
				_.merge(duck, req.body);
				duck.save(function(err) {
					if (err) {
						res.json({info: 'error druing duck update', error: err});
					};
					res.json({info: 'duck updated successfully'});
				});
			} else {
				res.json({info: 'duck not found'});
			}
		});	
	});

	/* Delete */
	app.delete('/duck/:id', function (req, res) {
		Duck.findByIdAndRemove(req.params.id, function(err) {
			if (err) {
				res.json({info: 'error during remove duck', error: err});
			};
			res.json({info: 'duck removed successfully'});
		});
	});
}