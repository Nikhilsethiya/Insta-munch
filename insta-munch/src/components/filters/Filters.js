import React, { useState, useRef, useEffect } from "react";
import FilterIcon from "../../images/filtericon.png";
import SortBy from "../../images/sort.png";
import ButtonFilters from "../buttonfilters/ButtonFilters";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortByFilters,
  setButtonFilterFastDelivery,
  setButtonFilterNewOnInstaMart,
  setButtonFilterRatings4plus,
  setButtonFilterRs300_Rs600,
  setButtonFilterLessThanRs300,
  setVegOrNonVeg,
  setOffer,
} from "../../reducers/filtersReducer";

function Filters({ openModal }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [sortBy, setSortBy] = useState("Relevance (Default)");
  const getSortByFromRedux = useSelector((state) => state.filters.sortBy) || "";
  const getVegOrNonVegFromRedux =
    useSelector((state) => state.filters.vegOrNonVeg) || "";
  const getOfferFromRedux = useSelector((state) => state.filters.Offer) || "";
  const getFilterValuesFromRedux =
    useSelector((state) => state.filters.filterValues) || {};

  const [filterStates, setFilterStates] = useState({
    deliveryTimefacetquery1: false,
    newfacetquery1: false,
    ratingfacetquery4: false,
    isVegfacetquery2: false,
    restaurantOfferMultiTdfacetquery3: false,
    costForTwofacetquery3: false,
    costForTwofacetquery5: false,
  });

  const toggleFilter = (filterName) => {
    setFilterStates((prevState) => ({
      ...prevState,
      [filterName]: !prevState[filterName],
    }));
  };

  const filterButtons = [
    { label: "Fast Delivery", filterName: "deliveryTimefacetquery1" },
    { label: "New on Insta-Mart", filterName: "newfacetquery1" },
    { label: "Ratings 4.0+", filterName: "ratingfacetquery4" },
    { label: "Pure Veg", filterName: "isVegfacetquery2" },
    { label: "Offers", filterName: "restaurantOfferMultiTdfacetquery3" },
    { label: "Rs.300 - Rs.600", filterName: "costForTwofacetquery3" },
    { label: "Less than Rs. 300", filterName: "costForTwofacetquery5" },
  ];

  const sortByOptions = [
    "Relevance (Default)",
    "Delivery Time",
    "Rating",
    "Cost: Low to High",
    "Cost: High to Low",
  ];
  useEffect(() => {
    if (getVegOrNonVegFromRedux === "isVegfacetquery2")
      setFilterStates((prevState) => ({
        ...prevState,
        isVegfacetquery2: true,
      }));
    else
      setFilterStates((prevState) => ({
        ...prevState,
        isVegfacetquery2: false,
      }));
  }, [getVegOrNonVegFromRedux]);
  useEffect(() => {
    if (getOfferFromRedux === "restaurantOfferMultiTdfacetquery3")
      setFilterStates((prevState) => ({
        ...prevState,
        restaurantOfferMultiTdfacetquery3: true,
      }));
    else
      setFilterStates((prevState) => ({
        ...prevState,
        restaurantOfferMultiTdfacetquery3: false,
      }));
  }, [getOfferFromRedux]);
  useEffect(() => {
    setSortBy(getSortByFromRedux);
  }, [getSortByFromRedux]);
  useEffect(() => {
    setFilterStates(getFilterValuesFromRedux);
  }, [getFilterValuesFromRedux]);
  // useEffect(() => {
  //   if (window.location.pathname === "/Offers")
  //     setFilterStates((prevState) => ({
  //       ...prevState,
  //       restaurantOfferMultiTdfacetquery3: true,
  //     }));
  // });

  useEffect(() => {
    dispatch(setButtonFilterFastDelivery(filterStates.deliveryTimefacetquery1));
    dispatch(setButtonFilterNewOnInstaMart(filterStates.newfacetquery1));
    dispatch(setButtonFilterRatings4plus(filterStates.ratingfacetquery4));
    dispatch(setButtonFilterRs300_Rs600(filterStates.costForTwofacetquery3));
    dispatch(setButtonFilterLessThanRs300(filterStates.costForTwofacetquery5));
    if (filterStates.isVegfacetquery2)
      dispatch(setVegOrNonVeg("isVegfacetquery2"));
    else dispatch(setVegOrNonVeg(""));
    if (filterStates.restaurantOfferMultiTdfacetquery3)
      dispatch(setOffer("restaurantOfferMultiTdfacetquery3"));
    else dispatch(setOffer(""));
  }, [filterStates]);

  useEffect(() => {
    dispatch(setSortByFilters(sortBy));
  }, [sortBy]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectSortBy = (option) => {
    setSortBy(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className=" my-8 justify-center gap-3 hidden md:flex flex-wrap  overflow-ellipsis text-sm sticky top-1 z-30 w-full py-4 ml-2 rounded-full bg-violet-100 shadow-stone-500 shadow-md">
        <div
          title="filters"
          className="flex items-center flex-shrink-0 relative bg-violet-100 hover:text-gray-900 px-4 py-2 border-2 border-violet-300 rounded-full hover:bg-violet-200 font-semibold text-violet-700 hover:cursor-pointer text-base"
          activeclassname="border-violet-400"
          onClick={openModal}
        >
          Filters
          <img
            loading="lazy"
            src={FilterIcon}
            className="w-4 h-4 ml-2"
            alt="Profile Icon"
          />
        </div>
        <div className="dropdown relative inline-block" ref={dropdownRef}>
          <button
            title="Sort By"
            className={`flex items-center flex-shrink-0 relative bg-violet-100 hover:text-gray-900 px-4 py-2 border-2 border-violet-300 rounded-full hover:bg-violet-200 font-semibold text-violet-700 hover:cursor-pointer focus:text-gray-900 focus:bg-violet-200 ${
              sortBy !== "Relevance (Default)"
                ? "border-2 border-gray-900 cursor-pointer"
                : " cursor-pointer"
            } `}
            style={{ cursor: "default" }}
            activeclassname="border-violet-400"
            onClick={() => {
              sortBy === "Relevance (Default)" && toggleDropdown();
            }}
          >
            {sortBy === "Relevance (Default)" ? "Sort By" : sortBy}
            <img
              loading="lazy"
              src={SortBy}
              className="w-3 h-3 ml-2"
              alt="Profile Icon"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown();
              }}
            />
          </button>
          <div
            className={`dropdown-menu absolute ${
              isOpen ? "block" : "hidden"
            } bg-violet-100 border rounded shadow-lg w-52 mt-1`}
          >
            {sortByOptions.map((option, index) => (
              <div
                key={index}
                className="block px-4 py-2 rounded text-gray-900 hover:bg-white font-semibold hover:text-violet-500"
                onClick={() => handleSelectSortBy(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        <ButtonFilters
          filterButtons={filterButtons}
          filterStates={filterStates}
          toggleFilter={toggleFilter}
        />
      </div>
    </>
  );
}

export default Filters;
