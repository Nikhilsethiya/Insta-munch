import React, { useState, useEffect, Suspense } from "react";
import SkeletonHelpCenter from "../../components/skeletonloader/SkeletonHelpCenter";
import Header from "../../components/header/Header";
import PopularCuisines from "../../components/popularcuisines/PopularCuisines";
import SearchAll from "../../components/searchall/SearchAll";
import SearchResult from "../../components/searchresult/SearchResult";

const LazyFooter = React.lazy(() => import("../../components/footer/Footer"));

function Search() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPopularCuisines, setShowPopularCuisines] = useState(true);
  const [restroResult, setRestroResult] = useState([]);
  const [dishResult, setDishResult] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    };
    fetchData();

    return () => clearTimeout(fetchData);
  }, []);

  const getResult = (restroResult, dishResult) => {
    setShowPopularCuisines(false);
    setRestroResult(restroResult);
    setDishResult(dishResult);
  };

  return (
    <div className="overflow-y-scroll h-screen scrollbar-thin">
      <Header tabName="Search" />
      <div className="mt-28">
        {isLoading ? (
          <SkeletonHelpCenter />
        ) : (
          <Suspense fallback={<SkeletonHelpCenter />}>
            <SearchAll getResult={getResult} />
            {showPopularCuisines && (
              <>
                <PopularCuisines />
                <LazyFooter />
              </>
            )}
            {!showPopularCuisines && (
              <SearchResult
                restroResult={restroResult}
                dishResult={dishResult}
              />
            )}
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default Search;
