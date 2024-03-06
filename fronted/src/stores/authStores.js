import create from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  loggedIn: null,

  loginForm: {
    email: "",
    password: "",
  },

  SignupForm: {
    email: "",
    password: "",
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value,
        },
      };
    });
  },

  updateSignupForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        signupForm: {
          ...state.signupForm,
          [name]: value,
        },
      };
    });
  },

  login: async (e) => {
    e.preventDefault();

    const { loginForm } = authStore.getState();

    const res = await axios.put("/login", loginForm);
    console.log(res);

    set({
      loggedIn: true,
      loginForm: {
        email: "",
        password: "",
      },
    });
  },

  checkAuth: async () => {
    try {
      await axios.get("/check-auth");
      set({ loggedIn: true });
    } catch (err) {
      set({ loggedIn: false });
    }
  },

  signup: async (e) => {
    const { signupForm } = authStore().getState();

    const res = await axios.post("/signup", signupForm, {
      withCredentials: true,
    });
    set({
      signupForm: {
        email: "",
        password: "",
      },
    });
    console.log(res);
  },

  logout : async (e) =>{
    await  axios.get("/logout" );

    set({loggedIn : false});

  },
}));

export default authStore;
