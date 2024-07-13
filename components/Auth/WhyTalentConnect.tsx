import React from "react";
import Image from "next/image";

const WhyTalentConnect = () => {
  return (
    <div className="flex min-h-screen w-full bg-[#F5F9FE] dark:bg-gray-900 transition-colors duration-300">
      <div className="lmb-8 flex w-full px-16 py-16 lg:mb-0">
        <div className="text-center lg:text-left">
          <h2 className="px- mb-4 text-2xl font-bold text-gray-900 dark:text-white">Why Talent Connect</h2>
          <div className="mb-4 flex flex-col justify-around py-8 lg:flex-row">
            <div className="mb-4 lg:mb-0">
              <Image
                src="/auth/ic-auth-1.svg"
                alt="Networking"
                width={60}
                height={60}
                className="mx-auto lg:mx-0"
              />
              <p className="text-gray-900 dark:text-gray-200">Exclusive Networking Opportunities</p>
            </div>
            <div className="mb-4 lg:mb-0">
              <Image
                src="/auth/ic-auth-2.svg"
                alt="Networking"
                width={60}
                height={60}
                className="mx-auto lg:mx-0"
              />
              <p className="text-gray-900 dark:text-gray-200">Comprehensive Career Support</p>
            </div>
            <div className="mb-4 lg:mb-0">
              <Image
                src="/auth/ic-auth-3.svg"
                alt="Networking"
                width={60}
                height={60}
                className="mx-auto lg:mx-0"
              />
              <p className="text-gray-900 dark:text-gray-200">Personalized Matching Algorithms</p>
            </div>
          </div>
          <Image
            src="/auth/ic-auth-4.png"
            alt="Talent Connect"
            width={500}
            height={500}
            className="mx-auto mt-6 h-auto max-w-full lg:mx-0"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyTalentConnect;
