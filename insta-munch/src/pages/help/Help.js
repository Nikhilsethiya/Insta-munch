import React, { useState, useEffect, Suspense } from "react";
import SkeletonHelpCenter from "../../components/skeletonloader/SkeletonHelpCenter";
import Header from "../../components/header/Header";

const LazyHelpCenter = React.lazy(() =>
  import("../../components/helpcenter/HelpCenter")
);
const LazyFooter = React.lazy(() => import("../../components/footer/Footer"));

function Help() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    };
    fetchData();

    return () => clearTimeout(fetchData);
  }, []);

  return (
    <div className="overflow-y-scroll h-screen scrollbar-thin">
      <Header tabName="Help"/>
      <div className="mt-28">
        {isLoading ? (
          <SkeletonHelpCenter />
        ) : (
          <Suspense fallback={<SkeletonHelpCenter />}>
            <LazyHelpCenter />
            <LazyFooter />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default Help;
