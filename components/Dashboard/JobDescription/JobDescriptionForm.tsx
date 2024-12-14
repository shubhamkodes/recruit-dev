import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import JobViewModel from "@app/api/viewmodel/JobViewModel";
import Loader from "@components/Common/Loader";
import "react-toastify/dist/ReactToastify.css";

const JobDescriptionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    keyword: "",
    location: "",
    min_ctc: "",
    max_ctc: "",
    min_exp: "",
    max_exp: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      toast.info("Processing your request...", {
        autoClose: false,
        position: "top-right",
      });

      // Call the API
      const response = await JobViewModel.searchJobs(
        formData.keyword,
        formData.min_ctc,
        formData.max_ctc,
        formData.location,
        formData.min_exp,
        formData.max_exp
      );

      toast.dismiss(); // Remove the "Processing..." toast
      toast.success("Successfully Submitted! Now search is in process.", {
        autoClose: 3000,
        position: "top-right",
      });
      console.log("Job Search Task ID:", response.data.task_id);
    } catch (error: any) {
      toast.dismiss();
      console.error("Job Search Error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";

      toast.error(errorMessage, {
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        transition={Slide}
      />

      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">
          Discover Talented Candidates
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Submit Job Description
        </p>

        {/* Keyword Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="keyword"
          >
            Job Role
          </label>
          <input
            type="text"
            id="keyword"
            value={formData.keyword}
            onChange={handleInputChange}
            placeholder="e.g. Python Developer"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
        </div>

        {/* Location Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g. Gurugram"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
        </div>

        {/* CTC and Experience Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="min_ctc"
            >
              Minimum CTC (in Lakhs)
            </label>
            <input
              type="text"
              id="min_ctc"
              value={formData.min_ctc}
              onChange={handleInputChange}
              placeholder="e.g. 3LPA"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="max_ctc"
            >
              Maximum CTC (in Lakhs)
            </label>
            <input
              type="text"
              id="max_ctc"
              value={formData.max_ctc}
              onChange={handleInputChange}
              placeholder="e.g. 50LPA"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="min_exp"
            >
              Minimum Experience (in years)
            </label>
            <input
              type="text"
              id="min_exp"
              value={formData.min_exp}
              onChange={handleInputChange}
              placeholder="e.g. 2"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="max_exp"
            >
              Maximum Experience (in years)
            </label>
            <input
              type="text"
              id="max_exp"
              value={formData.max_exp}
              onChange={handleInputChange}
              placeholder="e.g. 8"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex w-full justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
          {isLoading && <Loader />}
        </button>
      </form>
    </div>
  );
};

export default JobDescriptionForm;
