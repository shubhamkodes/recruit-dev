import React from 'react';

const JobDescriptionForm: React.FC = () => {
  return (
    <form>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">Discover Talented Candidates</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Submit Job Description</p>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="candidateType">Which kind of candidate you are looking for</label>
        <input className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200" type="text" id="candidateType" placeholder="MNC" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="role">Select the role want to search?</label>
        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200" id="role">
          <option>Full</option>
          <option>Full Mobile/App developers</option>
          <option>Python developer</option>
          <option>Technical leads</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="category">Category want to hiring from</label>
        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200" id="category">
          <option>Fin</option>
          <option>Fintech</option>
          <option>Fintech services</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="description">Add JD</label>
        <textarea className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200 h-32" id="description" placeholder="Write/Paste your Job Description here .."></textarea>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="upload">Upload Doc</label>
        <input type="file" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200" id="upload" />
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">(pdf, docs) Max size 5MB</p>
      </div>
      <button type="submit" className="w-full px-6 py-3 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90">
        Save and next
      </button>
    </form>
  );
};

export default JobDescriptionForm;
