import React, { useState, useEffect, useRef } from "react";
import Hamburger from "hamburger-react";
import { NavLink,useNavigate } from "react-router-dom";
import SearchIcon from "../../images/search.png";
import CartIcon from "../../images/cart.png";
import HelpIcon from "../../images/help.png";
import OffersIcon from "../../images/offers.png";
import UserIcon from "../../images/user.png";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/authReducer";
import { setUserAfterLogout } from "../../reducers/usersReducer";

function Navbar({ toggleDrawer, tabName ,handleMouseEnter, handleMouseLeave, isHovered }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userCart = useSelector((state) => state.users.userAllData.cart) || {};
  const length = Object.keys(userCart).length;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = !!localStorage.getItem("token");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogOut = () => {
    dispatch(logout());
    dispatch(setUserAfterLogout());
    if (isAuthenticated) {
      navigate("/LogIn");
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
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
      <nav className="flex items-center space-x-8 pr-10 text-lg font-semibold " 
                  onMouseLeave={handleMouseLeave}>
        <Menu>
          <MenuHandler>
            <div className="md:hidden text-gray-700 flex">
              <Hamburger
                toggled={isMenuOpen}
                toggle={toggleMenu}
                distance="lg"
                easing="ease-in"
                rounded
                direction="left"
                color="blueviolet"
              />
            </div>
          </MenuHandler>
          <MenuList
            className={`md:hidden w-full bg-violet-100 z-10 ${
              isMenuOpen ? "block" : "hidden"
            }`}
            ref={menuRef}
            onClick={() => setIsMenuOpen(false)}
          >
            <MenuItem className="flex items-center justify-center gap-4 py-3 pl-2 pr-8 border-2 mt-4 hover:border-gray-500 font-semibold">
              <NavLink
                to="/Dashboard"
                title="Profile"
                className="flex items-center px-4 flex-shrink-0 relative"
                activeclassname="border-violet-400"
              >
                <img
                  loading="lazy"
                  src={UserIcon}
                  className="w-4 h-4 mr-2"
                  alt="Profile Icon"
                />
                Profile
              </NavLink>
            </MenuItem>
            <MenuItem className="flex items-center justify-center gap-4 py-3 pl-2 pr-8 border-2 hover:border-gray-500 font-semibold">
              <NavLink
                to="/Search"
                title="Search"
                className="flex items-center px-4 flex-shrink-0 relative"
                activeclassname="border-violet-400"
              >
                <img
                  loading="lazy"
                  src={SearchIcon}
                  className="w-4 h-4 mr-2"
                  alt="Search Icon"
                />
                Search
              </NavLink>
            </MenuItem>
            <MenuItem className="flex items-center justify-center gap-4 py-3 pl-2 pr-8 border-2 hover:border-gray-500 font-semibold">
              <NavLink
                to="/Offers"
                title="Offers"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent relative flex-shrink-0"
                activeclassname="border-violet-400"
              >
                <img
                  loading="lazy"
                  src={OffersIcon}
                  className="w-4 h-4 mr-2"
                  alt="Offers Icon"
                />
                Offers
              </NavLink>
            </MenuItem>
            <MenuItem className="flex items-center justify-center gap-4 py-3 pl-2 pr-8 border-2 hover:border-gray-500 font-semibold">
              <NavLink
                to="/Help"
                title="Help"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent flex-shrink-0 relative"
                activeclassname="border-violet-400"
              >
                <img
                  loading="lazy"
                  src={HelpIcon}
                  className="w-4 h-4 mr-2"
                  alt="Help Icon"
                />
                Help
              </NavLink>
            </MenuItem>
            <MenuItem className="flex items-center justify-center gap-4 py-3 pl-2 pr-8 border-2 mb-2 hover:border-gray-500 font-semibold">
              <NavLink
                to="/Cart"
                title="Cart"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent flex-shrink-0 relative"
                activeclassname="border-violet-400"
              >
                <img
                  loading="lazy"
                  src={CartIcon}
                  className="w-4 h-4 mr-2"
                  alt="Cart Icon"
                />
                Cart
              </NavLink>
            </MenuItem>
            <MenuItem className="flex items-center justify-center gap-4 py-3 pl-2 pr-8 border-2 mb-2 hover:border-gray-500 font-semibold">
            <NavLink
                rel="noopener noreferrer"
                onClick={handleLogOut}
                to={"/LogIn"}
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent flex-shrink-0 relative"
              >
                <svg
                  viewBox="0 0 512 512"
                  className="w-4 h-4 fill-current mr-2"
                >
                  <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                  <rect width="32" height="32" x="256" y="232"></rect>
                </svg>
                <span>Logout</span>
              </NavLink>
            </MenuItem>
          </MenuList>
        </Menu>
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <NavLink
              to="/Search"
              title="Search"
              className={`flex items-center px-4 -mb-1   flex-shrink-0 relative  ${
                tabName === "Search"
                  ? "  pb-1 shadow-lg rounded-full shadow-stone-400  "
                  : "underlinecss"
              }`}
              activeclassname="border-violet-400"
            >
              <img
                loading="lazy"
                src={SearchIcon}
                className="w-4 h-4 mr-2"
                alt="Search Icon"
              />
              Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Offers"
              title="Offers"
              className={`flex items-center px-4 -mb-1   flex-shrink-0 relative  ${
                tabName === "Offers"
                  ? "  pb-1 shadow-lg rounded-full shadow-stone-400  "
                  : "underlinecss"
              }`}
              activeclassname="border-violet-400"
            >
              <span className="absolute w-10 h-9 top-2 left-20 animate-bounce new-offer">
                <p className="">New</p>
              </span>
              <img
                loading="lazy"
                src={OffersIcon}
                className="w-4 h-4 mr-2"
                alt="Offers Icon"
              />
              Offers
            </NavLink>
          </li>
          <li
              onMouseEnter={handleMouseLeave}>
            <NavLink
              to="/Help"
              title="Help"
              className={`flex items-center px-4 -mb-1   flex-shrink-0 relative  ${
                tabName === "Help"
                  ? "  pb-1 shadow-lg rounded-full shadow-stone-400  "
                  : "underlinecss"
              }`}
              activeclassname="border-violet-400"
            >
              <img
                loading="lazy"
                src={HelpIcon}
                className="w-4 h-4 mr-2"
                alt="Help Icon"
              />
              Help
            </NavLink>
          </li>
          <li className="relative"
              onMouseEnter={handleMouseLeave}>
            <NavLink
              onMouseEnter={handleMouseEnter}
              to="/Cart"
              title={length > 0 && length < 8? "" : "Cart"}
              className={`flex items-center px-4 -mb-1 flex-shrink-0 relative  ${
                tabName === "Cart"
                  ? "  pb-1 shadow-lg rounded-full shadow-stone-400  "
                  : ""
              }`}
              activeclassname="border-violet-400"
            >
              <img
                loading="lazy"
                src={CartIcon}
                className="w-4 h-4 mr-2"
                alt="Cart Icon"
              />
              Cart
              {length > 0 ? (
                <span
                className={`absolute top-0 left-14 w-5 h-5 rounded-lg font-bold text-white text-center text-xs profilebadge ${
                  isHovered &&  length < 8? 'bg-violet-600 ' : 'bg-green-500'
                }`}
              >
                {length}
              </span>
              ) : null}
             
            </NavLink>

          </li>
        </ul>
        <div className="hidden md:flex items-center space-x-8"
              onMouseEnter={handleMouseLeave}>
          <button
            type="button"
            title="Profile"
            onClick={toggleDrawer}
            className="px-2 py-2 my-5 font-semibold rounded-full ring-2 ring-violet-500 ring-offset-white relative flex-shrink-0 btnall "
          >
            <div className="">
              <img
                loading="lazy"
                src={UserIcon}
                className="w-6 h-6"
                alt="Profile Icon"
              />
            </div>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
