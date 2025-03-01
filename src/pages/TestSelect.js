import React, { useState, useRef } from "react";
import { Link } from "react-router";

const TestSelect = () => {
  const [currentTest, setCurrentTest] = useState(1);
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/embed/O_hXv67BmHg"
  );
  const videoRef = useRef(null);

  const tests = [
    {
      id: 1,
      title: "إستبيان فى التحصيل",
      video: "https://www.youtube.com/embed/O_hXv67BmHg",
    },
    {
      id: 2,
      title: "إختبار العمليات الأساسية | الجمع",
      video: "https://www.youtube.com/embed/videoID2",
      url: "addition-test",
    },
    {
      id: 3,
      title: "إختبار العمليات الأساسية | الطرح",
      video: "https://www.youtube.com/embed/videoID3",
    },
    {
      id: 4,
      title: "إختبار العمليات الأساسية | الضرب",
      video: "https://www.youtube.com/embed/videoID4",
    },
    {
      id: 5,
      title: "إختبار العمليات الأساسية | القسمة",
      video: "https://www.youtube.com/embed/videoID5",
    },
    {
      id: 6,
      title: "إختبار الأكبر والأصغر",
      video: "https://www.youtube.com/embed/videoID6",
    },
    {
      id: 7,
      title: "إختبار تذكر الأرقام",
      video: "https://www.youtube.com/embed/videoID7",
    },
    {
      id: 8,
      title: "إختبار تقدير المسافة",
      video: "https://www.youtube.com/embed/videoID8",
    },
    {
      id: 9,
      title: "إختبار سرعة قراءة الأرقام",
      video: "https://www.youtube.com/embed/videoID9",
    },
  ];

  const handleTestSelect = (testId) => {
    const selectedTest = tests.find((test) => test.id === testId);
    if (selectedTest) {
      setCurrentTest(testId);
      setVideoUrl(selectedTest.video);
    }
  };

  const handleRestartVideo = () => {
    setVideoUrl(""); // Force re-render
    setTimeout(() => {
      setVideoUrl(tests.find((test) => test.id === currentTest)?.video || "");
    }, 100);
  };

  const handleStartTest = () => {
    console.log("Starting test", currentTest);
  };

  return (
    <div className="p-4">
      <div className="max-w-8xl flex mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 w-full">
          {/* Video Player Column */}
          <div>
            <div className="rounded-xl overflow-hidden border-4 border-colPrime shadow-md">
              <div className="relative pb-[76.25%]">
                <iframe
                  ref={videoRef}
                  className="absolute top-0 left-0 w-full h-full"
                  src={videoUrl}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            {/* Video Control Buttons */}
            <div className="flex justify-around p-3">
              <button
                className="bg-colPrime h-16  text-white px-6 py-2 rounded-md flex items-center space-x-2 hover:bg-colSec transition duration-200"
                onClick={handleStartTest}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="mr-2 text-2xl">إبدأ الإختبار</span>
              </button>

              <button
                className="bg-colPrime text-white px-6 py-2 rounded-md flex items-center space-x-2 hover:bg-colSec transition duration-200"
                onClick={handleRestartVideo}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="mr-2 text-2xl">أعد المشاهدة</span>
              </button>
            </div>
          </div>
          {/* Test Selection Column */}
          <div>
            <div className="rounded-md border-2 border-colPrime">
              {tests.map((test, index) => (
                <Link to={`${test.url}`}
                  key={test.id}
                  className={`flex justify-between rounded-md items-center h-12  ${
                    index % 2 === 1 ? "bg-white" : "bg-[#F1F6D6]"
                  } overflow-hidden border hover:border-colPrime cursor-pointer`}
                  onClick={() => handleTestSelect(test.id)}
                >
                  <button
                    className="bg-colPrime text-white px-4 py-2 h-12 flex items-center"
                    onClick={() => handleTestSelect(test.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xl">إبدأ الإختبار</span>
                  </button>

                  <div className="flex items-center px-4">
                    <span
                      className="text-xl font-lg font-extrabold ml-3"
                      dir="rtl"
                    >
                      {test.title}
                    </span>
                    <div className="bg-colPrime ml-2 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      {test.id}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSelect;
