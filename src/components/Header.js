import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";

function Header() {
  const location = useLocation();
  const showHeader =
    location.pathname === "/" || location.pathname === "/login";

  if (!showHeader) return null;

  return (
    <header className="mt-12 w-full z-[99] transition-all duration-300 flex flex-wrap md:justify-start md:flex-nowrap text-gray-300">
      <nav className="relative bg-[#F5F5F5] h-10 max-w-8xl w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between w-full text-black">
          <a
            href="/"
            className="flex-none font-semibold text-xl focus:outline-none focus:opacity-80"
          >
            <img src={logo} alt="logo" className="w-28" />
          </a>

          <div className="flex items-center justify-center ">
            <Link className="px-2 flex items-center text-xl hover:bg-colPrime hover:text-white cursor-pointer py-[0.30rem]  border-r-2 border-gray-600">
              تواصل معنا
            </Link>
            <Link className="px-2 flex items-center text-xl hover:bg-colPrime hover:text-white cursor-pointer py-[0.30rem]  border-r-2 border-gray-600">
              اختبارات الفرز
            </Link>
            <Link className="px-2 flex items-center text-xl hover:bg-colPrime hover:text-white cursor-pointer py-[0.30rem] border-r-2 border-gray-600">
              البرامج العلاجية
            </Link>
            <Link className="px-2  flex items-center text-xl hover:bg-colPrime hover:text-white cursor-pointer py-[0.30rem] border-r-2 border-gray-600">
              عن الاختبار
            </Link>
            <Link
              to="/login"
              className="px-2 flex items-center text-xl  hover:bg-colPrime hover:text-white cursor-pointer py-[0.30rem]"
            >
              تسجيل الدخول
            </Link>
            <Link
              to="/"
              className="p-2 flex items-center text-xl bg-colPrime text-white cursor-pointer px-4 py-[0.30rem]"
            >
              الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
