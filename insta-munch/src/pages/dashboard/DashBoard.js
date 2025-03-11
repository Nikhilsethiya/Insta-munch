import React, { useState, useEffect, Suspense } from "react";
import { getSwiggyData } from "../../api/request";
import SkeletonDashboard from "../../components/skeletonloader/SkeletonDashboard";
import Header from "../../components/header/Header";
import { useSelector } from "react-redux";
// import Data1 from "../../utils/data/swiggy-data-sample1.json";
// import Data2 from "../../utils/data/swiggy-data-sample2.json";
// import Data3 from "../../utils/data/swiggy-data-sample3.json";
// import Data4 from "../../utils/data/swiggy-data-sample4.json";

const LazyBanner = React.lazy(() => import("../../components/banner/Banner"));
const LazyCarousel = React.lazy(() =>
  import("../../components/carousel/Carousel")
);
const LazyRestaurants = React.lazy(() =>
  import("../../components/restaurants/Restaurants")
);
const LazyFooter = React.lazy(() => import("../../components/footer/Footer"));

function DashBoard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.users.userAllData) || {};

  useEffect(() => {
    let timeoutId;
    const fetchDataFromSwiggyAPI = async () => {
      setIsLoading(true);
      try {
        const body = {
          // lat: user?.coordinates?.lat ?? user?.location?.lat,
          // lng: user?.coordinates?.lng ?? user?.location?.lon
          lat: user?.coordinates?.lat ?? "18.4670072",
          lng: user?.coordinates?.lng ?? "73.8621036",
        };
        const response = await getSwiggyData(body);
        setData(response.data);
      } catch (error) {
        alert("API Failure");
      } finally {
        setIsLoading(false);
      }
    };
    const debounceFetchData = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(fetchDataFromSwiggyAPI, 1000);
    };
    debounceFetchData();
    return () => clearTimeout(timeoutId);
  }, [user?.coordinates]);

  if (isLoading) {
    return (
      <div className="overflow-y-scroll h-screen scrollbar-thin">
        <Header />
        <div className="mt-28">
          <SkeletonDashboard />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-scroll h-screen scrollbar-thin">
      <Header />
      {data?.data?.cards[0]?.card?.card?.id !== "swiggy_not_present" ? (
        <div className="mt-28">
          <Suspense fallback={<SkeletonDashboard />}>
            <LazyBanner />
            <LazyCarousel Data={data} CaraoselType={"image"} />
            <LazyCarousel Data={data} CaraoselType={"card"} />
            <LazyRestaurants Data1={data} />
            <LazyFooter />
          </Suspense>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center mt-40 mb-20 w-full">
            <section className="flex items-center  w-full">
              <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
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
                <p className="text-3xl">Location Unserviceable.</p>
                <p className="text-xl">Change the location from left side drawer.</p>
              </div>
            </section>
          </div>
          <LazyFooter />
        </div>
      )}
    </div>
  );
}

export default DashBoard;
