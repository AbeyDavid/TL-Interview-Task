const express = require('express')
const cors = require("cors");
const connection = require("./config/sqlConnection")
const app = express()
app.use(cors()); 
app.use(express.json());


//---------Routes-------------
app.use("/", require("./routes/userRoutes"));



connection.connect((err,)=>{
    if (err) console.log(err); 
    console.log("db conncected...");
})
app.listen(4000, () => {      
    console.log("server running port 4000....");
});

