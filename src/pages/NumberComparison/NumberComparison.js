import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png"; // Adjust the path to your logo
import Instruction1 from "./Audios/Intro_comparison_1 - twon.wav"; // Initial instruction 1
import Instruction2 from "./Audios/Intro_comparison_2- wewa.wav"; // Initial instruction 2
import Instruction3 from "./Audios/Intro_comparison_3- cometry.wav"; // Initial instruction 3

import QuestionInstruction from "./Audios/Intro_comparison_1 - twon.wav"; // Generic question audio placeholder

const questions = [
  // Part 1
  {
    left: "٩",
    right: "٧",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٩",
    part: 1,
  },
  {
    left: "٨",
    right: "٥",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٨",
    part: 1,
  },
  {
    left: "٣",
    right: "٤",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٤",
    part: 1,
  },
  {
    left: "٤",
    right: "٦",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٦",
    part: 1,
  },
  {
    left: "٩",
    right: "٨",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٩",
    part: 1,
  },
  {
    left: "١",
    right: "٢",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٢",
    part: 2,
  },

  // Part 2
  {
    left: "٧",
    right: "٣",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٧",
    part: 1,
  },
  {
    left: "٩",
    right: "٨",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٩",
    part: 2,
  },
  {
    left: "٤",
    right: "٦",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٦",
    part: 2,
  },
  {
    left: "٦",
    right: "٩",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٩",
    part: 2,
  },
  {
    left: "٧",
    right: "٥",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٧",
    part: 2,
  },
  {
    left: "٧",
    right: "٦",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٧",
    part: 2,
  },

  // Part 4 (Dice comparison)
  {
    left: "⚀",
    right: "⚃",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "⚃",
    part: 4,
  },
  {
    left: "⚂",
    right: "⚅",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "⚅",
    part: 4,
  },
  {
    left: "⚁",
    right: "⚄",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "⚄",
    part: 4,
  },
  {
    left: "⚃",
    right: "⚂",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "⚃",
    part: 4,
  },
  {
    left: "⚄",
    right: "⚀",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "⚄",
    part: 4,
  },
  {
    left: "⚅",
    right: "⚁",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "⚅",
    part: 4,
  },

  // Part 3 (Dice vs Numbers)
  {
    left: "⚂",
    right: "٤",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٤",
    part: 3,
  },
  {
    left: "⚅",
    right: "٧",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٧",
    part: 3,
  },
  {
    left: "⚁",
    right: "٧",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٧",
    part: 3,
  },
  {
    left: "⚄",
    right: "٤",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "⚄",
    part: 3,
  },
  {
    left: "⚀",
    right: "٨",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "٨",
    part: 3,
  },
  {
    left: "⚃",
    right: "٥",
    symb: "حوط رمز القيمة الأكبر:",
    correctAnswer: "⚃",
    part: 3,
  },
];

// Add audio property to each question for future customization
const questionsWithAudio = questions.map((question) => ({
  ...question,
  audio: QuestionInstruction, // Default placeholder audio for each question
}));

