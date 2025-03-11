import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    filterValues: {},
    sortBy: "Relevance (Default)",
    vegOrNonVeg: "",
    Offer: "",
  },
  reducers: {
    setFilterValues(state, action) {
      state.filterValues = action.payload;
    },
    setButtonFilterFastDelivery(state, action) {
      state.filterValues.deliveryTimefacetquery1 = action.payload;
    },
    setButtonFilterNewOnInstaMart(state, action) {
      state.filterValues.newfacetquery1 = action.payload;
    },
    setButtonFilterRatings4plus(state, action) {
      state.filterValues.ratingfacetquery4 = action.payload;
    },
    setButtonFilterRs300_Rs600(state, action) {
      state.filterValues.costForTwofacetquery3 = action.payload;
    },
    setButtonFilterLessThanRs300(state, action) {
      state.filterValues.costForTwofacetquery5 = action.payload;
    },
    setVegOrNonVeg(state, action) {
      state.vegOrNonVeg = action.payload;
    },
    setOffer(state, action) {
      state.Offer = action.payload;
    },
    setSortByFilters(state, action) {
      state.sortBy = action.payload;
    },
    clearAllFilters(state) {
      state.filterValues = {};
      state.sortBy = "Relevance (Default)";
      state.vegOrNonVeg = "";
      state.Offer = "";
    },
  },
});

export const {
  setFilterValues,
  setButtonFilterFastDelivery,
  setButtonFilterNewOnInstaMart,
  setButtonFilterRatings4plus,
  setButtonFilterRs300_Rs600,
  setButtonFilterLessThanRs300,
  setSortByFilters,
  setVegOrNonVeg,
  setOffer,
  clearAllFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
