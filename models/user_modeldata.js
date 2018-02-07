// var mysql = require('mysql');

// var url = "mongodb://sunil:sunil1234@ds121238.mlab.com:21238/my_portfolio";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("my_portfolio");
//   var myobj = { name: "Company Inc", address: "Highway 37" };
//   dbo.collection("user_register").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });


var MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://sunil:sunil1234@ds121238.mlab.com:21238/my_portfolio', (err, database) =>{
	if(err) throw err;
	dob = database.db('my_portfolio');
	console.log("connected with mongodb");
});

// connection.connect((err)=> {
//     if(err) throw err;
// 	console.log("Database connected");
// });

module.exports.registerUser = function(data, callback) {
	// connection.query("INSERT INTO user_register SET ?", data, callback);
	dob.collection('user_register').insertOne(data, callback);
}

module.exports.FetchAllUsers = function(callback) {
	// connection.query("SELECT * FROM user_register", callback);
	dob.collection('user_register').find().toArray(callback);
}

module.exports.userActive = function(data, callback) {
//    console.log("UPDATE user_register SET user_active = '"+data.user_active+"' WHERE user_token = '"+data.user_token+"'");
	// connection.query("UPDATE user_register SET user_active = '"+data.user_active+"' WHERE user_token = '"+data.user_token+"'", callback);
	var myquery = { user_token:data.user_token};
	var newvalues = { $set: {user_active:data.user_active} };
	
	dob.collection('user_register').updateOne(myquery, newvalues, callback);
}

module.exports.Useraccess = function(data, callback) {
//	connection.query("SELECT * FROM user_register WHERE ?", data, callback);
	// connection.query("SELECT * FROM user_register WHERE user_name = '"+data.user_name+"' && user_password = '"+data.user_password+"' && user_active = '"+data.user_active+"'", callback);
	var myquery = { user_name:data.user_name, user_password:data.user_password, user_active:data.user_active};
	
	dob.collection('user_register').find(myquery).toArray(callback);
}



//module.exports.encrypt = function(data, callback) {
//	bcrypt.genSalt(10, function(err, salt) {
//		bcrypt.hash(data.password, salt, callback);
//	})
//}



module.exports.sendResponse = function(success, res) {
	if(success) {
		res.send({'success': 'true'});
	} else {
		res.send({'success': 'false'});
	}
}
