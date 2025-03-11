import React from "react";
import { IconButton } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import DishData from "../../utils/data/dishesData.json";

function ModalViewDetails({ closeModal, orderId }) {
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
    const userCartKeys = Object.keys(userOrders[orderId]?.dishids);
    const fullObjects = getFullObjects(userCartKeys, dishFinalData);
    const subTotalArray = fullObjects.map((item) => {
      return (
        (item?.card?.card?.info?.price / 100) *
        userOrders[orderId]?.dishids[item?.card?.card?.info?.id]
      );
    });
    const subTotal = subTotalArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    let finalTotal = parseInt(subTotal) + 45 + 3 + (parseInt(subTotal) * 5) / 100;

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85">
      <div className="relative mx-auto bg-white rounded-md shadow-md w-1/3">
        <div className="flex items-center justify-between pt-2 space-x-4 px-4">
          <div className="flex items-center space-x-4 font-bold text-2xl text-violet-600">
            Order Details
          </div>
          <IconButton
            className="flex items-center space-x-1"
            variant="text"
            title="Close"
            onClick={closeModal}
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8 pl-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div
          className=" mr-4 my-4 rounded-md bg-white w-full overflow-y-auto relative"
          style={{ height: "500px" }}
        >
         

          <div className="border-t-2 border-gray-300 rounded p-8">
            {/* Cart items */}
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <p className="font-bold">Item Name</p>
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
                    <p>{item?.card?.card?.info?.name}
                    <span className="text-violet-600 px-3 font-bold">x</span>{" "}
                    <span >
                      {userOrders[orderId]?.dishids[item?.card?.card?.info?.id]}
                    </span></p>
                  </div>
                 
                  <p className="text-right flex-1">
                    ₹{" "}
                    {(item?.card?.card?.info?.price / 100) *
                      userOrders[orderId]?.dishids[item?.card?.card?.info?.id]}
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
            {userOrders[orderId]?.couponApplied && (
                <div className="flex justify-between border-b  border-gray-700 pb-2">
                  <p className="">Discount</p>
                  <p className=""> - ₹ {(finalTotal * 0.3).toFixed(2)}</p>
                </div>
              )}
              <div className="flex justify-between my-2">
                <p className="font-bold">To Pay</p>
                <p className="font-bold">
                  {userOrders[orderId]?.couponApplied ? (finalTotal * 0.7).toFixed(2) : finalTotal}
                </p>
              </div>
          </div>

          {/* End of Cart items */}
        </div>
      </div>
    </div>
  );
}

export default ModalViewDetails;
