import React from "react";
import { Link } from "react-router-dom";

function HelpCenter() {
  return (
    <section className="">
      <div className="container flex flex-col items-center p-4 mx-auto md:p-8 mt-28 mb-8">
        <h1 className="text-3xl font-bold leadi text-center sm:text-4xl mb-10">
          Help Center
        </h1>
        
        <div className="flex flex-col w-full divide-y sm:flex-row sm:divide-y-0 sm:divide-x-2 sm:px-8 lg:px-12 xl:px-32 divide-gray-700 text-xl">
          <div className="flex flex-col w-full divide-y-2 divide-gray-700">
            <div
              rel="noopener noreferrer"
              to={''}
              className="flex items-center justify-center p-4 sm:py-8 lg:py-12 transition ease-in-out hover:-translate-y-2 hover:scale-120 hover:text-violet-500 hover:font-semibold"
            >
              Billing
            </div>
            <div
              rel="noopener noreferrer"
              to={''}
              className="flex items-center justify-center p-4 sm:py-8 lg:py-12 transition ease-in-out hover:-translate-y-2 hover:scale-120 hover:text-violet-500 hover:font-semibold"
            >
              Support
            </div>
            <div
              rel="noopener noreferrer"
              to={''}
              className="flex items-center justify-center p-4 sm:py-8 lg:py-12 transition ease-in-out hover:-translate-y-2 hover:scale-120 hover:text-violet-500 hover:font-semibold"
            >
              Account
            </div>
          </div>
          <div className="flex flex-col w-full divide-y-2 divide-gray-700">
            <div
              rel="noopener noreferrer"
              to={''}
              className="flex items-center justify-center p-4 sm:py-8 lg:py-12 transition ease-in-out hover:-translate-y-2 hover:scale-120 hover:text-violet-500 hover:font-semibold"
            >
              Features
            </div>
            <div
              rel="noopener noreferrer"
              to={''}
              className="flex items-center justify-center p-4 sm:py-8 lg:py-12 transition ease-in-out hover:-translate-y-2 hover:scale-120 hover:text-violet-500 hover:font-semibold"
            >
              Contact us
            </div>
            <div
              rel="noopener noreferrer"
              to={''}
              className="flex items-center justify-center p-4 sm:py-8 lg:py-12 transition ease-in-out hover:-translate-y-2 hover:scale-120 hover:text-violet-500 hover:font-semibold"
            >
              My orders
            </div>
          </div>
          <div className="hidden w-full divide-y-2 sm:flex-col sm:flex divide-gray-700">
            <div
              rel="noopener noreferrer"
              to={''}
              className="flex items-center justify-center p-4 sm:py-8 lg:py-12 transition ease-in-out hover:-translate-y-2 hover:scale-120 hover:text-violet-500 hover:font-semibold"
            >
              Enterprise
            </div>
            <div
              rel="noopener noreferrer"
              to={''}
              className="flex items-center justify-center p-4 sm:py-8 lg:py-12 transition ease-in-out hover:-translate-y-2 hover:scale-120 hover:text-violet-500 hover:font-semibold"
            >
              Privacy
            </div>
            <div
              rel="noopener noreferrer"
              to={''}
              className="flex items-center justify-center p-4 sm:py-8 lg:py-12 transition ease-in-out hover:-translate-y-2 hover:scale-120 hover:text-violet-500 hover:font-semibold"
            >
              Developers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default HelpCenter;
