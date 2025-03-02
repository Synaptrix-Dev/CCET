import React, { useState } from "react";
import LogoImg from "../../assets/Logo.png";
import Reset from "../../assets/eraser.png";
import NextBtn from "../../assets/next-question.png";
const NumberRemember = ({ Logo, progress, studentName }) => {
  const [displayValue, setDisplayValue] = useState("");

  const displayNumber = (e, number) => {
    setDisplayValue((prev) => prev + number);
  };

  const resetDisplay = (e) => {
    setDisplayValue("");
  };

  const confirmValue = (e) => {
    console.log("Confirmed value:", displayValue);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full bg-gray-100 h-10 flex mt-10 items-center">
        <img src={LogoImg} alt="Logo" className="h-36 w-36" />
        <div
          className="relative w-[65%] rounded-lg h-8 mx-4 bg-gray-200 overflow-hidden"
          style={{ backgroundColor: "#E1E8CE" }}
        >
          <div
            className="h-full transition-all duration-500 ease-in-out shadow-inner"
            style={{
              width: `${progress}%`,
              position: "absolute",
              right: 0,
              backgroundImage:
                "linear-gradient(270deg, #AEC03F 0px, #AEC03F 28px, #b7d10f 28px, #b7d10f 30px)",
              backgroundSize: "30px 100%",
            }}
          ></div>
        </div>
        <div className="flex w-[33%]">
          <div className="px-1 py-2 border-l border-r border-gray-300 flex items-center justify-center">
            <span className="text-black text-xl font-bold">{studentName}</span>
            <span className="ml-1 text-gray-600 text-md font-bold">
              اسم الطالب :محمد
            </span>
          </div>
          <div className="px-1 py-2 border-r border-gray-300 flex items-center justify-center">
            <span className="text-black text-md font-bold">
              إختبار تذكر الأرقام
            </span>
          </div>
          <div className="px-1 py-2 text-right">
            <span className="text-black text-md font-bold">
              اختبار فرز عسر الحساب
            </span>
          </div>
        </div>
      </div>

      {/* Display Container */}
      <div className="w-[1200px] h-[180px] bg-[#FDFCF7] rounded-[11px] border-4 border-[#99A777] flex flex-col items-center justify-between p-5 shadow-lg mt-[60px] mb-20">
        <div
          id="display"
          className="w-full h-[350px] bg-[#FDFCF7] rounded-[20px] flex items-center justify-center text-7xl overflow-x-auto text-black"
        >
          {displayValue}
        </div>
      </div>

      {/* Number Buttons Grid */}
      <div className="w-3/5 flex flex-wrap justify-center gap-3 mb-36">
        {["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"].map((num) => (
          <button
            key={num}
            onClick={(e) => displayNumber(e, num)}
            className="w-[72px] h-[69px] text-5xl text-green-600 border-4 border-[#8ea851] rounded-2xl bg-transparent flex items-center justify-center cursor-pointer hover:bg-green-50 transition-colors"
          >
            {num}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="w-full flex justify-center gap-52 bg-gray-500 py-10">
        <button
          onClick={confirmValue}
          className="w-[180px] h-[100px] bg-gray-300 rounded-md flex items-center justify-center bg-transparent"
        >
          <img src={NextBtn} alt="Pen" />
        </button>
        <button
          onClick={resetDisplay}
          className="w-[120px] h-[80px] rounded-md flex items-center justify-center bg-transparent"
        >
          <img src={Reset} className="" alt="إعادة تعيين" />
        </button>
      </div>
    </div>
  );
};

export default NumberRemember;
