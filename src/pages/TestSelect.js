import React, { useState } from "react";
import { Link } from "react-router";

const TestSelect = () => {
  const [currentTest, setCurrentTest] = useState(1);
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/embed/O_hXv67BmHg"
  );
  const [selectedTestId, setSelectedTestId] = useState(1);

  const tests = [
    {
      id: 1,
      title: "إستبيان فى التحصيل",
      video: "https://www.youtube.com/embed/O_hXv67BmHg",
      url: "assessment-test",
      description: "تقييم شامل للمهارات الأساسية",
    },
    {
      id: 2,
      title: "إختبار العمليات الأساسية | الجمع",
      video: "https://www.youtube.com/embed/videoID2",
      url: "addition-test",
      description: "اختبر مهاراتك في عمليات الجمع",
    },
    {
      id: 3,
      title: "إختبار العمليات الأساسية | الطرح",
      video: "https://www.youtube.com/embed/videoID3",
      url: "subtraction-test",
      description: "تحدى نفسك في عمليات الطرح",
    },
    {
      id: 4,
      title: "إختبار العمليات الأساسية | الضرب",
      video: "https://www.youtube.com/embed/videoID4",
      url: "multiplication-test",
      description: "امتحن براعتك في الضرب",
    },
    {
      id: 5,
      title: "إختبار العمليات الأساسية | القسمة",
      video: "https://www.youtube.com/embed/videoID5",
      url: "division-test",
      description: "اختبر دقتك في القسمة",
    },
    {
      id: 6,
      title: "إختبار الأكبر والأصغر",
      video: "https://www.youtube.com/embed/videoID6",
      url: "greater-smaller-test",
      description: "قارن وصنف الأرقام",
    },
    {
      id: 7,
      title: "إختبار تذكر الأرقام",
      video: "https://www.youtube.com/embed/videoID7",
      url: "number-remember",
      description: "اختبر ذاكرتك الرقمية",
    },
    {
      id: 8,
      title: "إختبار سرعة قراءة الأرقام",
      video: "https://www.youtube.com/embed/videoID9",
      url: "oral-test",
      description: "اختبر سرعة القراءة والإدراك",
    },
    {
      id: 9,
      title: "إختبار تقدير المسافة",
      video: "https://www.youtube.com/embed/videoID8",
      url: "distance-estimation-test",
      description: "قيّم مهارات التقدير المكاني",
    },

  ];

  const handleTestSelect = (testId) => {
    const selectedTest = tests.find((test) => test.id === testId);
    if (selectedTest) {
      setCurrentTest(testId);
      setSelectedTestId(testId);
      setVideoUrl(selectedTest.video);
    }
  };

  const handleRestartVideo = () => {
    setVideoUrl("");
    setTimeout(() => {
      setVideoUrl(tests.find((test) => test.id === currentTest)?.video || "");
    }, 100);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Player Column */}
          <div className="flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex-grow relative pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={videoUrl}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Control Buttons */}
            <div className="flex p-4 space-x-4">
              <Link
                to={tests.find((test) => test.id === currentTest)?.url}
                className="flex-1 bg-colPrime text-white py-3 rounded-lg hover:bg-colSec transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg">إبدأ الإختبار</span>
              </Link>

              <button
                onClick={handleRestartVideo}
                className="flex-1 bg-colPrime text-white py-3 rounded-lg hover:bg-colSec transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg">أعد المشاهدة</span>
              </button>
            </div>
          </div>

          {/* Test Selection Column */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-auto">
            <div className="divide-y divide-gray-200">
              {tests.map((test, index) => (
                <div
                  key={test.id}
                  onClick={() => handleTestSelect(test.id)}
                  className={`
                    cursor-pointer flex-row-reverse p-4 flex items-center justify-between 
                    transition-all duration-300
                    ${
                      selectedTestId === test.id
                        ? "bg-colPrime text-white"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  <div className="flex items-center flex-row-reverse space-x-4 rtl:space-x-reverse">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex ml-10 items-center justify-center
                        ${
                          selectedTestId === test.id
                            ? "bg-white text-colPrime"
                            : "bg-colPrime text-white"
                        }
                      `}
                    >
                      {test.id}
                    </div>
                    <div className="text-right">
                      <h3 className="text-xl font-bold">{test.title}</h3>
                      <p className="text-sm opacity-70">{test.description}</p>
                    </div>
                  </div>
                  <Link
                    to={test.url}
                    className={`
                      px-4 py-2 rounded-md transition-all duration-300
                      ${
                        selectedTestId === test.id
                          ? "bg-white text-colPrime"
                          : "bg-colPrime text-white hover:bg-colSec"
                      }
                    `}
                  >
                    إبدأ
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSelect;
