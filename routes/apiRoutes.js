// Require fs and util
const fs = require("fs");
const util = require("util");
// So we can read/write notes asynchronously
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = (app) => {
  // Read the db and see if there is anything in it
  return readFileAsync("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    // If there is, parse it
    const notes = JSON.parse(data);

    // GET route
    app.get("/api/notes", function (req, res) {
      // Get notes from db and display them
      res.json(notes).catch((err) => res.status(500).json(err));
    });

    // POST route
    app.post("/api/notes", function (req, res) {
      // Add the new note to the notes const hooked into the db.json file
      const newNote = req.body;
      notes.push(newNote);
      savedNotes();
    });

    // DELETE note
    app.del("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id);
      savedNotes();
    });

    // Update db.json
    function savedNotes() {
      return writeFileAsync("db/db.json", JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.json({ ok: true });
      });
    }
  });
};
