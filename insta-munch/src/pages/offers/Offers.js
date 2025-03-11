import React, { useState, useEffect, Suspense } from "react";
import { getSwiggyData } from "../../api/request";
import SkeletonDashboard from "../../components/skeletonloader/SkeletonDashboard";
import Header from "../../components/header/Header";
import { useSelector } from "react-redux";
// import Data1 from "../../utils/data/swiggy-data-sample1.json";
// import Data2 from "../../utils/data/swiggy-data-sample2.json";

const LazyRestaurants = React.lazy(() =>
  import("../../components/restaurants/Restaurants")
);
const LazyFooter = React.lazy(() => import("../../components/footer/Footer"));
const cities = [
  {
    text: "Best Restaurants in Bangalore",
    link: "https://www.swiggy.com/city/bangalore/best-restaurants",
  },
  {
    text: "Best Restaurants in Pune",
    link: "https://www.swiggy.com/city/pune/best-restaurants",
  },
  {
    text: "Best Restaurants in Mumbai",
    link: "https://www.swiggy.com/city/mumbai/best-restaurants",
  },
  {
    text: "Best Restaurants in Delhi",
    link: "https://www.swiggy.com/city/delhi/best-restaurants",
  },
  {
    text: "Best Restaurants in Hyderabad",
    link: "https://www.swiggy.com/city/hyderabad/best-restaurants",
  },
  {
    text: "Best Restaurants in Kolkata",
    link: "https://www.swiggy.com/city/kolkata/best-restaurants",
  },
  {
    text: "Best Restaurants in Chennai",
    link: "https://www.swiggy.com/city/chennai/best-restaurants",
  },
  {
    text: "Best Restaurants in Chandigarh",
    link: "https://www.swiggy.com/city/chandigarh/best-restaurants",
  },
  {
    text: "Best Restaurants in Ahmedabad",
    link: "https://www.swiggy.com/city/ahmedabad/best-restaurants",
  },
  {
    text: "Best Restaurants in Jaipur",
    link: "https://www.swiggy.com/city/jaipur/best-restaurants",
  },
  {
    text: "Best Restaurants in Nagpur",
    link: "https://www.swiggy.com/city/nagpur/best-restaurants",
  },
  {
    text: "Best Restaurants in Bhubaneswar",
    link: "https://www.swiggy.com/city/bhubaneswar/best-restaurants",
  },
  {
    text: "Best Restaurants in Kochi",
    link: "https://www.swiggy.com/city/kochi/best-restaurants",
  },
  {
    text: "Best Restaurants in Surat",
    link: "https://www.swiggy.com/city/surat/best-restaurants",
  },
  {
    text: "Best Restaurants in Dehradun",
    link: "https://www.swiggy.com/city/dehradun/best-restaurants",
  },
  {
    text: "Best Restaurants in Ludhiana",
    link: "https://www.swiggy.com/city/ludhiana/best-restaurants",
  },
  {
    text: "Best Restaurants in Patna",
    link: "https://www.swiggy.com/city/patna/best-restaurants",
  },
  {
    text: "Best Restaurants in Mangaluru",
    link: "https://www.swiggy.com/city/mangaluru/best-restaurants",
  },
];

function Offers() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.users.userAllData) || {};

  useEffect(() => {
    let timeoutId;
    const fetchDataFromSwiggyAPI = async () => {
      setIsLoading(true);
      try {
        const body = {
          lat: user?.coordinates?.lat ?? user?.location?.lat,
          lng: user?.coordinates?.lng ?? user?.location?.lon
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

  return (
    <div className="overflow-y-scroll h-screen scrollbar-thin">
      <Header tabName="Offers" />
      <div className="mt-28">
        {isLoading ? (
          <SkeletonDashboard />
        ) : (
          <Suspense fallback={<SkeletonDashboard />}>
            <LazyRestaurants
              Data1={data}
              Data2 ={data}
              title={"Restaurants With Great Offers Near Me"}
            />
            <div className="mx-28 p-2 border-2 border-gray-400 my-12">
              <h3 className=" text-3xl font-bold text-violet-600 p-4">
                Get the best offers on the food from top restaurants near you
              </h3>
              <p className="ml-10 mr-2 p-2">
                Get ready for a scrumptious adventure filled with unbeatable
                offers on your favourite foods and restaurants. Whether you're
                in the mood for a cheesy pizza, a sizzling burger, or a
                delightful bowl of pasta, now is the perfect time to satisfy
                your cravings while saving big.
              </p>
              <p className="ml-10 mr-2 p-2">
                All the top-rated restaurants and popular eateries are rolling
                out enticing deals and discounts that are too good to resist.
                From mouthwatering buy-one-get-one-free offers to irresistible
                combo meals, there's something for everyone on Insta-Munch to
                relish without breaking the bank.
              </p>
              <p className="ml-10 mr-2 p-2">
                Imagine biting onto a juicy burger paired with a side of crispy
                fries, all at a fraction of the regular price. Or how about
                treating yourself to a cheesy, oven-fresh pizza with your
                favourite toppings without worrying about the bill? With these
                incredible offers, indulging in your beloved dishes has never
                been more budget-friendly.
              </p>
              <p className="ml-10 mr-2 p-2">
                So, whether you're planning a cosy night in, a family feast, or
                a fun dinner with friends, take advantage of these fantastic
                deals. It's time to savour the flavours you adore without
                emptying your wallet. Order now, support your local restaurants,
                and make every meal a delightful and cost-effective experience.
                Don't miss out – let your taste buds rejoice, and your savings
                grow with these irresistible food offers on Insta-Munch!
              </p>
            </div>
            <div className="mx-28 p-2 border-2 border-gray-400 my-12">
              <h3 className="text-3xl font-bold text-violet-600 p-4">
                Best Places to Eat Across Cities
              </h3>
              <div className="grid grid-cols-3 gap-4 p-8 ">
                {cities?.map((item, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-400 p-2 cursor-pointer flex justify-center font-semibold hover:text-violet-800 hover:bg-violet-100"
                  >
                    <p >{item?.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <LazyFooter />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default Offers;
