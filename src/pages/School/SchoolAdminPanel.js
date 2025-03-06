import React, { useState } from "react";

const SchoolAdminPanel = () => {
  // Sample data matching the screenshot
  const [admins, setAdmins] = useState([
    {
      id: 61,
      schoolName: "TT",
      adminName: "TTT TTTT TTT TTT",
      civilId: "55555555552",
      nationality: "بولندي",
      status: "غير فعال",
    },
    {
      id: 101,
      schoolName: "AAA",
      adminName: "tt ee qq ff",
      civilId: "33333333333",
      nationality: "أفغاني",
      status: "فعال",
    },
  ]);

  return (
    <div className="w-full bg-white  font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex justify-between items-center p-4">
        <div></div> {/* Empty div for alignment */}
        <div className="flex items-center">
          <span className="text-xl font-bold text-gray-800 ml-2">
            مسئولي المدارس
          </span>
          <div className="bg-lime-500 p-2 rounded-md text-white">
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Add Admin Button */}
        <button className="bg-lime-500 text-white px-4 py-2 rounded-md flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          إضافة مسؤول
        </button>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded">
              انتقال إلى
            </button>

            <div className="flex items-center">
              <span className="text-gray-500 ml-2">
                البحث: كل الأعمدة الفعلية
              </span>
              <div className="relative">
                <input
                  type="text"
                  className="border border-gray-300 rounded-md pl-8 pr-2 py-1"
                  placeholder="بحث..."
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute right-2 top-1.5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="bg-gray-50 text-right">
                  <th className="p-3 text-gray-700 border border-gray-200 text-center">
                    رقم
                  </th>
                  <th className="p-3 text-gray-700 border border-gray-200">
                    اسم المدرسة
                  </th>
                  <th className="p-3 text-gray-700 border border-gray-200">
                    إسم المسؤول
                  </th>
                  <th className="p-3 text-gray-700 border border-gray-200">
                    الرقم المدني
                  </th>
                  <th className="p-3 text-gray-700 border border-gray-200">
                    الجنسية
                  </th>
                  <th className="p-3 text-gray-700 border border-gray-200">
                    الحالة
                  </th>
                  <th
                    className="p-3 text-gray-700 border border-gray-200"
                    colSpan={2}
                  >
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, index) => (
                  <tr
                    key={admin.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-3 border border-gray-200 text-center">
                      {admin.id}
                    </td>
                    <td className="p-3 border border-gray-200">
                      {admin.schoolName}
                    </td>
                    <td className="p-3 border border-gray-200">
                      {admin.adminName}
                    </td>
                    <td className="p-3 border border-gray-200">
                      {admin.civilId}
                    </td>
                    <td className="p-3 border border-gray-200">
                      {admin.nationality}
                    </td>
                    <td className="p-3 border border-gray-200">
                      <span
                        className={`px-3 py-1 rounded-md text-white ${
                          admin.status === "فعال"
                            ? "bg-blue-500"
                            : "bg-blue-300"
                        }`}
                      >
                        {admin.status}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <button className="bg-blue-500 text-white p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <button className="bg-red-500 text-white p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Info */}
          <div className="flex justify-between mt-4">
            <div className="text-gray-600">إجمالي 2</div>
            <div className="text-gray-600">تم تحديد 1 من الصفوف</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolAdminPanel;
