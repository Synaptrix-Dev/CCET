import React, { useState, useRef, useEffect } from "react";

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

  // Component to display the progress bar
  const ProgressBar = () => (
    <div className="flex w-full bg-[#FAF8EA] h-8">
      <div
        className="bg-lime-400 h-full transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  // Set up the audio element with the current question's audio
  useEffect(() => {
    if (questions[currentQuestion]?.audio) {
      playAudio();
    } else {
      setAudioPlayed(true);
    }
  }, [currentQuestion]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Progress bar */}
      <ProgressBar />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex items-center">
            <img src="/path-to-logo.png" alt="Logo" className="h-16 w-16" />
          </div>
          <div className="flex justify-end items-center space-x-4 text-right">
            <div className="border-r pr-4">اختبار فزر عبر الحساب</div>
            <div className="border-r pr-4">استبيان في التحصيل</div>
            <div>اسم الطالب : مهند كمال داوود</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col items-end mr-10 justify-center p-6">
        {/* Question card */}
        <div className="bg-amber-50 h-48 border border-amber-100 rounded-lg p-6 w-full max-w-7xl text-right">
          <p className="text-2xl font-bold text-gray-800">
            {questions[currentQuestion]?.question}
          </p>
        </div>

        {/* Audio element */}
        <audio
          ref={audioRef}
          src={questions[currentQuestion]?.audio || ""}
          onEnded={handleAudioEnd}
          className="hidden"
        />

        {/* Answer buttons */}
        <div className="flex items-center justify-center mt-20 h-48 bg-[#AEC03F] w-full">
          <div className="grid grid-cols-4 gap-8 w-full max-w-6xl justify-items-center">
            {/* إعادة الاستماع Button */}
            <button
              onClick={() => playAudio()}
              className="bg-[#FAF8EA] h-24 w-48 text-gray-600 py-4 px-6 rounded-md flex flex-col items-center justify-center"
            >
              <span className="text-xl font-bold">اعاده الاستماع</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mt-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14a6 6 0 01-6 6H9a6 6 0 01-6-6V10a6 6 0 016-6h4a6 6 0 016 6v4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            {/* غير متأكد Button */}
            <button
              onClick={() => audioPlayed && handleAnswer("غير متأكد")}
              disabled={!audioPlayed}
              className={`bg-[#FAF8EA] h-24 w-48 py-4 px-6 flex flex-col items-center justify-center rounded-md ${
                !audioPlayed
                  ? "opacity-50 cursor-not-allowed"
                  : "text-amber-500"
              }`}
            >
              <span className="text-xl font-bold">غير متأكد</span>
              <span className="text-2xl mt-2">!</span>
            </button>

            {/* غير موافق Button */}
            <button
              onClick={() => audioPlayed && handleAnswer("غير موافق")}
              disabled={!audioPlayed}
              className={`bg-[#FAF8EA] h-24 w-48 py-4 px-6 flex flex-col items-center justify-center rounded-md ${
                !audioPlayed ? "opacity-50 cursor-not-allowed" : "text-red-500"
              }`}
            >
              <span className="text-xl font-bold">غير موافق</span>
              <span className="text-2xl mt-2">✖</span>
            </button>

            {/* موافق Button */}
            <button
              onClick={() => audioPlayed && handleAnswer("موافق")}
              disabled={!audioPlayed}
              className={`bg-[#FAF8EA] h-24 w-48 py-4 px-6 flex flex-col items-center justify-center rounded-md ${
                !audioPlayed
                  ? "opacity-50 cursor-not-allowed"
                  : "text-green-500"
              }`}
            >
              <span className="text-xl font-bold">موافق</span>
              <span className="text-2xl mt-2">✓</span>
            </button>
          </div>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="mt-4 text-center">
            <p className="text-gray-600">جاري تشغيل الصوت...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnxietyTest;
