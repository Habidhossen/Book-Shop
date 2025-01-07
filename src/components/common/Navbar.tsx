"use client";

import { Twirl as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // TODO: for testing purposes
  const pathname = "/";

  const menuItems = [
    { title: "Home", link: "/" },
    { title: "Login", link: "/login" },
    { title: "Register", link: "/signup" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 shadow-sm bg-white px-4 md:px-28 lg:px-28">
      <div className="items-center mx-auto md:flex py-4 md:py-6 lg:py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            <Link href="/">Book Shop.</Link>
          </h1>
          <div className="flex items-center md:hidden space-x-2">
            <Hamburger
              size={24}
              toggled={isMobileMenuOpen}
              toggle={setIsMobileMenuOpen}
            />
          </div>
        </div>
        <div
          className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            isMobileMenuOpen ? "block h-screen" : "hidden"
          }`}
        >
          <ul className="justify-end items-center text-center md:text-start lg:text-start space-y-6 md:flex md:space-x-0 md:space-y-0 text-base md:text-sm lg:text-sm text-heading">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`text-base px-3 py-[6px] duration-150 ease-in cursor-pointer hover ${
                  (pathname === item.link && index !== 0) ||
                  (index === 0 && pathname === "/")
                    ? "text-green-500"
                    : "hover:text-green-500"
                }`}
              >
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
