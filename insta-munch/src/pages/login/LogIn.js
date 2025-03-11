import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/authReducer";
import signInIcon from "../../images/signin.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  fetchUserById,
  createNewUser,
  fetchAllUsers,
  setUserLocation,
} from "../../reducers/usersReducer";
import CryptoJS from "crypto-js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from "../../firebase";

function LogIn({ location }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(firebaseApp);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const allUsers = useSelector((state) => state.users.allUsers || {});
  const userArray = Object.values(allUsers);
  const userWithId = userArray.map((user, index) => ({
    ...user,
    id: Object.keys(allUsers)[index],
  }));

  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    if (isAuthenticated) {
      setError("");
      navigate("/Dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = () => {
    if (email === "" || password === "") {
      setError("Enter Email or Password");
    } else {
      dispatch(fetchAllUsers());
      const user = userWithId.find(
        (user) => user.email === email.toLowerCase()
      );
      setLoading(true);
      const lowerEmail = email.toLowerCase();
      signInWithEmailAndPassword(auth, lowerEmail, password)
        .then(() => {
          if (user) {
            dispatch(fetchUserById({ userId: user.id }));
            dispatch(login({ user }));
            dispatch(setUserLocation(location));
            navigate("/Dashboard");
            const expirationTime = new Date().getTime() + 1000 * 60 * 15;
            localStorage.setItem("session-id", expirationTime);
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${credentialResponse.access_token}`,
            },
          }
        );

        const user = userWithId.find(
          (user) => user.email === response.data.email
        );
        if (user) {
          dispatch(fetchUserById({ userId: user.id }));
          dispatch(login({ user }));
          dispatch(setUserLocation(location));
          setTimeout(() => {
            navigate("/Dashboard");
            const expirationTime = new Date().getTime() + 1000 * 60 * 15;
            localStorage.setItem("session-id", expirationTime);
          }, 2000);
          setLoading(false);
        } else {
          const newUser = {
            name: response.data.name,
            email: response.data.email,
            phonenumber: "",
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
          const password = "google";
          await createUserWithEmailAndPassword(
            auth,
            response.data.email,
            password
          )
            .then(() => {
              dispatch(createNewUser(newUser));
              setTimeout(() => {
                const bytes = CryptoJS.AES.decrypt(
                  localStorage.getItem("token"),
                  "secret_passphrase"
                );
                const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
                const newUser = JSON.parse(decryptedString);
                dispatch(login({ user: newUser }));
                dispatch(setUserLocation(location));
              }, 4000);
              setTimeout(() => {
                navigate("/DashBoard");
                sendWelcomeEmail(
                  response.data.email,
                  response.data.name,
                  password
                );
                setLoading(false);
              }, 5000);
            })
            .catch((error) => {
              setError(error.message);
            });
        }
      } catch (error) {
        console.error(error);
        setError("Authentication Failed");
        setLoading(false);
      }
    },
    onError: () => {
      setError("LogIn Failed");
      setLoading(false);
    },
  });

  const sendWelcomeEmail = async (recipientEmail, name, pass) => {
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
            <h6 style="font-size: 20px; color: #1f2d3d;">Default Password :- ${pass}</h6>
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
    <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-900 text-gray-100 border-solid border-2 border-white-500">
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-violet-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              className="flex-shrink-0 w-5 h-5 rounded-full text-gray-900"
            >
              <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
            </svg>
          </div>
        </div>
        <h2 className="mb-1 text-3xl font-semibold text-center">
          LogIn to Your Insta Munch Account
        </h2>

        <p className="text-sm text-center text-gray-400">
          Don&apos;t have an account?
          <Link
            rel="noopener noreferrer"
            className="hover:text-violet-400 hover:cursor-pointer"
            to={"/SignUp"}
          >
            {" "}
            Sign up here
          </Link>
        </p>

        <div className="my-6 space-y-4 btnall">
          <button
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ri focus:ri border-gray-400 focus:ri hover:text-violet-400 hover:scale-105 transition ease-in-out duration-100"
            onClick={handleGoogleLogin}
          >
            <svg className="h-6 w-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
            <p>LogIn with Google</p>
          </button>
        </div>

        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-400" />
          <p className="px-3 text-gray-400">OR</p>
          <hr className="w-full text-gray-400" />
        </div>

        <form noValidate="" className="space-y-8">
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
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
                value={email}
                autoFocus
                required
                onChange={handleEmailChange}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <Link
                  rel="noopener noreferrer"
                  to={"/ForgetPassword"}
                  className="text-xs hover:text-violet-400 text-gray-400 hover:cursor-pointer"
                >
                  {" "}
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                required
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center w-full px-8 py-3 font-semibold rounded-md bg-violet-200 text-gray-900 hover:bg-violet-300 active:bg-violet-300 btnall"
            onClick={handleLogin}
          >
            <img
              loading="lazy"
              src={signInIcon}
              className="w-6 h-6 mr-2"
              alt="Sign In Icon"
            />
            {isLoading ? "Logging In..." : "Sign In"}
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
    </div>
  );
}

export default LogIn;
