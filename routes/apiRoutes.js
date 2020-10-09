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

    const notes = JSON.parse(data);

    // GET route
    app.get("/api/notes", function (req, res) {
      res.json(notes).catch((err) => res.status(500).json(err));
    });

    // POST route
    app.post("/api/notes", function (req, res) {
      const newNote = req.body;
      notes.push(newNote);
      savedNotes();
    });

    // GET a specific note
    app.get("/api/notes/:id", function (req, res) {
      res.json(notes[req.params.id]);
    });

    // DELETE a specific note
    app.delete("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id, 1);
      savedNotes();
    });

    // Update the db
    function savedNotes() {
      return writeFileAsync(
        "db/db.json",
        JSON.stringify(notes, "\t"),
        (err) => {
          if (err) throw err;
          res.json({ ok: true });
        }
      );
    }
  });
};
