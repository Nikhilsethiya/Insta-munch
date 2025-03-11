import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import firebaseApp from "../firebase";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebaseApp);
const initialState = {
  isAuthenticated: false,
  id: null,
  token: null,
  error: null,
  otp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setCurrentId(state, action) {
      state.id = action.payload;
    },
    setOTP(state, action) {
      state.otp = action.payload;
    },
    login(state, action) {
      const { user } = action.payload;
      if (user) {
        const token = CryptoJS.AES.encrypt(
          JSON.stringify(user),
          "secret_passphrase"
        ).toString();
        localStorage.setItem("token", token);
        return {
          ...state,
          isAuthenticated: true,
          id: user.id,
          token: token,
          error: null,
        };
      }
      return {
        ...state,
        error: "Invalid email or password",
      };
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("session-id");
      signOut(auth);
      return {
        ...state,
        isAuthenticated: false,
        id: null,
        token: null,
        error: null,
      };
    },
  },
});

const generateToken = (user) => {
  const token = encodeURIComponent(JSON.stringify(user));
  return token;
};

export const {
  login,
  logout,
  setAuthenticated,
  setToken,
  setCurrentId,
  setOTP,
} = authSlice.actions;

export default authSlice.reducer;
