"use client";

import { useEffect } from "react";

const Error = ({ error, reset }: { error: any; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="mx-auto h-24 w-24 text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-full w-full"
          >
            <path
              fillRule="evenodd"
              d="M11.25 3.75a.75.75 0 011.5 0v8.25h-1.5V3.75zm.75 12a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 1.5a10.5 10.5 0 100 21 10.5 10.5 0 000-21zm0 19.5a9 9 0 110-18 9 9 0 010 18z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mt-4">Something went wrong</h1>
        <p className="mt-2 text-gray-600">
          An unexpected error has occurred. Please try refreshing the page, or
          contact support if the problem persists.
        </p>
        <button
          onClick={reset}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default Error;
