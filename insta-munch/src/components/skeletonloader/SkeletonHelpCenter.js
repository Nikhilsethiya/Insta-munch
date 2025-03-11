import React from "react";

const SkeletonHelpCenter = () => {
  return (
    <div>
      <section className="">
        <div className="container flex flex-col items-center p-4 mx-auto md:p-8 mt-28 mb-8">
          <p className="text-3xl font-bold leading-tight text-center sm:text-4xl mb-20 animate-pulse bg-violet-100 w-48 h-12"></p>

          <div className="flex flex-col w-full divide-y sm:flex-row sm:divide-y-0 sm:divide-x-2 px-36 divide-gray-300 text-xl">
            <div className="flex flex-col w-full divide-y-2 divide-gray-300">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-4 sm:py-8 lg:py-12 transition ease-in-out animate-pulse bg-violet-100"
                ></div>
              ))}
            </div>
            <div className="flex flex-col w-full divide-y-2 divide-gray-300">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-4 sm:py-8 lg:py-12 transition ease-in-out animate-pulse bg-violet-100"
                ></div>
              ))}
            </div>
            <div className="hidden w-full divide-y-2 sm:flex-col sm:flex divide-gray-300">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-4 sm:py-8 lg:py-12 transition ease-in-out animate-pulse bg-violet-100"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
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
                    <div
                      key={index}
                      className="animate-pulse bg-violet-100 w-28 h-3"
                    ></div>
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
              <div
                key={index}
                className="flex items-center justify-center w-10 h-10 rounded-full animate-pulse bg-violet-100"
              ></div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkeletonHelpCenter;
