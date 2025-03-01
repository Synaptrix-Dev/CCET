import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/Logo.png";
const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative  flex flex-col">
      {/* Header */}
      <header className="bg-colPrime text-white p-4 flex justify-between items-center">
        <span>superadmin</span>
        <div className="flex items-center">
          <span className="mr-2 font-bold">CCET</span>
          <div className="w-10 h-10   text-lime-600 font-bold">
            <img src={logo} alt="" />
          </div>
          <button
            className=" text-black text-xl px-2 py-1 ml-4 rounded"
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

        {/* Sidebar - Now on the right with toggle */}
        <aside
          className={`bg-[#4D4D4C] text-white w-64 fixed top-16 right-0 bottom-0 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <div className="p-4 border-b border-gray-600 flex justify-end items-center">
            <span className="font-bold">
              <Link to="/dashboard" className="text-white">
                لوحة البيانات
              </Link>
            </span>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li className="p-2 hover:bg-gray-600 rounded flex items-center justify-start flex-row-reverse gap-2">
                <i className="fas fa-school"></i>
                <Link to="/schools" className="text-white">
                  إدارة المدارس
                </Link>
              </li>
              <li className="p-2 hover:bg-gray-600 rounded flex items-center justify-start flex-row-reverse gap-2">
                <i className="fas fa-file-alt"></i>
                <Link to="testselection" className="text-white">
                  الاختبارات
                </Link>
              </li>
              <li className="p-2 hover:bg-gray-600 rounded flex items-center justify-start flex-row-reverse gap-2">
                <i className="fas fa-cog"></i>
                <Link to="/settings" className="text-white">
                  الإعدادات
                </Link>
              </li>
              <li className="p-2 hover:bg-gray-600 rounded flex items-center justify-start flex-row-reverse gap-2">
                <i className="fas fa-file"></i>
                <Link to="/reports" className="text-white">
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
