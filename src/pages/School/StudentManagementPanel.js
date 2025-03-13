import React, { useState } from "react";

const StudentManagementPanel = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    {
      id: 1,
      name: "عمر طلال B إحسان",
      school: "TT",
      supervisor: "tt tt tt",
      grade: "الصف الأول",
      nationality: "ألباني",
      regNumber: "123456789987",
      active: true,
    },
    {
      id: 2,
      name: "عبد الله نعمان B همزة",
      school: "TT",
      supervisor: "tt tt tt",
      grade: "الصف الثاني",
      nationality: "أغاني",
      regNumber: "123456789789",
      active: true,
    },
    {
      id: 4,
      name: "رمضان عقار عاتق عثمان",
      school: "ZZZ",
      supervisor: "xxx xxx xxx",
      grade: "الصف الثاني",
      nationality: "كوتية",
      regNumber: "123456987987",
      active: true,
    },
    {
      id: 5,
      name: "مهند كمال داوود",
      school: "TT",
      supervisor: "tt tt tt",
      grade: "الصف الأول",
      nationality: "إثيوبية",
      regNumber: "280305061117",
      active: true,
    },
    {
      id: 6,
      name: "زايد محمد زياد",
      school: "TT",
      supervisor: "tt? tt tt",
      grade: "الصف الخامس",
      nationality: "ألباني",
      regNumber: "258147369123",
      active: true,
    },
    {
      id: 7,
      name: "جورجات عون س",
      school: "ZZZ",
      supervisor: "xxx xxx xxx",
      grade: "الصف الخامس",
      nationality: "ألباني",
      regNumber: "123456789012",
      active: true,
    },
    {
      id: 8,
      name: "نينسي سينسي سينسيب",
      school: "TT",
      supervisor: "TT TT TT",
      grade: "الصف الخامس",
      nationality: "جزائري",
      regNumber: "283051611256",
      active: true,
    },
  ];

  return (
    <div className="font-sans  min-h-screen">
      {/* Header */}
      <header className=" shadow-sm flex justify-between items-center p-4 border-b">
        <div className="flex justify-end w-full">
          <div className="font-bold text-xl text-right">الطلاب</div>
          <div className="ml-4">
            <button className="bg-colPrime text-black  p-2 rounded-md">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Action Bar */}
        <div className="mb-4 flex flex-wrap justify-between items-center">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-colPrime text-white py-2 px-4 rounded-md flex items-center"
          >
            <span className="ml-2">إضافة طالب</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden border">
          {/* Search and Filters */}
          <div className="p-4 flex justify-between items-center border-b">
            <button className="text-blue-500 px-4 py-1 rounded">
              انتقال إلى
            </button>
            <div className="flex items-center">
              <span className="ml-2 text-gray-500">
                البحث: كل الأعمدة النصية
              </span>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border rounded-md pl-8 pr-2 py-1 text-right"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 absolute right-2 top-1.5"
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
            <table className="w-full" dir="rtl">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-right text-gray-700 w-12">رقم</th>
                  <th className="p-3 text-right text-gray-700">إسم الطالب</th>
                  <th className="p-3 text-right text-gray-700">المدرسة</th>
                  <th className="p-3 text-right text-gray-700">المشرف</th>
                  <th className="p-3 text-right text-gray-700">الصف</th>
                  <th className="p-3 text-right text-gray-700">الجنسية</th>
                  <th className="p-3 text-right text-gray-700">الرقم المدني</th>
                  <th className="p-3 text-right text-gray-700">تم التسجيل</th>
                  <th className="p-3 text-right text-gray-700">الحالة</th>
                  <th className="p-3 text-center w-24">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-right">{student.id}</td>
                    <td className="p-3 text-right">{student.name}</td>
                    <td className="p-3 text-right">{student.school}</td>
                    <td className="p-3 text-right">{student.supervisor}</td>
                    <td className="p-3 text-right">{student.grade}</td>
                    <td className="p-3 text-right">{student.nationality}</td>
                    <td className="p-3 text-right">{student.regNumber}</td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center">
                        <div className="w-6 h-3 bg-blue-400 rounded-full"></div>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="bg-blue-500 text-white text-center py-1 px-2 rounded-md">
                        فعال
                      </div>
                    </td>
                    <td className="p-3 flex justify-center space-x-2">
                      <button className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full">
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
                      <button className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 flex justify-between items-center border-t">
            <div className="flex items-center space-x-1">
              <button className="border px-2 py-1 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button className="border px-2 py-1 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="border px-2 py-1 rounded bg-blue-50 text-blue-600">
                1
              </button>
              <button className="border px-2 py-1 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button className="border px-2 py-1 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="text-gray-500 text-sm">تم تحديد 1 من الصفوف</div>
          </div>
        </div>
      </main>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-md shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto"
            dir="rtl"
          >
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold">إضافة/تعديل الطلاب</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500"
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
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* First Row */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الاسم الأول: <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full border rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الاسم الثاني: <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full border rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الاسم الثالث:
                  </label>
                  <input type="text" className="w-full border rounded-md p-2" />
                </div>

                {/* Second Row */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الاسم الأخير: <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full border rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الجنسية: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full border rounded-md p-2 appearance-none">
                      <option>ألباني</option>
                      <option>أغاني</option>
                      <option>كوتية</option>
                      <option>إثيوبية</option>
                      <option>جزائري</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تاريخ الميلاد: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full border rounded-md p-2"
                      placeholder="MM/DD/YYYY"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center px-2">
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

                {/* More form fields... */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    العمر: <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full border rounded-md p-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الرقم المدني: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                    placeholder="XXXXXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الصورة
                  </label>
                  <div className="border rounded-md p-2 flex justify-center">
                    <button className="border border-dashed border-gray-300 p-2 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-400"
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
                    </button>
                  </div>
                </div>
              </div>

              {/* More form sections... */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المدرسة: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full border rounded-md p-2 appearance-none">
                      <option>TT</option>
                      <option>ZZZ</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الصف/الفصل: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full border rounded-md p-2 appearance-none">
                      <option>الصف الأول</option>
                      <option>الصف الثاني</option>
                      <option>الصف الخامس</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المشرف: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full border rounded-md p-2 appearance-none">
                      <option>tt tt tt</option>
                      <option>xxx xxx xxx</option>
                      <option>TT TT TT</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
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
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md flex items-center"
                >
                  إلغاء
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-md flex items-center">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagementPanel;



// https://farm.synaptrixsol.com/create-student
// https://farm.synaptrixsol.com/get-all-student
// https://farm.synaptrixsol.com/get-student
// https://farm.synaptrixsol.com/update-student
// https://farm.synaptrixsol.com/delete-student

