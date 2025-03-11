import React from "react";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="p-6 py-12 mx-10 mb-8 relative bg-violet-200 text-gray-900">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <h2 className="text-center text-6xl font-bold custom-alternate-animation">
            Up to <br className="sm:hidden" />
            50% Off
          </h2>
          <div className="space-x-2 text-center py-2 lg:py-0">
            <span>Plus free Delivery!!! Use Coupon:</span>
            <span className="font-bold text-lg">SHREY7900</span>
          </div>
          <Link
            to={'/PageNotFound'}
            rel="noreferrer noopener"
            className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-gray-50 text-gray-900 border-gray-400"
          >
            Get it Now!
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Banner;
