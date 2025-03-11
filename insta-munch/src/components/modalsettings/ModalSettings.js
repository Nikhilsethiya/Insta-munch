import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-tailwind/react";
import {
  setReminderAlerts,
  setNotificationToken,
} from "../../reducers/usersReducer";
import ResetImg from "../../images/reset.png";
import { getToken } from "firebase/messaging";
import { messaging } from "../../firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebaseApp from "../../firebase";

function ModalSettings({ closeModal }) {
  const dispatch = useDispatch();
  const auth = getAuth(firebaseApp);
  const user = useSelector((state) => state.users.userAllData) || {};

  const [isChecked, setIsChecked] = useState(user.settings.reminderalerts);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState("");
  const [error, setError] = useState("");
  const [showResetButton, setShowResetButton] = useState(true);

  function requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, {
          vapidKey:
            "BGSvKaUEl1-sWk89ufSHYuJtSqx5tuopUD41li0KtI_TxTKb0lDO1J-DOH4nwiOM4JP_oDCxoPJjYAMisk_351c",
        }).then((currentToken) => {
          if (currentToken) {
            dispatch(setNotificationToken(currentToken));
          }
        });
      }
    });
  }
  const handleCheckboxChange = () => {
    requestPermission();
    setIsChecked(!isChecked);
    dispatch(setReminderAlerts(!isChecked));
  };

  // const handleRetypePasswordVisibility = () => {
  //   setShowRetypePassword(!showRetypePassword);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResetButton(false);
    sendPasswordResetEmail(auth, user?.email)
      .then(() => {
        setResetSuccess("Link to reset password is sent on your Email");
      })
      .catch((error) => {
        setError(error.message);
      });
    // setResetSuccess("");
    // setError("");
    // if (oldPassword === newPassword) {
    //   setError("Old and New Passwords are Same");
    // } else {
    //   if (newPassword === retypePassword) {
    //     if (user.password === oldPassword) {
    //       setResetSuccess("Password Changed Successfully");
    //       sendPasswordChangedEmail(user.email, retypePassword);
    //       setOldPassword("");
    //       setNewPassword("");
    //       setRetypePassword("");
    //     } else {
    //       setError("Incorrect Old Password");
    //     }
    //   } else {
    //     setRetypePassword("");
    //     setError("Confirm Password Again");
    //   }
    // }
  };

  // const sendPasswordChangedEmail = async (recipientEmail, pass) => {
  //   const apiKey =
  //     "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";
  //   const url = "https://api.sendinblue.com/v3/smtp/email";

  //   const htmlContent = `<div style="background-color: #ffffff">
  //       <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
  //         <div style="text-align: center;">
  //           <h1 style="font-size: 36px; color: #1f2d3d;">Insta-Munch</h1>
  //         </div>
  //         <div style="margin-top: 20px; background-color: #ffffff; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 10px;">
  //           <div style="padding: 20px;">
  //           <p style="font-size: 16px; color: #3b3f44;">Your password has been changed successfully!</p>
  //           <h6 style="font-size: 20px; color: #1f2d3d;">New Password :- ${pass}</h6>
  //           </div>
  //         </div>
  //       </div>
  //     </div>`;

  //   const body = {
  //     sender: { email: "informtoshreyans@gmail.com" },
  //     to: [{ email: recipientEmail }],
  //     subject: "Password Changed",
  //     htmlContent: htmlContent,
  //   };

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "api-key": apiKey,
  //       },
  //       body: JSON.stringify(body),
  //     });

  //     const data = await response.json();
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //   }
  // };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85">
      <div className="relative mx-auto bg-white rounded-md shadow-md">
        <div className="flex items-center justify-between p-2 space-x-4">
          <div className="flex items-center space-x-4 font-bold text-2xl">
            Settings
          </div>
          <IconButton
            className="flex items-center space-x-1"
            variant="text"
            title="Close"
            onClick={closeModal}
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
        <div className="px-8 w-full sm:flex sm:space-x-6 pb-4 pt-6 flex justify-center">
          <div className="flex flex-col w-full">
            <span className="mb-1 text-xl text-violet-500 font-bold">
              SMS Preferences
            </span>

            <div className="items-center space-x-4  flex justify-center ">
              <span className="text-xl font-semibold">
                Recommendations & Reminders
              </span>
              <label htmlFor="Toggle1" className="cursor-pointer">
                <span className="relative">
                  <input
                    id="Toggle1"
                    type="checkbox"
                    className="hidden peer"
                    checked={user.settings.reminderalerts}
                    onChange={handleCheckboxChange}
                  />
                  <div className="w-8 h-5 rounded-full shadow-inner bg-gray-300 peer-checked:bg-violet-400"></div>
                  <div className="absolute inset-y-0 left-0 w-3  m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-800"></div>
                </span>
              </label>
            </div>
            <span className="mt-1 ml-2 text-gray-400 text-sm flex justify-center">
              Order related SMS cannot be disabled as they are critical to
              provide service.
            </span>
          </div>
        </div>
        <div className="px-8 w-full sm:flex sm:space-x-6 py-6 flex justify-center">
          <div className="flex flex-col w-full">
            <span className="mb-1 text-xl text-violet-500 font-bold">
              Change Password
            </span>

            <div className="items-center space-x-4  flex justify-center ">
              <form noValidate="" className="space-y-4 w-full">
                {/* <div className="space-x-4">
                  <div className="space-y-2 flex items-center">
                    <label
                      htmlFor="opass"
                      className="block ml-4 w-3/5 font-semibold "
                    >
                      Old Password :-
                    </label>
                    <input
                      type="text"
                      name="opass"
                      id="opass"
                      required
                      value={oldPassword}
                      placeholder="Type Old Password"
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:border-violet-400"
                    />
                  </div>
                  <div className="space-y-2 flex items-center">
                    <label htmlFor="npass" className="w-3/5 font-semibold ">
                      Password :-
                    </label>
                    <input
                      type="password"
                      name="npass"
                      id="npass"
                      placeholder="*****"
                      value={newPassword}
                      required
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:border-violet-400"
                    />
                  </div>
                  <div className="space-y-2 flex items-center relative">
                    <label htmlFor="rnpass" className="w-3/5 font-semibold ">
                      Confirm Password :-
                    </label>
                    <input
                      type={showRetypePassword ? "text" : "password"}
                      name="rnpass"
                      id="rnpass"
                      placeholder="*****"
                      value={retypePassword}
                      onChange={(e) => setRetypePassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-md focus:border-violet-400"
                    />
                    <span
                      className="password-toggle cursor-pointer absolute right-4"
                      onMouseDown={handleRetypePasswordVisibility}
                      onMouseUp={handleRetypePasswordVisibility}
                      onMouseOut={() => setShowRetypePassword(false)}
                    >
                      👁️
                    </span>
                  </div>
                </div> */}
                {showResetButton ? (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex justify-center  float-right px-3 py-1 font-semibold rounded-md bg-violet-200 text-gray-900 hover:bg-violet-200 active:bg-violet-300    btnall"
                  >
                    <img
                      loading="lazy"
                      src={ResetImg}
                      className="w-5 h-5 mr-2 mt-1"
                      alt="Reset Icon"
                    />
                    Reset Password
                  </button>
                ) : (
                  <div
                  title="Close Modal and Come back to Reset Again"
                    className="flex justify-center  float-right px-3 py-1 font-semibold rounded-md bg-violet-200 text-gray-900 hover:bg-violet-200 active:bg-violet-300    btnall hover:cursor-not-allowed opacity-40"
                  >
                    <img
                      loading="lazy"
                      src={ResetImg}
                      className="w-5 h-5 mr-2 mt-1"
                      alt="Reset Icon"
                    />
                    Reset Password
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {error && (
        <div className="fixed bottom-10 right-5">
          <div className="flex shadow-md gap-6 rounded-lg overflow-hidden divide-x max-w-2xl bg-gray-900 text-gray-100 divide-gray-700">
            <div className="flex flex-1 flex-col p-4 border-l-8 border-red-400">
              <span className="text-2xl font-semibold">Error</span>
              <span className="text-sm text-gray-400">{error}</span>
            </div>
            <button
              className="px-4 flex items-center text-sm uppercase tracki text-gray-200 border-gray-700"
              onClick={() => {
                setError("");
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      {resetSuccess && (
        <div className="fixed bottom-10 right-5">
          <div className="flex shadow-md gap-6 rounded-lg overflow-hidden divide-x max-w-2xl bg-gray-900 text-gray-100 divide-gray-700">
            <div className="flex flex-1 flex-col p-4 border-l-8 border-green-400">
              <span className="text-2xl font-semibold">Success</span>
              <span className="text-sm text-gray-400">{resetSuccess}</span>
            </div>
            <button
              className="px-4 flex items-center text-sm uppercase tracki text-gray-200 border-gray-700"
              onClick={() => {
                setResetSuccess("");
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalSettings;
