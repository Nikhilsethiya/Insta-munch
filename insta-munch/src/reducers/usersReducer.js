import { createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, get, update, push, set } from "firebase/database";
import firebaseApp from "../firebase";
import CryptoJS from "crypto-js";

const initialState = {
  allUsers: [],
  userAllData: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    setUserAllData(state, action) {
      state.userAllData = action.payload;
    },
    setUsername(state, action) {
      state.userAllData.name = action.payload;
      updateLocalStorage(state.userAllData);
    },
    setEmail(state, action) {
      state.userAllData.email = action.payload;
      updateLocalStorage(state.userAllData);
    },
    setPhoneNumber(state, action) {
      state.userAllData.phonenumber = action.payload;
      updateLocalStorage(state.userAllData);
    },
    setReminderAlerts(state, action) {
      state.userAllData.settings.reminderalerts = action.payload;
      updateLocalStorage(state.userAllData);
    },
    setUserLocation(state, action) {
      state.userAllData.location = action.payload;
      updateLocalStorage(state.userAllData);
    },
    setCurrentSelectedLocation(state, action) {
      state.userAllData.selectedlocation = action.payload;
      updateLocalStorage(state.userAllData);
    },
    setCurrentSelectedLocationCoOrdinates(state, action) {
      state.userAllData.coordinates = action.payload;
      updateLocalStorage(state.userAllData);
    },
    setUserFavourites(state, action) {
      state.userAllData.favourites = action.payload;
      updateLocalStorage(state.userAllData);
    },
    setUserCart(state, action) {
      state.userAllData.cart = action.payload;
      updateLocalStorage(state.userAllData);
    },
    setUserOrder(state, action) {
      state.userAllData.orders = action.payload;
      updateLocalStorage(state.userAllData);
    },
    setUserAfterLogout(state) {
      state.userAllData = {};
    },
    setNotificationToken(state, action) {
      state.userAllData.notifytoken = action.payload;
      updateLocalStorage(state.userAllData);
      addNotifyToken(state.userAllData.notifytoken);
    },
  },
});

const updateLocalStorage = async (userAllData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      localStorage.getItem("token"),
      "secret_passphrase"
    );
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    const token = JSON.parse(decryptedString);
    const updatedToken = { ...token, ...userAllData };
    const updatedTokenn = CryptoJS.AES.encrypt(
      JSON.stringify(updatedToken),
      "secret_passphrase"
    ).toString();
    localStorage.setItem("token", updatedTokenn);
    const db = getDatabase(firebaseApp);
    const userRef = ref(db, `users/${updatedToken.id}`);
    await update(userRef, updatedToken);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const addNotifyToken = (token) => async (dispatch) => {
  try {
    const db = getDatabase(firebaseApp);
    const usersRef = ref(db, "notifytokens");
    const newUserRef = push(usersRef);
    await set(newUserRef, token);
  } catch (error) {
    console.error("Error creating new user:", error);
  }
};

export const createNewUser = (userData) => async (dispatch) => {
  try {
    const db = getDatabase(firebaseApp);
    const usersRef = ref(db, "users");
    const newUserRef = push(usersRef);
    await set(newUserRef, userData);
    const snapshot = await get(usersRef);
    const usersObject = snapshot.val();
    for (const userId in usersObject) {
      usersObject[userId].id = userId;
    }
    dispatch(setAllUsers(usersObject));
    const newUser = Object.values(usersObject).find(
      (user) => user.email === userData.email
    );
    if (newUser) {
      dispatch(fetchUserById({ userId: newUser.id }));
      const token = CryptoJS.AES.encrypt(
        JSON.stringify(newUser),
        "secret_passphrase"
      ).toString();
      localStorage.setItem("token", token);
    }
  } catch (error) {
    console.error("Error creating new user:", error);
  }
};

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const db = getDatabase(firebaseApp);
    const usersRef = ref(db, "users");
    const snapshot = await get(usersRef);
    const users = snapshot.val();
    for (const userId in users) {
      users[userId].id = userId;
    }
    dispatch(setAllUsers(users));
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const fetchUserById =
  ({ userId }) =>
  async (dispatch) => {
    try {
      const db = getDatabase(firebaseApp);
      const usersRef = ref(db, `users/${userId}`);
      const snapshot = await get(usersRef);
      const user = snapshot.val();

      if (typeof user === "object" && user !== null) {
        const userWithId = { ...user, id: userId };
        dispatch(setUserAllData(userWithId));
      } else {
        console.error("Invalid user data:", user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

export const {
  setAllUsers,
  setUserAllData,
  setUsername,
  setEmail,
  setPhoneNumber,
  setReminderAlerts,
  setUserLocation,
  setCurrentSelectedLocation,
  setCurrentSelectedLocationCoOrdinates,
  setUserFavourites,
  setUserCart,
  setUserAfterLogout,
  setUserOrder,
  setNotificationToken,
} = usersSlice.actions;

export default usersSlice.reducer;
