// components/FilterButton.tsx

import React, { useState } from 'react';

interface FilterButtonProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onSelectOption: (option: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, options, selectedOptions, onSelectOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    onSelectOption(option);
  };

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={toggleDropdown}
        className="p-2 bg-white rounded shadow-md border border-gray-300 flex items-center cursor-pointer"
      >
        {label}
        {selectedOptions.length > 0 && <span className="ml-2 text-red-500">•</span>}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      {isOpen && (
        <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-300 rounded shadow-lg">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`block px-4 py-2 text-sm text-left w-full ${
                  selectedOptions.includes(option) ? 'bg-gray-200' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
