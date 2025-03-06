import React, { useState } from "react";
import {
  Trash,
  Pencil,
  FileText,
  User,
  Eye,
  Plus,
  X,
  Search,
  Save,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";

const SupervisorManagementPanel = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const supervisors = [
    {
      id: 1,
      name: "tt tt tt tt",
      school: "TT",
      specialization: "مدرس انجليزي",
      civilId: "4444444444444",
      startDate: "08/11/2024",
      nationality: "أفغاني",
      status: "غير فعال",
    },
    {
      id: 2,
      name: "tt tt tt tt",
      school: "TT",
      specialization: "مدرس عربي",
      civilId: "5454566677777",
      startDate: "10/11/2024",
      nationality: "أرجنتيني",
      status: "فعال",
    },
    {
      id: 3,
      name: "Test a b c",
      school: "TT",
      specialization: "مدرس انجليزي",
      civilId: "12345678923",
      startDate: "11/11/2024",
      nationality: "أفغاني",
      status: "فعال",
    },
    {
      id: 4,
      name: "a b c d",
      school: "",
      specialization: "مدرس علوم",
      civilId: "12345678989",
      startDate: "12/11/2024",
      nationality: "أفغاني",
      status: "فعال",
    },
    {
      id: 5,
      name: "TT TT TT TT",
      school: "TT",
      specialization: "مدرس رياضيات",
      civilId: "65654344444",
      startDate: "12/11/2024",
      nationality: "أفغاني",
      status: "فعال",
    },
    {
      id: 6,
      name: "RR EEE FFF",
      school: "",
      specialization: "مدرس رياضيات",
      civilId: "11111111111",
      startDate: "12/11/2024",
      nationality: "ألباني",
      status: "فعال",
    },
    {
      id: 8,
      name: "xxx xxx xxx",
      school: "AAA",
      specialization: "مدرس علوم",
      civilId: "283050600111",
      startDate: "13/11/2024",
      nationality: "أرجنتيني",
      status: "فعال",
    },
  ];

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <div className="rtl font-sans bg-gray-100" dir="rtl">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          <h1 className="text-2xl font-bold text-gray-800">المشرفين</h1>
          <div className="w-10 h-10 bg-lime-500 rounded-md flex items-center justify-center">
            <User className="text-white" size={24} />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 bg-white border border-gray-200 rounded-md my-4 shadow-sm">
        <div className="mb-4">
          <button
            onClick={openAddModal}
            className="bg-lime-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-lime-600 transition-colors"
          >
            <Plus size={18} />
            <span>إضافة المشرفين</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="relative flex items-center">
              <div className="absolute left-3">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="البحث: كل الأعمدة الصفحة"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              انتقال إلى
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-right font-bold text-gray-700">
                  رقم
                </th>
                <th className="py-3 px-4 text-right font-bold text-gray-700">
                  اسم المشرف
                </th>
                <th className="py-3 px-4 text-right font-bold text-gray-700">
                  المدرسة
                </th>
                <th className="py-3 px-4 text-right font-bold text-gray-700">
                  التخصص
                </th>
                <th className="py-3 px-4 text-right font-bold text-gray-700">
                  الرقم المدني
                </th>
                <th className="py-3 px-4 text-right font-bold text-gray-700">
                  تاريخ البدء الفعلي
                </th>
                <th className="py-3 px-4 text-right font-bold text-gray-700">
                  الجنسية
                </th>
                <th className="py-3 px-4 text-right font-bold text-gray-700">
                  الحالة
                </th>
                <th className="py-3 px-4 text-center font-bold text-gray-700">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {supervisors.map((supervisor) => (
                <tr
                  key={supervisor.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{supervisor.id}</td>
                  <td className="py-3 px-4">{supervisor.name}</td>
                  <td className="py-3 px-4">{supervisor.school}</td>
                  <td className="py-3 px-4">{supervisor.specialization}</td>
                  <td className="py-3 px-4">{supervisor.civilId}</td>
                  <td className="py-3 px-4">{supervisor.startDate}</td>
                  <td className="py-3 px-4">{supervisor.nationality}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-md text-white ${
                        supervisor.status === "فعال"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {supervisor.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2 justify-center">
                      <button className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600">
                        <Trash size={16} />
                      </button>
                      <button className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600">
                        <Pencil size={16} />
                      </button>
                      <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300">
                        <FileText size={16} />
                      </button>
                      <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300">
                        <User size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <div className="text-gray-600 text-sm">1 - 7 من 7</div>
            <div className="flex gap-1">
              <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                <ChevronsLeft size={16} />
              </button>
              <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center bg-gray-200 text-gray-800">
                1
              </button>
              <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                <ChevronRight size={16} />
              </button>
              <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Supervisor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-md w-full max-w-4xl h-[90%] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">إضافة/تعديل مشرف المدرسة</h2>
              <button
                onClick={closeAddModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-4 gap-6">
                <div className="col-span-1 border border-gray-200 rounded-md h-40 flex items-center justify-center">
                  <div className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                    <img
                      className="w-6 h-6"
                      src="/api/placeholder/24/24"
                      alt="placeholder"
                    />
                  </div>
                </div>

                <div className="col-span-3 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      اسم المدرسة: <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-lime-500">
                        <option></option>
                      </select>
                      <div className="absolute left-3 top-3">
                        <ChevronDown size={18} className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      تخصص المدرس: <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-lime-500">
                        <option></option>
                      </select>
                      <div className="absolute left-3 top-3">
                        <ChevronDown size={18} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-4 grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      الاسم الأول: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      الاسم الثاني: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      الاسم الثالث:
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      الاسم الأخير: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>
                </div>

                <div className="col-span-4 grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      الرقم المدني: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                      value="XXXXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      الجنسية: <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-lime-500">
                        <option></option>
                      </select>
                      <div className="absolute left-3 top-3">
                        <ChevronDown size={18} className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      البريد الإلكتروني: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      رقم موبايل: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                      value="XXXXXXX +965"
                    />
                  </div>
                </div>

                <div className="col-span-4 grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      تاريخ البدء الفعلي:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                        value="06-مارس-2025"
                      />
                      <div className="absolute left-3 top-3">
                        <Calendar size={18} className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      تاريخ الانتهاء:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                      />
                      <div className="absolute left-3 top-3">
                        <Calendar size={18} className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <div className="mb-2">
                      <label className="block text-gray-700 mb-1 text-sm">
                        فعال:
                      </label>
                      <div className="w-14 h-7 bg-lime-500 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-1 top-1"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-4 grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      اسم المستخدم: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      كلمة المرور: <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        className="w-full border border-gray-300 rounded-md pr-10 pl-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                        value="كلمة المرور"
                      />
                      <div className="absolute right-3 top-3">
                        <Eye size={18} className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      تأكيد كلمة المرور: <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        className="w-full border border-gray-300 rounded-md pr-10 pl-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                        value="كلمة المرور"
                      />
                      <div className="absolute right-3 top-3">
                        <Eye size={18} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      العنوان:
                    </label>
                    <textarea className="w-full border border-gray-300 rounded-md px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-lime-500"></textarea>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      الملاحظات:
                    </label>
                    <textarea className="w-full border border-gray-300 rounded-md px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-lime-500"></textarea>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={closeAddModal}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-md flex items-center gap-2 hover:bg-yellow-600 transition-colors"
                >
                  <X size={18} />
                  <span>إلغاء</span>
                </button>

                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-lime-500 text-white rounded-md flex items-center gap-2 hover:bg-lime-600 transition-colors">
                    <span>المرفق</span>
                    <Upload size={18} />
                  </button>

                  <button className="px-6 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600 transition-colors">
                    <Save size={18} />
                    <span>حفظ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Additional components needed for the modal
const Calendar = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const ChevronDown = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Upload = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

export default SupervisorManagementPanel;
