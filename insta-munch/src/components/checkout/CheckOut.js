import React, { useState, useCallback, useEffect } from "react";
import Home from "../../images/home.png";
import Location from "../../images/location.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserCart, setUserOrder } from "../../reducers/usersReducer";
import DishData from "../../utils/data/dishesData.json";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRazorpay from "react-razorpay";
import { format } from "date-fns";

function CheckOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Razorpay] = useRazorpay();
  const [activeStep, setActiveStep] = useState(2);
  const [activeTab, setActiveTab] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [value, setValue] = useState("");
  const user = useSelector((state) => state.users.userAllData) || {};
  const userEmail = user?.email;
  const userCart = useSelector((state) => state.users.userAllData.cart) || {};
  const userOrders =
    useSelector((state) => state.users.userAllData.orders) || {};

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
  const getFullObjects = (keys, dataArray) => {
    const fullObjects = [];
    keys.forEach((key) => {
      const foundObject = dataArray.find(
        (item) => item?.card?.card?.info?.id === key
      );
      if (foundObject) {
        fullObjects.push(foundObject);
      }
    });
    return fullObjects;
  };
  const userCartKeys = Object.keys(userCart);
  const fullObjects = getFullObjects(userCartKeys, dishFinalData);
  const subTotalArray = fullObjects.map((item) => {
    return (
      (item?.card?.card?.info?.price / 100) *
      userCart[item?.card?.card?.info?.id]
    );
  });
  const subTotal = subTotalArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  let finalTotal = parseInt(subTotal) + 45 + 3 + (parseInt(subTotal) * 5) / 100;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getAddress(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  const getAddress = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        {
          crossOrigin: true,
        }
      );
      setCurrentLocation(response.data.display_name);
    } catch (error) {
      console.error("Error getting address:", error);
    }
  };
  const onInputChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue.toUpperCase());
  };
  const handleKeyPress = (e) => {
    setSuccess("");
    setError("");
    if (e.key === "Enter") {
      if (value === "SHREY7900") {
        setCouponApplied(true);
        setSuccess("Coupon Applied Successfully.");
      } else {
        setCouponApplied(false);
        setError("Invalid Coupon.");
      }
    }
  };

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
    getCurrentLocation();
  }, []);

  const handlePayment = useCallback(() => {
    if (!user) {
      toast.error("Login First");
    } else {
      const order = "";
      const amount = couponApplied
        ? parseInt(finalTotal * 70)
        : parseInt(finalTotal * 100);
      const options = {
        key: "rzp_test_HB6wI0d4qgZfZg",
        amount: amount,
        currency: "INR",
        name: "Insta Munch",
        description: "Payment for the Meal",
        // image: resInfo?.img,
        // order_id: order.id,
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phonenumber,
        },
        handler: (res) => {
          if (res) {
            setOrderPlaced(true);
            placeOrder();
          }
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzpay = new Razorpay(options);
      rzpay.open();
    }
  }, [currentLocation, Razorpay, finalTotal, couponApplied, user]);
  const placeOrder = () => {
    if (couponApplied) {
      const order = {
        dishids: userCart,
        time: format(new Date(), "dd/M/yyyy, hh:mm:ss a"),
        deliveryadd: currentLocation,
        totalfair: (finalTotal * 0.7).toFixed(2),
        couponApplied: true,
      };
      const uniqueId = Date.now().toString();
      const updatedOrders = Object.assign({}, userOrders, {
        [uniqueId]: order,
      });
      dispatch(setUserOrder(updatedOrders));
      dispatch(setUserCart({}));
      sendOrderPlacedEmail(userEmail, uniqueId);
    } else {
      const order = {
        dishids: userCart,
        time: format(new Date(), "dd/M/yyyy, hh:mm:ss a"),
        deliveryadd: currentLocation,
        totalfair: finalTotal,
        couponApplied: false,
      };
      const uniqueId = Date.now().toString();
      const updatedOrders = Object.assign({}, userOrders, {
        [uniqueId]: order,
      });
      dispatch(setUserOrder(updatedOrders));
      dispatch(setUserCart({}));
      sendOrderPlacedEmail(userEmail, uniqueId);
    }
    setTimeout(() => {
      navigate("/DashBoard");
    }, 1000);
  };
  const sendOrderPlacedEmail = async (recipientEmail, uniqueId) => {
    const apiKey =
      "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";
    const url = "https://api.sendinblue.com/v3/smtp/email";

    const htmlContent = `<div style="background-color: #ffffff">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center;">
            <h1 style="font-size: 36px; color: #1f2d3d;">Insta-Munch</h1>
          </div>
          <div style="margin-top: 20px; background-color: #ffffff; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 10px;">
            <div style="padding: 20px;">
            <p style="font-size: 16px; color: #3b3f44;">Thank you for your order! We're now processing it with care. Sit back and relax, your delicious meal is on its way!</p>
              <h5 style="font-size: 20px; color: #1f2d3d;">Order #${uniqueId}</h5>
            </div>
          </div>
        </div>
      </div>`;

    const body = {
      sender: { email: "informtoshreyans@gmail.com" },
      to: [{ email: recipientEmail }],
      subject: "Order Placed",
      htmlContent: htmlContent,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="flex justify-between mx-40 bg-violet-100 mb-4 rounded-md">
      <section className="bg-gray-50 text-gray-800 mx-4 my-4 rounded-md w-3/5">
        <div className="container pl-4 py-4 w-full">
          <h3 className="text-2xl font-extrabold text-violet-600 mb-4">
            CHECKOUT
          </h3>
          <div className="grid ml-4 sm:grid-cols-12 ">
            <div className="relative pl-4 space-y-6 sm:col-span-12 ">
              <div className="col-span-12 space-y-12 relative px-7 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-0 before:bg-violet-200">
                <div>
                  <div
                    className={`flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-600  ${
                      activeStep === 1 ? "animate-pulse" : ""
                    }`}
                  ></div>
                  <h3 className="text-xl font-bold tracki text-gray-800">
                    Email and Mobile No
                  </h3>
                  <div className=" flex justify-between  mt-4 ">
                    <p className=" mx-4 font-semibold">
                      Email:{" "}
                      {user?.email && (
                        <span className=" text-violet-700">{user?.email}</span>
                      )}
                    </p>
                    <p className="mr-20 font-semibold">
                      Mobile:{" "}
                      {user?.phonenumber && (
                        <span className=" text-violet-700">
                          {user?.phonenumber}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <div
                    className={`flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-600   ${
                      activeStep === 2 ? "animate-pulse" : ""
                    }`}
                  ></div>
                  <h3 className="text-xl font-bold tracki text-gray-800">
                    Select Address
                  </h3>
                  <ul className=" space-x-5 w-full flex mt-4">
                    <li
                      className={`border-2 border-gray-400 p-6 rounded-md hover:bg-violet-100 cursor-pointer relative w-1/2 ${
                        activeTab === "Saved"
                          ? "shadow-lg shadow-stone-500 bg-violet-100"
                          : ""
                      }`}
                      onClick={() => {
                        setCurrentLocation(
                          "123 Main Street Anytown, USA 12345"
                        );
                        setActiveTab("Saved");
                        setActiveStep(3);
                      }}
                    >
                      <div className="space-y-1">
                        <div className="flex">
                          <img
                            loading="lazy"
                            src={Home}
                            className="w-6 h-6 mr-3"
                            alt="Home Icon"
                          />
                          <h3 className="text-lg font-bold text-violet-700">
                            Home
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 ml-10">
                          123 Main Street Anytown, USA 12345
                        </p>
                      </div>
                    </li>{" "}
                    <li
                      className={`border-2 border-gray-400 p-6 rounded-md hover:bg-violet-100 cursor-pointer relative w-1/2 ${
                        activeTab === "GPS"
                          ? "shadow-lg shadow-stone-500 bg-violet-100"
                          : ""
                      }`}
                      onClick={() => {
                        getCurrentLocation();
                        setActiveTab("GPS");
                        setActiveStep(3);
                      }}
                    >
                      <div className="space-y-1">
                        <div className="flex">
                          <img
                            loading="lazy"
                            src={Location}
                            className="w-6 h-6 mr-3"
                            alt="Location Icon"
                          />
                          <h3 className="text-lg font-bold text-violet-700">
                            Get Current Location
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 ml-10">
                          {activeTab === "GPS" ? currentLocation : "Using GPS"}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={`${activeStep === 3 ? "" : "hidden"}`}>
                  <div
                    className={`flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-600   ${
                      activeStep === 3 ? " animate-pulse" : ""
                    }`}
                  ></div>
                  {fullObjects.length > 0 || orderPlaced ? (
                    <>
                      <h3 className="text-xl font-bold tracki text-gray-800">
                        Confirm Order
                      </h3>
                      <time className="text-xs tracki uppercase text-gray-600">
                        {format(new Date(), "dd/M/yyyy, hh:mm:ss a")}
                      </time>
                      <div className="ml-10 flex justify-between ">
                        <div className="flex items-center accent-violet-600">
                          <input
                            type="checkbox"
                            id="termsCheckbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="mr-2 hover:cursor-pointer"
                            disabled={orderPlaced}
                          />
                          <label
                            // htmlFor="termsCheckbox"
                            className={`text-sm ${
                              isChecked ? " text-gray-600" : "text-gray-400"
                            }`}
                          >
                            I agree to the Terms and Conditions.
                          </label>
                        </div>
                        {isChecked ? (
                          <button
                            className={`w-1/2 bg-${
                              orderPlaced ? "green" : "violet"
                            }-500 text-white font-bold rounded-md p-2`}
                            onClick={handlePayment}
                            disabled={orderPlaced}
                          >
                            {orderPlaced ? "Order Placed" : "Confirm"}
                          </button>
                        ) : (
                          <button
                            className={`w-1/2 bg-violet-500 text-white font-bold rounded-md p-2 opacity-40 cursor-not-allowed`}
                          >
                            Confirm
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <h3 className="text-xl font-bold tracki text-gray-800">
                      Add Something in the Cart First!
                    </h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right side - Cart */}
      <div
        className="w-2/5 mr-4 my-4 rounded-md bg-white overflow-y-auto relative"
        style={{ height: "500px" }}
      >
        {!orderPlaced && (
          <h3 className="text-2xl font-extrabold text-violet-600 pb-4 pl-4 pt-4 sticky top-0 bg-white">
            Cart
          </h3>
        )}
        {!orderPlaced && fullObjects.length > 0 && (
          <fieldset className=" text-violet-800 font-semibold flex justify-center mb-3">
            <div className="">
              <input
                type="search"
                name="Search"
                placeholder="Apply Coupon"
                autoFocus
                className={`py-2 pl-9 pr-2 w-40 text-sm focus:outline-none bg-violet-100  text-gray-900 focus:shadow-lg rounded-md ${
                  couponApplied
                    ? "border-2 border-green-500 cursor-not-allowed"
                    : ""
                }`}
                value={value}
                disabled={couponApplied}
                onChange={onInputChange}
                onKeyDown={handleKeyPress}
                title={
                  couponApplied
                    ? "Coupon Applied Successfully"
                    : "Press Enter to Apply Coupon"
                }
              />
            </div>
          </fieldset>
        )}
        {fullObjects.length > 0 ? (
          <>
            <div className="border-t-2 border-gray-300 rounded p-4">
              {/* Cart items */}
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <p className="font-bold">Item Name</p>
                <p className="font-bold ml-12">Quantity</p>
                <p className="font-bold">Price</p>
              </div>
              {/* Sample Cart Items (Replace with actual data) */}
              {fullObjects?.map((item) => {
                return (
                  <div
                    className="flex justify-between border-b border-gray-300 py-2"
                    key={item?.card?.card?.info?.id}
                  >
                    <div className="flex flex-col w-1/3">
                      {" "}
                      <p className=" font-semibold">
                        By {item?.card?.card?.restaurant?.info?.name}{" "}
                      </p>
                      <p>{item?.card?.card?.info?.name}</p>
                    </div>
                    <div className=" w-1/3 flex ml-8  items-center justify-end">
                      <div className="flex w-24 items-center justify-between  text-center text-orange-600 border border-gray-500 rounded-xl  ">
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
                          onClick={() => addToCart(item?.card?.card?.info?.id)}
                        >
                          {userCart[item?.card?.card?.info?.id] ? "+" : ""}
                        </span>
                      </div>
                    </div>
                    <p className="text-right flex-1">
                      ₹{" "}
                      {(item?.card?.card?.info?.price / 100) *
                        userCart[item?.card?.card?.info?.id]}
                    </p>
                  </div>
                );
              })}

              <div className="flex justify-between my-2">
                <p className="font-bold">Bill Details</p>
              </div>
              <div className="flex justify-between ">
                <p className="">Item Total</p>
                <p className=""> ₹ {subTotal}</p>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                <p className="">Delivery Fee</p>
                <p className=""> ₹ 45</p>
              </div>
              {/* <div className="flex justify-between ">
            <p className="">Delivery Tip</p>
            <p className=""> ₹ 50</p>
          </div> */}
              <div className="flex justify-between ">
                <p className="">Platform fee</p>
                <p className=""> ₹ 3</p>
              </div>
              <div className="flex justify-between border-b  border-gray-700 pb-2">
                <p className="">GST and Restaurant Charges</p>
                <p className="">
                  {" "}
                  ₹ {((parseInt(subTotal) * 5) / 100).toFixed(2)}
                </p>
              </div>
              {couponApplied && (
                <div className="flex justify-between border-b  border-gray-700 pb-2">
                  <p className="">Discount</p>
                  <p className=""> - ₹ {(finalTotal * 0.3).toFixed(2)}</p>
                </div>
              )}
              <div className="flex justify-between my-2">
                <p className="font-bold">To Pay</p>
                <p className="font-bold">
                  {couponApplied ? (finalTotal * 0.7).toFixed(2) : finalTotal}
                </p>
              </div>
            </div>
          </>
        ) : orderPlaced ? (
          <div className="flex items-center justify-center  w-full">
            <section className="flex items-center  w-full">
              <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md ">
                <p className="text-3xl font-bold mt-40 mx-8">
                  Thank you for using Insta-Munch!
                </p>
              </div>
            </section>
          </div>
        ) : (
          <div className="flex items-center justify-center  w-full">
            <section className="flex items-center  w-full">
              <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md ">
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
                <p className="text-3xl">Cart is Empty!</p>
              </div>
            </section>
          </div>
        )}
        {/* End of Cart items */}
      </div>
      {success && (
        <div className="fixed bottom-10 right-5">
          <div className="flex shadow-md gap-6 rounded-lg overflow-hidden divide-x max-w-2xl bg-gray-900 text-gray-100 divide-gray-700">
            <div className="flex flex-1 flex-col p-4 border-l-8 border-green-400">
              <span className="text-2xl font-semibold">Success</span>
              <span className="text-sm text-gray-400">{success}</span>
            </div>
            <button
              className="px-4 flex items-center text-sm uppercase tracki text-gray-200 border-gray-700"
              onClick={() => {
                setSuccess("");
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      {error && (
        <div className="fixed bottom-10 right-5">
          <div className="flex shadow-md gap-6 rounded-lg overflow-hidden divide-x max-w-2xl bg-gray-900 text-gray-100 divide-gray-700">
            <div className="flex flex-1 flex-col p-4 border-l-8 border-red-400">
              <span className="text-2xl font-semibold">Error</span>
              <span className="text-sm text-gray-400">{error}</span>
            </div>
            <button
              className="px-4 flex items-center text-sm uppercase tracki text-gray-200 border-gray-700"
              onClick={() => {
                setError("");
              }}
            >
              Dismiss
            </button>
          </div>
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
  );
}

export default CheckOut;
