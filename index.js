var express = require('express');
//var mysql = require('mysql');
var bodyParseer = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParseer.json());
app.use(bodyParseer.urlencoded({extended:false}));


// Set Static Path
app.use('/', express.static(__dirname));
app.use(require('./api/user_api'));

app.listen(port);


//app.post('/registerUser',(req,res)=>{
//    
//    var newuser = req.body;
//    console.log("service saveuserinfo called");
//    console.log(newuser);
//     var sql = "INSERT INTO user_register(first_name,user_email,user_name,user_password) VALUES ('"+newuser.UserInfo.fname+"','"+newuser.UserInfo.email+"','"+newuser.UserInfo.username+"','"+newuser.UserInfo.password+"') ";
//    
//con.query(sql,(err,res,result)=>{
//    if(err) throw err;
//    console.log('1 record inserted');
//    
//    
//  });
//    
//    
//})
    


