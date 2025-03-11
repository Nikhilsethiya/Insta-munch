import React, { useState } from "react";
import { createNewUser, setUserLocation } from "../../reducers/usersReducer";
import { login } from "../../reducers/authReducer";
import signUpIcon from "../../images/signup.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ModalOpt from "../../components/modalopt/ModalOpt";
import CryptoJS from "crypto-js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../firebase";

function SignUp({ location }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);

  const [isLoading, setLoading] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    location: { type: "Home", address: "Pune Maharashtra", pincode: "411037" },
    cart: [],
    favourites: [],
    settings: {
      reminderalerts: false,
    },
  });
  const allUsers = useSelector((state) => state.users.allUsers) || {};
  const userArray = Object.values(allUsers);
  const userWithId = userArray.map((user, index) => ({
    ...user,
    id: Object.keys(allUsers)[index],
  }));

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError("");
    if (name === "phonenumber") {
      if (value === "" || /^\d{0,10}$/.test(value)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      } else {
        // setError("Phone number should be integer with length 0 to 10");
      }
    } else {
      // For other fields, simply update the form data
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const checkUser = () => {
    const user = userWithId.find((user) => user.email === formData.email);
    if (user) return true;
    else return false;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.phonenumber.length === 10) {
      if (formData.password.length > 5) {
        const { password, cpassword } = formData;
        if (password !== cpassword) {
          setError("Passwords do not match");
          return;
        } else if (checkUser()) {
          setError("User already exists");
          return;
        } else {
          openModal();
        }
      } else {
        setError("Password should be more than 6 characters");
      }
    } else {
      setError("Enter 10 digit Phone Number");
    }
  };

  const createUser = () => {
    try {
      setOtpSuccess("");
      setError("");
      setLoading(true);
      setOtpSuccess("Verification Successful.");
      createUserWithEmailAndPassword(auth, formData?.email, formData?.password)
        .then(() => {
          const user = {
            name: formData?.name,
            email: formData?.email,
            phonenumber: formData?.phonenumber,
            location: {
              type: "Home",
              address: "Pune Maharashtra",
              pincode: "411037",
            },
            cart: [],
            favourites: [],
            settings: {
              reminderalerts: false,
            },
          };
          dispatch(createNewUser(user));
          setTimeout(() => {
            const bytes = CryptoJS.AES.decrypt(
              localStorage.getItem("token"),
              "secret_passphrase"
            );
            const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
            const newUser = JSON.parse(decryptedString);
            dispatch(login({ user: newUser }));
            dispatch(setUserLocation(location));
            sendWelcomeEmail(formData?.email, formData?.name);
          }, 4000);
          setTimeout(() => {
            navigate("/DashBoard");
            const expirationTime = new Date().getTime() + 1000 * 60 * 15;
            localStorage.setItem("session-id", expirationTime);
            setLoading(false);
          }, 5000);
        })
        .catch((error) => {
          setError(error.message);
        });
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create user. Please try again.");
      setLoading(false);
    }
  };
  const sendWelcomeEmail = async (recipientEmail, name) => {
    const apiKey =
      "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";
    const url = "https://api.sendinblue.com/v3/smtp/email";

    const htmlContent = `<div style="background-color: #ffffff">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center;">
            <h1 style="font-size: 36px; color: #1f2d3d;">Insta-Munch</h1>
          </div>
          <div style="margin-top: 20px; background-color: #ffffff; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 10px;">
            <div style="padding: 20px;">
            <p style="font-size: 16px; color: #3b3f44;">Get ready to tantalize your taste buds with a delightful culinary experience. Start exploring our menu and discover a world of delicious options waiting just for you. If you need any assistance or have any questions, we're here to help. Happy ordering!</p>
              
            </div>
          </div>
        </div>
      </div>`;

    const body = {
      sender: { email: "informtoshreyans@gmail.com" },
      to: [{ email: recipientEmail }],
      subject: "Welcome " + name,
      htmlContent: htmlContent,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen  bg-gray-900 text-gray-100">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-900 text-gray-100 border-solid border-2 border-white-500">
        <h2 className="mb-1 text-3xl font-semibold text-center">
          Create a New Insta Munch Account
        </h2>
        <p className="text-sm text-center text-gray-400">
          Already a Member?
          <Link
            rel="noopener noreferrer"
            to={"/LogIn"}
            className=" hover:text-violet-400 hover:cursor-pointer"
          >
            {" "}
            Log In here
          </Link>
        </p>
        <div className="my-6 space-y-4"></div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-400" />
          <hr className="w-full text-gray-400" />
        </div>
        <form noValidate="" onSubmit={handleSignUp} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                autoFocus
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
              />
            </div>
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
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phonenumber" className="block text-sm">
                Phone Number
              </label>
              <input
                type="text"
                name="phonenumber"
                id="phonenumber"
                placeholder="XXXXXXXXXX"
                required
                value={formData.phonenumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="cpassword" className="text-sm">
                  Confirm password
                </label>
              </div>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                placeholder="*****"
                required
                value={formData.cpassword}
                onChange={handleInputChange}
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
              src={signUpIcon}
              className="w-6 h-6 mr-2"
              alt="Sign Up Icon"
            />
            {isLoading ? "Creating User..." : "Sign Up"}
          </button>
        </form>
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
      {isModalOpen && (
        <ModalOpt
          closeModal={closeModal}
          email={formData.email}
          createUser={createUser}
        />
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
                setError("");
                setOtpSuccess("");
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

export default SignUp;
