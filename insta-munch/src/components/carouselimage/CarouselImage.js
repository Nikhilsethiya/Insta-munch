import React from "react";
import { Link } from "react-router-dom";
import { CAROUSEL_IMAGE_URL } from "../../utils/constants";

function CarouselImage({ Data }) {
  const CarouselImageData =
    Data?.data?.cards[0]?.card?.card?.imageGridCards?.info;
  const imageURL = CAROUSEL_IMAGE_URL;

  return CarouselImageData?.map((card) => (
    <div key={card?.id} className="image-container">
        <img
          loading="lazy"
          className="carousel-image transition ease-in-out hover:-translate-y-2"
          src={`${imageURL}/${card?.imageId}`}
          alt={card?.id}
        />
    </div>
  ));
}

export default CarouselImage;
