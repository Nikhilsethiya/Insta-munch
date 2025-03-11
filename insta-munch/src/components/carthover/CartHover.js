import React from "react";
import DishData from "../../utils/data/dishesData.json";
import { useNavigate } from "react-router-dom";

function CartHover({ userCart, clearCart }) {
  const navigate = useNavigate();
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
 

  

  const onCheckout = () => {
    navigate("/Cart");
  };

  return (
    <>
      <div className=" border-t-2 border-violet-800 bg-violet-100 p-2 rounded-md text-xs shadow-lg shadow-stone-400 ">
        <div className="flex flex-col p-2  bg-white text-gray-800 rounded-md">
          <h2 className="text-lg font-extrabold mb-1 text-violet-500">
            Your Cart
          </h2>
          <div className="flex justify-between items-center p-2 px-4  border-b-2  border-violet-300 ">
            <div className="w-3/4">
              <p className="text-sm font-bold">Item Name</p>
            </div>
            <p className="font-bold text-sm">Price</p>
          </div>
          {fullObjects?.map((item) => {
            return (
              <div
                className=" flex justify-between items-center p-2 border-t border-dotted border-violet-300 "
                key={item?.card?.card?.info?.id}
              >
                <div className="w-3/4">
                  <p className=" font-semibold">
                    By {item?.card?.card?.restaurant?.info?.name}{" "}
                  </p>
                  <p className="font-bold">
                    {item?.card?.card?.info?.name}{" "}
                    <span className="text-violet-600 px-3 font-bold">x</span>{" "}
                    <span className="font-bold">
                      {userCart[item?.card?.card?.info?.id]}
                    </span>
                  </p>
                </div>
                <p className="font-bold">
                  ₹{" "}
                  {(item?.card?.card?.info?.price / 100) *
                    userCart[item?.card?.card?.info?.id]}
                </p>
              </div>
            );
          })}
          <div className="flex justify-between items-center p-2  border-b-2  border-t-2  border-violet-300 ">
            <div className="w-3/4">
              <p className="text-sm font-bold  text-violet-600">Sub Total</p>
              <p className="text-xs text-gray-400">*Extra charges may apply</p>
            </div>
            <p className="font-bold">₹ {subTotal}</p>
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="px-2 py-1 font-semibold border mx-4 text-sm rounded-md border-violet-600 hover:bg-violet-100"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <button
              type="button"
              className="px-2 py-1 font-semibold text-sm border rounded-md bg-violet-600 text-violet-50 border-violet-600"
              onClick={onCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default CartHover;
