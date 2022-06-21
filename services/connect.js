const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "sql206.epizy.com",
    user: "epiz_32003202",
    password: "Z7MDmbL6yQR",
    database: "epiz_32003202_rapidmoveDB",
   });
   
   conn.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected !!:)');
    }
  });  

module.exports = conn;