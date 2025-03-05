import React, { useState } from "react";

const SchoolManagement = () => {
  const [schools, setSchools] = useState([
    {
      id: 1,
      status: "معالج",
      approvalStatus: "المواطفة",
      actualStartDate: "12/11/2024",
      educationalArea: "محافظة العاصمة التعليمية",
      city: "الداخلية",
      country: "الكويت",
      arabicSchoolName: "TT",
      englishSchoolName: "TT",
    },
    {
      id: 2,
      status: "معالج",
      approvalStatus: "المواطفة",
      actualStartDate: "13/11/2024",
      educationalArea: "محافظة العاصمة التعليمية",
      city: "الجهار",
      country: "الكويت",
      arabicSchoolName: "AAA",
      englishSchoolName: "ZZZ",
    },
  ]);

  return (
    <div className="bg-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button className="bg-[#8CBF3F] text-white px-4 py-2 rounded flex items-center ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            إضافة مدرسة
          </button>
        </div>
        <div className="flex items-center">
          <span className="text-5xl  mr-2">المدارس</span>
          <i class="fa-solid text-4xl rounded-lg bg-colPrime p-2 fa-building-columns"></i>  
        </div>
      </div>

      {/* Search and Filter Area */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <select className="border rounded px-2 py-1">
            <option>التصدير إلى</option>
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder="البحث"
              className="border rounded px-2 py-1 pl-8"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-2 top-2 text-gray-400"
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
        <table className="w-full text-right">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-xs">الإنتقال إلى</th>
              <th className="p-2 text-xs">الحالة</th>
              <th className="p-2 text-xs">تاريخ البدء الفعلي</th>
              <th className="p-2 text-xs">المناطق التعليمية</th>
              <th className="p-2 text-xs">المدينة</th>
              <th className="p-2 text-xs">الدولة</th>
              <th className="p-2 text-xs">المدرسة بالعربية</th>
              <th className="p-2 text-xs">المدرسة بالإنجليزية</th>
              <th className="p-2 text-xs">رقم</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school, index) => (
              <tr key={school.id} className="border-b">
                <td className="p-2">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <button className="text-red-500">
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
                    <button className="text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="p-2 text-xs text-blue-500">{school.status}</td>
                <td className="p-2 text-xs">{school.actualStartDate}</td>
                <td className="p-2 text-xs">{school.educationalArea}</td>
                <td className="p-2 text-xs">{school.city}</td>
                <td className="p-2 text-xs">{school.country}</td>
                <td className="p-2 text-xs">{school.arabicSchoolName}</td>
                <td className="p-2 text-xs">{school.englishSchoolName}</td>
                <td className="p-2 text-xs">{index + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="text-right mt-4 text-xs text-gray-600">
          عرض 1 إلى 2 من 2 سجلات
        </div>
      </div>
    </div>
  );
};

export default SchoolManagement;
