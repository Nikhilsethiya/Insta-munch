import React, { useState, useEffect, Suspense } from "react";
import SkeletonDashboard from "../../components/skeletonloader/SkeletonDashboard";
import Header from "../../components/header/Header";
import CheckOut from "../../components/checkout/CheckOut";

const LazyFooter = React.lazy(() => import("../../components/footer/Footer"));

function Cart() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    };
    fetchData();

    return () => clearTimeout(fetchData);
  }, []);

  return (
    <div className="overflow-y-scroll h-screen scrollbar-thin">
      <Header tabName="Cart" />
      <div className="mt-28">
        {isLoading ? (
          <SkeletonDashboard />
        ) : (
          <Suspense fallback={<SkeletonDashboard />}>
            <CheckOut />
            <LazyFooter />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default Cart;
