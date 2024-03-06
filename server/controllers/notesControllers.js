const Note = require("../models/note");

// Fetching all the notes .
const fetchNotes = async (req, res) => {
  try {
    // Find  the notes .
    const notes = await Note.find({ user: req.user._id });

    // respond with them .
    res.json({ notes: notes });
  } catch (err) {
    console.log("fetchNotes error", err);
    res.sendStatus(400);
  }
};

// fetch single notes .
const fetchNote = async (req, res) => {
  try {
    // Get id of the url .
    const noteId = req.params.id;

    // find the note using that id .
    const note = await Note.findOne({ _id: noteId, user: req.user._id });

    // respond with notes .
    res.json({ note: note });
  } catch (err) {
    console.log("fetchNote error", err);
    res.sendStatus(400);
  }
};

// Creating single note .
const createNote = async (req, res) => {
  try {
    // Get  the sent in data off request body .
    const title = req.body.title;
    const body = req.body.body;

    // Create a note with it .
    const note = await Note.create({
      title: title,
      body: body,
      user: req.user._id,
    });

    // respond  with the new note ..
    res.json({ note: note });
  } catch (err) {
    console.log("createNote error", err);
    res.sendStatus(400);
  }
};

// Find and Updating note
const updateNote = async (req, res) => {
  try {
    // get the id off the url
    const noteId = req.params.id;

    // Get the data off the req body .
    const title = req.body.title;
    const body = req.body.body;

    // Find and update the record .
    await Note.findOneAndUpdate(
      { _id: noteId, user: req.user._id },
      {
        title: title,
        body: body,
      }
    );

    const note = await Note.findById(noteId);

    // Respond with it
    res.json({ note: note });
  } catch (err) {
    console.log("update note error", err);
    res.sendStatus(400);
  }
};

// Delete the note .
const deleteNote = async (req, res) => {
  try {
    // get id of url .
    const noteId = req.params.id;

    // delete the record .
    await Note.deleteOne({ _id: noteId, user: req.user._id });

    // Respond
    res.json({ sucess: "Record deleted" });
  } catch (err) {
    console.log("eleteNote error", err);
    res.sendStatus(400);
  }
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};
