const mysql = require('mysql');

const conn = mysql.createConnection({
    // host: "localhost",
    // user: "parkingrapid_rapidmoveDB",
    // password: "Server@786",
    // database: "parkingrapid_rapidmoveDB",
    host: "us-cdbr-east-05.cleardb.net",
    user: "b7432d80d63e61",
    password: "e70ae397",
    database: "heroku_3e7b53fcd8b9375",
   });
   
   

   conn.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected !!:)');
    }
  });  

module.exports = conn;