import ApiService from "@app/api/service/ApiService";
import Loader from "@components/Common/Loader";
import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";

const JobDescriptionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    keyword: "",
    location: "",
    min_ctc: "",
    max_ctc: "",
    min_exp: "",
    max_exp: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      toast.info("Processing...", {
        autoClose: false,
        position: "bottom-center",
      });

      // Simulating API call with a 2-second delay
      const fakeApiCall = new Promise((resolve, reject) => {
        setTimeout(() => {
          // Replace true/false to simulate success or failure
          const isSuccess = true; // Change to false to simulate an error
          isSuccess
            ? resolve({ data: { message: "Simulated successful response" } })
            : reject({
                response: { data: { message: "Simulated error response" } },
              });
        }, 2000);
      });
      toast.dismiss();

      const response: any = await fakeApiCall;
      toast.success("Successfully Submitted! Now search is in process.", {
        autoClose: 2000,
        position: "bottom-center",
      });
      console.log("Simulated API Response:", response.data);

      // Handle success (e.g., navigate to the next step or display a success message)
    } catch (error: any) {
      console.error("Simulated API Error:", error);

      // Determine the error message
      const errorMessage =
        error.response?.data?.message || // Simulated backend error message if available
        error.message || // JavaScript error message
        "Something went wrong!!"; // Default fallback message

      toast.error(errorMessage, {
        autoClose: 2000,
        position: "bottom-center",
      });
    }
    setIsLoading(false);
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

      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">
          Discover Talented Candidates
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Submit Job Description
        </p>

        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="keyword"
          >
            Job Role
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
            type="text"
            id="keyword"
            value={formData.keyword}
            onChange={handleInputChange}
            placeholder="e.g. Python Developer"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
            type="text"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g. Gurugram"
          />
        </div>

        <div className="flex flex-row ">
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="min_ctc"
            >
              Minimum CTC (in Lakhs)
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
              type="text"
              id="min_ctc"
              value={formData.min_ctc}
              onChange={handleInputChange}
              placeholder="e.g. 3LPA"
            />
          </div>

          <div className="mb-4 ps-24">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="max_ctc"
            >
              Maximum CTC (in Lakhs)
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
              type="text"
              id="max_ctc"
              value={formData.max_ctc}
              onChange={handleInputChange}
              placeholder="e.g. 50LPA"
            />
          </div>
        </div>

        <div className="flex flex-row ">
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="min_exp"
            >
              Minimum Experience (in years)
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
              type="text"
              id="min_exp"
              value={formData.min_exp}
              onChange={handleInputChange}
              placeholder="e.g. 2"
            />
          </div>

          <div className="mb-4 ps-16">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="max_exp"
            >
              Maximum Experience (in years)
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
              type="text"
              id="max_exp"
              value={formData.max_exp}
              onChange={handleInputChange}
              placeholder="e.g. 8"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-4 rounded-full text-base text-white transition duration-300 ease-in-out hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"} {isLoading && <Loader />}
        </button>
      </form>
    </div>
  );
};

export default JobDescriptionForm;
