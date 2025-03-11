import React, { useEffect, useState } from "react";
import { CAROUSEL_IMAGE_URL } from "../../utils/constants";
import Add from "../../images/add.png";
import Footer from "../../components/footer/Footer";

function SearchRestaurants({ restroResult }) {
  const imageURL = CAROUSEL_IMAGE_URL;
  const [showMoreCount, setShowMoreCount] = useState(10);

  const handleShowMore = () => {
    setShowMoreCount((prevCount) => prevCount + 10);
  };
  
  useEffect(() => {
    setShowMoreCount(10);
  }, [restroResult]);

  return (
    <>
      <div className="md:mx-20 pb-5 border-b-2 mt-8">
        <section className="my-8 flex justify-center ">
          {restroResult && restroResult.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 w-3/4 p-6 bg-violet-100 rounded">
              {restroResult?.slice(0, showMoreCount).map((item) => (
                <div
                  className="flex items-center bg-white rounded-md"
                  key={item?.card?.card?.info?.id}
                >
                  <div className="flex-shrink-0  m-8 sm:h-32 sm:w-32 relative">
                    <img
                      src={`${imageURL}/${item?.card?.card?.info?.cloudinaryImageId}`}
                      alt="image"
                      className=" w-full h-full rounded-2xl "
                    />
                    <div className="flex flex-col w-3/4 items-center absolute top-24 justify-center ml-4 text-center text-orange-600 bg-violet-100 rounded-xl  shadow-lg  shadow-stone-400 ">
                      {item?.card?.card?.info?.aggregatedDiscountInfoV3
                        ?.header && (
                        <p className="font-bold text-lg">
                          {
                            item?.card?.card?.info?.aggregatedDiscountInfoV3
                              ?.header
                          }
                        </p>
                      )}
                      {item?.card?.card?.info?.aggregatedDiscountInfoV3
                        ?.subHeader && (
                        <p className="font-semibold text-xs pb-1">
                          {
                            item?.card?.card?.info?.aggregatedDiscountInfoV3
                              ?.subHeader
                          }
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col overflow-hidden text-xl mr-4">
                    <p className="font-bold text-violet-700">{item?.card?.card?.info?.name}</p>
                    <span className="flex items-center text-lg font-semibold">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        role="img"
                        aria-hidden="true"
                        strokecolor="rgba(2, 6, 12, 0.92)"
                        fillcolor="rgba(2, 6, 12, 0.92)"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="9"
                          fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
                        ></circle>
                        <path
                          d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                          fill="white"
                        ></path>
                        <defs>
                          <linearGradient
                            id="StoreRating20_svg__paint0_linear_32982_71567"
                            x1="10"
                            y1="1"
                            x2="10"
                            y2="19"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#21973B"></stop>
                            <stop offset="1" stopColor="#128540"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                      <p className="mx-1">
                        {item?.card?.card?.info?.avgRating}
                      </p>
                      •
                      <p className="mx-1 text-sm mt-1">
                        {item?.card?.card?.info?.sla?.slaString}
                      </p>
                      •
                      <p className="mx-1 text-sm mt-1">
                        {item?.card?.card?.info?.costForTwoMessage}
                      </p>
                    </span>
                    <p className=" text-sm text-violet-700 whitespace-nowrap overflow-hidden text-ellipsis mr-4">
                      {item?.card?.card?.info?.cuisines?.map(
                        (cuisine, index) => (
                          <span key={index}>{cuisine}, </span>
                        )
                      )}
                    </p>
                    <p className="text-sm font-medium">
                      {item?.card?.card?.info?.locality}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center  mt-12 w-full">
              <section className="flex items-center   w-full">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-40 h-40 text-gray-600"
                  >
                    <path
                      fill="currentColor"
                      d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
                    ></path>
                    <rect
                      width="176"
                      height="32"
                      x="168"
                      y="320"
                      fill="currentColor"
                    ></rect>
                    <polygon
                      fill="currentColor"
                      points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
                    ></polygon>
                    <polygon
                      fill="currentColor"
                      points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
                    ></polygon>
                  </svg>
                  <p className="text-3xl">No Results Found</p>
                </div>
              </section>
            </div>
          )}
        </section>
        {restroResult && restroResult.length > showMoreCount && (
          <div className="flex justify-center">
            {" "}
            <button
              type="submit"
              onClick={handleShowMore}
              className="flex items-center justify-center w-52 px-4 py-3 rounded-md bg-violet-200 text-gray-900 hover:bg-violet-300 active:bg-violet-300 btnall font-bold "
            >
              <img
                loading="lazy"
                src={Add}
                className="w-6 h-6 mr-2"
                alt="Sign Up Icon"
              />
              Show More
            </button>
          </div>
        )}
      </div>
      
      <Footer/>
    </>
  );
}
export default SearchRestaurants;
