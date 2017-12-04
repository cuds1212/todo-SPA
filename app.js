// Set up Express.js
var express = require('express');
var app = express();

// Set up .ENV
require('dotenv').config();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

// Main route
app.get("/", function(req,res){
    res.sendFile("index.html");
});

// Import API routes
var todoRoutes = require("./routes/todos");
app.use("/api/todos", todoRoutes);

// Start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});