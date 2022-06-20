const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const dotenv =require('dotenv');

const conn = require("./services/connect");
const bodyParser = require('body-parser');



const info = require('./apis/gatewayApi');
// const permitApi = require('./apis/permitApi');

dotenv.config({path : './config.env' });
const PORT = process.env.PORT || 7000;

const app = express();


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));

app.use(express.static(path.join(__dirname + "/public")));


// admin login
app.post('/login', function(req, resp) {
	// Capture the input fields
	let email = req.body.email;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		conn.query('SELECT * FROM adminLG WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results) {
				// Authenticate the user
				// req.session.loggedin = true;
				// req.session.username = username;
				// Redirect to home page
				resp.send('Login Successfully!');
			} else {
				resp.send('Incorrect Username and/or Password!');
			}			
			resp.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


// user permit data
app.post('/permit', (req, resp)=> {
	console.log("backend" + JSON.stringify(req.body));
	const { name , contact,  officeNo, empType, vehicleType, regisNo, permit, slotNo, totalAmt } = req.body;
	conn.query(
		`INSERT INTO rm_permit_db (name, contact, office_no, employe_type, vehicle_type, registration_no, permit, slot_no, total_amt ) VALUES(?,?,?,?,?,?,?,?,?)`,
		[  name , contact,  officeNo, empType, vehicleType, regisNo, permit, slotNo, totalAmt ],
		(err, results) => {
			// if (err) return err ; 
			if (err) {
			resp.send(err);
			} else {
			    if(results){
					resp.send("Permit generated successfully...!")
				}
			}		
		}
	);
});

// api user permit data
app.get('/permit/data', (req, resp)=> {
	console.log("backend" + JSON.stringify(req.body));
	// const { name , contact,  officeNo, empType, vehicleType, regisNo, permit, slotNo, totalAmt } = req.body;
	conn.query(`SELECT * FROM rm_permit_db` ,
		(err, results) => {
			// if (err) return err ; 
			if (err) {
			resp.send(err);
			} else {
			    if(results){
					resp.send(results);
					console.log(results);
				}
			}		
		}
	);
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

//dummy api hit 
app.get("/gateway", (req, resp)=>{
    console.log("insert Data"); 
    try{
    //    const result =  req.body;
	   console.log(info);
	   resp.send(info);
	}catch(error){
    resp.send("error");
	}



	// conn.query(
	// 	`INSERT INTO test("frame_type, site_id, gateway_id, display_data, occupancy) VALUES(?,?,?,?,?)`,
	// 	[frame_type, site_id, gateway_id, display_data, occupancy],
	// 	function (err, data, fields) {
	// 	if (err) return next(new AppError(err, 500));
	// 	res.status(200).json({
	// 		status: "success",
	// 		length: data?.length,
	// 		data: data,
	// 	});
	// 	}
	// );
})




//dummy api hit 
app.post("/api", (req, resp)=>{
    console.log("insert Data"); 
    try{
       const result =  req.body;
	   console.log(result);
	   resp.send("data stored successfully");
	}catch(error){
    resp.send("error");
	}



	// conn.query(
	// 	`INSERT INTO test("frame_type, site_id, gateway_id, display_data, occupancy) VALUES(?,?,?,?,?)`,
	// 	[frame_type, site_id, gateway_id, display_data, occupancy],
	// 	function (err, data, fields) {
	// 	if (err) return next(new AppError(err, 500));
	// 	res.status(200).json({
	// 		status: "success",
	// 		length: data?.length,
	// 		data: data,
	// 	});
	// 	}
	// );
})

app.post("/", (req, resp)=>{
	if (!req.params.id) {
	  return next(new AppError("No todo id found", 404));
	}
	conn.query(
	  "SELECT * FROM todolist WHERE id = ?",
	  [req.params.id],
	  function (err, data, fields) {
		if (err) return next(new AppError(err, 500));
		res.status(200).json({
		  status: "success",
		  length: data?.length,
		  data: data,
		});
	  }
	);
   });


app.listen(PORT, ()=>{
    console.log(`Server listening port ${PORT}`);
})
