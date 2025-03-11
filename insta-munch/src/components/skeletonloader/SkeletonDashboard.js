import React from "react";

const SkeletonDashboard = () => {
  return (
    <div className="w-full">
      {/* Skeleton for top section */}
      <div className="p-6 py-12 mx-10 h-40 rounded animate-pulse bg-violet-100"></div>

      {/* Skeleton for middle section */}
      <div className="p-6 mt-8 mx-20 h-64 rounded border-b-2">
        <div className="flex justify-between items-center">
          <div className="h-8 w-1/3 rounded animate-pulse bg-violet-100"></div>
          <div className="flex">
            <div className="w-8 h-8 rounded-full mx-4 animate-pulse bg-violet-100"></div>
            <div className="w-8 h-8 rounded-full animate-pulse bg-violet-100"></div>
          </div>
        </div>
        <div className="flex mt-12">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="w-32 h-32 rounded-lg animate-pulse bg-violet-100 mx-4"></div>
          ))}
        </div>
      </div>

      {/* Skeleton for bottom section */}
      <div className="p-6 mt-8 mx-20 h-76 rounded border-b-2">
        <div className="flex justify-between items-center">
          <div className="h-8 w-1/2 rounded animate-pulse bg-violet-100"></div>
          <div className="flex">
            <div className="w-8 h-8 rounded-full animate-pulse bg-violet-100 mx-4"></div>
            <div className="w-8 h-8 rounded-full animate-pulse bg-violet-100"></div>
          </div>
        </div>
        <div className="flex mt-12">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="w-52 h-52 rounded-lg animate-pulse bg-violet-100 mx-4"></div>
          ))}
        </div>
      </div>

      {/* Skeleton for footer section */}
      <footer className="px-4 divide-y border-t-2">
        <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <div className="lg:w-1/3 flex justify-center space-x-3 lg:justify-start">
            <div className="flex items-center justify-center w-12 h-12 rounded-full animate-pulse bg-violet-100"></div>
            <div className="animate-pulse bg-violet-100 w-48 h-8 mt-2"></div>
          </div>
          <div className="grid grid-cols-2 text-sm gap-x-4 gap-y-8 lg:w-2/3 sm:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="animate-pulse bg-violet-100 w-36 h-5"></div>
                <div className="space-y-1">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="animate-pulse bg-violet-100 w-28 h-3"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid justify-center pt-6 lg:justify-between border-t-2 pb-10">
          <div className="flex flex-col ml-10 self-center text-sm text-center md:block lg:col-start-1 md:space-x-6 animate-pulse bg-violet-100">
            <div className="animate-pulse bg-violet-100 w-72 h-5"></div>
          </div>
          <div className="flex justify-center pt-4 mr-10 space-x-4 lg:pt-0 lg:col-end-13">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center justify-center w-10 h-10 rounded-full animate-pulse bg-violet-100"></div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkeletonDashboard;
