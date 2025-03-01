import React, { useState } from "react";
import avatar from "../assets/avatar.png";
import { Link } from "react-router";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex flex-col items-end -mt-20 justify-center min-h-screen bg-white ">
      <h1 className="text-colPrime text-6xl font-semibold mb-2 mx-16 ">تسجيل الدخول</h1>

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
          <div className=" border-colPrime rounded-sm border-2">
            <form className="space-y-2">
              {/* Username field */}
              <div className="flex pl-12 p-2">
                <input
                  type="text"
                  placeholder="اسم المستخدم"
                  className="flex-1 p-3 border border-gray-300 outline-none text-right"
                />
                <div className="bg-gray-200 p-3 flex items-center justify-center">
                  <i className="fas fa-user"></i>
                </div>
              </div>

              {/* Password field */}
              <div className="flex p-2 pl-12">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="كلمة المرور"
                  className="flex-1 p-3 border border-gray-300 outline-none text-right"
                />
                <div className="bg-gray-200 p-3 flex items-center justify-center">
                  <i className="fas fa-lock"></i>
                </div>
              </div>

              {/* Password options */}
              <div className="flex p-2 pl-12 justify-between items-center text-sm text-gray-600">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center gap-1"
                >
                  <span>تغيير كلمة المرور</span>
                  <i className="far fa-eye relative -top-14 -left-16"></i>
                </button>
                <a href="#" className="text-right">
                  نسيت كلمة السر ؟
                </a>
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-end p-2 pl-12 gap-2">
                <span>تذكرني</span>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 accent-colPrime"
                />
              </div>

              {/* Submit button */}
              <button
              to='/dashboard'
                // type="submit"
                className="w-full bg-colPrime text-white p-3  hover:bg-[#7aa526] transition-colors"
              >
                تسجيل الدخول
              </button>
            </form>
          </div>

          {/* Create account link */}
          <div className="text-center mt-4">
            <a href="#" className="text-colPrime">
              ليس لديك حساب؟ إنشاء حساب جديد
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
