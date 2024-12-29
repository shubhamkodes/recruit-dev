import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import JobViewModel from "@app/api/viewmodel/JobViewModel";
import Loader from "@components/Common/Loader";
import "react-toastify/dist/ReactToastify.css";
import {
  getNoticePeriodDisplayValue,
  NoticePeriodStatus,
} from "@app/api/model/NoticePeriodStatus";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";

interface JobDescriptionFormProps {
  onDismiss?: () => void; // Add the onDismiss prop
}

const JobDescriptionForm: React.FC<JobDescriptionFormProps> = ({
  onDismiss,
}) => {
  const [formData, setFormData] = useState({
    keyword: "",
    location: "",
    min_ctc: "",
    max_ctc: "",
    min_exp: "",
    max_exp: "",
    notice_period: NoticePeriodStatus.ImmediateJoiner,
  });

  const [skills, setSkills] = React.useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      toast.info("Processing your request...", {
        autoClose: false,
        position: "bottom-center",
      });

      const response = await JobViewModel.searchJobs(
        formData.keyword,
        formData.min_ctc,
        formData.max_ctc,
        formData.location,
        formData.min_exp,
        formData.max_exp,
        formData.notice_period,
        skills
      );

      toast.dismiss(); // Remove the "Processing..." toast
      toast.success("Successfully Submitted! Now search is in process.", {
        autoClose: 3000,
        position: "top-right",
      });
      if (onDismiss) {
        setTimeout(() => {
          onDismiss(); // Call onDismiss after 3 seconds
        }, 3000);
      }
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
    <div className=" max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg ">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        transition={Slide}
      />
      <br></br>

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

        {/* Notice Period Dropdown */}
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="notice_period"
          >
            Notice Period
          </label>
          <select
            id="notice_period" // Match this with the formData property
            value={formData.notice_period}
            onChange={handleInputChange}
            className="w-full px-3 py-2 pr-8 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          >
            {Object.values(NoticePeriodStatus).map((status) => {
              if (typeof status === "number") {
                return (
                  <option key={status} value={status}>
                    {getNoticePeriodDisplayValue(status)}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </div>

        {/* Multiple Skills Input Field */}
        <div>
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="notice_period"
          >
            Skills
          </label>
          <ReactMultiEmail
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="Enter skills (e.g. Django, Sql, Javascript etc..)"
            emails={skills}
            onChange={(_emails: string[]) => {
              setSkills(_emails);
            }}
            autoFocus={false}
            validateEmail={(email) => {
              const trimmedEmail = email.trim(); // Trim the input to remove leading/trailing whitespace
              return trimmedEmail.length > 0; // Ensure the trimmed input is not empty
            }}
            delimiter="[,;]"
            getLabel={(skill, index, removeSkill) => {
              return (
                <div data-tag key={index}>
                  <div data-tag-item>{skill}</div>
                  <span data-tag-handle onClick={() => removeSkill(index)}>
                    ×
                  </span>
                </div>
              );
            }}
          />{" "}
          {/* Instruction note */}
          <small className="text-gray-500 mt-2 block">
            Enter each skill and press{" "}
            <strong className="font-medium">Enter</strong>,{" "}
            <strong className="font-medium">comma (,)</strong>, or{" "}
            <strong className="font-medium">semicolon (;)</strong> to add it to
            the list.
          </small>
          <br></br>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex w-full justify-center items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
          {isLoading && <Loader />}
        </button>

        <br></br>
        <br></br>
      </form>
    </div>
  );
};

export default JobDescriptionForm;
