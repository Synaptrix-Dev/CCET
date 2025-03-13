import React, { useState, useEffect } from "react";
import axios from "axios";

const SchoolAdminPanel = () => {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    schoolName: "",
    firstName: "",
    secondName: "",
    thirdName: "",
    lastName: "",
    civilId: "",
    nationality: "",
    mobile: "",
    email: "",
    startDate: "",
    endDate: "",
    status: true,
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    notes: "",
    image: null,
  });

  // Fetch admins data
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://farm.synaptrixsol.com/get-all-officials"
      );
      setAdmins(response.data);
      setError(null);
    } catch (err) {
      setError("حدث خطأ أثناء جلب البيانات");
      console.error("Error fetching officials:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle row selection
  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter admins based on search term
  const filteredAdmins = admins.filter((admin) => {
    if (searchTerm === "") return true;

    return (
      admin.schoolName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.adminName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.civilId?.includes(searchTerm) ||
      admin.nationality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle add new admin
  const handleAddAdmin = () => {
    setCurrentAdmin(null);
    setFormData({
      schoolName: "",
      firstName: "",
      secondName: "",
      thirdName: "",
      lastName: "",
      civilId: "",
      nationality: "",
      mobile: "",
      email: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      status: true,
      username: "",
      password: "",
      confirmPassword: "",
      address: "",
      notes: "",
      image: null,
    });
    setShowAddEditModal(true);
  };

  // Handle edit admin
  const handleEditAdmin = async (id) => {
    try {
      const response = await axios.get(
        `https://farm.synaptrixsol.com/get-officials/${id}`
      );
      const admin = response.data;

      // Split name into parts (assuming the format is "firstName secondName thirdName lastName")
      const nameParts = admin.adminName.split(" ");

      setCurrentAdmin(admin);
      setFormData({
        schoolName: admin.schoolName || "",
        firstName: nameParts[0] || "",
        secondName: nameParts[1] || "",
        thirdName: nameParts[2] || "",
        lastName: nameParts[3] || "",
        civilId: admin.civilId || "",
        nationality: admin.nationality || "",
        mobile: admin.mobile || "",
        email: admin.email || "",
        startDate: admin.startDate || new Date().toISOString().split("T")[0],
        endDate: admin.endDate || "",
        status: admin.status === "فعال",
        username: admin.username || "",
        password: "",
        confirmPassword: "",
        address: admin.address || "",
        notes: admin.notes || "",
        image: null,
      });
      setShowAddEditModal(true);
    } catch (err) {
      setError("حدث خطأ أثناء جلب بيانات المسؤول");
      console.error("Error fetching official details:", err);
    }
  };

  // Handle delete admin
  const handleDeleteAdmin = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المسؤول؟")) {
      try {
        await axios.delete(
          `https://farm.synaptrixsol.com/delete-officials/${id}`
        );
        fetchAdmins(); // Refresh the list
      } catch (err) {
        setError("حدث خطأ أثناء حذف المسؤول");
        console.error("Error deleting official:", err);
      }
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for file upload
    const submitData = new FormData();

    // Combine name parts
    const adminName =
      `${formData.firstName} ${formData.secondName} ${formData.thirdName} ${formData.lastName}`.trim();

    // Add all form fields to FormData
    submitData.append("schoolName", formData.schoolName);
    submitData.append("adminName", adminName);
    submitData.append("civilId", formData.civilId);
    submitData.append("nationality", formData.nationality);
    submitData.append("mobile", formData.mobile);
    submitData.append("email", formData.email);
    submitData.append("startDate", formData.startDate);
    submitData.append("endDate", formData.endDate);
    submitData.append("status", formData.status ? "فعال" : "غير فعال");
    submitData.append("username", formData.username);
    submitData.append("password", formData.password);
    submitData.append("address", formData.address);
    submitData.append("notes", formData.notes);

    if (formData.image) {
      submitData.append("image", formData.image);
    }

    try {
      if (currentAdmin) {
        // Update existing admin
        await axios.put(
          `https://farm.synaptrixsol.com/update-officials/${currentAdmin.id}`,
          submitData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Create new admin
        await axios.post(
          "https://farm.synaptrixsol.com/create-officials",
          submitData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      fetchAdmins(); // Refresh the list
      setShowAddEditModal(false); // Close modal
    } catch (err) {
      setError(
        currentAdmin
          ? "حدث خطأ أثناء تحديث المسؤول"
          : "حدث خطأ أثناء إضافة المسؤول"
      );
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="w-full bg-white font-sans" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex justify-between items-center p-4">
        <div></div> {/* Empty div for alignment */}
        <div className="flex items-center">
          <span className="text-xl font-bold text-gray-800 mr-2">
            مسئولي المدارس
          </span>
          <div className="bg-lime-500 p-2 rounded-md text-white">
            <i className="fas fa-school"></i>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Add Admin Button */}
        <button
          className="bg-lime-500 text-white px-4 py-2 rounded-md flex items-center mb-4"
          onClick={handleAddAdmin}
        >
          <i className="fas fa-plus-circle ml-1"></i>
          إضافة مسؤول
        </button>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

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
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <i className="fas fa-search absolute left-2 top-2.5 text-gray-400"></i>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="text-center py-4">
                <i className="fas fa-spinner fa-spin text-lime-500 text-2xl"></i>
                <p className="mt-2">جاري تحميل البيانات...</p>
              </div>
            ) : (
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
                  {filteredAdmins.length > 0 ? (
                    filteredAdmins.map((admin, index) => (
                      <tr
                        key={admin.id}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        onClick={() => toggleRowSelection(admin.id)}
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
                          <button
                            className="bg-blue-500 text-white p-2 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAdmin(admin.id);
                            }}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                        </td>
                        <td className="p-3 border border-gray-200 text-center">
                          <button
                            className="bg-red-500 text-white p-2 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAdmin(admin.id);
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="p-3 text-center text-gray-500">
                        لا توجد سجلات متطابقة
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Info */}
          <div className="flex justify-between mt-4">
            <div className="text-gray-600">إجمالي {filteredAdmins.length}</div>
            <div className="text-gray-600">
              تم تحديد {selectedRows.length} من الصفوف
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-4xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowAddEditModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
              <h2 className="text-xl font-bold">
                {currentAdmin ? "تعديل بيانات المسؤول" : "إضافة مسؤول جديد"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* School Name */}
                <div className="md:col-span-3">
                  <label className="block text-right mb-1">
                    اسم المدرسة: <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    required
                  >
                    <option value="">اختر المدرسة</option>
                    <option value="AAA">AAA</option>
                    <option value="TT">TT</option>
                  </select>
                </div>

                {/* Picture */}
                <div className="md:row-span-2">
                  <label className="block text-right mb-1">الصورة:</label>
                  <div className="border rounded-md p-2 h-36 flex items-center justify-center">
                    {formData.image ? (
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="صورة المستخدم"
                        className="max-h-32 max-w-full"
                      />
                    ) : (
                      <div className="w-32 h-32 border flex items-center justify-center">
                        <i className="fas fa-image text-4xl text-gray-300"></i>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="mt-2"
                  />
                </div>

                {/* First Name */}
                <div>
                  <label className="block text-right mb-1">
                    الاسم الأول: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>

                {/* Second Name */}
                <div>
                  <label className="block text-right mb-1">
                    الاسم الثاني: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="secondName"
                    value={formData.secondName}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>

                {/* Third Name */}
                <div>
                  <label className="block text-right mb-1">الاسم الثالث:</label>
                  <input
                    type="text"
                    name="thirdName"
                    value={formData.thirdName}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-right mb-1">
                    الاسم الأخير: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>

                {/* Civil ID */}
                <div>
                  <label className="block text-right mb-1">
                    الرقم المدني: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="civilId"
                    value={formData.civilId}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 text-left"
                    required
                    pattern="[0-9]{11,}"
                    title="يجب أن يتكون الرقم المدني من 11 رقم على الأقل"
                  />
                </div>

                {/* Nationality */}
                <div>
                  <label className="block text-right mb-1">الجنسية:</label>
                  <select
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="">اختر الجنسية</option>
                    <option value="أفغاني">أفغاني</option>
                    <option value="بولندي">بولندي</option>
                    <option value="عراقي">عراقي</option>
                  </select>
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-right mb-1">
                    الهاتف المحمول: <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full border rounded-md p-2 text-left"
                      required
                    />
                    <select className="border rounded-md p-2 ml-1 w-20">
                      <option value="+92">+92</option>
                      <option value="+966">+966</option>
                      <option value="+971">+971</option>
                    </select>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-right mb-1">
                    البريد الإلكتروني: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 text-left"
                    required
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-right mb-1">
                    تاريخ البدء الفعلي: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 text-left"
                    required
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-right mb-1">
                    تاريخ الانتهاء:
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 text-left"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-right mb-1">الحالة:</label>
                  <div className="h-10 flex items-center">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="status"
                        checked={formData.status}
                        onChange={handleChange}
                        className="ml-2 w-10 h-5 appearance-none rounded-full bg-gray-300 checked:bg-lime-500 transition-all duration-200 relative before:absolute before:top-0.5 before:left-0.5 before:bg-white before:w-4 before:h-4 before:rounded-full before:transition-all before:duration-200 checked:before:left-5"
                      />
                    </label>
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="block text-right mb-1">
                    اسم المستخدم: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-right mb-1">
                    كلمة المرور: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full border rounded-md p-2"
                      required={!currentAdmin}
                    />
                    <i className="fas fa-eye absolute left-3 top-3 text-gray-400"></i>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-right mb-1">
                    تأكيد كلمة المرور: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full border rounded-md p-2"
                      required={!currentAdmin}
                    />
                    <i className="fas fa-eye absolute left-3 top-3 text-gray-400"></i>
                  </div>
                </div>

                {/* Notes */}
                <div className="md:col-span-3">
                  <label className="block text-right mb-1">الملاحظات:</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 h-32"
                  ></textarea>
                </div>

                {/* Address */}
                <div className="md:col-span-3">
                  <label className="block text-right mb-1">العنوان:</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 h-32"
                  ></textarea>
                </div>

                {/* Attachment */}
                <div className="md:col-span-3">
                  <button
                    type="button"
                    className="bg-lime-500 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <i className="fas fa-paperclip ml-1"></i>
                    المرفق
                  </button>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center"
                  onClick={() => setShowAddEditModal(false)}
                >
                  <i className="fas fa-times ml-1"></i>
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <i className="fas fa-save ml-1"></i>
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolAdminPanel;
