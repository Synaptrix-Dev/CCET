import React from "react";

function StudentTestSelection() {
  return (
    <div className="">
      {/* Page Title with User Icon */}
      <div className="flex justify-end  border-b pb-2 ">
        <div className="flex  items-center gap-3 flex-row-reverse">
          <i className="fas fa-user text-white text-xl bg-colPrime p-3 rounded-lg"></i>
          <h1 className="text-4xl font-bold text-right">
            إختيار الطالب للإختبارات
          </h1>
        </div>
      </div>

      {/* Selection Form */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg border border-colPrime p-8">
          {/* Student Name Selection */}
          <div className="flex justify-end items-center mb-8 gap-3">
            <div className="w-full max-w-2xl">
              <div className="relative">
                <select className="appearance-none bg-[#E5EEB2] border-0 w-full py-3 px-4 rounded text-right">
                  <option value="" disabled selected hidden></option>
                  {/* Add student options here */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3">
                  <i className="fas fa-chevron-down text-gray-500"></i>
                </div>
              </div>
            </div>
            <label className="text-2xl font-medium"> :إسم الطالب </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button className="bg-colPrime hover:bg-colPrime  text-black  text-2xl py-2 px-6 rounded">
              <span>إضافة طالب</span>
              <i className="fas fa-plus ml-2"></i>
            </button>

            <button className="bg-colPrime hover:bg-colPrime text-black py-2 px-28 text-2xl font-extrabold mr-24  rounded">
              إختبار
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentTestSelection;
