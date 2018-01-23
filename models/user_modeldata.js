var mysql = require('mysql');

var connection = mysql.createConnection({
   host:'localhost',
   user:'id1778508_root',
   pass:'',
   database:'id1778508_my_portfolio'  
});

connection.connect((err)=> {
    if(err) throw err;
	console.log("Database connected");
});

module.exports.registerUser = function(data, callback) {
	connection.query("INSERT INTO user_register SET ?", data, callback);
}

module.exports.FetchAllUsers = function(callback) {
	connection.query("SELECT * FROM user_register", callback);
}

module.exports.userActive = function(data, callback) {
//    console.log("UPDATE user_register SET user_active = '"+data.user_active+"' WHERE user_token = '"+data.user_token+"'");
	connection.query("UPDATE user_register SET user_active = '"+data.user_active+"' WHERE user_token = '"+data.user_token+"'", callback);
}

module.exports.Useraccess = function(data, callback) {
//	connection.query("SELECT * FROM user_register WHERE ?", data, callback);
	connection.query("SELECT * FROM user_register WHERE user_name = '"+data.user_name+"' && user_password = '"+data.user_password+"' && user_active = '"+data.user_active+"'", callback);
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
