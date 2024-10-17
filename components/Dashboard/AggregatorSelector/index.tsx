"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import VerifyEmailScreen from "./VerificationEmail/VerificationEmail";
import Modal from "@components/Modal";
import { Aggregator } from "@models/Aggregator";
import useUserViewModel from "@app/api/viewmodel/AggregatorViewModel";
const aggregators: Aggregator[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Select a role and we'll show you relevant jobs for it!",
    rating: 3.9,
    reviews: 1.4,
    logo: "/dashboard/linkedin.png",
  },
  {
    id: "naukri",
    name: "Naukri",
    description: "Select a role and we'll show you relevant jobs for it!",
    rating: 3.4,
    reviews: 3.1,
    logo: "/dashboard/naukri.png",
  },
];

interface AggregatorSelectorProps {
  onClose: () => void;
}

const AggregatorSelector: React.FC<AggregatorSelectorProps> = ( onClose ) => {
 
  const handleClose = () => {
    onClose.onClose()
  };

  const {
    email,
    setEmail,
    password,
    setPassword,
    aggregator,
    setAggregator,
    otp,
    setOtp,
    otpResponse,
    verificationResponse,
    error,
    sendOtp,
    verifyOtp,
  } = useUserViewModel();

  const [isEmailVerificationOpen, setEmailVerificationOpen] = useState(false);
  const [selectedAggregator, setSelectedAggregator] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleEmailVerificationOpen = () => setEmailVerificationOpen(true);
  const handleEmailVerificationClose = () => setEmailVerificationOpen(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAuthorized(e.target.checked);
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      await sendOtp();
      if (otpResponse) {
        handleEmailVerificationOpen();
      }
    }
  };

  const handleVerifyOtp = async () => {
    await verifyOtp();
    handleEmailVerificationClose();
    handleClose()
    if (verificationResponse?.error) {
      setErrors({ email: verificationResponse.error });
    } else {
      handleEmailVerificationClose();
    }
  };

  return (
    <div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Select website to link aggregator
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {aggregators.map((aggregator) => (
            <div
              key={aggregator.id}
              className={`p-4 border-2 rounded-lg cursor-pointer shadow-md ${
                selectedAggregator === aggregator.id
                  ? "border-orange-500"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedAggregator(aggregator.id)}
            >
              <Image
                src={aggregator.logo}
                alt={aggregator.name}
                width={176}
                height={49}
                className="mb-2"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {aggregator.description}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-green-500">★ {aggregator.rating}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  | {aggregator.reviews}k+ review
                </span>
              </div>
            </div>
          ))}
          <div className="p-4 border rounded-lg cursor-not-allowed border-gray-300">
            <div className="w-12 h-12 mb-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <h3 className="text-lg font-semibold text-gray-300 dark:text-gray-600">
              Coming soon
            </h3>
          </div>
        </div>
        {selectedAggregator && (
          <>
            <p className="font-bold py-4 text-lg">
              Enter email id and password for {selectedAggregator}
            </p>
            <form className="w-full">
              <div className="mb-4 flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Company email ID"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full p-2 border rounded-lg text-gray-900 dark:text-gray-100 dark:bg-gray-700"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border rounded-lg text-gray-900 dark:text-gray-100 dark:bg-gray-700 ml-4"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="ml-2 text-sm text-primary dark:text-primary"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 pb-4">{errors.email}</p>
              )}
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 pb-4">
                  {errors.password}
                </p>
              )}
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="authorize"
                  checked={isAuthorized}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label
                  htmlFor="authorize"
                  className="text-gray-900 dark:text-gray-100 text-sm"
                >
                  I authorize Talent Connect to access {selectedAggregator} and
                  log in on my behalf.
                </label>
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="bg-orange-500 text-white py-2 px-4 rounded-lg"
                  onClick={handleSubmit}
                >
                  Link now
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <Modal
        isOpen={isEmailVerificationOpen}
        onClose={handleEmailVerificationClose}
      >
        <VerifyEmailScreen
          email={email}
          otp={otp}
          setOtp={setOtp}
          verifyOtp={handleVerifyOtp}
          error={error}
        />
      </Modal>
    </div>
  );
};

export default AggregatorSelector;