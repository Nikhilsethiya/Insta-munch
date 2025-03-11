import React, { useState, useEffect } from "react";
import { IconButton } from "@material-tailwind/react";
import axios from "axios";
import Home from "../../images/home.png";
import Clock from "../../images/clock.png";
import Location from "../../images/location.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentSelectedLocation,
  setCurrentSelectedLocationCoOrdinates,
} from "../../reducers/usersReducer";
import { getLocationData, getCoordinatesFromPlaceId } from "../../api/request";

function DrawerLocation({ closeDrawer }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const user = useSelector((state) => state.users.userAllData) || {};
  const [lastSuggestion, setLastSuggestion] = useState("");
  const [lastSuggestionType, setLastSuggestionType] = useState("value");
  const [suggestions, setSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [currentLocation, setCurrentLocation] = useState(user?.selectedlocation);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [latAndLng, setLatAndLng] = useState(user?.coordinates);

  useEffect(() => {
    setLatAndLng(user?.coordinates);
    setCurrentLocation(user?.selectedlocation)
  }, [user?.coordinates,user?.selectedlocation]);

  const getSuggestionsDebounced = (newValue) => {
    clearTimeout(debounceTimer);
    const timer = setTimeout(async () => {
      try {
        const response = await getLocationData(newValue);
        const suggestionsArray = Object.values(response.data)
          .filter(Array.isArray)
          .flat();
        setSuggestions(suggestionsArray);
      } catch (error) {
        setSuggestions([]);
      }
    }, 500);
    setDebounceTimer(timer);
  };

  const onInputChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    getSuggestionsDebounced(newValue);
  };

  const setPlaceId = async (placeId) => {
    try {
      const response = await getCoordinatesFromPlaceId(placeId);
      setLatAndLng(response.data.data[0].geometry.location);
    } catch (error) {
      setLatAndLng({});
    }
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    setValue(suggestion.structured_formatting.secondary_text);
    setLastSuggestion(suggestion.structured_formatting.secondary_text);
    setLastSuggestionType(suggestion.structured_formatting.main_text);
    setCurrentLocation(suggestion.description);
    setPlaceId(suggestion.place_id);
    setSuggestions([]);
    setActiveTab("Recent");
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

  return (
    <div className=" bg-white h-full overflow-y-auto">
      <div className=" p-3 space-y-2 ">
        <div className="flex items-center justify-between p-2 space-x-4">
          <div className="flex items-center space-x-4  text-base">
            <div className="ml-4">
              <p className="font-bold mb-3 text-lg">Selected Location :- </p>

              <p className="text-violet-500 font-semibold ml-4">
                {currentLocation && `${currentLocation} `}
              </p>
            </div>
          </div>
          <IconButton
            className="flex items-center pr-10"
            variant="text"
            title="Save & Close"
            onClick={() => {
              closeDrawer();
              setValue("");
              setSuggestions([]);
              dispatch(setCurrentSelectedLocation(currentLocation));
              dispatch(setCurrentSelectedLocationCoOrdinates(latAndLng));
            }}
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

        <div className="p-6 space-y-4 bg-white h-full">
          <fieldset className="space-y-1 text-violet-800 font-semibold">
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
                value={value}
                onChange={onInputChange}
              />
            </div>
          </fieldset>
          {suggestions?.length > 0 && value !== "" && (
            <div className="absolute z-10 bg-white border border-gray-200 mt-1 mr rounded-md shadow-lg w-10/12">
              {suggestions?.map((suggestion, index) => (
                <div
                  key={index}
                  className="py-1 px-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => onSuggestionSelected(null, { suggestion })}
                >
                  <p className=" font-semibold text-violet-600 text-lg">{suggestion?.structured_formatting?.main_text}</p>
                  <p className="text-md mb-1">{suggestion?.structured_formatting?.secondary_text}</p>
                </div>
              ))}
            </div>
          )}
          <ul className="pt-10 space-y-5 ">
            <li
              className="border border-gray-400 p-6 hover:bg-violet-100 cursor-pointer relative"
              onClick={() => {
                getCurrentLocation();
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const { latitude, longitude } = position.coords;
                      const coordinates = { lat: latitude, lng: longitude };
                      setLatAndLng(coordinates);
                    },
                    (error) => {
                      console.error("Error getting user location:", error);
                    }
                  );
                } else {
                  console.error(
                    "Geolocation is not supported by this browser."
                  );
                }
                setActiveTab("GPS");
              }}
            >
              <span
                className={`absolute top-3 right-3 w-3 h-3 rounded-full text-gray-100  animation  animate-ping ${
                  activeTab === "GPS"
                    ? "bg-green-400 border-2 border-green-500"
                    : ""
                }`}
              ></span>
              <div className="space-y-1">
                <div className="flex">
                  <img
                    loading="lazy"
                    src={Location}
                    className="w-6 h-6 mr-3"
                    alt="Location Icon"
                  />
                  <h3 className="text-lg font-bold">Get Current Location</h3>
                </div>
                <p className="text-sm text-gray-600 ml-10">Using GPS</p>
              </div>
            </li>
            <li
              className="border border-gray-400 p-6 hover:bg-violet-100 cursor-pointer relative"
              onClick={() => {
                setCurrentLocation("123 Main Street Anytown, USA 12345");
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const { latitude, longitude } = position.coords;
                      const coordinates = { lat: latitude, lng: longitude };
                      setLatAndLng(coordinates);
                    },
                    (error) => {
                      console.error("Error getting user location:", error);
                    }
                  );
                } else {
                  console.error(
                    "Geolocation is not supported by this browser."
                  );
                }
                setActiveTab("Saved");
              }}
            >
              <span
                className={`absolute top-3 right-3 w-3 h-3 rounded-full text-gray-100 animation animate-ping ${
                  activeTab === "Saved"
                    ? "bg-green-400 border-2 border-green-500 "
                    : ""
                }`}
              ></span>
              <div className="space-y-1">
                <p className="text-sm text-violet-800 ml-9">Saved Addresses</p>
                <div className="flex">
                  <img
                    loading="lazy"
                    src={Home}
                    className="w-6 h-6 mr-3"
                    alt="Home Icon"
                  />
                  <h3 className="text-lg font-bold">Home</h3>
                </div>
                <p className="text-sm text-gray-600 ml-10">
                  123 Main Street Anytown, USA 12345
                </p>
              </div>
            </li>
            {lastSuggestion ? (
              <li
                className="border border-gray-400 p-6 hover:bg-violet-100 cursor-pointer relative"
                onClick={() => {
                  setCurrentLocation(lastSuggestion);
                  setActiveTab("Recent");
                }}
              >
                <span
                  className={`absolute top-3 right-3 w-3 h-3 rounded-full text-gray-100  animation animate-ping ${
                    activeTab === "Recent"
                      ? "bg-green-400 border-2 border-green-500"
                      : ""
                  }`}
                ></span>
                <div className="space-y-1">
                  <p className="text-sm text-violet-800 ml-9">
                    Recent Searches
                  </p>
                  <div className="flex">
                    <img
                      loading="lazy"
                      src={Clock}
                      className="w-6 h-6 mr-3"
                      alt="Clock Icon"
                    />
                    <h3 className="text-lg font-bold">{lastSuggestionType}</h3>
                  </div>
                  <p className="text-sm text-gray-600 ml-10">
                    {lastSuggestion}
                  </p>
                </div>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DrawerLocation;
