import React, { useState, useRef, useEffect, useCallback } from "react";
import { IconButton } from "@material-tailwind/react";

function ModalOpt({ closeModal, email, createUser }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [resendCounter, setResendCounter] = useState(0);
  const [generateotp, setGenerateOtp] = useState(
    Math.floor(1000 + Math.random() * 9000)
  );
  const [latestGeneratedOtp, setLatestGeneratedOtp] = useState(generateotp); 
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    if (value.length <= 1 && !isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "") {
        if (index < 3) {
          inputRefs[index + 1].current.focus();
        } else {
          const filledOtp = newOtp.join("");
          if (filledOtp.length === 4) {
            checkOtp(parseInt(filledOtp));
          }
        }
      } else {
        if (index > 0) {
          inputRefs[index - 1].current.focus();
        }
      }
    }
  };

  const sendOtpEmail = useCallback(async (recipientEmail) => {
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
                  <h2 style="font-size: 32px; color: #1f2d3d;">OTP :- ${generateotp}</h2>
                  <p style="font-size: 16px; color: #3b3f44;">This OTP is valid for the next 5 minutes.</p>
                </div>
              </div>
            </div>
          </div>`;

    const body = {
      sender: { email: "informtoshreyans@gmail.com" },
      to: [{ email: recipientEmail }],
      subject: "OTP for Verification",
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
  }, []);

  const checkOtp = (typedotp) => {
    if (typedotp === latestGeneratedOtp) {
      setGenerateOtp("");
      setLatestGeneratedOtp("");
      closeModal();
      createUser();
    } else {
      setError("Wrong OTP");
    }
  };

  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }, []);

  const debouncedSendOtpEmail = useCallback(debounce(sendOtpEmail, 1000), [
    sendOtpEmail,
    debounce,
  ]);

  useEffect(() => {
    debouncedSendOtpEmail(email);
    return () => clearTimeout(debouncedSendOtpEmail);
  }, [email, debouncedSendOtpEmail]);

  const handleKeyDown = (index, event) => {
    if (event.key === "ArrowRight" && index < 3) {
      inputRefs[index + 1].current.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newOtp = Math.floor(1000 + Math.random() * 9000);
      setGenerateOtp(newOtp);
      setLatestGeneratedOtp(newOtp); // Update latestGeneratedOtp when generating a new OTP
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let timer;
    if (resendCounter > 0) {
      timer = setInterval(() => {
        setResendCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    } else {
      setShowResend(true);
    }
    return () => clearInterval(timer);
  }, [resendCounter]);

  useEffect(() => {
    if (resendCounter === 0) {
      setResendCounter(30);
    }
  }, [resendCounter]);

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setResendCounter(30);
    setShowResend(false);
    sendOtpEmail(email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative mx-auto rounded-md shadow-md  bg-gray-900 text-gray-100">
        <div className="flex items-center justify-between p-2 space-x-4">
          <div className="flex items-center space-x-4 font-bold ml-2 text-xl">
            Enter OTP from E-mail
          </div>
          <IconButton
            className="flex items-center space-x-1  text-gray-300"
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
        <div className="px-8 w-full sm:flex sm:space-x-6 pb-3 flex justify-center">
          <div>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onFocus={(e) => {
                  setTimeout(() => e.target.select(), 0);
                }}
                autoFocus={index === 0}
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={inputRefs[index]}
                className="w-10 h-10 border rounded-md text-lg text-center focus:outline-none focus:border-violet-500 focus:ring focus:ring-violet-300 mx-2 mt- text-violet-900 font-bold"
              />
            ))}
          </div>
        </div>
        {showResend && (
          <div
            className="px-6 w-full sm:flex sm:space-x-6 pb-2 flex text-xs text-gray-300 hover:text-violet-500 hover:underline cursor-pointer"
            onClick={handleResend}
          >
            Resend OTP
          </div>
        )}
        {!showResend && (
          <div className="px-6 w-full sm:flex sm:space-x-6 pb-2 flex text-xs text-violet-200">
            Resend OTP in {resendCounter} seconds
          </div>
        )}
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

export default ModalOpt;
