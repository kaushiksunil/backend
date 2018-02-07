var express = require('express');
var hat = require('hat');
var encript = require('md5');

var app = express();

var user = require('../models/user_modeldata');



app.post('/registerUser', function (req, res) {
    var expendData = req.body;
    var data = expendData.UserInfo;
    var userToken = hat();
    var haspass = encript(data.password);
 
        data = {
                first_name: data.fname,
                user_token: userToken,
                user_email: data.email,
                user_name: data.username,
                user_password: haspass
                };
        user.registerUser(data, function (err, info) {
            if (err) throw err;
        res.json(data);
        console.log("one recorded")
        res.end();
//      user.sendResponse(true, res);
//      console.log(res);
        });
    });

app.post('/userActive', (req, res)=>{
    var registerUserInfo = req.body.user_token;
   console.log(registerUserInfo);
    var data ={
        user_token: registerUserInfo,
        user_active: 1
    }
//    console.log(data);
    user.userActive(data, (err, results)=>{
        if(err) throw err;
//         console.log('user_token',results);
        var resultsBool = (results.affectedRows > 0) ? true : false;
        user.sendResponse(true, res);
       
    });
    
});

app.post('/fetchAllUsers', (req, res)=>{
    
//    user.FetchUsers((err, rows, fields)=>{
    user.FetchAllUsers((err, result)=>{
        if(err) throw err;
//        console.log(result);
        res.json(result);
         res.end();
//        data ={'user':'sunil kaushik'};
//        res.send(data);
        
    });
    
});

app.post('/LoginUser', (req, res) => {
    var userLoginInfo = req.body;
    var data = userLoginInfo.loginuser;
    var userpass = encript(data.password);
    var useractive = 1;
    data = {
        user_name: data.username,
        user_password: userpass,
        user_active: useractive
    };
//        console.log(data);
    user.Useraccess(data, (err, results) => {
        if (err) throw err;
        res.json(results);
         res.end();
//        var resultsBool = (results.length > 0) ? true : false;
//        user.sendResponse(resultsBool, res, results);
    });
});




module.exports = app;