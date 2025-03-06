import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import NextBtn from "../../assets/next-question.png";
import Instruction01 from "./Audios/RapidNaming_Instruction01.wav";
import Instruction02 from "./Audios/RapidNaming_Instruction02.wav";
import Instruction03 from "./Audios/RapidNaming_Instruction03.wav";

const OralTest = () => {
  const questions = [
    { number: "٣ ١ ٦ ٠ ٩ ٧ ٢ ٨ ٤ ٥", audio: "#APP_FILES#audio1.wav" },
    { number: "٦ ٨ ٥ ٧ ٤ ٣ ٠ ١ ٢ ٩", audio: "#APP_FILES#audio1.wav" },
    { number: "١ ٦ ٨ ٢ ٠ ٩ ٧ ٤ ٥ ٣", audio: "#APP_FILES#audio2.wav" },
    { number: "٥ ٧ ٩ ٤ ٢ ٠ ٣ ٦ ١ ٨", audio: "#APP_FILES#audio2.wav" },
  ];

  const audioFiles = [Instruction01, Instruction02, Instruction03];

  const navigate = useNavigate();
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timingLogs, setTimingLogs] = useState([]);
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [answerDetail, setAnswerDetail] = useState("");
  const [progress, setProgress] = useState(0);
  const studentName = "محمد";

  useEffect(() => {
    playInstructions();
  }, []);

  const updateProgress = () => {
    const totalQuestions = questions.length;
    const completedQuestions = currentPairIndex + activeQuestion + 1;
    const newProgress = (completedQuestions / totalQuestions) * 100;
    setProgress(newProgress);
  };

  const playInstructions = () => {
    setIsPlaying(true);
    let index = 0;
    const playNext = () => {
      if (index >= audioFiles.length) {
        setIsPlaying(false);
        playQuestionAudio();
        return;
      }
      const audio = new Audio(audioFiles[index]);
      audio.onended = () => {
        index++;
        playNext();
      };
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    };
    playNext();
  };

  const playQuestionAudio = () => {
    const currentQuestion = questions[currentPairIndex + activeQuestion];
    if (currentQuestion.audio) {
      setIsPlaying(true);
      const audio = new Audio(currentQuestion.audio);
      audio.onended = () => setIsPlaying(false);
      audio.play().catch((error) => {
        console.error("Question audio playback failed:", error);
        setIsPlaying(false);
      });
    }
  };

  const handleNext = () => {
    if (isPlaying) return;

    if (activeQuestion === 0) {
      setActiveQuestion(1);
      updateProgress();
      playQuestionAudio();
    } else if (currentPairIndex + 2 < questions.length) {
      setCurrentPairIndex(currentPairIndex + 2);
      setActiveQuestion(0);
      updateProgress();
      playQuestionAudio();
    } else {
      setProgress(100);
      setTimeout(() => {
        navigate("/dashboard/testselection"); // Absolute path with leading slash
      }, 1000);
    }
  };

  const handleStartTimer = () => {
    setStartTime(new Date());
    console.log(
      `Started timing question ${currentPairIndex + activeQuestion + 1}`
    );
  };

  const handleEndTimer = () => {
    if (startTime) {
      const endTime = new Date();
      const timeSpent = (endTime - startTime) / 1000;
      setTimingLogs([
        ...timingLogs,
        { questionNumber: currentPairIndex + activeQuestion + 1, timeSpent },
      ]);
      console.log(
        `Question ${
          currentPairIndex + activeQuestion + 1
        } took ${timeSpent} seconds`
      );
      setStartTime(null);
    }
  };

  const handleSaveMark = () => {
    const activeQuestionText =
      questions[currentPairIndex + activeQuestion].number;
    const newResults = [
      ...results,
      { question: activeQuestionText, answer: answerDetail },
    ];
    setResults(newResults);

    updateProgress();
    setShowModal(false);
    setAnswerDetail("");

    const totalQuestionsAnswered = newResults.length;
    if (totalQuestionsAnswered === questions.length) {
      setProgress(100);
      setTimeout(() => {
        navigate("/dashboard/testselection"); // Absolute path with leading slash
      }, 1000);
    } else {
      handleNext();
    }
  };

  return (
    <div className="">
      {/* Header Section */}
      <div className="w-full bg-gray-100 h-10 flex mt-10 items-center justify-between">
        <img src={Logo} alt="Logo" className="h-36 w-36" />
        <div className="flex-grow mx-4">
          <div
            className="w-full rounded-lg h-8 bg-gray-200 overflow-hidden flex flex-row-reverse"
            style={{ backgroundColor: "#E1E8CE" }}
          >
            <div
              className="h-full transition-all duration-500 ease-in-out shadow-inner"
              style={{
                width: `${progress}%`,
                backgroundImage:
                  "linear-gradient(270deg, #AEC03F 0px, #AEC03F 28px, #b7d10f 28px, #b7d10f 30px)",
                backgroundSize: "30px 100%",
              }}
            ></div>
          </div>
        </div>
        <div className="flex">
          <div className="px-1 py-2 border-l border-r border-gray-300 flex items-center justify-center">
            <span className="text-black text-xl font-bold">{studentName}</span>
            <span className="ml-1 text-gray-600 text-md font-bold">
              : اسم الطالب
            </span>
          </div>
          <div className="px-1 py-2 border-r border-gray-300 flex items-center justify-center">
            <span className="text-black text-md font-bold">
              إختبار سرعة قراءة الأرقام{" "}
            </span>
          </div>
          <div className="px-1 py-2 text-right">
            <span className="text-black text-md font-bold">
              اختبار فرز عسر الحساب
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 gap-4 my-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 w-36 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition"
        >
          تسجيل الأخطاء{" "}
        </button>
        <button
          onClick={handleEndTimer}
          className="bg-green-600 w-36 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-600 transition"
        >
          نهاية التوقيت
        </button>
        <button
          onClick={handleStartTimer}
          className="bg-green-600 w-36 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition"
        >
          بدء التوقيت
        </button>
      </div>

      {/* Question Display */}
      <div className="flex justify-center ">
        <div className="w-full max-w-5xl p-8 bg-[#F3F4F6] rounded-lg border-2 border-yellow-400 shadow-md">
          {currentPairIndex < questions.length && (
            <div className="flex flex-col items-center gap-8">
              {/* Active Question (Always on top with arrow) */}
              <div className="flex items-center justify-center w-full">
                <div className="text-4xl font-bold text-green-600 tracking-widest flex justify-center">
                  {questions[currentPairIndex + activeQuestion].number
                    .split(" ")
                    .map((digit, idx) => (
                      <span key={idx} className="mx-2 text-8xl">
                        {digit}
                      </span>
                    ))}
                </div>
                <span className="text-7xl font-bold -mt-5 text-green-700 -mr-10">
                  ←
                </span>
              </div>

              {/* Paired Question (Always shown below) */}
              {currentPairIndex + 1 < questions.length && (
                <div className="flex items-center justify-center w-full">
                  <div className="text-4xl font-bold text-green-600 tracking-widest flex justify-center">
                    {questions[
                      currentPairIndex + (activeQuestion === 0 ? 1 : 0)
                    ].number
                      .split(" ")
                      .map((digit, idx) => (
                        <span key={idx} className="mx-2 text-8xl">
                          {digit}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-start ml-36 mt-4 items-center mx-auto max-w-3xl px-4">
        <button
          onClick={handleNext}
          disabled={isPlaying}
          className="flex items-center text-xl text-gray-600 hover:text-gray-800"
        >
          <div className="rounded-full p-2 mr-2">
            <img src={NextBtn} alt="" />
          </div>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h3 className="text-xl font-bold">تسجيل عدد الاخطاء</h3>
            </div>
            <input
              type="text"
              value={answerDetail}
              onChange={(e) => setAnswerDetail(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4 text-right"
              placeholder="أدخل عدد الأخطاء"
            />
            <button
              onClick={handleSaveMark}
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition text-lg"
            >
              حفظ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OralTest;
