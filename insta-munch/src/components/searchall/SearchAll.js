import React, { useState } from "react";
import RestroData from "../../utils/data/restraurantData.json";
import DishData from "../../utils/data/dishesData.json";

function SearchAll({ getResult }) {
  let restroData = RestroData.BiryaniCards.concat(
    RestroData.RollCards,
    RestroData.PizzaCards,
    RestroData.TeaCards,
    RestroData.BurgerCards,
    RestroData.ChineseCards,
    RestroData.CakeCards,
    RestroData.DessertsCards,
    RestroData.NorthIndianCards,
    RestroData.SouthIndianCards,
    RestroData.SandwichCards,
    RestroData.RollDishCards
  );
  const uniqueRestroIds = new Set();
  const restroFinalData = restroData
    .filter((item) => {
      if (!uniqueRestroIds.has(item?.card?.card?.info?.id)) {
        uniqueRestroIds.add(item?.card?.card?.info?.id);
        return true;
      }
      return false;
    })
    .map((item) => item);
  let dishData = DishData.BiryaniDishCards.concat(
    DishData.PizzaDishCards,
    DishData.RollDishCards,
    DishData.BurgerDishCards,
    DishData.TeaDishCards,
    DishData.ChineseDishCards,
    DishData.CakeDishCards,
    DishData.DessertsDishCards,
    DishData.NorthIndianDishCards,
    DishData.SouthIndianDishCards,
    DishData.SandwichDishCards,
    DishData.IceCreamsDishCards
  );
  const uniqueDishIds = new Set();
  const dishFinalData = dishData
    .filter((item) => {
      if (!uniqueDishIds.has(item?.card?.card?.info?.id)) {
        uniqueDishIds.add(item?.card?.card?.info?.id);
        return true;
      }
      return false;
    })
    .map((item) => item);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const uniqueCuisines = new Set();
  restroFinalData?.forEach((item) => {
    const cuisines = item?.card?.card?.info?.cuisines;
    if (cuisines && Array.isArray(cuisines)) {
      cuisines.forEach((cuisine) => {
        uniqueCuisines.add(cuisine);
      });
    }
  });
  const uniqueCuisinesArray = Array.from(uniqueCuisines);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (inputValue.trim() !== "") {
        searchInAllCards(inputValue.trim());
        setSuggestions("")
      }
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setSuggestions([]); // Clear suggestions if input value is empty
    } else {
      // Filter suggestions based on input value
      const filteredSuggestions = uniqueCuisinesArray.filter((cuisine) =>
        cuisine.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const searchInAllCards = async (searchText) => {
    const restroResult = restroFinalData.filter((item) => {
      const card = item?.card?.card || {};
      return deepSearch(card, searchText);
    });
    const dishResult = dishFinalData.filter((item) => {
      const card = item?.card?.card || {};
      return deepSearch(card, searchText);
    });
    getResult(restroResult, dishResult);
  };

  const deepSearch = (obj, searchText) => {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        if (deepSearch(obj[key], searchText)) {
          return true;
        }
      } else if (
        typeof obj[key] === "string" &&
        obj[key].toLowerCase().includes(searchText.toLowerCase())
      ) {
        return true; 
      }
    }
    return false; 
  };

  return (
    <div className="p-4 mx-10  flex justify-center bg-white sticky top-20 z-20">
      <fieldset className="space-y-1 text-violet-800 font-semibold w-1/3 relative">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="button"
              title="search"
              className="p-1 focus:outline-none focus:ring cursor-default"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                className="w-4 h-4 text-violet-800"
              >
                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search..."
            autoFocus
            className="py-2 pl-10 pr-2 text-sm focus:outline-none bg-violet-100 w-full text-violet-900 focus:shadow-lg rounded-md"
            value={inputValue}
            autoComplete="off"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            onFocus={(e) => {
              setTimeout(() => e.target.select(), 0);
            }}
          />
        </div>
        {suggestions.length > 0 && (
          <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg mt-8 w-full overflow-y-scroll max-h-60 scrollbar-thin z-20">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="py-1 px-3 hover:bg-violet-100 cursor-pointer text-gray-700"
                onClick={() => {
                  setInputValue(suggestion);
                  setSuggestions([]);
                  searchInAllCards(suggestion);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </fieldset>
    </div>
  );
}

export default SearchAll;
