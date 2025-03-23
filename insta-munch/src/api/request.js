import { getHandler } from "./axiosHandler";

export const getSwiggyData = async (body) => {
  const swiggyURL =
    "https://insta-munch-backend.vercel.app/api/proxy/swiggy/dapi/restaurants/list/v5";
  return getHandler(swiggyURL, {
    lat: body.lat,
    lng: body.lng,
    "is-seo-homepage-enabled": true,
    page_type: "DESKTOP_WEB_LISTING",
  });
};
export const getLocationData = async (value) => {
  const locationURL =
    "https://insta-munch-backend.vercel.app/api/proxy/swiggy/dapi/misc/place-autocomplete";
  return getHandler(locationURL, {
    input: value,
  });
};
export const getCoordinatesFromPlaceId = async (placeId) => {
  const locationCOURL =
    "https://insta-munch-backend.vercel.app/api/proxy/swiggy/dapi/misc/address-recommend";
  return getHandler(locationCOURL, {
    place_id: placeId,
  });
};
