"use client";

import { useState } from "react";
import { ToastContainer, Slide, toast } from "react-toastify";
import AuthViewModel from "@app/api/viewmodel/AuthViewModel";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted with:', { email, password });

    try {
      await AuthViewModel.login(email, password);
      toast.success("Login successful!", {
        position: "bottom-center",
        autoClose: 4000,
        transition: Slide,
      });
      console.log('AuthViewModel login success');
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
        position: "bottom-center",
        autoClose: 4000,
        transition: Slide,
      });
      console.error('AuthViewModel login failed:', error);
    }
  };

  return (
    <div>
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

      <section className="min-h-screen py-14 dark:bg-dark lg:py-20">
        <div className="container mx-auto flex w-full flex-wrap">
          <div className="flex min-h-screen w-full lg:w-1/2">
            <div className="relative mx-auto w-full overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <form onSubmit={handleLogin}>
                <div className="w-full max-w-xs text-left">
                  <h1 className="py-10 text-4xl font-bold leading-tight">Login</h1>
                </div>
                <div className="mb-[22px]">
                  <input
                    type="email"
                    placeholder="Company Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-4 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-[22px] relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-4 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                  >
                    {passwordVisible ? "🙈" : "👁️"}
                  </button>
                </div>
                <div className="mb-9">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-4 text-base text-white transition duration-300 ease-in-out hover:bg-primary/90"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signin;