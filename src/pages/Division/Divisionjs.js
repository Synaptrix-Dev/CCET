import React, { useState, useEffect } from "react";
import eraser from "../../assets/eraser.png";
import nq from "../../assets/next-question.png";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
const numbers = [
  ["١", "٠"],
  ["٣", "٢"],
  ["٥", "٤"],
  ["٧", "٦"],
  ["٩", "٨"],
  ["١١", "١٠"],
  ["١٣", "١٢"],
  ["١٥", "١٤"],
  ["١٧", "١٦"],
  ["١٩", "١٨"],
];

function DivisionLayout() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [droppedNumbers, setDroppedNumbers] = useState({});
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [incorrectAttempts, setIncorrectAttempts] = useState({});
  const navigate = useNavigate();
  const totalQuestions = 20;
  const studentName = "مهند كمال داوود";

  const correctAnswers = [
    "٤",
    "٧",
    "٣",
    "٨",
    "٦",
    "٨",
    "٣",
    "٥",
    "٩",
    "٧", // Part 1 (Q1-Q10)
    "٦",
    "٣",
    "٧", // Part 2 (Q11-Q13)
    "٦",
    "٣٤",
    "٨٠",
    "٥١",
    "٧",
    "٥",
    "١", // Part 3 (Q14-Q20)
  ];

  const parts = [
    { name: "part1", start: 0, end: 9, maxIncorrect: 2 },
    { name: "part2", start: 10, end: 12, maxIncorrect: 2 },
    { name: "part3", start: 13, end: 19, maxIncorrect: 2 },
  ];

  useEffect(() => {
    setStartTime(new Date());
    setQuestionStartTime(new Date());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 120;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const getCurrentPart = () => {
    return parts.find(
      (part) =>
        currentQuestionIndex >= part.start && currentQuestionIndex <= part.end
    );
  };

  const handleTimeout = () => {
    checkAnswer(false);
  };

  const checkAnswer = (isManual = true) => {
    const currentAnswer = droppedNumbers[`box-${currentQuestionIndex}`] || "";
    const isCorrect = currentAnswer === correctAnswers[currentQuestionIndex];
    const timeTaken = Math.floor((new Date() - questionStartTime) / 1000);
    const currentPart = getCurrentPart();

    setResults((prev) => [
      ...prev,
      {
        question: currentQuestionIndex + 1,
        isCorrect,
        timeTaken,
        part: currentPart.name,
      },
    ]);

    if (!isCorrect && isManual) {
      setIncorrectAttempts((prev) => ({
        ...prev,
        [currentPart.name]: (prev[currentPart.name] || 0) + 1,
      }));
    }

    const partIncorrect = incorrectAttempts[currentPart.name] || 0;
    if (partIncorrect >= currentPart.maxIncorrect) {
      endTestEarly(currentPart.name);
      // return;
    }

    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex + 1 === totalQuestions) {
      finishTest();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setDroppedNumbers({});
      setProgress((prev) => Math.min(prev + 100 / totalQuestions, 100));
      setQuestionStartTime(new Date());
      setTimeLeft(120);
    }
  };

  const nextQuestion = () => {
    checkAnswer();
  };

  const endTestEarly = (partName) => {
    setEndTime(new Date());
    logResults();
    // navigate("/dashboard/testselection");
  };

  const finishTest = () => {
    setEndTime(new Date());
    setShowModal(true);
    logResults();
  };

  const logResults = () => {
    const partResults = parts.map((part) => {
      const partQuestions = results.filter((r) => r.part === part.name);
      const correctCount = partQuestions.filter((r) => r.isCorrect).length;
      const totalCount = part.end - part.start + 1;
      return `${part.name}: ${correctCount}/${totalCount}`;
    });

    const totalScore = results.filter((r) => r.isCorrect).length;

    console.log({
      "Test End Time (Redirect)": endTime?.toLocaleString(),
      "Results by Part:": partResults,
      "Total Score": `${totalScore}/${totalQuestions}`,
    });

    // Calculate and log Z-scores for all grades
    const zScoreGrade3 = (totalScore - 10.11) / 4.78;
    const zScoreGrade4 = (totalScore - 15.68) / 9.98;
    const zScoreGrade5 = (totalScore - 30.36) / 13.12;

    console.log("Grade 3 Z-Score:", zScoreGrade3.toFixed(2));
    console.log("Grade 4 Z-Score:", zScoreGrade4.toFixed(2));
    console.log("Grade 5 Z-Score:", zScoreGrade5.toFixed(2));
  };

  const handleDragStart = (number) => {
    setDraggedNumber(number);
  };

  const handleErase = () => {
    setDroppedNumbers({});
  };

  const handleDrop = (dropId) => {
    if (draggedNumber) {
      setDroppedNumbers((prev) => ({
        ...prev,
        [dropId]: draggedNumber,
      }));
      setDraggedNumber(null);
    }
  };
  const Modal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl mb-4">تم إكمال التمرين!</h2>
        <p>
          نتيجتك: {results.filter((r) => r.isCorrect).length} من{" "}
          {totalQuestions}
        </p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          // onClick={() =>
          //   // (window.location.href = "/dashboard/dashboard/testselectionion")
          // }
        >
          العودة إلى لوحة التحكم
        </button>
      </div>
    </div>
  );
  return (
    <div>
      {/* Header with Progress Bar */}
      <div className="w-full bg-gray-100 h-10 flex mt-10 items-center justify-between">
        <img src={Logo} alt="Logo" className="h-36 w-36" />
        <div className="flex-grow mx-4">
          <div
            className="w-full rounded-lg h-8 bg-gray-200 overflow-hidden flex flex-row-reverse"
            style={{ backgroundColor: "#E1E8CE" }}
          >
            <div
              className="h-full transition-all duration-500  ease-in-out shadow-inner"
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
              إختبار العمليات الأساسية | القسمة
            </span>
          </div>
          <div className="px-1 py-2 text-right">
            <span className="text-black text-md font-bold">
              اختبار فرز عسر الحساب
            </span>
          </div>
        </div>
      </div>
      {/* main part */}
      <div>
        <div className="max-w-8xl mx-auto mt-4 flex items-center justify-center space-x-8">
          <div className="flex flex-col justify-between items-start">
            <button onClick={handleErase}>
              <img src={eraser} alt="er" className="w-52" />
            </button>
          </div>

          <div className="w-full">
            <div className="max-h-full min-h-[40vh] w-full border-2 border-yellow-400 bg-[#F3F4F6]  rounded-lg p-8 text-5xl  flex justify-center items-center">
              {/* Question 1  */}
              {currentQuestionIndex === 0 && (
                <div className="flex justify-center space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-0")} // Unique ID for this box
                  >
                    {droppedNumbers["box-0"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>٢</span>
                    <span>÷</span>
                    <span>٨</span>
                  </div>
                </div>
              )}

              {/* Question 2  */}
              {currentQuestionIndex === 1 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-1")} // Unique ID for this box
                  >
                    {droppedNumbers["box-1"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>٦</span>
                    <span>÷</span>
                    <span>٤٢</span>
                  </div>
                </div>
              )}

              {/* Question 3  */}
              {currentQuestionIndex === 2 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-2")} // Unique ID for this box
                  >
                    {droppedNumbers["box-2"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>٤</span>
                    <span>÷</span>
                    <span>١٢</span>
                  </div>
                </div>
              )}

              {/* Question 4  */}
              {currentQuestionIndex === 3 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-3")} // Unique ID for this box
                  >
                    {droppedNumbers["box-3"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>٨</span>
                    <span>÷</span>
                    <span>٦٤</span>
                  </div>
                </div>
              )}

              {/* Question 5  */}
              {currentQuestionIndex === 4 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-4")} // Unique ID for this box
                  >
                    {droppedNumbers["box-4"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>٣</span>
                    <span>÷</span>
                    <span>١٨</span>
                  </div>
                </div>
              )}

              {/* Question 6  */}
              {currentQuestionIndex === 5 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-5")} // Unique ID for this box
                  >
                    {droppedNumbers["box-5"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>٤</span>
                    <span>÷</span>
                    <span>٣٢</span>
                  </div>
                </div>
              )}

              {/* Question 7  */}
              {currentQuestionIndex === 6 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-6")} // Unique ID for this box
                  >
                    {droppedNumbers["box-6"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>٩</span>
                    <span>÷</span>
                    <span>٢٧</span>
                  </div>
                </div>
              )}

              {/* Question 8  */}
              {currentQuestionIndex === 7 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-7")} // Unique ID for this box
                  >
                    {droppedNumbers["box-7"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>٩</span>
                    <span>÷</span>
                    <span>٤٥</span>
                  </div>
                </div>
              )}

              {/* Question 9  */}
              {currentQuestionIndex === 8 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-8")} // Unique ID for this box
                  >
                    {droppedNumbers["box-8"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>٧</span>
                    <span>÷</span>
                    <span>٦٣</span>
                  </div>
                </div>
              )}

              {/* Question 10  */}
              {currentQuestionIndex === 9 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-9")} // Unique ID for this box
                  >
                    {droppedNumbers["box-9"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>٥</span>
                    <span>÷</span>
                    <span>٣٥</span>
                  </div>
                </div>
              )}

              {/* Question 11  */}
              {currentQuestionIndex === 10 && (
                <div className="grid grid-cols-4 grid-rows-9  items-center justify-center text-center">
                  {/* <div className="row-start-1 col-start-2 border-2 text-2xl border-colPrime rounded-full text-green-700">
                  ٢
                </div> */}

                  <div className="row-start-2 col-start-2 h-16 w-16 flex items-center justify-center">
                    <div
                      className="w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop("box-10")} // Unique ID for this box
                    >
                      {droppedNumbers["box-10"] || ""}
                    </div>
                  </div>
                  <div className="row-start-2 col-start-3  h-16 w-16 flex items-center justify-center">
                    <div
                      className="w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop("box-11")} // Unique ID for this box
                    >
                      {droppedNumbers["box-11"] || ""}
                    </div>
                  </div>

                  <div className="row-start-3 col-start-1 border-b-2 border-black">
                    ٧
                  </div>
                  <div className="row-start-3 col-start-2 border-l-2 border-t-2 border-black">
                    ٤
                  </div>
                  <div className="row-start-3 col-start-3 border-t-2 border-black">
                    ٢
                  </div>

                  <div
                    className="  row-start-4 col-start-2 w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-12")} // Unique ID for this box
                  >
                    {droppedNumbers["box-12"] || ""}
                  </div>
                  <div className="row-start-4 col-start-4 flex items-center justify-end ">
                    -
                  </div>

                  <div className="row-start-5 border-t-2 border-black col-span-4 -mt-8"></div>

                  <div
                    className="row-start-6 col-start-2 w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700 -mt-20"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-13")} // Unique ID for this box
                  >
                    {droppedNumbers["box-13"] || ""}
                  </div>
                  <div
                    className="row-start-6 col-start-3 w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700 -mt-20"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-14")} // Unique ID for this box
                  >
                    {droppedNumbers["box-14"] || ""}
                  </div>

                  <div
                    className="row-start-7 col-start-2 w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700 -mt-16"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-15")} // Unique ID for this box
                  >
                    {droppedNumbers["box-15"] || ""}
                  </div>
                  <div
                    className="row-start-7 col-start-3 w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700 -mt-16"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-16")} // Unique ID for this box
                  >
                    {droppedNumbers["box-16"] || ""}
                  </div>
                  <div className="row-start-7 col-start-4 flex text-5xl items-center  justify-end -mt-16 ">
                    -
                  </div>

                  <div className="row-start-8 border-t-2 border-black col-span-4 -mt-24"></div>

                  <div
                    className=" row-start-9 col-start-2  w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700 -mt-32"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-17")} // Unique ID for this box
                  >
                    {droppedNumbers["box-17"] || ""}
                  </div>
                  <div
                    className=" row-start-9 col-start-3  w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700 -mt-32"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-18")} // Unique ID for this box
                  >
                    {droppedNumbers["box-18"] || ""}
                  </div>
                </div>
              )}

              {/* Question 12  */}
              {currentQuestionIndex === 11 && (
                <div className="grid grid-cols-4 grid-rows-9  items-center justify-center text-center">
                  {/* <div className="row-start-1 col-start-2 border-2 text-2xl border-colPrime rounded-full text-green-700">
                  ٢
                </div> */}
                  <div className="row-start-2 col-start-2 h-16 w-16 flex items-center justify-center">
                    <div
                      className="w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop("box-19")} // Unique ID for this box
                    >
                      {droppedNumbers["box-19"] || ""}
                    </div>
                  </div>
                  <div className="row-start-2 col-start-3  h-16 w-16 flex items-center justify-center">
                    <div
                      className="w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop("box-20")} // Unique ID for this box
                    >
                      {droppedNumbers["box-20"] || ""}
                    </div>
                  </div>
                  <div className="row-start-3 col-start-1 border-b-2 border-black">
                    ٣
                  </div>
                  <div className="row-start-3 col-start-2 border-l-2 border-t-2 border-black">
                    ٩
                  </div>
                  <div className="row-start-3 col-start-3 border-t-2 border-black">
                    ٦
                  </div>
                  <div
                    className=" row-start-4 col-start-2 w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-21")} // Unique ID for this box
                  >
                    {droppedNumbers["box-21"] || ""}
                  </div>
                  <div className="row-start-4 col-start-4 flex items-center justify-end ">
                    -
                  </div>
                  <div className="row-start-5 border-t-2 border-black col-span-4 -mt-8"></div>
                  <div
                    className="row-start-6 col-start-2 w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700 -mt-16"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-22")} // Unique ID for this box
                  >
                    {droppedNumbers["box-22"] || ""}
                  </div>
                  <div
                    className="row-start-6 col-start-3 w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700 -mt-16"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-23")} // Unique ID for this box
                  >
                    {droppedNumbers["box-23"] || ""}
                  </div>
                  <div
                    className="row-start-7 col-start-3 w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700 -mt-16"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-25")} // Unique ID for this box
                  >
                    {droppedNumbers["box-25"] || ""}
                  </div>
                  <div className="row-start-7 col-start-4 flex items-center justify-end -mt-16 ">
                    -
                  </div>
                  <div className="row-start-8 border-t-2 border-black col-span-4 -mt-24"></div>
                  <div
                    className="row-start-9 col-start-3 w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700 -mt-32"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-26")} // Unique ID for this box
                  >
                    {droppedNumbers["box-26"] || ""}
                  </div>
                </div>
              )}

              {/* Question 13  */}
              {currentQuestionIndex === 12 && (
                <div className="grid grid-cols-4 grid-rows-9  items-center justify-center text-center">
                  {/* <div className="row-start-1 col-start-2 border-2 text-2xl border-colPrime rounded-full text-green-700">
                  ٢
                </div> */}

                  <div className="row-start-2 col-start-2 h-16 w-16 flex items-center justify-center">
                    <div
                      className="w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop("box-27")} // Unique ID for this box
                    >
                      {droppedNumbers["box-27"] || ""}
                    </div>
                  </div>
                  <div className="row-start-2 col-start-3 h-16 w-16 flex items-center justify-center">
                    <div
                      className="w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white  text-green-700"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop("box-28")} // Unique ID for this box
                    >
                      {droppedNumbers["box-28"] || ""}
                    </div>
                  </div>

                  <div className="row-start-3 col-start-1 border-b-2 border-black">
                    ٦
                  </div>
                  <div className="row-start-3 col-start-2 border-l-2 border-t-2 border-black">
                    ٤
                  </div>
                  <div className="row-start-3 col-start-3 border-t-2 border-black">
                    ٣
                  </div>

                  <div
                    className="row-start-4 col-start-2 h-14 w-14 flex border border-black text-green-700 justify-center items-cente rounded text-green-700 justtify-center items-center text-green-700 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-29")} // Unique ID for this box
                  >
                    {droppedNumbers["box-29"] || ""}
                  </div>

                  <div className="row-start-4 col-start-4 flex items-center justify-end ">
                    -
                  </div>

                  <div className="row-start-5 border-t-2 border-black col-span-4 -mt-8"></div>

                  <div
                    className="row-start-6 col-start-2 h-14 w-14 flex border border-black text-green-700 justify-center items-cente rounded text-green-700 justtify-center items-center -mt-16 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-30")} // Unique ID for this box
                  >
                    {droppedNumbers["box-30"] || ""}
                  </div>

                  <div
                    className="row-start-6 col-start-3 h-14 w-14 flex border border-black text-green-700 justify-center items-cente rounded text-green-700 justtify-center items-center -mt-16 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-31")} // Unique ID for this box
                  >
                    {droppedNumbers["box-31"] || ""}
                  </div>
                  <div
                    className="row-start-7 col-start-2 h-14 w-14 flex border border-black text-green-700 justify-center items-cente rounded text-green-700 justtify-center items-center -mt-16 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-32")} // Unique ID for this box
                  >
                    {droppedNumbers["box-32"] || ""}
                  </div>
                  <div
                    className="row-start-7 col-start-3 h-14 w-14 flex border border-black text-green-700 justify-center items-cente rounded text-green-700 justtify-center items-center -mt-16 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-33")} // Unique ID for this box
                  >
                    {droppedNumbers["box-33"] || ""}
                  </div>

                  <div className="row-start-7 col-start-4 flex items-center justify-end -mt-16 ">
                    -
                  </div>

                  <div className="row-start-8 border-t-2 border-black col-span-4 -mt-24"></div>

                  <div
                    className="row-start-9 col-start-2 h-14 w-14 flex border border-black text-green-700 justify-center items-cente rounded text-green-700 justtify-center items-center -mt-32 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-34")} // Unique ID for this box
                  >
                    {droppedNumbers["box-34"] || ""}
                  </div>

                  <div
                    className="row-start-9 col-start-3 h-14 w-14 flex border border-black text-green-700 justify-center items-cente rounded text-green-700 justtify-center items-center bg-white -mt-32 text-center"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-35")} // Unique ID for this box
                  >
                    {droppedNumbers["box-35"] || ""}
                  </div>
                </div>
              )}

              {/* Question 14  */}
              {currentQuestionIndex === 13 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-36")} // Unique ID for this box
                  >
                    {droppedNumbers["box-36"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>١٠</span>
                    <span>÷</span>
                    <span>٦٠</span>
                  </div>
                </div>
              )}

              {/* Question 15  */}
              {currentQuestionIndex === 14 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-37")} // Unique ID for this box
                  >
                    {droppedNumbers["box-37"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>١٠</span>
                    <span>÷</span>
                    <span>٣٤٠</span>
                  </div>
                </div>
              )}
            {/* add an extra box */}
              {/* Question 16  */}
              {currentQuestionIndex === 15 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-38")} // Unique ID for this box
                  >
                    {droppedNumbers["box-38"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>١٠</span>
                    <span>÷</span>
                    <span>٨٠٠</span>
                  </div>
                </div>
              )}
            {/* add an extra box */}
              {/* Question 17  */}
              {currentQuestionIndex === 16 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-39")} // Unique ID for this box
                  >
                    {droppedNumbers["box-39"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>١٠٠</span>
                    <span>÷</span>
                    <span>٥١٠٠</span>
                  </div>
                </div>
              )}

              {/* Question 18  */}
              {currentQuestionIndex === 17 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-5xl  bg-white -mt-5 text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-40")} // Unique ID for this box
                  >
                    {droppedNumbers["box-40"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>١٠٠٠</span>
                    <span>÷</span>
                    <span>٧٠٠٠</span>
                  </div>
                </div>
              )}

              {/* Question 19  */}
              {currentQuestionIndex === 18 && (
                <div className="flex justify-center h-16 space-x-4 items-center">
                  <div
                    className="w-14 h-14 border-2 border-gray-400 rounded flex items-center justify-center text-5xl -mt-5 bg-white  text-green-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-41")} // Unique ID for this box
                  >
                    {droppedNumbers["box-41"] || ""}
                  </div>
                  <div className="flex justify-center space-x-4 items-center text-5xl h-full -mt-4">
                    <span>=</span>
                    <span>٩٠٠٠</span>
                    <span>÷</span>
                    <span>٤٥٠٠٠</span>
                  </div>
                </div>
              )}

              {/* Question 20 */}
              {currentQuestionIndex === 19 && (
                <div className="grid grid-cols-6 grid-rows-12  items-center justify-center text-center">
                  <div className="row-start-1 col-start-2 border-2 text-2xl border-transparent rounded-full text-transparent">
                    ٢
                  </div>

                  <div className="row-start-2 col-start-2 h-16 w-16 flex items-center justify-center">
                    <div
                      className="h-14 w-14 flex border rounded flex items-center justify-center border-gray-400 text-green-700  bg-white"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop("box-42")} // Unique ID for this box
                    >
                      {droppedNumbers["box-42"] || ""}
                    </div>
                  </div>
                  <div className="row-start-2 col-start-3 h-16 w-16 flex items-center justify-center">
                    <div
                      className="h-14 w-14 flex border rounded flex items-center justify-center border-gray-400 text-green-700  bg-white"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop("box-43")} // Unique ID for this box
                    >
                      {droppedNumbers["box-43"] || ""}
                    </div>
                  </div>
                  <div className="row-start-2 col-start-4 h-16 w-16 flex items-center justify-center">
                    <div
                      className="h-14 w-14 flex border rounded flex items-center justify-center border-gray-400 text-green-700  bg-white text-center"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop("box-44")} // Unique ID for this box
                    >
                      {droppedNumbers["box-44"] || ""}
                    </div>
                  </div>
                  <div className="row-start-2 col-start-5 h-16 w-16 flex items-center justify-center">
                    <div
                      className="h-14 w-14 flex border rounded flex items-center justify-center border-gray-400 text-green-700  bg-white text-center"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop("box-45")} // Unique ID for this box
                    >
                      {droppedNumbers["box-45"] || ""}
                    </div>
                  </div>

                  <div className="row-start-3 col-start-1 border-b-2 border-black">
                    ٦
                  </div>
                  <div className="row-start-3 col-start-2 border-l-2 border-t-2 border-black">
                    ٦
                  </div>
                  <div className="row-start-3 col-start-3 border-t-2 border-black">
                    ٧
                  </div>
                  <div className="row-start-3 col-start-4 border-t-2 border-black">
                    ٣
                  </div>
                  <div className="row-start-3 col-start-5 border-t-2 border-black">
                    ٩
                  </div>

                  <div
                    className="row-start-4 col-start-2 h-14 w-14 flex border-2 rounded border-gray-400 text-green-700 bg-white  justify-center items-center"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-63")} // Unique ID for this box
                  >
                    {droppedNumbers["box-63"] || ""}
                  </div>
                  <div className="row-start-4 col-start-6 flex items-center justify-end ">
                    -
                  </div>

                  <div className="row-start-5 border-t-2 border-black col-span-6 -mt-8"></div>

                  <div
                    className="row-start-6 col-start-2 h-14 w-14 rounded border-gray-400 flex items-center justify-center text-green-700 flex border-2 -mt-16 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-46")} // Unique ID for this box
                  >
                    {droppedNumbers["box-46"] || ""}
                  </div>
                  <div
                    className="row-start-6 col-start-3 h-14 w-14 flex border-2 rounded flex items-center justify-center border-gray-400 text-green-700  -mt-16 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-47")} // Unique ID for this box
                  >
                    {droppedNumbers["box-47"] || ""}
                  </div>
                  <div
                    className="row-start-7 col-start-2 h-14 w-14 flex border-2 rounded  items-center justify-center border-gray-400 text-green-700  -mt-16 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-48")} // Unique ID for this box
                  >
                    {droppedNumbers["box-48"] || ""}
                  </div>
                  <div
                    className="row-start-7 col-start-3 h-14 w-14 flex border-2 rounded flex items-center justify-center border-gray-400 text-green-700  -mt-16 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-49")} // Unique ID for this box
                  >
                    {droppedNumbers["box-49"] || ""}
                  </div>

                  <div className="row-start-7 col-start-6 flex items-center justify-end -mt-16 ">
                    -
                  </div>

                  <div className="row-start-8 border-t-2 border-black col-span-6 -mt-24"></div>

                  <div
                    className="row-start-9 col-start-2 h-14 w-14 flex border-2 rounded flex items-center justify-center border-gray-400 text-green-700  -mt-32 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-50")} // Unique ID for this box
                  >
                    {droppedNumbers["box-50"] || ""}
                  </div>
                  <div
                    className="row-start-9 col-start-3 h-14 w-14 flex border-2 rounded border-gray-400 text-green-700  -mt-32 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-51")} // Unique ID for this box
                  >
                    {droppedNumbers["box-51"] || ""}
                  </div>
                  <div
                    className="row-start-9 col-start-4 h-14 w-14 flex border-2 rounded border-gray-400 flex items-center justify-center text-green-700  -mt-32 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-52")} // Unique ID for this box
                  >
                    {droppedNumbers["box-52"] || ""}
                  </div>

                  <div
                    className="row-start-10 col-start-3 h-14 w-14 flex border-2 rounded flex items-center justify-center border-gray-400 text-green-700  -mt-32 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-53")} // Unique ID for this box
                  >
                    {droppedNumbers["box-53"] || ""}
                  </div>

                  <div
                    className="row-start-10 col-start-4 h-14 w-14 flex border-2 rounded flex items-center justify-center border-gray-400 text-green-700  -mt-32 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-54")} // Unique ID for this box
                  >
                    {droppedNumbers["box-54"] || ""}
                  </div>

                  <div className="row-start-10 col-start-6 flex items-center justify-end -mt-24 ">
                    -
                  </div>
                  <div className="row-start-11 border-t-2 border-black col-span-6 -mt-36"></div>

                  <div
                    className="row-start-12 col-start-3 h-14 w-14 flex border-2 rounded flex items-center justify-center border-gray-400 text-green-700  -mt-44 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-55")} // Unique ID for this box
                  >
                    {droppedNumbers["box-55"] || ""}
                  </div>
                  <div
                    className="row-start-12 col-start-4  h-14 w-14 flex border-2 rounded flex items-center justify-center border-gray-400 text-green-700  -mt-44 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-56")} // Unique ID for this box
                  >
                    {droppedNumbers["box-56"] || ""}
                  </div>
                  <div
                    className="row-start-12 col-start-5 h-14 w-14 flex border-2 rounded flex items-center justify-center border-gray-400 text-green-700  -mt-44 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-57")} // Unique ID for this box
                  >
                    {droppedNumbers["box-57"] || ""}
                  </div>

                  <div
                    className="row-start-13 col-start-4  h-14 w-14 flex border-2 rounded flex items-center justify-center border-gray-400 text-green-700  -mt-28 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-58")} // Unique ID for this box
                  >
                    {droppedNumbers["box-58"] || ""}
                  </div>
                  <div
                    className="row-start-13 col-start-5 h-14 w-14 flex border-2 rounded flex items-center justify-center border-gray-400 text-green-700  -mt-28 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-59")} // Unique ID for this box
                  >
                    {droppedNumbers["box-59"] || ""}
                  </div>
                  <div className="row-start-13 col-start-6 flex items-center justify-end -mt-24 ">
                    -
                  </div>
                  <div className="row-start-14 border-t-2 border-black col-span-6 "></div>
                  <div
                    className="row-start-15 col-start-4  h-14 w-14 flex border-2 rounded flex items-center justify-center border-gray-400 text-green-700  mt-4 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-60")} // Unique ID for this box
                  >
                    {droppedNumbers["box-60"] || ""}
                  </div>
                  <div
                    className="row-start-15 col-start-5 h-14 w-14 flex border-2 rounded flex items-center justify-center border-gray-400 text-green-700  text-green-700 justify-center items-center mt-4 bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("box-61")} // Unique ID for this box
                  >
                    {droppedNumbers["box-61"] || ""}
                  </div>
                </div>
              )}
            </div>

            {/* next qustion button */}
            <button onClick={nextQuestion}>
              <img src={nq} alt="er" className="w-64 mt-8" />
            </button>
          </div>

          <div className="flex-none w-64 px-4 border-2  border-yellow-400 rounded-lg ">
            <div className="grid grid-cols-2 gap-2 px-5 my-4">
              {numbers.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {row.map((num, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="w-20 h-14 flex text-4xl items-center justify-center border-2 border-yellow-400 rounded bg-gray-100 cursor-grab"
                      draggable
                      onDragStart={() => handleDragStart(num)}
                    >
                      {num}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && <Modal />}
    </div>
  );
}

export default DivisionLayout;
