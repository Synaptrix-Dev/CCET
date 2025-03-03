import React, { useState, useRef, useEffect } from "react";
import Logo from "../../assets/Logo.png";
const AnxietyTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const questions = [
    {
      question:
        'استمع إلى المقطع الصوتي بعناية، ثم حدد ما إذا كانت الإجابة "موافق" أو "غير موافق" أو "غير متأكد" وذلك بناءً على ما تسمعه.',
      correctAnswer: "No",
      audio: "",
    },
    {
      question:
        "أشعر بالخوف في أثناء امتحان الرياضيات مما يجعلني لا أفهم الأسئلة، ولا أجيب عنها جيداً.",
      correctAnswer: "No",
      audio: "#APP_FILES#Anxiety_Q01.wav",
    },
    {
      question:
        "عندما أعلم بموعد اختبار الرياضيات، أشعر بالخوف طوال فترة الاستعداد له.",
      correctAnswer: "No",
      audio: "#APP_FILES#Anxiety_Q02.wav",
    },
    // Add remaining questions as needed
  ];

  // Calculate progress percentage
  useEffect(() => {
    if (currentQuestion > 0) {
      setProgress((currentQuestion / questions.length) * 100);
    }
  }, [currentQuestion]);

  // Function to handle audio playback
  const playAudio = () => {
    setLoading(true);
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setAudioPlayed(true); // Allow progress even if audio fails
        setLoading(false);
      });
    } else {
      setAudioPlayed(true); // If no audio, mark as played
      setLoading(false);
    }
  };

  // Handle audio end event
  const handleAudioEnd = () => {
    setAudioPlayed(true);
    setLoading(false);
  };

  // Handle user answer selection
  const handleAnswer = (answer) => {
    setAnswers([
      ...answers,
      {
        question: currentQuestion,
        answer: answer,
      },
    ]);

    // Move to next question
    setCurrentQuestion(currentQuestion + 1);
    setAudioPlayed(false);

    // Auto-play next question's audio if available
    setTimeout(() => {
      if (
        currentQuestion + 1 < questions.length &&
        questions[currentQuestion + 1].audio
      ) {
        playAudio();
      }
    }, 500);
  };

  // Set up the audio element with the current question's audio
  useEffect(() => {
    if (questions[currentQuestion]?.audio) {
      playAudio();
    } else {
      setAudioPlayed(true);
    }
  }, [currentQuestion]);

  const studentName = "مهند كمال داوود"; // Define student name here or pass as prop

  return (
    <div className="flex flex-col ">
      {/* New Header */}
      <div className="w-full bg-gray-100 h-10 flex mt-10 items-center">
        <img src={Logo} alt="Logo" className="h-36 w-36" />
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
              : اسم الطالب
            </span>
          </div>
          <div className="px-1 py-2 border-r border-gray-300 flex items-center justify-center">
            <span className="text-black text-md font-bold">
              استبيان في التحصيل
            </span>
          </div>
          <div className="px-1 py-2 text-right">
            <span className="text-black text-md font-bold">
              اختبار فرز عسر الحساب
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-between p-6 ">
        {/* Question card with subtle shadow and rounded edges */}
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-5xl mt-8 border-l-8 border-amber-400 transition-all hover:shadow-lg">
          <p className="text-4xl md:text-5xl leading-tight text-gray-800 font-medium text-right">
            {questions[currentQuestion]?.question}
          </p>
        </div>

        {/* Audio player */}
        <div className="my-2 w-full max-w-4xl">
          <audio
            ref={audioRef}
            src={questions[currentQuestion]?.audio || ""}
            onEnded={handleAudioEnd}
            className="hidden"
          />

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-pulse flex space-x-4">
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Answer options */}
        <div className="w-full max-w-4xl mt-32">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {/* Listen again button */}
            <button
              onClick={() => playAudio()}
              className="bg-[#AEC03F] text-white rounded-xl p-6 flex flex-col items-center justify-center transition-all hover:bg-[#9daf33] transform hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xl font-bold">اعاده الاستماع</span>
            </button>

            {/* Not sure button */}
            <button
              onClick={() => audioPlayed && handleAnswer("غير متأكد")}
              disabled={!audioPlayed}
              className={`rounded-xl p-6 flex flex-col items-center justify-center transition-all transform hover:scale-105 ${
                !audioPlayed
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-amber-400 text-white hover:bg-amber-500"
              }`}
            >
              <span className="text-3xl font-bold mb-2">!</span>
              <span className="text-xl font-bold">غير متأكد</span>
            </button>

            {/* Disagree button */}
            <button
              onClick={() => audioPlayed && handleAnswer("غير موافق")}
              disabled={!audioPlayed}
              className={`rounded-xl p-6 flex flex-col items-center justify-center transition-all transform hover:scale-105 ${
                !audioPlayed
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-red-400 text-white hover:bg-red-500"
              }`}
            >
              <span className="text-3xl font-bold mb-2">✖</span>
              <span className="text-xl font-bold">غير موافق</span>
            </button>

            {/* Agree button */}
            <button
              onClick={() => audioPlayed && handleAnswer("موافق")}
              disabled={!audioPlayed}
              className={`rounded-xl p-6 flex flex-col items-center justify-center transition-all transform hover:scale-105 ${
                !audioPlayed
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-400 text-white hover:bg-green-500"
              }`}
            >
              <span className="text-3xl font-bold mb-2">✓</span>
              <span className="text-xl font-bold">موافق</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnxietyTest;
