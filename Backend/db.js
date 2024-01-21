const { MongoClient } = require('mongodb')

let dbConnection;

module.exports = { 
	connectToDb: (cb) => {
		//MongoClient.connect('mongodb://0.0.0.0:27017/myDB')
		MongoClient.connect('mongodb://localhost:27017/dbeveryday')	
		.then((client)=> {
			dbConnection = client.db()
			return cb()
		})
		.catch(err => {
			console.log(err);
			return cb(err);
		})
	},
	getDb: () => dbConnection
}