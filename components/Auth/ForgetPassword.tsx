"use client";

import React, { useState, useEffect } from "react";
import { useLoginViewModel } from "@app/api/viewmodel/SignInViewModel";
import Loader from "@components/Common/Loader";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface ForgotPasswordProps {
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onClose }) => {
  const { loading, error, sendOtp, resetPassword } = useLoginViewModel();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [isOtpEnabled, setIsOtpEnabled] = useState(false);
  const [isNewPasswordEnabled, setIsNewPasswordEnabled] = useState(false);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout | number;
    if (!isResendEnabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendEnabled(true);
    }
    return () => clearInterval(interval);
  }, [isResendEnabled, timer]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
    }
  }, [error]);

  const handleGoClick = async () => {
    if (email) {
      const response = await sendOtp(email);
      if (response) {
        toast.success("OTP sent to your email!", {
          position: "bottom-center",
        });
        setIsEmailEntered(true);
        setIsOtpEnabled(true);
        setIsResendEnabled(false);
        setTimer(30);
      } else {
        toast.error("Failed to send OTP. Please try again.", {
          position: "bottom-center",
        });
      }
    }
  };

  const handleEditClick = () => {
    setIsEmailEntered(false);
    setIsOtpEnabled(false);
    setIsNewPasswordEnabled(false);
    setIsResendEnabled(false);
    setOtp("");
    setNewPassword("");
  };

  const handleResendOtpClick = async () => {
    if (isResendEnabled) {
      const response = await sendOtp(email);
      if (response) {
        toast.success("OTP resent to your email!", {
          position: "bottom-center",
        });
        setIsResendEnabled(false);
        setTimer(30);
      } else {
        toast.error("Failed to resend OTP. Please try again.", {
          position: "bottom-center",
        });
      }
    }
  };

  const handleOtpSubmit = async () => {
    if (otp) {
      setIsNewPasswordEnabled(true);
      setIsOtpEnabled(false);
    }
  };

  const handleNewPasswordSubmit = async () => {
    if (newPassword) {
      const response = await resetPassword(email, parseInt(otp), newPassword);
      if (response) {
        toast.success("Password reset successful!", {
          position: "bottom-center",
          onClose: onClose,
        });
      } else {
        toast.error("Password reset failed. Please try again.", {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
      <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg">
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
        {isOtpEnabled && (
          <div className="mb-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-5 py-3 pr-16 text-base text-gray-900 dark:text-gray-100 outline-none transition placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary focus-visible:shadow-none"
            />
            <button
              onClick={handleOtpSubmit}
              className="w-full p-2 mt-2 bg-primary text-white font-semibold rounded"
            >
              Verify OTP
            </button>
            <button
              onClick={handleResendOtpClick}
              disabled={!isResendEnabled}
              className="text-orange-500 dark:text-orange-400 text-sm float-right mt-1"
            >
              Resend OTP {timer > 0 && `(${timer}s)`}
            </button>
          </div>
        )}
        {isNewPasswordEnabled && (
          <div className="mb-4">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-5 py-3 pr-16 text-base text-gray-900 dark:text-gray-100 outline-none transition placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary focus-visible:shadow-none"
            />
            <button
              onClick={handleNewPasswordSubmit}
              className="w-full p-2 mt-2 bg-primary text-white font-semibold rounded"
            >
              Submit New Password
            </button>
          </div>
        )}
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default ForgotPassword;
