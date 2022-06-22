const mysql = require('mysql');

const conn = mysql.createConnection({
    // host: "localhost",
    // user: "parkingrapid_rapidmoveDB",
    // password: "Server@786",
    // database: "parkingrapid_rapidmoveDB",
    host: "us-cdbr-east-05.cleardb.net",
    user: "b1db846b652ca4",
    password: "7311b9fe",
    database: "heroku_76a113fe11817a7",
   });
   
  //  mysql://b1db846b652ca4:7311b9fe@us-cdbr-east-05.cleardb.net/heroku_76a113fe11817a7?reconnect=true

   conn.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected !!:)');
    }
  });  

module.exports = conn;