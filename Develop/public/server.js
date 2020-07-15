// Dependencies
// ===============================================================================
const fs = require("fs");
const path = require("path");
const express = require("express");

// Set up the Express App
// ===============================================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Notes (DATA)
// =============================================================
var notes = [];

// Routes
// ===============================================================================

// GET `/` returns the `index.html` file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// GET `/notes` returns the `notes.html` file
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"));
});

// GET `/api/notes` reads the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

// POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
    var newNote = req.body;
    newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase();
    console.log(newNote);
    notes.push(newNote);
    res.json(newNote);
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});