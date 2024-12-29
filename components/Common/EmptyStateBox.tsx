import React from "react";

interface EmptyStateProps {
  message: string; // The main message to display
  description: string; // The descriptive text
  image?: string; // Optional image URL
  onRefresh?: () => void; // Optional callback for the refresh button
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  description,
  image,
  onRefresh,
}) => {
  const defaultImage = "/ufo.svg"; // Default placeholder image

  return (
    <div className="flex flex-col items-center justify-center h-full py-10 ">
      <div className="flex flex-col items-center max-w-md px-6 py-8 space-y-4  ">
        <img
          src={image || defaultImage}
          alt="Empty State Illustration"
          className="w-66 h-66"
        />
        <h2 className="text-xl font-semibold text-gray-800">{message}</h2>
        <p className="text-sm text-gray-600 text-center">{description}</p>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {" "}
            Refresh
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
