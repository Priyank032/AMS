const express = require('express')
const app = express()
require('dotenv').config({ path: "src/config/.env" })
const router = require("./routes/route")
const cookieParser = require("cookie-parser");
const {notFound , errorHandler} = require("./middleware/errorMiddleware")
const cors = require("cors");
const StudentRegistration = require("./models/studentregistration");
app.use(cors());
// database connection establishing here
require("./db/conn")
//const auth = require("./src/middleware/auth");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// all the routes are setting up here
app.use('/', router);

// console.log(StudentRegistration);



app.use(notFound);
app.use(errorHandler)
const port = 8000 || process.env.port

app.listen(port,()=>{
    console.log(`server is running on the ${port}`)
})



