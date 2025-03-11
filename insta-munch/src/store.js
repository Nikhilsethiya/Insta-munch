import { configureStore } from "@reduxjs/toolkit";
import authReducer, { login, logout } from "./reducers/authReducer";
import usersReducer, {
  fetchAllUsers,
  setUserAllData,
} from "./reducers/usersReducer";
import filtersReducer from "./reducers/filtersReducer";
import CryptoJS from "crypto-js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    filters: filtersReducer,
  },
  devTools: false,
});

const handleAuthentication = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  if (isAuthenticated) {
    const bytes = CryptoJS.AES.decrypt(localStorage.getItem("token"), "secret_passphrase");
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    const token = JSON.parse(decryptedString);
    store.dispatch(login({ user: token }));
    store.dispatch(setUserAllData(token));
  } else {
    store.dispatch(logout());
  }
};

handleAuthentication();

store.dispatch(fetchAllUsers());

export default store;
