// Load dotenv  variables ..
if(process.env.NODE_ENV != "production"){
   require("dotenv").config();
}


// import dependencies ...
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const connectTodb = require("./config/connectToDb");
// const Note = require("./models/note");
const notesController = require("../server/controllers/notesControllers");
const usersController = require("../server/controllers/usersControllers");
const requireAuth = require("./middleware/requireAuth")


// Create the express app ...
const app = express();

// Configure  express app ...
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin : true ,
    credentials : true ,
}));

// Connect to database ..
connectTodb();

// Routing ...
// Authentication ...
app.post("/signup",usersController.signup);
app.post("/login",usersController.login);
app.get("/logout",usersController.logout);
app.get("/check-auth" ,requireAuth, usersController.checkAuth);

// Home ...
app.get('/', (req,res) =>{
    res.json({hello : "world"});
})
// Creating the notes ...
app.post("/notes", notesController.createNote);
// get/fetch all the notes .
app.get('/notes', notesController.fetchNotes);
// get/fetch note by the id .
app.get("/notes/:id", notesController.fetchNote);
// update the note .
app.put("/notes/:id", notesController.updateNote)
// delete the note .
app.delete("/notes/:id", notesController.deleteNote);




// Starting the server ...
app.listen(process.env.PORT);