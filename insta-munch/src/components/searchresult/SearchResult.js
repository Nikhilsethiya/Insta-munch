import React, { useState } from "react";
import SearchRestaurants from "../searchrestaurants/SearchRestaurants";
import SearchDishes from "../searchdishes/SearchDishes";

function SearchResult({ restroResult, dishResult }) {
  const [activeTab, setActiveTab] = useState("Restaurants");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div>
      <div className=" md:mx-20 pb-2 border-b-2 sticky  top-36 bg-white py-2 z-10">
        <div className="flex items-center space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap  text-gray-800 ">
          <button
            className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${
              activeTab === "Restaurants"
                ? "border-violet-800 text-gray-800 font-bold"
                : "border-violet-200 text-gray-600 font-semibold"
            }`}
            onClick={() => handleTabClick("Restaurants")}
          >
            Restaurants
          </button>
          <button
            className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${
              activeTab === "Dishes"
                ? "border-violet-800 text-gray-800 font-bold"
                : "border-violet-200 text-gray-600 font-semibold"
            }`}
            onClick={() => handleTabClick("Dishes")}
          >
            Dishes
          </button>
        </div>
      </div>
      <div className="mt-8">
        {activeTab === "Restaurants" && (
          <SearchRestaurants restroResult={restroResult} />
        )}
        {activeTab === "Dishes" && <SearchDishes dishResult={dishResult} />}
      </div>
    </div>
  );
}

export default SearchResult;
