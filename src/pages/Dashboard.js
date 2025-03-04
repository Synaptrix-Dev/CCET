import React from "react";

const Dashboard = () => {
  const statsData = [
    {
      title: "إجمالي الاختبارات",
      value: 7,
      icon: "chart-line",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      percentage: "+12%",
    },
    {
      title: "الطلاب",
      value: 7,
      icon: "users",
      color: "text-green-600",
      bgColor: "bg-green-50",
      percentage: "+5%",
    },
    {
      title: "المعلمون",
      value: 7,
      icon: "chalkboard-teacher",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      percentage: "+8%",
    },
    {
      title: "المدارس",
      value: 2,
      icon: "school",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      percentage: "+3%",
    },
  ];

  return (
    <div className=" relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="text-right w-full">
            <h1 className="text-4xl md:text-5xl font-extrabold text-colPrime tracking-tight">
              لوحة المتابعة
            </h1>
            <p className="text-lg text-white/80 mt-2">
              رؤية شاملة للمؤشرات التعليمية
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform transition-all hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`
                  w-16 h-16 
                  rounded-full 
                  flex 
                  items-center 
                  justify-center 
                  ${stat.color}
                  bg-white 
                  shadow-md
                `}
                >
                  <i className={`fas fa-${stat.icon} text-2xl`}></i>
                </div>
                <div
                  className={`
                  text-sm 
                  font-semibold 
                  ${stat.color}
                  bg-white 
                  px-2 
                  py-1 
                  rounded-full
                `}
                >
                  {stat.percentage}
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-base text-gray-600 font-medium">
                  {stat.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* School Officials Card */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          <div className="md:col-start-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-orange-600 bg-white shadow-md">
                  <i className="fas fa-user-tie text-2xl"></i>
                </div>
                <div className="text-sm font-semibold text-orange-600 bg-white px-2 py-1 rounded-full">
                  +2%
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-gray-900 mb-2">2</div>
                <div className="text-base text-gray-600 font-medium">
                  المسؤولون المدرسيون
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
