import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import Instruction1 from "./Audios/Intro_comparison_1 - twon.wav";
import Instruction2 from "./Audios/Intro_comparison_2- wewa.wav";
import Instruction3 from "./Audios/Intro_comparison_3- cometry.wav";
import QuestionInstruction from "./Audios/Pressgreat.wav";

// ExtendedDice Component
// ExtendedDice Component
const ExtendedDice = ({ dots = 6 }) => {
  const dotCount = Math.max(1, Math.min(15, dots));

  const getGridLayout = (count) => {
    if (count <= 9) return { rows: 3, cols: 3 };
    else if (count <= 12) return { rows: 3, cols: 4 };
    else return { rows: 3, cols: 5 };
  };

  const { rows, cols } = getGridLayout(dotCount);

  const createGrid = () => {
    const positions = [];
    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        positions.push({
          top: cellHeight * (row + 0.5),
          left: cellWidth * (col + 0.5),
        });
      }
    }

    // Optional randomization for dotCount > 6 (still static, just scattered)
    // if (dotCount > 6) {
    //   for (let i = 0; i < positions.length; i++) {
    //     positions[i].top += (Math.random() - 0.5) * (cellHeight * 0.3);
    //     positions[i].left += (Math.random() - 0.5) * (cellWidth * 0.3);
    //   }
    // }

    return positions.slice(0, dotCount);
  };

  const dotPositions = createGrid();

  return (
    <div
      className="relative bg-white border-[6px] border-[#22C55E]"
      style={{
        width: "100px",
        height: "100px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      {dotPositions.map((position, index) => (
        <div
          key={index}
          className="absolute bg-[#22C55E] rounded-full"
          style={{
            width: "15px",
            height: "15px",
            transform: "translate(-50%, -50%)",
            top: `${position.top}%`,
            left: `${position.left}%`,
          }}
        />
      ))}
    </div>
  );
};

// Updated questions with numeric values instead of dice symbols
const questions = [
  // Part 1: Arabic Numbers
  { left: "٧", right: "٩", symb: "حوط رمز القيمة الأكبر:", correctAnswer: "٩", part: 1 },
  { left: "٨", right: "٥", symb: "حوط رمز القيمة الأكبر:", correctAnswer: "٨", part: 1 },
  { left: "٣", right: "٤", symb: "حوط رمز القيمة الأكبر:", correctAnswer: "٤", part: 1 },
  { left: "٤", right: "٦", symb: "حوط رمز القيمة الأكبر:", correctAnswer: "٦", part: 1 },
  { left: "٩", right: "٨", symb: "حوط رمز القيمة الأكبر:", correctAnswer: "٩", part: 1 },
  { left: "١", right: "٢", symb: "حوط رمز القيمة الأكبر:", correctAnswer: "٢", part: 1 },

  // Part 2: Arabic Numbers
  { left: "٧", right: "٣", symb: "حوط رمز القيمة الأكبر:", correctAnswer: "٧", part: 2 },
  { left: "٩", right: "٨", symb: "حوط رمز القيمة الأكبر:", correctAnswer: "٩", part: 2 },
  { left: "٤", right: "٦", symb: "حوط رمز القيمة الأكبر:", correctAnswer: "٦", part: 2 },
  { left: "٦", right: "٩", symb: "حوط رمز القيمة الأكبر:", correctAnswer: "٩", part: 2 },
  { left: "٧", right: "٥", symb: "حوط رمز القيمة الأكبر:", correctAnswer: "٧", part: 2 },
  { left: "٦", right: "٧", symb: "حوط رمز القيمة الأكبر:", correctAnswer: "٧", part: 2 },

  // Part 3: Dice vs Numbers
  { left: 5, right: 3, symb: "حوط رمز القيمة الأكبر:", correctAnswer: "⚄", part: 4 },
  { left: 4, right: 5, symb: "حوط رمز القيمة الأكبر:", correctAnswer: 5, part: 4 },
  { left: 6, right: 8, symb: "حوط رمز القيمة الأكبر:", correctAnswer: 8, part: 4 },
  { left: 9, right: 5, symb: "حوط رمز القيمة الأكبر:", correctAnswer: 9, part: 4 },
  { left: 5, right: 9, symb: "حوط رمز القيمة الأكبر:", correctAnswer: 9, part: 4 },
  { left: 6, right: 4, symb: "حوط رمز القيمة الأكبر:", correctAnswer: 6, part: 4 },

  // Part 4: Mixed Arabic and Regular Numbers
  { left: 4, right: "٣", symb: "حوط رمز القيمة الأكبر:", correctAnswer: 4, part: 3 },
  { left: "٦", right: 5, symb: "حوط رمز القيمة الأكبر:", correctAnswer: "٦", part: 3 },
  { left: 9, right: "٧", symb: "حوط رمز القيمة الأكبر:", correctAnswer: 9, part: 3 },
  { left: "٦", right:7, symb: "حوط رمز القيمة الأكبر:", correctAnswer: 7, part: 3 },
  { left: 4, right: "٨", symb: "حوط رمز القيمة الأكبر:", correctAnswer: "٨", part: 3 },
  { left:  "٤", right:5, symb: "حوط رمز القيمة الأكبر:", correctAnswer: 5, part: 3 },

];

