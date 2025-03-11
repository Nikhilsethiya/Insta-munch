import React from "react";

function ButtonFilters({ filterButtons, filterStates, toggleFilter }) {
  return (
    <>
      {filterButtons.map((button, index) => (
        <button
          key={index}
          className={`flex justify-center py-1 items-center bg-violet-100 hover:text-violet-700 px-4 rounded-full hover:bg-violet-200 border-2 font-semibold text-gray-900 ${
            filterStates[button.filterName]
              ? "bg-violet-100 border-gray-900 text-violet-600  cursor-default"
              : "border-violet-200"
          }`}
          onClick={() => {!filterStates[button.filterName]&&toggleFilter(button.filterName)}}
        >
          {button.label}
          {filterStates[button.filterName] && (
            <svg
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 ml-1 text-gray-500 hover:text-gray-900"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                toggleFilter(button.filterName);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      ))}
    </>
  );
}

export default ButtonFilters;
