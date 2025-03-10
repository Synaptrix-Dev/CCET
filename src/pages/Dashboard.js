import React from "react";

function Dashboard() {
  return (
    <div className="">
      {/* محتوى لوحة البيانات */}
      <div className="p-8">
        {/* العنوان */}
        <div className="flex justify-end mb-10">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            لوحة البيانات
          </h1>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* بطاقة إجمالي الاختبارات */}
          <div className="relative bg-red-300 rounded-2xl shadow-md p-6 flex flex-col items-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-12 h-12 bg-red-200 rounded-full -translate-x-4 -translate-y-4 opacity-50"></div>
            <div className="text-3xl font-semibold text-gray-800 z-10">7</div>
            <div className="text-base font-medium text-gray-600 mt-1">
              إجمالي الاختبارات
            </div>
            <i className="fa fa-calendar-alt text-red-400 text-xl mt-3 z-10"></i>
          </div>

          {/* بطاقة إجمالي الطلاب */}
          <div className="relative bg-green-300 rounded-2xl shadow-md p-6 flex flex-col items-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-12 h-12 bg-green-200 rounded-full -translate-x-4 -translate-y-4 opacity-50"></div>
            <div className="text-3xl font-semibold text-gray-800 z-10">7</div>
            <div className="text-base font-medium text-gray-600 mt-1">
              إجمالي الطلاب
            </div>
            <i className="fa fa-user-graduate text-green-400 text-xl mt-3 z-10"></i>
          </div>

          {/* بطاقة إجمالي المعلمين */}
          <div className="relative bg-blue-300 rounded-2xl shadow-md p-6 flex flex-col items-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-12 h-12 bg-blue-200 rounded-full -translate-x-4 -translate-y-4 opacity-50"></div>
            <div className="text-3xl font-semibold text-gray-800 z-10">7</div>
            <div className="text-base font-medium text-gray-600 mt-1">
              إجمالي المعلمين
            </div>
            <i className="fa fa-chalkboard-teacher text-blue-400 text-xl mt-3 z-10"></i>
          </div>

          {/* بطاقة إجمالي المدارس */}
          <div className="relative bg-indigo-300 rounded-2xl shadow-md p-6 flex flex-col items-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-12 h-12 bg-indigo-200 rounded-full -translate-x-4 -translate-y-4 opacity-50"></div>
            <div className="text-3xl font-semibold text-gray-800 z-10">2</div>
            <div className="text-base font-medium text-gray-600 mt-1">
              إجمالي المدارس
            </div>
            <i className="fa fa-school text-indigo-400 text-xl mt-3 z-10"></i>
          </div>
        </div>

        {/* بطاقة إجمالي الإداريين */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-start-4">
            <div className="relative bg-orange-300 rounded-2xl shadow-md p-6 flex flex-col items-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-12 h-12 bg-orange-200 rounded-full -translate-x-4 -translate-y-4 opacity-50"></div>
              <div className="text-3xl font-semibold text-gray-800 z-10">2</div>
              <div className="text-base font-medium text-gray-600 mt-1">
                إجمالي الإداريين
              </div>
              <i className="fa fa-user-tie text-orange-400 text-xl mt-3 z-10"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
