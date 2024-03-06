import create from "zustand";
import axios from "axios";

const notesStore = create((set) => ({
  notes: null,
  createForm: {
    title: "",
    body: "",
  },
  updateNote : {
    _id : null,
    title : "",
    body : "",
  },

  fetchNotes: async () => {
    // fetch the notes using axios .
    const res = await axios.get("/notes");
    // set to state .
    set({ notes: res.data.notes });
  },

  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },

  createNote: async (e) => {
    e.preventDefault();

    const { createForm, notes } = notesStore.getState();

    const res = await axios.post("/notes", createForm);

    set({
      notes: [...notes, res.data.note],
      createForm: {
        title: "",
        body: "",
      },
    });
  },

  deleteNote: async (_id) => {
    // Delte the note .
    const res = await axios.delete(`/notes/${_id}`);

    const { notes } = notesStore.getState();

    // Update the state .
    const newNotes = notes.filter((note) => {
      return note._id !== _id;
    });
    set({
      notes: newNotes,
    });
  },

  handleUpdateFieldChange : async (e) =>{

    const {value , name} = e.target;

    set((state) =>{
        return{
            updateNote : {
                ...state.updateNote,
                [name] : value,
            }
        }
    })
   },

  toggleUpdate : ({ _id, title , body}) =>{

    // Set state  on update note ..
   console.log("hey");

    set({
        updateNote : {
            title, body , _id  ,
        },
    })
  },

  updateForm : async (e) =>{
    e.preventDefault();

    const {updateNote : {title, body , _id} , notes} = notesStore.getState();
    // Send the update request .
    const res = await axios.put(`/notes/${_id}`,{title , body});
    console.log(res);

    // Upadate State
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) =>{
      return note._id === _id;
    });

    newNotes[noteIndex] = res.data.note;
    set({
        notes : newNotes,
        updateNote :{
            _id : null ,
            title : "", 
            body : "",
        },
    })
  },
}));

export default notesStore;
