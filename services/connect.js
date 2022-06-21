const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "parkingrapid_rapidmoveDB",
    password: "Server@786",
    database: "parkingrapid_rapidmoveDB",
   });
   
   conn.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected !!:)');
    }
  });  

module.exports = conn;