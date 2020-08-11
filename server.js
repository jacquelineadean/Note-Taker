// Dependencies
// ===============================================================================
const fs = require("fs");
const path = require("path");
const express = require("express");

// Set up the Express App
// ===============================================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Notes (DATA)
// =============================================================
let notes = [];

// Routes
// ===============================================================================

// GET `/` returns the `index.html` file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// GET `/notes` returns the `notes.html` file
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// GET `/api/notes` reads the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// POST `/api/notes` 
app.post("/api/notes", (req, res) => {
    // Receive a new note to save on the request body
    let newNote = req.body;
    console.log(newNote);
    // Add newNote object to notes array
    notes.push(newNote);
    // For loop to assign each note a unique id number when saved to the array
    for (var i = 0; i < notes.length; i++){
        notes[i].id = i + 1
    }
    // Add newNote to the `db.json` file
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    // Then return the new note to the client
    res.json(notes);
})

// DELETE `/api/notes/:id`
app.delete('/api/notes/:id', (req, res) => {
    // Variable for selected note id
    let deleted = req.params.id;
    console.log(deleted);
    // Read all notes from the `db.json` file and parse 
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    // Filter through array and create new array sans deleted note
    notes = notes.filter(thisNote => {
        return thisNote.id != deleted;
    });
    // Rewrite notes to the `db.json` file
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    // Then return the note array sans deleted note to the client
    res.json(notes);
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
