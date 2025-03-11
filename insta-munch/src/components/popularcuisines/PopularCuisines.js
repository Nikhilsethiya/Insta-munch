import React from "react";
import Data from "../../utils/data/popularCuisines.json";
import { CAROUSEL_IMAGE_URL } from "../../utils/constants";

function PopularCuisines() {
  const imageURL = CAROUSEL_IMAGE_URL;
  return (
    <div className="text-gray-50 mx-4 md:mx-20 pb-5 border-b-2 mt-8">
      <div className="text-black font-bold text-3xl">
        <p className="ml-6  items-start">Popular Cuisines</p>

        <div className="p-0 overflow-x-auto justify-center flex flex-wrap m-4">
          {Data.info.map((item) => (
            <div
              className="max-w-xs rounded-md shadow-md bg-gray-50 text-gray-800 mx-10 my-6"
              key={item.id}
            >
              <img
                src={`${imageURL}/${item.imageId}`}
                alt=""
                className="object-cover object-center w-full rounded-t-md h-40  bg-gray-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularCuisines;
