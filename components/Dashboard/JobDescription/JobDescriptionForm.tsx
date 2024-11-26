import React from "react";

const JobDescriptionForm: React.FC = () => {
  return (
    <form>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">
        Discover Talented Candidates
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Submit Job Description
      </p>

      <div className="mb-4">
        <label
          className="block text-gray-700 dark:text-gray-300 mb-2"
          htmlFor="role"
        >
          Job Role
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
          type="text"
          id="role"
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
          placeholder="e.g. Gurugram"
        />
      </div>

      <div className="flex flex-row ">
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="minCtc"
          >
            Minimum CTC (in Lakhs)
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
            type="number"
            id="minCtc"
            placeholder="e.g. 3LPA"
          />
        </div>

        <div className="mb-4 ps-24">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="maxCtc"
          >
            Maximum CTC (in Lakhs)
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
            type="number"
            id="maxCtc"
            placeholder="e.g. 50LPA"
          />
        </div>
      </div>

      <div className="flex flex-row ">
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="minExp"
          >
            Minimum Experience (in years)
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
            type="number"
            id="minExp"
            placeholder="e.g. 2"
          />
        </div>

        <div className="mb-4 ps-16">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="maxExp"
          >
            Maximum Experience (in years)
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
            type="number"
            id="maxExp"
            placeholder="e.g. 8"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90"
      >
        Save and next
      </button>
    </form>
  );
};

export default JobDescriptionForm;
