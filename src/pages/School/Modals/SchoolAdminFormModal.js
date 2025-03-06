import React, { useState } from "react";

const SchoolAdminFormModal = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    firstName: "",
    secondName: "",
    thirdName: "",
    lastName: "",
    civilId: "",
    nationality: "",
    email: "",
    mobile: "+92 301 2345678",
    startDate: "06/03/2025",
    endDate: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    notes: "",
    status: true,
  });

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg w-full max-w-6xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-lime-600 py-4 px-6 flex justify-between items-center text-white">
          <button className="text-white hover:text-gray-200">
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
          <h2 className="text-xl font-bold">إضافة/تعديل مسؤولي المدارس</h2>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              {/* Profile Image */}
              <div className="rtl">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الصورة
                </label>
                <div className="border border-gray-300 rounded-md p-2 w-36 h-36 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Form Fields (3 columns to the right of the image) */}
              <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 rtl">
                {/* School Name */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المدرسة <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500">
                      <option value=""></option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* First Name */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الاسم الأول <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                  />
                </div>

                {/* Second Name */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الاسم الثاني <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                  />
                </div>

                {/* Third Name */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الاسم الثالث
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الاسم الأخير <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                  />
                </div>

                {/* Civil ID */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الرقم المدني <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                    placeholder="XXXXXXXXXXXX"
                  />
                </div>

                {/* Nationality */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الجنسية
                  </label>
                  <div className="relative">
                    <select className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500">
                      <option value=""></option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                  />
                </div>

                {/* Mobile */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الهاتف المحمول <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <select className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-r-md">
                        <option>+92</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md py-2 pl-16 pr-3 w-full"
                      defaultValue="301 2345678"
                    />
                  </div>
                </div>

                {/* Start Date */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تاريخ البدء الفعلي <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md py-2 px-3 w-full"
                      defaultValue="06/03/2025"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
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
                </div>

                {/* End Date */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تاريخ الانتهاء
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md py-2 px-3 w-full"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
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
                </div>

                {/* Status */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الحالة
                  </label>
                  <div className="w-full flex justify-end">
                    <div className="inline-flex items-center mt-2">
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                        <input
                          type="checkbox"
                          className="absolute w-6 h-6 rounded-full bg-white border-0 cursor-pointer transition-transform duration-200 ease-in transform translate-x-0 checked:translate-x-6 checked:bg-lime-500"
                          defaultChecked={formData.status}
                        />
                        <div
                          className={`absolute w-12 h-6 rounded-full transition duration-200 ease-in ${
                            formData.status ? "bg-lime-500" : "bg-gray-200"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Username */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المستخدم <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    كلمة المرور <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="border border-gray-300 rounded-md py-2 px-3 w-full"
                      placeholder="كلمة المرور"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تأكيد كلمة المرور <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="border border-gray-300 rounded-md py-2 px-3 w-full"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address and Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rtl">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  العنوان
                </label>
                <textarea
                  rows={6}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full resize-none"
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الملاحظات
                </label>
                <textarea
                  rows={6}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full resize-none"
                ></textarea>
              </div>
            </div>

            {/* Attachment */}
            <div className="flex justify-end rtl">
              <button className="bg-lime-500 text-white px-4 py-2 rounded-md flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                المرفق
              </button>
            </div>
          </form>
        </div>

        {/* Footer with Action Buttons */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between rtl">
          <button className="bg-green-600 text-white px-6 py-2 rounded-md flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
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

          <button className="bg-yellow-500 text-white px-6 py-2 rounded-md flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
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
  );
};

export default SchoolAdminFormModal;