const questionsWithAudio = questions.map((question) => ({
  ...question,
  audio: QuestionInstruction,
}));

const NumberComparison = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const [currentPart, setCurrentPart] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [examStartTime, setExamStartTime] = useState(null);
  const [examEndTime, setExamEndTime] = useState(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [studentName] = useState("مهند كمال داوود");
  const [wrongAttempts, setWrongAttempts] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const navigate = useNavigate();

  const QUESTIONS_PER_PART = 6;
  const TOTAL_QUESTIONS = 24;

  const instructionAudios = [
    new Audio(Instruction1),
    new Audio(Instruction2),
    new Audio(Instruction3),
  ];

  const questionAudios = questionsWithAudio.map(
    (question) => new Audio(question.audio)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      startQuiz();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasStarted && !isFinished && isInteractive) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeout();
            return 120; // Reset timer
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [hasStarted, isFinished, isInteractive, currentQuestion]);

  const startQuiz = () => {
    setHasStarted(true);
    const startTime = new Date();
    setExamStartTime(startTime);
    console.log("Test started at:", startTime.toISOString());
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

  const handleTimeout = () => {
    const question = questionsWithAudio[currentQuestion];
    recordResult(question, false, "timeout");
    moveToNextQuestionOrGroup();
  };

  const recordResult = (question, isCorrect, reason) => {
    setResults((prev) => [
      ...prev,
      {
        question: currentQuestion + 1,
        part: currentPart,
        selected: reason === "timeout" ? "timeout" : question.selectedValue,
        correctAnswer: question.correctAnswer,
        isCorrect,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const moveToNextQuestionOrGroup = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion >= TOTAL_QUESTIONS) {
      finishTest();
      return;
    }

    const nextPart = Math.floor(nextQuestion / QUESTIONS_PER_PART) + 1;
    if (nextPart !== currentPart) {
      setCurrentPart(nextPart);
      setCurrentQuestion(nextQuestion);
    } else {
      setCurrentQuestion(nextQuestion);
    }
    setTimeLeft(120); // Reset timer
    playQuestionAudio();
  };

  const handleAnswer = (selectedValue) => {
    const question = questionsWithAudio[currentQuestion];
    const isCorrect = selectedValue === question.correctAnswer;

    recordResult(question, isCorrect, "selected");

    if (!isCorrect) {
      setWrongAttempts((prev) => ({
        ...prev,
        [currentPart]: prev[currentPart] + 1,
      }));

      if (wrongAttempts[currentPart] + 1 >= 2) {
        const nextPartStart = currentPart * QUESTIONS_PER_PART;
        if (nextPartStart >= TOTAL_QUESTIONS) {
          finishTest();
        } else {
          setCurrentQuestion(nextPartStart);
          setCurrentPart(currentPart + 1);
          setWrongAttempts((prev) => ({ ...prev, [currentPart]: 0 }));
          setTimeLeft(120);
          playQuestionAudio();
        }
        return;
      }
    }

    moveToNextQuestionOrGroup();
  };

  const finishTest = () => {
    const endTime = new Date();
    setExamEndTime(endTime);
    setIsFinished(true);

    const totalMarks = results.filter((r) => r.isCorrect).length;
    console.log(`Total Marks: ${totalMarks}`);

    const zScores = {
      grade3: (totalMarks - 9.02) / 5.5,
      grade4: (totalMarks - 12.1) / 11.27,
      grade5: (totalMarks - 12.33) / 9.91,
    };

    console.log("Grade 3 Z-Score:", zScores.grade3.toFixed(2));
    console.log("Grade 4 Z-Score:", zScores.grade4.toFixed(2));
    console.log("Grade 5 Z-Score:", zScores.grade5.toFixed(2));
    console.log("Test Results:", results);

    setTimeout(() => navigate("/dashboard/testselection/"), 0);
  };

  const renderValue = (value, isCorrect, isPart1) => {
    const isDice = typeof value === "string" && value.match(/[⚀⚁⚂⚃⚄⚅]/);
    if (typeof value === "number" || isDice) {
      return (
        <div
          style={{
            width: "150px",
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ExtendedDice dots={isDice ? value.charCodeAt(0) - 9855 : value} />
        </div>
      );
    }
    return (
      <span className={isPart1 && isCorrect ? "text-4xl" : "text-8xl"}>
        {value}
      </span>
    );
  };

  const progress = (currentQuestion / TOTAL_QUESTIONS) * 100;

  if (!hasStarted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center font-sans"
        dir="rtl"
      ></div>
    );
  }

  const question = questionsWithAudio[currentQuestion];

  return (
    <div className="">
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
            <span className="text-black text-md font-bold">{studentName}</span>
            <span className="ml-1 text-black text-md font-bold">
              : اسم الطالب
            </span>
          </div>
          <div className="px-1 py-2 border-r border-gray-300 flex items-center justify-center">
            <span className="text-black text-md font-bold">
              إختبار الأكبر والأصغر{" "}
            </span>
          </div>
          <div className="px-1 py-2 text-right">
            <span className="text-black text-md font-bold">
              اختبار فرز عسر الحساب
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl text-red-600 font-bold text-right mb-8">
          : حوط رمز القيمة الأكبر
        </h1>

        {/* <div className="text-center mb-4">
          <span>
            الوقت المتبقي: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </span>
          <span className="mx-4">الجزء: {currentPart}</span>
          <span>
            السؤال: {(currentQuestion % QUESTIONS_PER_PART) + 1}/
            {QUESTIONS_PER_PART}
          </span>
        </div> */}

        <div className="bg-[#F3F4F6] border-2 border-yellow-400 rounded-2xl p-10 w-[900px] mx-auto min-h-[300px] flex flex-col justify-center">
          <div className="flex justify-center gap-24">
            <button
              onClick={() => handleAnswer(question.left)}
              disabled={!isInteractive}
              className="w-48 h-48 rounded-full bg-white shadow-md border border-blue-500 flex items-center justify-center text-green-500 hover:bg-[#FEF8C6] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {renderValue(
                question.left,
                question.left === question.correctAnswer,
                currentPart === 1
              )}
            </button>
            <button
              onClick={() => handleAnswer(question.right)}
              disabled={!isInteractive}
              className="w-48 h-48 rounded-full bg-white shadow-md border border-blue-500 flex items-center justify-center text-green-500 hover:bg-[#FEF8C6] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {renderValue(
                question.right,
                question.right === question.correctAnswer,
                currentPart === 1
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberComparison;
