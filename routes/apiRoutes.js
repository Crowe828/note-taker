// Requirements
const fs = require("fs");
const util = require("util");

// So we can read/write notes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = (app) => {
  // Setup notes variable
  return readFileAsync("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);

    // GET route
    app.get("/api/notes", function (req, res) {
      res.json(notes);
    });

    // POST route
    app.post("/api/notes", function (req, res) {
      let newNote = req.body;
      notes.push(newNote);
      savedNotes();
    });

    // Retrieve a specific note
    app.get("/api/notes/:id", function (req, res) {
      res.json(notes[req.params.id]);
    });

    // Delete a specific note
    app.delete("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id, 1);
      savedNotes();
    });

    // Updates the database when new notes are added
    function savedNotes() {
      return writeFileAsync(
        "db/db.json",
        JSON.stringify(notes, "\t"),
        (err) => {
          if (err) throw err;
          return true;
        }
      );
    }
  });
};
