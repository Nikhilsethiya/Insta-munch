import React, { useState } from "react";
import Key from "../../images/key.png";
import { Link } from "react-router-dom";
import ModalForgotPass from "../../components/modalforgotpass/ModalForgotPass";
import { useSelector } from "react-redux";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebaseApp from "../../firebase";

function ForgetPassword() {
  const auth = getAuth(firebaseApp);
  const [error, setError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const allUsers = useSelector((state) => state.users.allUsers) || {};
  const userArray = Object.values(allUsers);
  const userWithId = userArray.map((user, index) => ({
    ...user,
    id: Object.keys(allUsers)[index],
  }));
  const user = userWithId.find((user) => user.email === email);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const checkUser = () => {
    const user = userWithId.find((user) => user.email === email);
    if (user) return true;
    else return false;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setOtpSuccess("");
    setError("");
    if (checkUser()) {
      openModal();
    } else {
      setError("User is not found");
    }
  };
  const setSuccessMsg = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setOtpSuccess("Link to update password is sent on your Email");
      })
      .catch((error) => {
        setError(error.message);
      });
    setEmail("");
  };

  return (
    <div className="flex items-center justify-center h-screen  bg-gray-900 text-gray-100">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-900 text-gray-100 border-solid border-2 border-white-500">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Forget Password
        </h2>
        <p className="text-sm text-center text-gray-400">
          Remembered Password?
          <Link
            rel="noopener noreferrer"
            className=" hover:text-violet-400 hover:cursor-pointer"
            to={"/LogIn"}
          >
            {" "}
            Back to LogIn
          </Link>
        </p>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-400" />
          <hr className="w-full text-gray-400" />
        </div>
        <form noValidate="" onSubmit={handleSignUp} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="shrey@gmail.com"
                required
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full px-8 py-3 font-semibold rounded-md bg-violet-200 text-gray-900 hover:bg-violet-300 active:bg-violet-300 btnall"
          >
            <img
              loading="lazy"
              src={Key}
              className="w-6 h-6 mr-2"
              alt="Reset Icon"
            />
            Reset Password
          </button>
        </form>
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
        {otpSuccess && (
          <div className="fixed bottom-10 right-5">
            <div className="flex shadow-md gap-6 rounded-lg overflow-hidden divide-x max-w-2xl bg-gray-900 text-gray-100 divide-gray-700">
              <div className="flex flex-1 flex-col p-4 border-l-8 border-green-400">
                <span className="text-2xl font-semibold">Success</span>
                <span className="text-sm text-gray-400">{otpSuccess}</span>
              </div>
              <button
                className="px-4 flex items-center text-sm uppercase tracki text-gray-200 border-gray-700"
                onClick={() => {
                  setOtpSuccess("");
                }}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <ModalForgotPass
          closeModal={closeModal}
          email={email}
          pass={user?.password}
          setSuccessMsg={setSuccessMsg}
        />
      )}
    </div>
  );
}

export default ForgetPassword;
