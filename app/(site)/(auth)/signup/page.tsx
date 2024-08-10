"use client";
import React, { useState } from "react";
import WhyTalentConnect from "@components/Auth/WhyTalentConnect";
import Loader from "@components/Common/Loader";
import Link from "next/link";
import { FormEvent } from "react";
import { AuthViewModel } from "@app/api/viewmodel/SignupViewModel";
import { User } from "@app/api/model/CommonUser";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from "next/navigation";

const SignUp = () => {
  const { loading, error, signUp } = AuthViewModel();
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user: User = {
      username: formData.get("name") as string,
      company: formData.get("companyName") as string,
      company_email: formData.get("companyEmailID") as string,
      password: formData.get("password") as string,
      phone_no: formData.get("mobileNumber") as string,
      job_title: formData.get("jobTitle") as string,
    };

    const response = await signUp(user);
    if (response) {
      toast.success("Sign up successful! Redirecting to login...", {
        position: "bottom-center",
      });
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } else {
      toast.error(error || "Sign up failed! Please try again.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <section className="min-h-screen py-14 dark:bg-dark lg:py-20">
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
      <div className="container mx-auto flex w-full flex-wrap">
        <div className="flex min-h-screen w-full lg:w-1/2">
          <div
            className="wow fadeInUp relative mx-auto w-full overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]"
            data-wow-delay=".15s"
          >
            <form onSubmit={handleSubmit}>
              <div className="w-full text-left">
                <h1 className="mb-4 text-3xl font-bold">
                  Create your talent connect profile
                </h1>
                <p className="mb-10">
                  Join TalentConnect and Transform Your Hiring Today
                </p>
              </div>
              <div className="mb-[22px]">
                <input
                  type="text"
                  placeholder="Your full name"
                  name="name"
                  required
                  className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-[22px]">
                <input
                  type="text"
                  placeholder="Company name"
                  name="companyName"
                  required
                  className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-[22px]">
                <input
                  type="text"
                  placeholder="Company email ID"
                  name="companyEmailID"
                  required
                  className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-[22px] relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                  className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="mb-[22px] relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                  className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="mb-[22px]">
                <input
                  type="mobile"
                  placeholder="Mobile number"
                  name="mobileNumber"
                  required
                  className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-[22px]">
                <input
                  type="text"
                  placeholder="Job title (Optional)"
                  name="jobTitle"
                  className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-9">
                <button
                  type="submit"
                  className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-orange-dark"
                >
                  Sign Up {loading && <Loader />}
                </button>
              </div>
            </form>

            {error && <p className="text-red-500">{error}</p>}

            <p className="text-body-secondary mb-4 text-base">
              By creating an account you are agree with our{" "}
              <a href="/#" className="text-primary hover:underline">
                Privacy
              </a>{" "}
              and{" "}
              <a href="/#" className="text-primary hover:underline">
                Policy
              </a>
            </p>

            <p className="text-body-secondary text-base">
              Already have an account?
              <Link href="/signin" className="pl-2 text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
        <div className="flex min-h-screen w-full bg-[#F5F9FE] lg:w-1/2">
          <WhyTalentConnect />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
