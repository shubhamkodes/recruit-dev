"use client";
import ForgotPassword from "@components/Auth/ForgetPassword";
import WhyTalentConnect from "@components/Auth/WhyTalentConnect";
import Loader from "@components/Common/Loader";
import Modal from "@components/Modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useLoginViewModel } from "@app/api/viewmodel/SignInViewModel";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const router = useRouter();
  const { loading, error, login } = useLoginViewModel();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    checkboxToggle: false,
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    toast.info("Signing in...", {
      autoClose: false,
      position: "bottom-center",
    });

    // Simulating API call with a 2-second delay
    const fakeLogin = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Replace `true` with a condition for success or failure simulation
        const isSuccess = true; // Change this to false to simulate a failed login
        isSuccess
          ? resolve(true)
          : reject("Login failed! Please check your credentials.");
      }, 2000);
    });

    // const success = await login(loginData.email, loginData.password);
    await fakeLogin;
    toast.dismiss();

    if (true) {
      toast.success("Login successful!", {
        autoClose: 2000,
        position: "bottom-center",
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000); // Wait for 2 seconds before redirecting
    } else {
      toast.error(error || "Login failed! Please check your credentials.", {
        autoClose: 2000,
        position: "bottom-center",
      });
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
                <div className="mb-[22px]">
                  <input
                    type="email"
                    placeholder="Company Email ID"
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-4 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-[22px] relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
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
                    type="button"
                    onClick={handleModalOpen}
                    className="cursor-pointer text-base text-primary hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="mb-9">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-4 rounded-full text-base text-white transition duration-300 ease-in-out hover:bg-primary/90"
                  >
                    Sign In {loading && <Loader />}
                  </button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
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
          <div className="flex min-h-screen w-full lg:w-1/2">
            <WhyTalentConnect />
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ForgotPassword onClose={handleModalClose} />
      </Modal>
    </div>
  );
};

export default Signin;
