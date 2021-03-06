var r = require('request').defaults({
	json: true
});

var async = require('async');
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

module.exports = function(app) {

	/* Read */
	app.get('/pets', function (req, res) {

		async.parallel({
			pig: function(callback){
				client.get('http://localhost:3000/pig', function(error, pig){
					if (error) {throw error;};
					if (pig) {
						callback(null, JSON.parse(pig));
					} else {
						r({uri: 'http://localhost:3000/pig'}, function(error, response, body) {
							if (error) {
								callback({service: 'pig', error: error});
								return;
							};
							if (!error && response.statusCode === 200) {
								callback(null, body.data);
								//client.set('http://localhost:3000/pig', JSON.stringify(body.data), function (error) {
								client.setex('http://localhost:3000/pig', 10, JSON.stringify(body.data), function (error){
									if (error) {throw error;};
								});
							} else {
								res.send(response.statusCode);
							}
						});
					}
				});
			},
			duck: function(callback){
				client.get('http://localhost:3001/duck', function(error, duck){
					if (error) {throw error;};
					if (duck) {
						callback(null, JSON.parse(duck));
					} else {
						r({uri: 'http://localhost:3001/duck'}, function(error, response, body) {
							if (error) {
								callback({service: 'duck', error: error});
								return;
							};
							if (!error && response.statusCode === 200) {
								callback(null, body.data);
								//client.set('http://localhost:3001/duck', JSON.stringify(body.data), function (error) {
								client.setex('http://localhost:3001/duck', 10, JSON.stringify(body.data), function (error){
									if (error) {throw error;};
								});
							} else {
								res.send(response.statusCode);
							}
						});
					}
				});
			}
		},
		function(error, results) {
			res.json({
				error: error,
				results: results
			});
		});
	});

	app.get('/ping', function(req, res) {
		res.json({pong: Date.now()});
	});

};
