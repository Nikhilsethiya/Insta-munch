import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-tailwind/react";
import {
  setUsername,
  setEmail,
  setPhoneNumber,
} from "../../reducers/usersReducer";
import Profile from "../../images/user.png";
import Pencil from "../../images/pencil.png";
import Correct from "../../images/correct.png";
import Wrong from "../../images/wrong.png";

function ModalProfile({ closeModal }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.userAllData) || {};

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user.name);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState(user.phonenumber);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleEditClick = (field) => {
    if (field === "username") {
      setNewUsername(user.name);
      setIsEditingUsername(true);
    } else if (field === "email") {
      setNewEmail(user.email);
      setIsEditingEmail(true);
    } else if (field === "phoneNumber") {
      setNewPhoneNumber(user.phonenumber);
      setIsEditingPhoneNumber(true);
    }
  };

  const handleSaveClick = (field) => {
    if (field === "username") {
      if (newUsername.length <= 15) {
        dispatch(setUsername(newUsername));
        setIsEditingUsername(false);
        setUsernameError("");
      } else {
        setUsernameError("Username must be 15 characters or less");
      }
    } else if (field === "email") {
      if (validateEmail(newEmail)) {
        dispatch(setEmail(newEmail));
        setIsEditingEmail(false);
        setEmailError("");
      } else {
        setEmailError("Invalid email address");
      }
    } else if (field === "phoneNumber") {
      if(newPhoneNumber.length === 10){
      dispatch(setPhoneNumber(newPhoneNumber));
      setIsEditingPhoneNumber(false);
      setPhoneError("")}else{setPhoneError("Invalid Mobile Number")}
    }
  };

  const handleInputChangeUsername = (e) => {
    setNewUsername(e.target.value);
    setUsernameError("");
  };

  const handleInputChangeEmail = (e) => {
    setNewEmail(e.target.value);
    setEmailError("");
  };

  const handleInputChangePhoneNumber = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setNewPhoneNumber(value);
      setPhoneError("");
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85">
      <div className="relative mx-auto bg-white rounded-md shadow-md">
        <div className="flex items-center justify-between p-2 space-x-4">
          <div className="flex items-center space-x-4 font-bold "></div>
          <IconButton
            className={`flex items-center space-x-1 ${
              isEditingUsername || isEditingEmail || isEditingPhoneNumber
                ? "pointer-events-none opacity-30"
                : ""
            }`}
            variant="text"
            onClick={closeModal}
            title="Close"
            disabled={
              isEditingUsername || isEditingEmail || isEditingPhoneNumber
            }
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8 pl-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="px-8 w-full sm:flex sm:space-x-6 pb-4 flex justify-center">
          <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
            <img
              loading="lazy"
              src={Profile}
              alt="Profile"
              className="object-cover object-center w-full h-full rounded bg-violet-200 "
            />
          </div>
          <div className="flex flex-col w-56">
            <h2 className="text-2xl font-semibold flex mb-2">
              {isEditingUsername ? (
                <>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={handleInputChangeUsername}
                    autoFocus
                    className={`w-full px-2 py-1 rounded-md border ${
                      usernameError ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-violet-500`}
                  />
                  <div>
                    <img
                      loading="lazy"
                      src={Correct}
                      alt="Correct"
                      onClick={() => handleSaveClick("username")}
                      className="object-cover object-center w-3 h-3 ml-1 mt-1 rounded-md cursor-pointer hover:animate-ping"
                    />
                    <img
                      loading="lazy"
                      src={Wrong}
                      alt="Wrong"
                      onClick={() => setIsEditingUsername(false)}
                      className="object-cover object-center w-3 h-3 ml-1 mt-2 rounded-md cursor-pointer hover:animate-ping"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mr-1 font-bold">
                    {isEditingUsername ? newUsername : user.name}
                  </div>
                  <img
                    loading="lazy"
                    src={Pencil}
                    onClick={() => handleEditClick("username")}
                    alt="Edit"
                    className="object-cover object-center w-2 h-2 cursor-pointer opacity-60 hover:opacity-100"
                  />
                </>
              )}
            </h2>
            <span className="text-xs mb-4 text-violet-500 font-semibold">Premium User</span>
            <div className="text-xs flex mb-4 text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Email address"
                className="w-4 h-4 mr-2"
              >
                <path
                  fill="currentColor"
                  d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                ></path>
              </svg>
              {isEditingEmail ? (
                <>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={handleInputChangeEmail}
                    autoFocus
                    className={`w-full px-2 py-1 rounded-md border ${
                      emailError ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-violet-500`}
                  />
                  <div>
                    <img
                      loading="lazy"
                      src={Correct}
                      alt="Correct"
                      onClick={() => handleSaveClick("email")}
                      className="object-cover object-center w-3 h-3 ml-1 rounded-md cursor-pointer hover:animate-ping"
                    />
                    <img
                      loading="lazy"
                      src={Wrong}
                      alt="Wrong"
                      onClick={() => setIsEditingEmail(false)}
                      className="object-cover object-center w-3 h-3 ml-1  rounded-md cursor-pointer hover:animate-ping"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mr-1 font-bold">
                    {isEditingEmail ? newEmail : user.email}
                  </div>
                  {/* <img
                    loading="lazy"
                    src={Pencil}
                    onClick={() => handleEditClick("email")}
                    alt="Edit"
                    className="object-cover object-center w-2 h-2 cursor-pointer opacity-60 hover:opacity-100"
                  /> */}
                </>
              )}
            </div>
            <div className="text-xs flex text-gray-800 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Phonenumber"
                className="w-4 h-4 mr-2"
              >
                <path
                  fill="currentColor"
                  d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
                ></path>
              </svg>
              {isEditingPhoneNumber ? (
                <>
                  <input
                    type="text"
                    value={newPhoneNumber}
                    onChange={handleInputChangePhoneNumber}
                    autoFocus
                    className={`w-full px-2 py-1 rounded-md border ${
                      phoneError ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-violet-500`}
                  />
                  <div>
                    <img
                      loading="lazy"
                      src={Correct}
                      alt="Correct"
                      onClick={() => handleSaveClick("phoneNumber")}
                      className="object-cover object-center w-3 h-3 ml-1 rounded-md cursor-pointer hover:animate-ping"
                    />
                    <img
                      loading="lazy"
                      src={Wrong}
                      alt="Wrong"
                      onClick={() => setIsEditingPhoneNumber(false)}
                      className="object-cover object-center w-3 h-3 ml-1 rounded-md cursor-pointer hover:animate-ping"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mr-1 font-bold">
                    {isEditingPhoneNumber ? newPhoneNumber : user.phonenumber}
                  </div>
                  <img
                    loading="lazy"
                    src={Pencil}
                    onClick={() => handleEditClick("phoneNumber")}
                    alt="Edit"
                    className="object-cover object-center w-2 h-2 cursor-pointer opacity-60 hover:opacity-100"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProfile;
