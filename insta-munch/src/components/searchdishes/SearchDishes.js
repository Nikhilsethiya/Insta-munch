import React, { useState, useEffect } from "react";
import { CAROUSEL_IMAGE_URL } from "../../utils/constants";
import Add from "../../images/add.png";
import Heart from "../../images/heart.png";
import Heart1 from "../../images/heart1.png";
import { useDispatch, useSelector } from "react-redux";
import { setUserFavourites, setUserCart } from "../../reducers/usersReducer";
import Footer from "../../components/footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SearchDishes({ dishResult }) {
  const notifySuccess = () =>
    toast.success("Dish added to Favourites!", {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    const notifyInfo = () =>
    toast.warning("Dish removed from Favourites!", {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    const notifySuccessCart = () =>
    toast.success("Item added to Cart!", {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    const notifyInfoCart = () =>
    toast.warning("Item removed from Cart!", {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const dispatch = useDispatch();
  const userFavs =
    useSelector((state) => state.users.userAllData.favourites) || [];
  const userCart = useSelector((state) => state.users.userAllData.cart) || [];
  const imageURL = CAROUSEL_IMAGE_URL;
  const [showMoreCount, setShowMoreCount] = useState(10);

  const handleShowMore = () => {
    setShowMoreCount((prevCount) => prevCount + 10);
  };

  const handleClickOfHeart = (id) => {
    const updatedFavs = userFavs.filter((item) => item !== id);
    dispatch(setUserFavourites(updatedFavs));
    notifyInfo();
  };
  const handleClickOfNotHeart = (id) => {
    const updatedFavs = [...userFavs, id];
    dispatch(setUserFavourites(updatedFavs));
    notifySuccess();
  };

  const addToCart = (id) => {
    const updatedCart = { ...userCart };
    if (updatedCart[id]) {
      updatedCart[id] += 1;
    } else {
      updatedCart[id] = 1;
      notifySuccessCart();
    }
    dispatch(setUserCart(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = { ...userCart };
    if (updatedCart[id] === 1) {
      delete updatedCart[id];
      notifyInfoCart();
    } else if (updatedCart[id] > 1) {
      updatedCart[id] -= 1;
    }
    dispatch(setUserCart(updatedCart));
  };

  useEffect(() => {
    setShowMoreCount(10);
  }, [dishResult]);

  return (
    <>
      <div className="md:mx-20 pb-5 border-b-2 mt-8">
        <section className="my-8 flex justify-center ">
          {dishResult && dishResult.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 w-4/5 p-6 bg-violet-100 rounded">
              {dishResult?.slice(0, showMoreCount).map((item) => (
                <div
                  key={item?.card?.card?.info?.id}
                  className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-300 bg-gray-50 text-gray-800"
                >
                  <div className="flex justify-between p-1 pb-4">
                    <div>
                      <h4 className="font-bold text-xl mb-1 text-violet-700">
                        By {item?.card?.card?.restaurant?.info?.name}
                      </h4>
                      <span className="flex items-center text-xs font-semibold">
                        <svg
                          width="15"
                          height="15"
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
                          {
                            item?.card?.card?.info?.ratings?.aggregatedRating
                              ?.rating
                          }
                        </p>
                        •
                        <p className="mx-1 text-xs ">
                          {item?.card?.card?.restaurant?.info?.sla?.slaString}
                        </p>
                      </span>
                    </div>

                    {userFavs?.includes(item?.card?.card?.info?.id) ? (
                      <div
                        className="flex items-center text-red-500 cursor-pointer"
                        title="Remove From Favourites"
                        onClick={() =>
                          handleClickOfHeart(item?.card?.card?.info?.id)
                        }
                      >
                        <img
                          loading="lazy"
                          src={Heart}
                          className="w-6 h-6 mr-2"
                          alt="Heart Icon"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex items-center text-red-500 cursor-pointer"
                        title="Add to Favourites"
                        onClick={() =>
                          handleClickOfNotHeart(item?.card?.card?.info?.id)
                        }
                      >
                        <img
                          loading="lazy"
                          src={Heart1}
                          className="w-6 h-6 mr-2"
                          alt="Heart1 Icon"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between  p-1 ">
                    <div>
                      <h4 className="font-bold text-lg mt-4">
                        {item?.card?.card?.info?.name}
                      </h4>
                      <span className="flex items-center text-base font-semibold">
                        <p className="mx-1 text-sm mt-1">
                          ₹ {item?.card?.card?.info?.price / 100}
                        </p>
                      </span>
                      <span className="flex items-center text-xs text-gray-400 font-semibold">
                        <p className="mx-1 text-sm mt-1">
                          {item?.card?.card?.info?.description}
                        </p>
                      </span>
                    </div>
                    <div className="flex  ">
                      <div className="flex-shrink-0 mt-4 ml-2 sm:h-32 sm:w-32 relative">
                        <img
                          src={`${imageURL}/${item?.card?.card?.info?.imageId}`}
                          alt="image"
                          className=" w-full h-5/6 rounded-2xl "
                        />
                        <div className="flex w-3/4 items-center absolute top-28 justify-between ml-4 text-center text-orange-600 bg-violet-100 rounded-xl  shadow-lg  shadow-stone-400 ">
                          <span
                            className="text-2xl pl-1 ml-1 mr-1 cursor-pointer"
                            onClick={() =>
                              removeFromCart(item?.card?.card?.info?.id)
                            }
                          >
                            {userCart[item?.card?.card?.info?.id] ? "-" : ""}
                          </span>
                          <p
                            className={`font-bold text-base   ${
                              userCart[item?.card?.card?.info?.id]
                                ? ""
                                : "w-full cursor-pointer"
                            }`}
                            onClick={() => {
                              if (!userCart[item?.card?.card?.info?.id]) {
                                addToCart(item?.card?.card?.info?.id);
                              }
                            }}
                          >
                            {userCart[item?.card?.card?.info?.id]
                              ? userCart[item?.card?.card?.info?.id]
                              : "ADD"}
                          </p>
                          <span
                            className="text-2xl mr-1 cursor-pointer"
                            onClick={() =>
                              addToCart(item?.card?.card?.info?.id)
                            }
                          >
                            {userCart[item?.card?.card?.info?.id] ? "+" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center mt-12 w-full">
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
        {dishResult && dishResult.length > showMoreCount && (
          <div className="flex justify-center">
            {" "}
            <button
              type="submit"
              onClick={handleShowMore}
              className="flex items-center justify-center w-52 px-4 py-3 font-bold rounded-md bg-violet-200 text-gray-900 hover:bg-violet-300 active:bg-violet-300 btnall"
            >
              <img
                loading="lazy"
                src={Add}
                className="w-6 h-6 mr-2"
                alt="Add Icon"
              />
              Show More
            </button>
          </div>
        )}
        <ToastContainer
          position="bottom-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>

      <Footer />
    </>
  );
}

export default SearchDishes;