const NumberComparison = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [currentPart, setCurrentPart] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [examStartTime, setExamStartTime] = useState(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [studentName] = useState("محمد");

  // Initial instruction audios
  const instructionAudios = [
    new Audio(Instruction1),
    new Audio(Instruction2),
    new Audio(Instruction3),
  ];

  // Question-specific audios (using the placeholder for now)
  const questionAudios = questionsWithAudio.map(
    (question) => new Audio(question.audio)
  );

  // Play initial instruction audios after user interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      startQuiz();
    }, 1000); // 2000 milliseconds = 2 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []); // Empty dependency array means it runs once on mount

  const startQuiz = () => {
    setHasStarted(true);
    setExamStartTime(new Date());
    let audioIndex = 0;

    const playNextInstruction = () => {
      if (audioIndex < instructionAudios.length) {
        instructionAudios[audioIndex].play().catch((error) => {
          console.error("Audio play failed:", error);
        });
        instructionAudios[audioIndex].onended = () => {
          audioIndex++;
          playNextInstruction();
        };
      } else {
        setIsInteractive(true);
        playQuestionAudio();
      }
    };

    playNextInstruction();
  };

  const playQuestionAudio = () => {
    setIsInteractive(false);
    const currentAudio = questionAudios[currentQuestion];
    currentAudio.play().catch((error) => {
      console.error("Question audio play failed:", error);
    });
    currentAudio.onended = () => {
      setIsInteractive(true);
    };
  };

  const handleAnswer = (selectedValue) => {
    const question = questionsWithAudio[currentQuestion];

    if (selectedValue !== question.correctAnswer) {
      setIncorrectAttempts((prev) => prev + 1);
      if (incorrectAttempts + 1 >= 2) {
        console.log("Redirect to page 123");
        return;
      }
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion >= questionsWithAudio.length) {
      setIsFinished(true);
      return;
    }

    if (questionsWithAudio[nextQuestion].part !== currentPart) {
      setCurrentPart(questionsWithAudio[nextQuestion].part);
      if (incorrectAttempts === 1) {
        setIncorrectAttempts(0);
      }
    }

    setCurrentQuestion(nextQuestion);
    playQuestionAudio(); // Play the audio for the next question
  };

  const progress = (currentQuestion / questionsWithAudio.length) * 100;

  // Show start screen until user interacts
  if (!hasStarted) {
    return (
      <div
        className="min-h-screen  flex items-center justify-center font-sans"
        dir="rtl"
      >
        {/* <button
          onClick={startQuiz}
          className="bg-green-500 text-white px-8 py-4 rounded-lg text-xl hover:bg-green-600"
        >
          ابدأ الاختبار
        </button> */}
      </div>
    );
  }

  if (isFinished) {
    return (
      <div
        className="min-h-screen bg-gray-100 flex items-center justify-center font-sans"
        dir="rtl"
      >
        <div className="text-center">
          <h1 className="text-3xl mb-6">تم الإنتهاء من الأسئلة</h1>
          <button className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600">
            نهاية الأسئلة
          </button>
        </div>
      </div>
    );
  }

  const question = questionsWithAudio[currentQuestion];

  return (
    <div className="">
      {/* Header with Progress Bar */}
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
        <div className="flex w-[28%]">
          <div className="px-1 py-2 border-l border-r border-gray-300 flex items-center justify-center">
            <span className="text-black text-xl font-bold">{studentName}</span>
            <span className="ml-1 text-gray-600 text-md font-bold">
              : اسم الطالب
            </span>
          </div>
          <div className="px-1 py-2 border-r border-gray-300 flex items-center justify-center">
            <span className="text-black text-md font-bold">
              إختبار الأكبر والأصغر
            </span>
          </div>
          <div className="px-1 py-2 text-right">
            <span className="text-black text-md font-bold">
              اختبار فرز عسر الحساب
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl text-red-600 font-bold text-right mb-8">
          : حوط رمز القيمة الأكبر
        </h1>

        <div className="bg-white border-2 border-yellow-400 rounded-2xl p-10 w-[900px] mx-auto min-h-[300px] flex flex-col justify-center">
          <div className="flex justify-center gap-24">
            <button
              onClick={() => handleAnswer(question.left)}
              disabled={!isInteractive}
              className={`w-48 h-48 rounded-full bg-white shadow-md border border-blue-500 flex items-center justify-center text-green-500 hover:bg-[#FEF8C6] disabled:opacity-70 disabled:cursor-not-allowed
                ${
                  currentPart === 1 && question.correctAnswer === question.left
                    ? "text-4xl"
                    : "text-8xl"
                }`}
            >
              {question.left}
            </button>
            <button
              onClick={() => handleAnswer(question.right)}
              disabled={!isInteractive}
              className={`w-48 h-48 rounded-full bg-white shadow-md border border-blue-500 flex items-center justify-center text-green-500 hover:bg-[#FEF8C6] disabled:opacity-70 disabled:cursor-not-allowed
                ${
                  currentPart === 1 && question.correctAnswer === question.right
                    ? "text-4xl"
                    : "text-8xl"
                }`}
            >
              {question.right}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberComparison;
