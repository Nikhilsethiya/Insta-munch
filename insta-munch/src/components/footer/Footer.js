import React from "react";
import { Link } from "react-router-dom";
import Port from "../../images/port.png";

function Footer() {
  return (
    <footer className="px-4 divide-y border-black border-t-2 bg-violet-200">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3 flex justify-center space-x-3 lg:justify-start">
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
          <span className="text-2xl mt-2 font-semibold">INSTA-MUNCH</span>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-4 gap-y-8 lg:w-2/3 sm:grid-cols-3">
          <div className="space-y-2">
            <h3 className="tracki uppercase text-violet-900 font-bold">
              Product
            </h3>
            <ul className="space-y-1">
              <li>
                <div>Features</div>
              </li>
              <li>
                <div>Integrations</div>
              </li>
              <li>
                <div>Pricing</div>
              </li>
              <li>
                <div>FAQ</div>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="tracki uppercase text-violet-900 font-bold">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <div>Privacy</div>
              </li>
              <li>
                <div>Terms of Service</div>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="uppercase text-violet-900 font-bold">Developers</h3>
            <ul className="space-y-1">
              <li>
                <div>Public API</div>
              </li>
              <li>
                <div>Documentation</div>
              </li>
              <li>
                <div>Guides</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid justify-center pt-6  lg:justify-between border-black border-t-2 pb-10">
        <div className="flex flex-col ml-10 self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
          <span>©2024 Made by Shreyans Mutha</span>
        </div>
        <div className="flex justify-center pt-4 mr-10 space-x-4 lg:pt-0 lg:col-end-13">
          <Link
            rel="noopener noreferrer"
            to={"mailto:informtoshreyans@gmail.com"}
            title="Email"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-400 text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
          </Link>
          <Link
            rel="noopener noreferrer"
            to="https://shreyansmutha.github.io/ShreyansMutha/"
            target="blank"
            title="Portfolio"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-400 text-gray-900"
          >
            <img
              loading="lazy"
              src={Port}
              alt="Portfolio"
              className="w-4 h-4 rounded-full object-cover object-center"
            />
          </Link>
          <Link
            rel="noopener noreferrer"
            to="https://github.com/ShreyansMutha"
            target="blank"
            title="GitHub"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-400 text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
