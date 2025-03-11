import React, { useState, useRef } from "react";
import Filters from "../filters/Filters";
import ModalFilter from "../modalfilter/ModalFilter";
import CardRestaurant from "../restaurantcard/RestaurantCard";

function Restaurants({ Data1, Data2, title }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div ref={ref} className="text-gray-50 mx-4 md:mx-20 pb-5 border-b-2 mt-8">
      <div className="text-black font-bold text-3xl">
        {title ? (
          <p className="ml-6  items-start">{title}</p>
        ) : (
          <p className="ml-6  items-start">
            {Data1?.data?.cards[2]?.card?.card?.title}
          </p>
        )}
        <Filters openModal={openModal} />
        {isModalOpen && <ModalFilter closeModal={closeModal} Data={Data1} />}
        <div className="p-0 overflow-x-auto justify-center flex flex-wrap ml-12">
          <CardRestaurant Data={Data1} />
          {/* {Data2 && <CardRestaurant Data={Data2} />} */}
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
