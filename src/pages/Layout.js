import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/Logo.png";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleSidebar = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(event.target)
    ) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-colPrime text-white  text-xl p-2 flex justify-between items-center">
        <span>superadmin</span>
        <div className="flex items-center">
          <span className="mr-2 font-bold">CCET</span>
          <div className="w-10 h-10 text-lime-600 font-bold">
            <img src={logo} alt="" />
          </div>
          <button
            ref={toggleButtonRef}
            className="text-black text-xl px-2 py-1 ml-4 rounded"
            onClick={toggleSidebar}
          >
            <i className={`fa ${sidebarOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Main Content */}
        <main
          className={`flex-1 bg-white p-6 transition-all duration-300 ${
            sidebarOpen ? "mr-64" : "mr-0"
          }`}
        >
          <Outlet />
        </main>

        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={`bg-[#4D4D4C] text-white  text-xl w-64 fixed top-14 right-0 bottom-0 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ height: "calc(100vh - 2rem)" }}
        >
          <div className="p-4 border-b border-gray-600 flex justify-end items-center">
            <span className="font-bold">
              <Link to="/dashboard" className="text-xl text-white">
                نظام عصر العمليات الحسابية
              </Link>
              <i className="fas fa-home ml-2"></i>
            </span>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li className="p-2  rounded flex items-center justify-start flex-row-reverse gap-2">
                <Link to="/dashboard" className="text-xl text-white">
                  لوحة البيانات
                </Link>
              </li>
              <li className="p-2  rounded flex flex-col items-start justify-start gap-2">
                {/* Main Item with Dropdown Icon */}
                <div
                  className="flex items-center justify-between w-full flex-row-reverse cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <div className="flex items-center flex-row-reverse gap-2">
                    <i className="fas fa-school"></i>
                    <Link
                      to="dashboard/testselection/school"
                      className="text-white text-xl"
                    >
                      إدارة المدارس
                    </Link>
                  </div>
                  <i
                    className={`fas fa-chevron-down text-white transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                  <ul className="w-full pr-6 flex flex-col  gap-2 transform translate-x-28" >
                    <li>
                      <Link
                        to="dashboard/testselection/school/add"
                        className="block text-white hover:text-gray-300"
                      >
                        إضافة مدرسة
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="dashboard/testselection/school/manage"
                        className="block text-white hover:text-gray-300"
                      >
                        إدارة المدارس
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="dashboard/testselection/school/reports"
                        className="block text-white hover:text-gray-300 -ml-2"
                      >
                        تقارير المدارس
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="p-2  rounded flex items-center justify-start flex-row-reverse gap-2">
                <i className="fas fa-file-alt"></i>
                <Link to="testselection" className="text-white  text-xl">
                  الاختبارات
                </Link>
              </li>
              <li className="p-2  rounded flex items-center justify-start flex-row-reverse gap-2">
                <i className="fas fa-cog"></i>
                <Link to="/settings" className="text-white  text-xl">
                  الإعدادات
                </Link>
              </li>
              <li className="p-2  rounded flex items-center justify-start flex-row-reverse gap-2">
                <i className="fas fa-file"></i>
                <Link to="/reports" className="text-white  text-xl">
                  report page
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default Layout;
