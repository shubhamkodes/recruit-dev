"use client";

import React, { useState, useEffect } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [isOtpEnabled, setIsOtpEnabled] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResendEnabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendEnabled(true);
    }
    return () => clearInterval(interval);
  }, [isResendEnabled, timer]);

  const handleGoClick = () => {
    if (email) {
      setIsEmailEntered(true);
      setIsOtpEnabled(true);
      setIsSubmitEnabled(true);
      setIsResendEnabled(false);
      setTimer(30);
      // Send OTP to email
    }
  };

  const handleEditClick = () => {
    setIsEmailEntered(false);
    setIsOtpEnabled(false);
    setIsSubmitEnabled(false);
    setIsResendEnabled(false);
    setOtp("");
  };

  const handleResendOtpClick = () => {
    if (isResendEnabled) {
      // Resend OTP to email
      setIsResendEnabled(false);
      setTimer(30);
    }
  };

  return (
    <div className="flex items-center justify-center  ">
      <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg ">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Forgot Password
        </h2>
        <div className="mb-4">
          <div className="relative mb-4 w-full">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isEmailEntered}
              placeholder="Company Email ID"
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-5 py-3 pr-16 text-base text-gray-900 dark:text-gray-100 outline-none transition placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary focus-visible:shadow-none"
            />
            <button
              onClick={isEmailEntered ? handleEditClick : handleGoClick}
              className={`px-4 py-2 text-white font-semibold rounded-r absolute right-2 top-1/2 -translate-y-1/2 transform ${
                isEmailEntered ? "bg-gray-400" : "bg-primary"
              }`}
            >
              {isEmailEntered ? "Edit" : "GO"}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
            disabled={!isOtpEnabled}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-5 py-3 pr-16 text-base text-gray-900 dark:text-gray-100 outline-none transition placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary focus-visible:shadow-none"
          />
          <button
            onClick={handleResendOtpClick}
            disabled={!isResendEnabled}
            className="text-orange-500 dark:text-orange-400 text-sm float-right mt-1"
          >
            Resend OTP {timer > 0 && `(${timer}s)`}
          </button>
        </div>
        <div className="pt-10">
          <button
            onClick={() => {}}
            disabled={!isSubmitEnabled}
            className="w-full p-2 bg-gray-300 dark:bg-gray-600 text-white font-semibold rounded disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
