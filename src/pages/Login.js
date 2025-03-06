import React, { useState } from "react";
import Avatar from "../assets/avatar.png";
import { Link } from "react-router";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <div className="flex flex-col items-end mt-20 justify-center  bg-white">
      {/* Main Heading */}
      <h1 className="text-[#8eb82b] text-6xl font-semibold mb-2 mx-16">
        تسجيل الدخول
      </h1>

      <div className="flex w-full max-w-8xl mx-16">
        {/* Left side - Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-96 h-96 -mt-10 ml-16">
            <img
              src={Avatar}
              alt="Login user icon"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1">
          <div className="border-[#8eb82b] rounded-xl border-2 shadow-md bg-white">
            <form className="space-y-6 p-8">
              {/* Username field */}
              <div className="flex rounded-lg overflow-hidden shadow-sm">
                <input
                  type="text"
                  placeholder="اسم المستخدم"
                  className="flex-1 p-4 border border-gray-200 outline-none text-right bg-gray-50 focus:ring-2 focus:ring-[#8eb82b]/50 transition-all"
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
                  className="flex-1 p-4 border border-gray-200 outline-none text-right bg-gray-50 focus:ring-2 focus:ring-[#8eb82b]/50 transition-all"
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
                  className="flex items-center gap-2 hover:text-[#8eb82b] transition-colors"
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
                <button
                  type="button"
                  onClick={() => setShowChangePasswordModal(true)}
                  className="hover:text-[#8eb82b] transition-colors"
                >
                  نسيت كلمة السر ؟
                </button>
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
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8eb82b]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8eb82b]"></div>
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
            <button
              type="button"
              onClick={() => setShowUserModal(true)}
              className="text-[#8eb82b] hover:underline transition-colors"
            >
              ليس لديك حساب؟ إنشاء حساب جديد
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4">
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-bold text-gray-800">
                تغيير كلمة المرور
              </h2>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-medium text-right mb-4">
                إعادة تعيين كلمة السر
              </h3>

              <div className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="كلمة السر القديمة"
                    className="w-full p-3 border rounded text-right"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="كلمة مرور جديدة"
                    className="w-full p-3 border rounded text-right"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="تأكيد كلمة المرور"
                    className="w-full p-3 border rounded text-right"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setShowChangePasswordModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  إلغاء
                </button>
                <button className="px-4 py-2 bg-[#8eb82b] text-white rounded hover:bg-[#7aa526]">
                  تغيير كلمة المرور
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Registration Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl">
            <div className="flex justify-between items-center p-4">
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-bold text-gray-800">المستخدمين</h2>
            </div>

            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Right Column: Input Fields */}
                <div className="flex-1 order-2 sm:order-1">
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="w-full">
                        <select className="w-full p-2 border rounded text-right">
                          <option>اختر نوع المستخدم</option>
                        </select>
                      </div>
                      <span className="text-red-500 mx-2">*</span>
                      <label className="whitespace-nowrap">
                        أنواع المستخدمين
                      </label>
                    </div>
                    {/* Left Column: Image Upload */}
                    <div className="flex-1 order-1 sm:order-2 flex flex-col ">
                      <label className="mb-2">الصورة</label>
                      <div className="w-20 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex justify-between items-center flex-1">
                        <input
                          type="text"
                          className="w-full p-2 border rounded text-right"
                        />
                        <span className="text-red-500 mx-2">*</span>
                        <label>الاسم الأول</label>
                      </div>
                      <div className="flex justify-between items-center flex-1">
                        <input
                          type="text"
                          className="w-full p-2 border rounded text-right"
                        />
                        <label>الاسم الثاني</label>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex justify-between items-center flex-1">
                        <input
                          type="text"
                          className="w-full p-2 border rounded text-right"
                        />
                        <span className="text-red-500 mx-2">*</span>
                        <label>اسم العائلة</label>
                      </div>
                      <div className="flex justify-between items-center flex-1">
                        <input
                          type="text"
                          className="w-full p-2 border rounded text-right"
                        />
                        <label>الهوية المدنية</label>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex justify-between items-center flex-1">
                        <input
                          type="text"
                          className="w-full p-2 border rounded text-right"
                        />
                        <span className="text-red-500 mx-2">*</span>
                        <label>اسم المستخدم</label>
                      </div>
                      <div className="flex justify-between items-center flex-1">
                        <input
                          type="password"
                          className="w-full p-2 border rounded text-right"
                        />
                        <span className="text-red-500 mx-2">*</span>
                        <label>كلمة المرور</label>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex justify-between items-center flex-1">
                        <input
                          type="password"
                          className="w-full p-2 border rounded text-right"
                        />
                        <label>تأكيد كلمة المرور</label>
                      </div>
                      <div className="flex justify-between items-center flex-1">
                        <input
                          type="email"
                          className="w-full p-2 border rounded text-right"
                        />
                        <label>بريد إلكتروني</label>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex justify-between items-center flex-1">
                        <div className="relative w-full">
                          <input
                            type="text"
                            className="w-full p-2 border rounded text-right"
                          />
                          <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>
                        <label>تاريخ الانتهاء</label>
                      </div>
                      <div className="flex justify-between items-center flex-1">
                        <div className="relative w-full">
                          <input
                            type="text"
                            className="w-full p-2 border rounded text-right"
                            value="06/03/2025"
                            readOnly
                          />
                          <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>
                        <label>تاريخ البدء الفعلي</label>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="w-12 h-6 bg-[#8eb82b]/20 rounded-full p-1 cursor-pointer">
                        <div className="bg-[#8eb82b] w-4 h-4 rounded-full transform translate-x-6"></div>
                      </div>
                      <div className="flex-1 text-right">
                        <span>الحالة</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button className="px-4 py-2 bg-[#8eb82b] text-white rounded hover:bg-[#7aa526] flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                  حفظ
                </button>

                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
