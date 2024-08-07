"use client";
import React, { useState, FormEvent } from "react";
import { useLoginViewModel } from "@app/api/viewmodel/SignInViewModel";
import { useRouter } from "next/navigation";
import Loader from "@components/Common/Loader";
import WhyTalentConnect from "@components/Auth/WhyTalentConnect";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const OtpLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const { loading, error, loginViaOtpSend, loginViaOtpVerify } = useLoginViewModel();

  const handleSendOtp = async () => {
    const response = await loginViaOtpSend(email);
    if (response) {
      setOtpSent(true);
      toast.success("OTP sent to your email!", {
        position: "bottom-center",
      });
    } else {
      toast.error("Failed to send OTP. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (otpSent) {
      const response = await loginViaOtpVerify(email, parseInt(otp));
      if (response) {
        toast.success("Login successful!", {
          position: "bottom-center",
          onClose: () => router.push("/dashboard"),
        });
      } else {
        toast.error("Login failed! Please check your OTP.", {
          position: "bottom-center",
        });
      }
    } else {
      await handleSendOtp();
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
              <div className="w-full max-w-xs text-left">
                <h1 className="py-10 text-4xl font-bold leading-tight">
                  Login
                </h1>
              </div>

              {otpSent ? (
                <>
                  <p className="mt-1 pb-12 text-left text-sm text-gray-500">
                    {email}{" "}
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                  </p>
                </>
              ) : null}

              {!otpSent ? (
                <div className="mb-[22px]">
                  <input
                    type="email"
                    placeholder="Enter Company Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                  <p className="mt-1 pt-4 text-left text-sm text-gray-500">
                    You will receive an OTP on this email id
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-[22px]">
                    <input
                      type="password"
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <p className="mt-1 pb-8 text-left text-sm text-gray-500">
                    An OTP has been sent to {email}
                  </p>
                </>
              )}

              <div className="mb-9">
                <button
                  type="submit"
                  className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-primary/90"
                >
                  {!otpSent ? "Get OTP" : "Login"} {loading && <Loader />}
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
        <div className="flex min-h-screen w-full bg-[#F5F9FE] lg:w-1/2">
          <WhyTalentConnect />
        </div>
      </div>
    </section>
  );
};

export default OtpLogin;
