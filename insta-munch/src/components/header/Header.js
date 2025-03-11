import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import DrawerLocation from "../drawerlocation/DrawerLocation";
import Arrow from "../../images/arrow.png";
import DrawerProfile from "../drawerprofile/DrawerProfile";
import ModalProfile from "../modalprofile/ModalProfile";
import ModalSettings from "../modalsettings/ModalSettings";
import CartHover from "../carthover/CartHover";
import { useDispatch, useSelector } from "react-redux";
import { setUserCart } from "../../reducers/usersReducer";

function Header({ tabName }) {
  const dispatch = useDispatch();
  const [isDrawerLocationOpen, setIsDrawerLocationOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showEmptyCartMsg, setShowEmptyCartMsg] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const userCart = useSelector((state) => state.users.userAllData.cart) || {};
  const length = Object.keys(userCart).length;

  const clearCart = () => {
    dispatch(setUserCart({}));
    setShowEmptyCartMsg("Your cart has been cleared!");
  };

  const handleMouseEnter = () => {
    setShowCart(true);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setShowCart(false);
    setIsHovered(false);
  };

  const drawerRef = useRef(null);

  const toggleLocationDrawer = (event) => {
    event.stopPropagation();
    setIsDrawerLocationOpen(!isDrawerLocationOpen);
  };
  const toggleDrawer = (event) => {
    event.stopPropagation();
    setIsDrawerOpen(!isDrawerOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  const closeLocationDrawer = () => setIsDrawerLocationOpen(false);
  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false);
        event.stopPropagation();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="fixed left-0 top-1/2 transform -translate-y-1/2 items-center h-8 w-8 rounded-full text-white flex justify-center cursor-pointer"
        onClick={toggleLocationDrawer}
        title="Set Location"
      >
        <img loading="lazy" src={Arrow} className="w-6 h-6" alt="Arrow Icon" />
      </div>
      <div
        className={`fixed inset-y-0 z-40 left-0 w-1/3 bg-violet-100  shadow-gray-950 shadow-xl transition-transform ${
          isDrawerLocationOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <DrawerLocation closeDrawer={closeLocationDrawer} />
      </div>
      <header className="bg-violet-100 fixed top-0 left-0 w-full z-30 shadow-md">
        <div className="flex h-20 justify-between mx-auto shadow-xl">
          <Link
            rel="noopener noreferrer"
            to= {window.location.pathname === "/DashBoard"? "" : "/DashBoard"}
            title="Insta-Munch"
            aria-label="Back to homepage"
            className="flex items-center mx-8"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-violet-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="currentColor"
                className="flex-shrink-0 w-5 h-5 rounded-full text-gray-900"
              >
                <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
              </svg>
            </div>
          </Link>
          <Navbar
            toggleDrawer={toggleDrawer}
            isModalOpen={isModalOpen}
            isSettingsModalOpen={isSettingsModalOpen}
            tabName={tabName}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            isHovered={isHovered}
          />
        </div>
      </header>
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 z-40 right-0 w-1/4 bg-violet-100 shadow-gray-950 shadow-lg transition-transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <DrawerProfile
          closeDrawer={closeDrawer}
          openModal={openModal}
          openSettingsModal={openSettingsModal}
        />
      </div>
      {isModalOpen && <ModalProfile closeModal={closeModal} />}

      {isSettingsModalOpen && <ModalSettings closeModal={closeSettingsModal} />}
      <div className=" z-40 sticky top-8 mr-24">
        {showCart && tabName !== "Cart" && length > 0 && length < 8 && (
          <>
            {" "}
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className=" absolute top-10 right-6 z-10 ">
                <div className="w-4 h-4 bg-violet-100 border-t-2 border-l-2 rounded-sm border-violet-800 transform rotate-45 " />
              </div>
              <div className="absolute top-12  right-0 w-96">
                <CartHover userCart={userCart} clearCart={clearCart} />
              </div>
            </div>
            
          </>
        )}
      </div>
      {showEmptyCartMsg && (
          <div className="fixed bottom-10 right-5 z-40">
            <div className="flex shadow-md gap-6 rounded-lg overflow-hidden divide-x max-w-2xl bg-gray-900 text-gray-100 divide-gray-700">
              <div className="flex flex-1 flex-col p-4 border-l-8 border-green-400">
                <span className="text-2xl font-semibold">Success</span>
                <span className="text-sm text-gray-400">{showEmptyCartMsg}</span>
              </div>
              <button
                className="px-4 flex items-center text-sm uppercase tracki text-gray-200 border-gray-700"
                onClick={() => {
                  setShowEmptyCartMsg("");
                }}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
    </>
  );
}

export default Header;
