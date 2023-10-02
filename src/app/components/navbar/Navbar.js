"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useSession, signOut } from "next-auth/react";
import HomeNavbarItem from "./HomeNavbarItem";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const {data, status} = useSession();
  
  const path = usePathname();
  // console.log("data=",data);
  // console.log("status=",status);

  useEffect(() => {
    setMobileNavOpen(false)
  }, [path])
  

  return (
    <div className="w-full shadow-md ">
      {/* Tablet and Laptop Navbar */}
      <div className="w-[80%] mx-auto  py-3 flex items-center justify-between">
        <h2 className="italic text-yellow-500 font-bold text-2xl">EzeyBlog</h2>
        {/* Burger and cross icon for mobile */}
        <div
          className="md:hidden text-yellow-500 text-2xl cursor-pointer"
          onClick={() => setMobileNavOpen(true)}
        >
          {mobileNavOpen ? <RxCross2 /> : <RxHamburgerMenu />}
        </div>
          {status === "authenticated" ? (
            <HomeNavbarItem />
          ) : (
            <div className="space-x-5 hidden md:block">
              <Link
                href="/login"
                className="bg-yellow-500 py-2 px-5 rounded-md hover:bg-yellow-400 text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-yellow-500 py-2 px-5 rounded-md hover:bg-yellow-400 text-white"
              >
                Register
              </Link>
            </div>            
          )}          
      </div>
      {/* Tablet and Laptop Navbar Ends */}
      {/* Mobile Menu */}
      {/* {mobileNavOpen && ( */}
        <>
          <div className={`absolute top-0 left-0 h-screen w-full bg-black/60 ${!mobileNavOpen && 'hidden'}`}></div>
          <div
            className={`bg-yellow-500 w-[75%] h-full  absolute  top-0 flex flex-col overflow-hidden items-center p-10 ${
              mobileNavOpen
                ? "left-0  duration-500 ease-in  "
                : "left-[-100%]  duration-500 ease-in"
            }  `}
          >
            <div className="flex items-center justify-between w-full cursor-pointer  ">
              <h2 className="italic text-white font-bold text-2xl">EzeyBlog</h2>
              <RxCross2
                onClick={() => setMobileNavOpen(false)}
                className="text-4xl  text-white border border-white hover:scale-110 transition rounded-full p-2 min-h-max"
              />
            </div>
            <div className="flex-1 w-full mt-5 flex flex-col gap-5 items-center justify-center">
            {status === "unauthenticated" ? (
              <>
                <Link
                  href="/login"
                  className="text-gray-200 font-serif text-xl hover:underline"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-gray-200 font-serif text-xl hover:underline"
                >
                  Register
                </Link>
              </>
          ) : (
              <Link
                href="#"
                className="text-gray-200 font-serif text-xl hover:underline"
                
              >
                Logout
              </Link>
          )}
              
            </div>
          </div>
        </>
      {/* )} */}
      {/* Mobile Menu Ends */}
    </div>
  );
};

export default Navbar;
