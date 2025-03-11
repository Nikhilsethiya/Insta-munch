import React, { useState, useEffect } from "react";
import { IconButton } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllFilters,
  setSortByFilters,
  setVegOrNonVeg,
  setOffer,
  setFilterValues,
} from "../../reducers/filtersReducer";
import { ToastContainer, toast } from "react-toastify";

function ModalFilter({ closeModal, Data }) {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState("Sort");
  const [radioValueForSorting, setRadioValueForSorting] = useState(
    "Relevance (Default)"
  );
  const [radioValueForVegNonveg, setRadioValueForVegNonveg] = useState("");
  const [radioValueForOffer, setRadioValueForOffer] = useState("");
  const [checkboxValues, setCheckboxValues] = useState({});
  const getSortByFromRedux = useSelector((state) => state.filters.sortBy) || "";
  const getVegOrNonVegFromRedux =
    useSelector((state) => state.filters.vegOrNonVeg) || "";
  const getOfferFromRedux = useSelector((state) => state.filters.Offer) || "";
  const getFilterValuesFromRedux =
    useSelector((state) => state.filters.filterValues) || {};

  const Success = () =>
    toast.success("All Filters Cleared!", {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleRadioChangeForSorting = (e) => {
    setRadioValueForSorting(e.target.value);
  };

  const handleRadioChangeForVegNonveg = (e) => {
    setRadioValueForVegNonveg(e.target.value);
  };
  const handleRadioChangeForOffer = (e) => {
    setRadioValueForOffer(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setCheckboxValues((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  useEffect(() => {
    setRadioValueForSorting(getSortByFromRedux);
  }, [getSortByFromRedux]);
  useEffect(() => {
    setRadioValueForVegNonveg(getVegOrNonVegFromRedux);
  }, [getVegOrNonVegFromRedux]);
  useEffect(() => {
    setRadioValueForOffer(getOfferFromRedux);
  }, [getOfferFromRedux]);
  useEffect(() => {
    setCheckboxValues(getFilterValuesFromRedux);
  }, [getFilterValuesFromRedux]);
  const renderContent = () => {
    switch (selectedFilter) {
      case "Sort":
        return (
          <div className="text-sm font-normal">
            <h4 className="mb-6">SORT BY</h4>
            {Data?.data?.cards[3]?.card?.card?.sortConfigs?.map((a) => (
              <div className="flex items-center mb-4 ml-6" key={a.key}>
                <input
                  type="radio"
                  id={a.title}
                  name={a.title}
                  value={a.title}
                  checked={radioValueForSorting === a.title}
                  onChange={handleRadioChangeForSorting}
                  className="mr-2 rounded-full appearance-none border p-[0.3rem] border-gray-300 checked:bg-violet-600 checked:border-transparent"
                />
                <label htmlFor={a.title} className="cursor-pointer">
                  {a.title}
                </label>
              </div>
            ))}
          </div>
        );
      case "Delivery Time":
        return (
          <div className=" text-sm font-normal">
            <h4 className="mb-6">FILTER BY</h4>
            {Data?.data?.cards[3]?.card?.card?.facetList[0]?.facetInfo.map(
              (b) => (
                <div
                  className="flex items-center mb-4 ml-6 accent-violet-600"
                  key={b.id}
                >
                  <input
                    type="checkbox"
                    id={b.id}
                    checked={checkboxValues[b.id] || false}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label htmlFor={b.id} className="cursor-pointer">
                    {b.label}
                  </label>
                </div>
              )
            )}
          </div>
        );
      case "Cuisines":
        return (
          <div className="text-sm font-normal overflow-y-auto max-h-80 w-full">
            <h4 className="mb-6">FILTER BY CUISINE</h4>
            {Data?.data?.cards[3]?.card?.card?.facetList[1]?.facetInfo.map(
              (c) => (
                <div
                  className="flex items-center mb-2 ml-6 accent-violet-600"
                  key={c.id}
                >
                  <input
                    type="checkbox"
                    id={c.id}
                    checked={checkboxValues[c.id] || false}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label htmlFor={c.id} className="cursor-pointer">
                    {c.label}
                  </label>
                </div>
              )
            )}
          </div>
        );
      case "Explore":
        return (
          <div className=" text-sm font-normal">
            <h4 className="mb-6">FILTER BY</h4>
            {Data?.data?.cards[3]?.card?.card?.facetList[2]?.facetInfo.map(
              (d) => (
                <div
                  className="flex items-center mb-4 ml-6 accent-violet-600"
                  key={d.id}
                >
                  <input
                    type="checkbox"
                    id={d.id}
                    checked={checkboxValues[d.id] || false}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label htmlFor={d.id} className="cursor-pointer">
                    {d.label}
                  </label>
                </div>
              )
            )}
          </div>
        );
      case "Ratings":
        return (
          <div className=" text-sm font-normal">
            <h4 className="mb-6">FILTER BY</h4>
            {Data?.data?.cards[3]?.card?.card?.facetList[3]?.facetInfo.map(
              (e) => (
                <div
                  className="flex items-center mb-4 ml-6 accent-violet-600"
                  key={e.id}
                >
                  <input
                    type="checkbox"
                    id={e.id}
                    checked={checkboxValues[e.id] || false}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label htmlFor={e.id} className="cursor-pointer">
                    {e.label}
                  </label>
                </div>
              )
            )}
          </div>
        );
      case "Veg/Non-Veg":
        return (
          <div className="text-sm font-normal">
            <h4 className="mb-6">FILTER BY</h4>
            {Data?.data?.cards[3]?.card?.card?.facetList[4]?.facetInfo.map(
              (f) => (
                <div className="flex items-center mb-4 ml-6" key={f.id}>
                  <input
                    type="radio"
                    id={f.id}
                    name={f.id}
                    value={f.id}
                    checked={radioValueForVegNonveg === f.id}
                    onChange={handleRadioChangeForVegNonveg}
                    className="mr-2 rounded-full appearance-none border p-[0.3rem] border-gray-300 checked:bg-violet-600 checked:border-transparent"
                  />
                  <label htmlFor={f.id} className="cursor-pointer">
                    {f.label}
                  </label>
                </div>
              )
            )}
          </div>
        );
      case "Offers":
        return (
          <div className="text-sm font-normal">
            <h4 className="mb-6">RESTAURANTS WITH</h4>
            {Data?.data?.cards[3]?.card?.card?.facetList[5]?.facetInfo.map(
              (g) => (
                <div className="flex items-center mb-4 ml-6" key={g.id}>
                  <input
                    type="radio"
                    id={g.id}
                    name={g.id}
                    value={g.id}
                    checked={radioValueForOffer === g.id}
                    onChange={handleRadioChangeForOffer}
                    className="mr-2 rounded-full appearance-none border p-[0.3rem] border-gray-300 checked:bg-violet-600 checked:border-transparent"
                  />
                  <label htmlFor={g.id} className="cursor-pointer">
                    {g.label}
                  </label>
                </div>
              )
            )}
          </div>
        );
      case "Cost for two":
        return (
          <div className=" text-sm font-normal">
            <h4 className="mb-6">FILTER BY</h4>
            {Data?.data?.cards[3]?.card?.card?.facetList[6]?.facetInfo.map(
              (h) => (
                <div
                  className="flex items-center mb-4 ml-6 accent-violet-600"
                  key={h.id}
                >
                  <input
                    type="checkbox"
                    id={h.id}
                    checked={checkboxValues[h.id] || false}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label htmlFor={h.id} className="cursor-pointer">
                    {h.label}
                  </label>
                </div>
              )
            )}
          </div>
        );
      default:
        return <div></div>;
    }
  };
  const handleClearFilters = () => {
    setRadioValueForSorting("Relevance (Default)");
    setRadioValueForVegNonveg("");
    setRadioValueForOffer("");
    setCheckboxValues({});
    dispatch(clearAllFilters());
    Success();
  };

  const handleApplyFilters = () => {
    dispatch(setSortByFilters(radioValueForSorting));
    dispatch(setVegOrNonVeg(radioValueForVegNonveg));
    dispatch(setOffer(radioValueForOffer));
    dispatch(setFilterValues(checkboxValues));
    closeModal();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85">
        <div className="relative mx-auto bg-white rounded-md shadow-md  w-2/3">
          <div className="flex items-center justify-between p-2 space-x-4">
            <div className="flex items-center space-x-4 font-bold">Filters</div>
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
          <div className="p-3 font-semibold">
            <div className="flex mb-6 p-3">
              <div className="w-1/4 h-5/6">
                <div className="text-xl border-r-2">
                  <button
                    key="Sort"
                    rel="noopener noreferrer"
                    onClick={() => handleFilterClick("Sort")}
                    className={`flex items-center p-3 space-x-3 w-full border-l-4 ${
                      selectedFilter === "Sort"
                        ? "border-violet-700"
                        : "border-l-white"
                    } hover:text-violet-700 transition-all duration-300`}
                  >
                    <span>Sort</span>
                  </button>
                  {Data?.data?.cards[3]?.card?.card?.facetList?.map(
                    (filter) => (
                      <button
                        key={filter.id}
                        rel="noopener noreferrer"
                        onClick={() => handleFilterClick(filter.label)}
                        className={`flex items-center p-2 space-x-3 w-full border-l-4 ${
                          selectedFilter === filter.label
                            ? "border-violet-700"
                            : "border-l-white"
                        } hover:text-violet-700 transition-all duration-300`}
                      >
                        <span>{filter.label}</span>
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="w-3/4 h-5/6 ml-4">{renderContent()}</div>
            </div>

            <div className="absolute text-xl bottom-0 right-0 mb-3 mr-6">
              <button
                type="button"
                className=" text-violet-600 mx-6 rounded-md px-2 py-1  hover:bg-violet-200"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
              <button
                type="button"
                className=" mr-9 rounded-md px-2 py-1  bg-violet-500 text-white w-32 "
                onClick={handleApplyFilters}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
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
        className={" text-sm"}
      />
    </>
  );
}

export default ModalFilter;
