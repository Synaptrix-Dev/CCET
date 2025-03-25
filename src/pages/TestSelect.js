import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

const TestSelect = () => {
  const [currentTest, setCurrentTest] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [completedTests, setCompletedTests] = useState([]);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Commented out localStorage useEffect hooks
  // useEffect(() => {
  //   const savedCompletedTests = JSON.parse(
  //     localStorage.getItem("completedTests") || "[]"
  //   );
  //   setCompletedTests(savedCompletedTests);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("completedTests", JSON.stringify(completedTests));
  // }, [completedTests]);

  const tests = [
    {
      id: 1,
      title: "استبانة قلق التحصيل",
      video: "https://www.youtube.com/embed/O_hXv67BmHg",
      url: "dashboard/testselection/assessment-test",
      description: "تقييم شامل للمهارات الأساسية",
    },
    {
      id: 2,
      title: "إختبار العمليات الأساسية | الجمع",
      video: "https://www.youtube.com/embed/videoID2",
      url: "dashboard/testselection/addition-test",
      description: "اختبر مهاراتك في عمليات الجمع",
    },
    {
      id: 3,
      title: "إختبار العمليات الأساسية | الطرح",
      video: "https://www.youtube.com/embed/videoID3",
      url: "dashboard/testselection/subtraction-test",
      description: "تحدى نفسك في عمليات الطرح",
    },
    {
      id: 4,
      title: "إختبار العمليات الأساسية | الضرب",
      video: "https://www.youtube.com/embed/videoID4",
      url: "dashboard/testselection/multiplication-test",
      description: "امتحن براعتك في الضرب",
    },
    {
      id: 5,
      title: "إختبار العمليات الأساسية | القسمة",
      video: "https://www.youtube.com/embed/videoID5",
      url: "dashboard/testselection/division-test",
      description: "اختبر دقتك في القسمة",
    },
    {
      id: 6,
      title: "إختبار الأكبر والأصغر",
      video: "https://www.youtube.com/embed/videoID6",
      url: "dashboard/testselection/greater-smaller-test",
      description: "قارن وصنف الأرقام",
    },
    {
      id: 7,
      title: "إختبار تذكر الأرقام",
      video: "https://www.youtube.com/embed/videoID7",
      url: "dashboard/testselection/number-remember",
      description: "اختبر ذاكرتك الرقمية",
    },
    {
      id: 8,
      title: "إختبار سرعة قراءة الأرقام",
      video: "https://www.youtube.com/embed/videoID9",
      url: "dashboard/testselection/oral-test",
      description: "اختبر سرعة القراءة والإدراك",
    },
    {
      id: 9,
      title: "إختبار تقدير المسافة",
      video: "https://www.youtube.com/embed/videoID8",
      url: "dashboard/testselection/distance-estimation-test",
      description: "قيّم مهارات التقدير المكاني",
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
    setVideoUrl("");
    setTimeout(() => {
      setVideoUrl(tests.find((test) => test.id === currentTest)?.video || "");
    }, 100);
  };

  const handleStartTest = () => {
    if (!currentTest) return;
    console.log("Starting test", currentTest);
    if (!completedTests.includes(currentTest)) {
      setCompletedTests([...completedTests, currentTest]);
    }
    const currentTestData = tests.find((test) => test.id === currentTest);
    if (currentTestData) {
      navigate(`/${currentTestData.url}`);
    }
  };

  const handleTestButtonClick = (testId, testUrl) => {
    handleTestSelect(testId);
  };

  const isTestCompleted = (testId) => completedTests.includes(testId);
  const studentName = "مهند داوود كمال";

  return (
    <>
      <div className="flex flex-row-reverse w-full bg-[#F3F9D7]">
        <h1 className="text-3xl p-2 bg-[#D8E885]">
          :اختبارات فرز عسر الرياضيات للطالب / للطالبة{" "}
        </h1>
        <h1 className="text-3xl p-2">{studentName}</h1>
      </div>
      <div className="p-4">
        <div className="max-w-8xl flex mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            {/* Video/Image section */}
            <div className="lg:order-1">
              {currentTest ? (
                <div>
                  <div className="rounded-xl overflow-hidden border-4 h-[370px] border-colPrime shadow-md">
                    <div className="relative pb-[76.25%]">
                      <iframe
                        ref={videoRef}
                        className="absolute top-0 left-0 w-full h-[370px]"
                        src={videoUrl}
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  <div className="flex justify-around p-3">
                    <button
                      className="bg-colPrime h-16 text-white px-6 py-2 rounded-md flex items-center space-x-2 hover:bg-colSec transition duration-200"
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
              ) : (
                <div className="rounded-xl overflow-hidden ">
                  <div className="relative pb-[76.25%]">
                    <img
                      src={logo}
                      alt="Placeholder - Select a test"
                      className="absolute top-0 left-0 w-[80%] h-[70%] object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
            {/* Test list section */}
            <div className="lg:order-2">
              <div className="rounded-md border-2 border-colPrime">
                {tests.map((test, index) => {
                  const completed = isTestCompleted(test.id);
                  return (
                    <div
                      key={test.id}
                      className={`flex justify-between rounded-md items-center h-12 ${
                        index % 2 === 1 ? "bg-white" : "bg-[#F1F6D6]"
                      } overflow-hidden border hover:border-colPrime cursor-pointer`}
                    >
                      <button
                        className={`${
                          completed
                            ? "bg-gray-400 w-44 text-center text-white px-4 py-2 h-12 flex items-center justify-center cursor-not-allowed"
                            : "bg-colPrime w-44 text-center text-white px-4 py-2 h-12 flex items-center justify-center hover:bg-colSec"
                        }`}
                        onClick={() =>
                          !completed && handleTestButtonClick(test.id, test.url)
                        }
                        disabled={completed}
                      >
                        <span className="text-xl">
                          {completed ? "انتهى الاختبار" : "إبدأ الإختبار"}
                        </span>
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
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestSelect;
