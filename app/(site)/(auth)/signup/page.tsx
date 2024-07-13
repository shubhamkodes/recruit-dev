"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import WhyTalentConnect from "/components/Auth/WhyTalentConnect";
import Loader from "/components/Common/Loader";

const SignUp = () => {
  const router = useRouter();
  const [isPassword, setIsPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    const data = new FormData(e.currentTarget);
    const value = Object.fromEntries(data.entries());
 
  };

  return (
    <section className="min-h-screen py-14 dark:bg-dark lg:py-20">
      <div className="container mx-auto flex w-full flex-wrap">
        <div className="flex min-h-screen w-full  lg:w-1/2">
          <div
            className="wow fadeInUp  relative mx-auto w-full  overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]"
            data-wow-delay=".15s"
          >
            <form onSubmit={handleSubmit}>
              <div className="w-full  text-left">
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

              <div className="mb-[22px]">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-[22px]">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                  className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                />
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
                  required
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
              <Link
                href="/signin"
                className="pl-2 text-primary hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
        <div className="flex min-h-screen w-full   bg-[#F5F9FE] lg:w-1/2">
          <WhyTalentConnect/>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
