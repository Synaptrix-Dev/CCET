import React, { useState, useEffect } from "react";
import axios from "axios";

const SchoolManagement = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [formData, setFormData] = useState({
    school_ID: "",
    arabicSchool: "",
    englishSchool: "",
    directorName: "",
    state: "",
    city: "",
    eduAreas: "",
    schoolType: "",
    studentType: "",
    educationalStage: "",
    startDate: "",
    condition: "",
    phone: "",
    email: "",
    website: "",
    isActive: true,
    isApproved: false,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://farm.synaptrixsol.com/get-all-schools"
      );
      setSchools(response.data || []);
    } catch (error) {
      console.error("Error fetching schools:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleChange = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const resetForm = () => {
    setFormData({
      englishSchool: "",
      arabicSchool: "",
      state: "",
      city: "",
      eduAreas: "",
      startDate: new Date().toISOString().split("T")[0],
      condition: "معالج",
      phone: "",
      email: "",
      website: "",
      directorName: "",
      schoolType: "",
      studentType: "",
      educationalStage: "",
      isActive: true,
      isApproved: false,
    });
  };

  const openAddModal = () => {
    resetForm();
    setIsEditMode(false);
    setShowModal(true);
  };

  const openEditModal = (school) => {
    setFormData({
      englishSchool: school.englishSchool || "",
      arabicSchool: school.arabicSchool || "",
      state: school.state || "",
      city: school.city || "",
      eduAreas: school.eduAreas || "",
      startDate: school.startDate || "",
      condition: school.condition || "معالج",
      phone: school.phone || "",
      email: school.email || "",
      website: school.website || "",
      directorName: school.directorName || "",
      schoolType: school.schoolType || "",
      studentType: school.studentType || "",
      educationalStage: school.educationalStage || "",
      isActive: school.isActive || true,
      isApproved: school.isApproved || false,
    });
    setCurrentSchool(school);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode && currentSchool) {
        await axios.put(
          `https://farm.synaptrixsol.com/update-school/${currentSchool._id}`,
          formData
        );
      } else {
        await axios.post(
          "https://farm.synaptrixsol.com/create-school",
          formData
        );
      }
      setShowModal(false);
      fetchSchools();
    } catch (error) {
      console.error("Error saving school:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه المدرسة؟")) {
      try {
        await axios.delete(`https://farm.synaptrixsol.com/delete-school/${id}`);
        fetchSchools();
      } catch (error) {
        console.error("Error deleting school:", error);
      }
    }
  };

  const filteredSchools = schools.filter(
    (school) =>
      (school.arabicSchool && school.arabicSchool.includes(searchTerm)) ||
      (school.englishSchool && school.englishSchool.includes(searchTerm)) ||
      (school.city && school.city.includes(searchTerm)) ||
      (school.eduAreas && school.eduAreas.includes(searchTerm))
  );

  return (
    <div className="bg-white p-4 rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button
            onClick={openAddModal}
            className="bg-[#8CBF3F] text-white px-4 py-2 rounded flex items-center ml-2"
          >
            <i className="fa-solid fa-plus ml-2"></i>
            إضافة مدرسة
          </button>
        </div>
        <div className="flex items-center">
          <span className="text-5xl mr-2">المدارس</span>
          <i className="fa-solid text-4xl rounded-lg bg-[#8CBF3F] p-2 fa-building-columns text-white"></i>
        </div>
      </div>

      {/* Search and Filter Area */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <select className="border rounded px-2 py-1">
            <option>التصدير إلى</option>
            <option>Excel</option>
            <option>PDF</option>
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder="البحث"
              className="border rounded px-2 py-1 pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass absolute left-2 top-2 text-gray-400"></i>
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
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center p-4">
                  جاري التحميل...
                </td>
              </tr>
            ) : filteredSchools.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center p-4">
                  لا توجد مدارس
                </td>
              </tr>
            ) : (
              filteredSchools.map((school, index) => (
                <tr key={school._id || index} className="border-b">
                  <td className="p-2">
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(school._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        className="text-blue-500"
                        onClick={() => openEditModal(school)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </div>
                  </td>
                  <td className="p-2 text-xs text-blue-500">
                    {school.condition || "معالج"}
                  </td>
                  <td className="p-2 text-xs">{school.startDate || "-"}</td>
                  <td className="p-2 text-xs">{school.eduAreas || "-"}</td>
                  <td className="p-2 text-xs">{school.city || "-"}</td>
                  <td className="p-2 text-xs">{school.state || "-"}</td>
                  <td className="p-2 text-xs">{school.arabicSchool || "-"}</td>
                  <td className="p-2 text-xs">{school.englishSchool || "-"}</td>
                  <td className="p-2 text-xs">{index + 1}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div className="text-right mt-4 text-xs text-gray-600">
          عرض 1 إلى {filteredSchools.length} من {schools.length} سجلات
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl h-[80%] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500"
              >
                <i className="fa-solid fa-times"></i>
              </button>
              <h2 className="text-xl font-bold">
                {isEditMode ? "تعديل المدرسة" : "إضافة المدرسة"}
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* school_ID */}
                <div className="mb-4">
                  <label htmlFor="school_ID" className="block text-sm mb-1">
                    معرف المدرسة
                  </label>
                  <input
                    type="text"
                    id="school_ID"
                    name="school_ID"
                    value={formData.school_ID}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="arabicSchool" className="block text-sm mb-1">
                    المدرسة بالعربية <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="arabicSchool"
                    name="arabicSchool"
                    value={formData.arabicSchool}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="englishSchool" className="block text-sm mb-1">
                    المدرسة بالإنجليزية <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="englishSchool"
                    name="englishSchool"
                    value={formData.englishSchool}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="directorName" className="block text-sm mb-1">
                    اسم المدير
                  </label>
                  <input
                    type="text"
                    id="directorName"
                    name="directorName"
                    value={formData.directorName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="state" className="block text-sm mb-1">
                    البلد <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  >
                    <option value="">اختر البلد</option>
                    <option value="الكويت">الكويت</option>
                    <option value="السعودية">السعودية</option>
                    <option value="الإمارات">الإمارات</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="city" className="block text-sm mb-1">
                    المدينة <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  >
                    <option value="">اختر المدينة</option>
                    <option value="الداخلية">الداخلية</option>
                    <option value="الجهار">الجهار</option>
                    <option value="مدينة الكويت">مدينة الكويت</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="eduAreas" className="block text-sm mb-1">
                    المناطق التعليمية <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="eduAreas"
                    name="eduAreas"
                    value={formData.eduAreas}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  >
                    <option value="">اختر المنطقة التعليمية</option>
                    <option value="محافظة العاصمة التعليمية">
                      محافظة العاصمة التعليمية
                    </option>
                    <option value="محافظة حولي التعليمية">
                      محافظة حولي التعليمية
                    </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="schoolType" className="block text-sm mb-1">
                    نوع المدرسة <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="schoolType"
                    name="schoolType"
                    value={formData.schoolType}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  >
                    <option value="">اختر نوع المدرسة</option>
                    <option value="حكومية">حكومية</option>
                    <option value="خاصة">خاصة</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="studentType" className="block text-sm mb-1">
                    نوع الطالب <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="studentType"
                    name="studentType"
                    value={formData.studentType}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  >
                    <option value="">اختر نوع الطالب</option>
                    <option value="ذكور">ذكور</option>
                    <option value="إناث">إناث</option>
                    <option value="مختلط">مختلط</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="educationalStage"
                    className="block text-sm mb-1"
                  >
                    المرحلة التعليمية <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="educationalStage"
                    name="educationalStage"
                    value={formData.educationalStage}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  >
                    <option value="">اختر المرحلة التعليمية</option>
                    <option value="ابتدائي">ابتدائي</option>
                    <option value="متوسط">متوسط</option>
                    <option value="ثانوي">ثانوي</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="startDate" className="block text-sm mb-1">
                    تاريخ البدء الفعلي
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* condition */}
                <div className="mb-4">
                  <label htmlFor="condition" className="block text-sm mb-1">
                    حالة المدرسة
                  </label>
                  <input
                    type="text"
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm mb-1">
                    رقم الهاتف <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <span className="p-2 border rounded-r bg-gray-100">
                      +965
                    </span>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded-l"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm mb-1">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="website" className="block text-sm mb-1">
                    الموقع الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              {/* File uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm mb-1">
                    الملف الشخصي بالإنجليزية:
                  </label>
                  <div className="border p-4 rounded min-h-32">
                    <i className="fa-solid fa-upload text-gray-400"></i>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    الملف الشخصي بالعربية:
                  </label>
                  <div className="border p-4 rounded min-h-32">
                    <i className="fa-solid fa-upload text-gray-400"></i>
                  </div>
                </div>
              </div>

              {/* Toggle switches */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm">فعال</span>
                  <div
                    className={`w-12 h-6 rounded-full relative ${
                      formData.isActive ? "bg-[#8CBF3F]" : "bg-gray-300"
                    } cursor-pointer`}
                    onClick={() => handleToggleChange("isActive")}
                  >
                    <div
                      className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-all ${
                        formData.isActive ? "right-1" : "right-7"
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">الموافقة؟</span>
                  <div
                    className={`w-12 h-6 rounded-full relative ${
                      formData.isApproved ? "bg-[#8CBF3F]" : "bg-gray-300"
                    } cursor-pointer`}
                    onClick={() => handleToggleChange("isApproved")}
                  >
                    <div
                      className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-all ${
                        formData.isApproved ? "right-1" : "right-7"
                      }`}
                    ></div>
                  </div>
                </div>
                <div></div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-yellow-500 text-white px-6 py-2 rounded"
                >
                  إلغاء <i className="fa-solid fa-times mr-1"></i>
                </button>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded"
                  >
                    حفظ <i className="fa-solid fa-save mr-1"></i>
                  </button>
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-6 py-2 rounded"
                  >
                    المرفق <i className="fa-solid fa-paperclip mr-1"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolManagement;
