// components/FilterRow.tsx
import React from "react";

interface FilterRowProps {
  filters: {
    pay: string;
    jobType: string;
    educationLevel: string;
    locationType: string[];
    remote: string;
    status: string;
  };
  filterOptions: {
    pay: string[];
    jobType: string[];
    educationLevel: string[];
    locationType: string[];
    remote: string[];
  };
  onFilterChange: (filterName: string, value: string) => void;
}

const FilterRow: React.FC<FilterRowProps> = ({
  filters,
  filterOptions,
  onFilterChange,
}) => {
  const handleChange = (filterName: string, value: string) => {
    onFilterChange(filterName, value);
  };

  const handleLocationChange = (value: string) => {
    if (filters.locationType.includes(value)) {
      onFilterChange(
        "locationType",
        filters.locationType.filter((item) => item !== value).join(",")
      );
    } else {
      onFilterChange(
        "locationType",
        [...filters.locationType, value].join(",")
      );
    }
  };

  return (
    <div className="flex space-x-2 w-full">
      {Object.keys(filterOptions).map((filterName) => (
        <div key={filterName} className="flex flex-col">
          <label>
            {filterName.charAt(0).toUpperCase() + filterName.slice(1)}
          </label>
          <select
            multiple={filterName === "locationType"}
            onChange={(e) => {
              if (filterName === "locationType") {
                handleLocationChange(e.target.value);
              } else {
                handleChange(filterName, e.target.value);
              }
            }}
            value={filters[filterName as keyof typeof filters]}
            className="border p-2 rounded"
          >
            {filterOptions[
              filterName as keyof FilterRowProps["filterOptions"]
            ].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className="flex flex-col">
        <label>Status</label>
        <select
          onChange={(e) => handleChange("status", e.target.value)}
          value={filters.status}
          className="border p-2 rounded"
        >
          <option value="All">All</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
};

export default FilterRow;
