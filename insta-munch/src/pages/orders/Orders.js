import React, { useState, useEffect, Suspense } from "react";
import SkeletonHelpCenter from "../../components/skeletonloader/SkeletonHelpCenter";
import Header from "../../components/header/Header";
import { useSelector } from "react-redux";
import Check from "../../images/check.png";
import ModalViewDetails from "../../components/modalviewdetails/ModalViewDetails";

const LazyFooter = React.lazy(() => import("../../components/footer/Footer"));

function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const userOrders =
    useSelector((state) => state.users.userAllData.orders) || {};

  const newArray = Object.keys(userOrders).map((key, index) => {
    const obj = userOrders[key];
    const newObj = { ...obj };
    newObj.id = key;
    return newObj;
  });
  newArray.sort((a, b) => parseInt(b.id) - parseInt(a.id));

  const openModal = (id) => {
    setSelectedOrderId(id);
    setIsModalOpen(true);
  };
  const closeModal = (item) => {
    setIsModalOpen(false);
  };

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
      <Header />
      <div className="mt-28">
        {isLoading ? (
          <SkeletonHelpCenter />
        ) : (
          <Suspense fallback={<SkeletonHelpCenter />}>
            <section className="bg-violet-100 text-gray-800 mx-32 rounded-md">
              <div className="container flex flex-col justify-center  mx-auto md:p-6 mb-8">
                <h2 className=" text-4xl font-bold leadi text-center  mr-auto mb-4">
                  Past Orders
                </h2>
                <div className="mx-12 ">
                  {newArray.length === 0 ? (
                    <div className="flex items-center justify-center my-16  w-full">
                      <section className="flex items-center  w-full">
                        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md ">
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
                          <p className="text-3xl">Order Something!</p>
                        </div>
                      </section>
                    </div>
                  ) : (
                    newArray.map((item, index) => (
                      <div key={index} className="">
                        <div className="grid bg-white sm:p-3 grid-cols-3 w-full mt-4 rounded-md relative">
                          <div className="font-bold text-2xl col-span-3 text-violet-700 bg-violet-100 rounded-md top-0 left-0 absolute px-2">
                            {" "}
                            {index + 1}
                          </div>
                          <div className="w-full  col-span-2 ml-16">
                            <h3
                              className="font-bold mb-1 text-xl text-violet-600 cursor-pointer"
                              title="View Details"
                              onClick={() => {
                                openModal(item.id);
                              }}
                            >
                              Order #{item.id}
                            </h3>
                          </div>
                          <div className="ml-auto mt-2 ">
                            {" "}
                            <h3 className="font-semibold mb-1 ml-4 flex">
                              Delivered on {item.time}
                              <img
                                loading="lazy"
                                src={Check}
                                className="w-6 h-6 ml-4 "
                                alt="Check Icon"
                              />
                            </h3>
                          </div>
                          <div className="mb-1 mt-4 col-span-2">
                            <h3 className="font-semibold">
                              Delivered @ {item.deliveryadd}
                            </h3>
                          </div>
                          <div className="mb-1 mt-4  ml-auto">
                            <h3 className="font-bold mb-1 text-lg">
                              Total Paid :- ₹ {item.totalfair}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
            {newArray.length > 1 && <LazyFooter />}
          </Suspense>
        )}
      </div>
      {isModalOpen && (
        <ModalViewDetails closeModal={closeModal} orderId={selectedOrderId} />
      )}
    </div>
  );
}

export default Orders;
