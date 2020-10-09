// // Should db.json fail: [{"title":"Test Title","text":"Test text"}]

// // Require fs
// const fs = require("fs");
// const util = require("util");

// // So we can read/write notes
// const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile);

// // Class for your notes
// class Store {
//   // Defined functions that read, write, and delete
//   read() {
//     return readFileAsync("db/db.json", "utf8");
//   }

//   write(note) {
//     return writeFileAsync("db/db.json", JSON.stringify(note));
//   }
//   // reading all the notes in db.json, adding a one note, and writing updated note
//   addNote(notes) {
//     return this.read()
//       .then((note) => {
//         [...notes, note];
//       })
//       .then((updatedNotes) => this.write(updatedNotes));
//   }

//   delete(id) {
//     return this.getNotes().then((notes) => {
//       notes
//         .filter((note) => {
//           note.id !== id;
//         })
//         .then((filteredNotes) => {
//           this.write(filteredNotes);
//         });
//     });
//   }
// }

// module.exports = new Store();

// const express = require("express");
// const app = express();
// const db = require("../db/db.json");
// const store = require("../db/store");
// const uuid = require("uuid");
// const path = require("path");

// module.exports = function (app) {
//   // GET route
//   app.get("/api/notes", function (req, res) {
//     store
//       .read()
//       .then((notes) => res.json(notes))
//       .catch((err) => res.status(500).json(err));
//   });
//   // POST route
//   app.post("/api/notes", function (req, res) {
//     req.body.id = uuid.v1();
//     //   Passed data from request to class method
//     store
//       .addNote(req.body)
//       .then((note) => res.json(note))
//       .catch((err) => res.status(500).json(err));
//   });
//   // DELETE route
//   app.delete("/api/notes/:id", function (req, res) {
//     store
//       .delete(req.params.id)
//       .then(() => res.json({ ok: true }))
//       .catch((err) => res.status(500).json(err));
//   });
// };
