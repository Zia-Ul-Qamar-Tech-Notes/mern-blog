import React from "react";
import {
  Button,
  Navbar,
  NavbarLink,
  TextInput,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Header() {
  const path = useLocation().pathname;
  return (
    <>
      <Navbar className="">
        <Link
          to={"/"}
          className=" self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Mirza's
          </span>
          Blog
        </Link>
        <form>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          />
        </form>
        <Button className="w-12 h-10 lg:hidden bg-gray-400" pill={true}>
          {" "}
          <AiOutlineSearch />{" "}
        </Button>
        <div className=" flex gap-2 md:order-2">
          <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
            <FaMoon />
          </Button>
          <Link to="/signin">
            <Button className=" bg-gradient-to-r from-indigo-400 via-pink-400 to-blue-400">
              Sign In
            </Button>
          </Link>
          <NavbarToggle />
        </div>
        <NavbarCollapse className="text-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:bg-gray-400 hover:rounded-lg font-semibold cursor-pointer block px-4 py-2 ${
                isActive ? "text-blue-500" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:bg-gray-400 hover:rounded-lg font-semibold cursor-pointer block px-4 py-2 ${
                isActive ? "text-blue-500" : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `hover:bg-gray-400 hover:rounded-lg font-semibold cursor-pointer block px-4 py-2 ${
                isActive ? "text-blue-500" : ""
              }`
            }
          >
            Projects
          </NavLink>
        </NavbarCollapse>
      </Navbar>
    </>
  );
}

export default Header;
