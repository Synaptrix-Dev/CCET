import React, { useState } from "react";
import avatar from "../assets/avatar.png";
import { Link } from "react-router";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex flex-col items-end -mt-20 justify-center min-h-screen bg-white">
      <h1 className="text-colPrime text-6xl font-semibold mb-2 mx-16">
        تسجيل الدخول
      </h1>

      <div className="flex w-full max-w-8xl mx-16">
        {/* Left side - Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-96 h-96 -mt-10 ml-16">
            <img
              src={avatar}
              alt="Login user icon"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1">
          <div className="border-colPrime rounded-xl border-2 shadow-md bg-white">
            <form className="space-y-6 p-8">
              {/* Username field */}
              <div className="flex rounded-lg overflow-hidden shadow-sm">
                <input
                  type="text"
                  placeholder="اسم المستخدم"
                  className="flex-1 p-4 border border-gray-200 outline-none text-right bg-gray-50 focus:ring-2 focus:ring-colPrime/50 transition-all"
                />
                <div className="bg-gray-200 p-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              {/* Password field */}
              <div className="flex rounded-lg overflow-hidden shadow-sm">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="كلمة المرور"
                  className="flex-1 p-4 border border-gray-200 outline-none text-right bg-gray-50 focus:ring-2 focus:ring-colPrime/50 transition-all"
                />
                <div className="bg-gray-200 p-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>

              {/* Password options */}
              <div className="flex justify-between items-center text-sm text-gray-600">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center gap-2 hover:text-colPrime transition-colors"
                >
                  <span>{showPassword ? "إخفاء" : "إظهار"} كلمة المرور</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <a href="#" className="hover:text-colPrime transition-colors">
                  نسيت كلمة السر ؟
                </a>
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-end gap-2">
                <span className="text-gray-700">تذكرني</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-colPrime/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-colPrime"></div>
                </label>
              </div>

              {/* Submit button */}
              <Link to="/dashboard">
                <button
                  type="submit"
                  className="w-full bg-colPrime text-white p-4 rounded-lg mt-10 hover:bg-[#7aa526] transition-colors shadow-md hover:shadow-lg"
                >
                  تسجيل الدخول
                </button>
              </Link>
            </form>
          </div>

          {/* Create account link */}
          <div className="text-center mt-6">
            <a
              href="#"
              className="text-colPrime hover:underline transition-colors"
            >
              ليس لديك حساب؟ إنشاء حساب جديد
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
