const util = require('util');
const fs = require('fs');

// This package will be used to generate our unique ids. https://www.npmjs.com/package/uuid
const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
     // set variable using let for parsed Notes
        try {
            parsedNotes = [].concat(JSON.parse(notes))
            // let notes = JSON.parse(json);
            // if (!text) {
            //     throw new Error("No note to show")
            // }
        } catch (error) {
            parsedNotes = []
            // alert("Empty notes")
        }
      // If notes isn't an array or can't be turned into one, send back a new empty array
        // Use a try/catch method 
        // DON"T FORGET TO .concat the array and use JSON.parse for the notes

    });
  }

  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // Add a unique id to the note using uuid package
    const newNote = { title, text, id: uuidv1() };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
    //  Utilize .then to retrieve notes 
        .then((notes) => [...notes, newNote])
    // Utilize .then to update notes
        .then((updatedNotes) => this.write(updatedNotes))
    // Use .then to write "newNote"()
        .then(() => newNote)
  }

  removeNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
   // Use "return" on "this" to ".getNotes" which will be a function from above "getnotes()""
   // after getting notes use filter by note id
   // use .then with filtered notes to write new "filteredNotes"
   return this.getNotes()
    .then((notes) => notes.filter((note) => note.id !== id))
    .then((filteredNotes) => this.write(filteredNotes))
  }
}

module.exports = new Store();