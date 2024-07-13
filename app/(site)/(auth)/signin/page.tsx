"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import ForgotPassword from "/components/Auth/ForgetPassword";
import WhyTalentConnect from "/components/Auth/WhyTalentConnect";
import Loader from "/components/Common/Loader";
import Modal from "/components/Modal";


const Signin = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    checkboxToggle: false,
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div>
      <section className="min-h-screen py-14 dark:bg-dark lg:py-20">
        <div className="container mx-auto flex w-full flex-wrap">
          <div className="flex min-h-screen w-full lg:w-1/2">
            <div
              className="wow fadeInUp  relative mx-auto w-full  overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]"
              data-wow-delay=".15s"
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="w-full max-w-xs text-left">
                  <h1 className="py-10 text-4xl font-bold leading-tight">
                    Login
                  </h1>
                </div>
                <div className="mb-[22px]">
                  <input
                    type="email"
                    placeholder="Company Email ID"
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-[22px]">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4 flex items-center justify-between py-2">
                  <label className="inline-flex items-center text-primary">
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2 text-primary"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember Me
                  </label>

                  <button
                    onClick={handleModalOpen}
                    className="cursor-pointer text-base text-primary hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="mb-9">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-primary/90"
                  >
                    Sign In {loading && <Loader />}
                  </button>
                </div>
              </form>

              <p className="text-body-secondary text-base">
                <Link
                  href="/otp-login"
                  className="text-primary hover:underline"
                >
                  Use OTP to Login
                </Link>
              </p>
            </div>
          </div>
          <div className="flex min-h-screen w-full  lg:w-1/2">
            <WhyTalentConnect />
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ForgotPassword />
      </Modal>
    </div>
  );
};

export default Signin;
