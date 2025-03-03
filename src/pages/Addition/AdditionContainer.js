import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import nextBtn from "../../assets/next-question.png";
import resetBtn from "../../assets/eraser.png";
import Logo from "../../assets/Logo.png";
import Questions from "./QuestionData";

const ArabicMathQuiz = () => {
  const questions = Questions;
  const navigate = useNavigate();
  const dragNumberRef = useRef(null);
  const timerRef = useRef(null); // Ref to store timer ID

  const arabicNumerals = {
    0: "٠",
    1: "١",
    2: "٢",
    3: "٣",
    4: "٤",
    5: "٥",
    6: "٦",
    7: "٧",
    8: "٨",
    9: "٩",
    10: "١٠",
    11: "١١",
    12: "١٢",
    13: "١٣",
    14: "١٤",
    15: "١٥",
    16: "١٦",
    17: "١٧",
    18: "١٨",
    19: "١٩",
  };

  // State declarations
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [carries, setCarries] = useState([]);
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(120000);
  const [totalIncorrect, setTotalIncorrect] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [results, setResults] = useState(Array(questions.length).fill(0));
  const [showModal, setShowModal] = useState(false); // New state for modal
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  // Set start time when component mounts
  useEffect(() => {
    setStartTime(new Date());
    console.log("Test Start Time:", new Date().toLocaleString());
  }, []);

  // Timer effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimerTimeout();
          return 120000;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentQuestionIndex]);

  // Handle drag and drop
  const handleDragStart = (number) => setDraggedNumber(number);
  const handleAnswerDrop = (index) => {
    if (draggedNumber !== null) {
      const newAnswers = [...userAnswers];
      const digits = draggedNumber.split("");
      digits.forEach((digit, i) => {
        if (index + i < currentQuestion.dropzones.length) {
          newAnswers[index + i] = digit;
        }
      });
      setUserAnswers(newAnswers);
      setDraggedNumber(null);
    }
  };
  const handleCarryDrop = (index) => {
    if (draggedNumber !== null) {
      const newCarries = [...carries];
      newCarries[index] = draggedNumber;
      setCarries(newCarries);
      setDraggedNumber(null);
    }
  };

  // Check answer
  const checkAnswer = () => {
    const currentDropzones = currentQuestion.dropzones;
    let isCorrect = true;

    if (userAnswers.length !== currentDropzones.length) {
      isCorrect = false;
    } else {
      currentDropzones.forEach((dropzone, index) => {
        if (userAnswers[index] !== dropzone.correct) {
          isCorrect = false;
        }
      });
    }

    const newResults = [...results];
    newResults[currentQuestionIndex] = isCorrect ? 1 : 0;
    setResults(newResults);

    console.log(`Checking Question ${currentQuestionIndex + 1}:`);
    console.log("User Answers:", userAnswers);
    console.log(
      "Correct Answers:",
      currentDropzones.map((d) => d.correct)
    );
    console.log(
      `Result: ${isCorrect ? "Correct (1 mark)" : "Incorrect (0 marks)"}`
    );

    return isCorrect;
  };

  // Handle timer timeout
  const handleTimerTimeout = () => {
    const newResults = [...results];
    newResults[currentQuestionIndex] = 0;
    setResults(newResults);
    console.log(
      `Question ${currentQuestionIndex + 1} Result: Incorrect (Timer, 0 marks)`
    );

    const newIncorrectAttempts = (currentQuestion.incorrectAttempts || 0) + 1;
    questions[currentQuestionIndex].incorrectAttempts = newIncorrectAttempts;

    if (newIncorrectAttempts === 1) {
      const newTotalIncorrect = totalIncorrect + 1;
      setTotalIncorrect(newTotalIncorrect);
      console.log("Total Incorrect Attempts:", newTotalIncorrect);

      if (newTotalIncorrect >= 2) {
        setFeedback("لقد أجبت على سؤالين بشكل غير صحيح، سيتم إعادة توجيهك...");
        setEndTime(new Date());
        console.log("Test End Time (Redirect):", new Date().toLocaleString());
        console.log("Final Results:", newResults);
        console.log(
          "Total Score:",
          newResults.reduce((a, b) => a + b, 0),
          `/${totalQuestions}`
        );
        setTimeout(() => navigate("/dashboard/testselection"), 1000);
        return;
      }
    }
    moveToNextQuestion();
  };

  // Move to next question helper
  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswers([]);
      setCarries([]);
      setFeedback("");
      setTimer(120000);
    } else {
      setFeedback("أحسنت! لقد أكملت جميع الأسئلة");
      setEndTime(new Date());
      console.log("Test End Time:", new Date().toLocaleString());
      console.log("Final Results:", results);
      console.log(
        "Total Score:",
        results.reduce((a, b) => a + b, 0),
        `/${totalQuestions}`
      );
      setShowModal(true); // Show modal when all questions are completed
      setTimeout(() => {
        setShowModal(false);
        navigate("/dashboard/testselection");
      }, 2000); // Redirect after 2 seconds
    }
  };

  // Handle next question button click
  const nextQuestion = () => {
    clearInterval(timerRef.current); // Stop timer to prevent overlap

    if (userAnswers.length > 0) {
      const isCorrect = checkAnswer();
      setFeedback(isCorrect ? "صحيح!" : "غير صحيح");

      if (!isCorrect) {
        const newIncorrectAttempts =
          (currentQuestion.incorrectAttempts || 0) + 1;
        questions[currentQuestionIndex].incorrectAttempts =
          newIncorrectAttempts;

        if (newIncorrectAttempts === 1) {
          const newTotalIncorrect = totalIncorrect + 1;
          setTotalIncorrect(newTotalIncorrect);
          console.log("Total Incorrect Attempts:", newTotalIncorrect);

          if (newTotalIncorrect >= 2) {
            setFeedback(
              "لقد أجبت على سؤالين بشكل غير صحيح، سيتم إعادة توجيهك..."
            );
            setEndTime(new Date());
            console.log(
              "Test End Time (Redirect):",
              new Date().toLocaleString()
            );
            console.log("Final Results:", results);
            console.log(
              "Total Score:",
              results.reduce((a, b) => a + b, 0),
              `/${totalQuestions}`
            );
            setTimeout(() => navigate("/dashboard/testselection"), 1000);
            return;
          }
        }
      }

      setTimeout(() => {
        moveToNextQuestion();
      }, 10);
    } else {
      const newResults = [...results];
      newResults[currentQuestionIndex] = 0;
      setResults(newResults);
      console.log(
        `Question ${
          currentQuestionIndex + 1
        } Result: Incorrect (Skipped, 0 marks)`
      );

      const newIncorrectAttempts = (currentQuestion.incorrectAttempts || 0) + 1;
      questions[currentQuestionIndex].incorrectAttempts = newIncorrectAttempts;

      if (newIncorrectAttempts === 1) {
        const newTotalIncorrect = totalIncorrect + 1;
        setTotalIncorrect(newTotalIncorrect);
        console.log("Total Incorrect Attempts:", newTotalIncorrect);

        if (newTotalIncorrect >= 2) {
          setFeedback(
            "لقد أجبت على سؤالين بشكل غير صحيح، سيتم إعادة توجيهك..."
          );
          setEndTime(new Date());
          console.log("Test End Time (Redirect):", new Date().toLocaleString());
          console.log("Final Results:", newResults);
          console.log(
            "Total Score:",
            newResults.reduce((a, b) => a + b, 0),
            `/${totalQuestions}`
          );
          setTimeout(() => navigate("/dashboard/testselection"), 1000);
          return;
        }
      }
      moveToNextQuestion();
    }
  };

  // Reset question
  const resetQuestion = () => {
    setUserAnswers([]);
    setCarries([]);
    setFeedback("");
  };

  // Render logic
  const firstOperand = currentQuestion.grid[1].value;
  const secondOperand = currentQuestion.operands[0].value;
  const maxLength = Math.max(firstOperand.length, secondOperand.length);
  const needsCarry = currentQuestion.needsRemainder;
  const paddedFirst = firstOperand.padStart(maxLength, " ");
  const paddedSecond = secondOperand.padStart(maxLength, " ");

  const numberButtons = Array.from({ length: 19 }, (_, i) => i + 1).map(
    (num) => (
      <div
        key={num}
        className="w-16 h-16 flex items-center justify-center border-2 border-yellow-500 rounded-md bg-gray-100 cursor-grab m-1"
        draggable
        onDragStart={() => handleDragStart(arabicNumerals[num.toString()])}
      >
        {arabicNumerals[num.toString()]}
      </div>
    )
  );

  const studentName = "محمد";

  return (
    <>
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
              position: "absolute", // Ensure it starts from the right
              right: 0, // Aligns the bar to the right
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
              إختبار العمليات الأساسية | الجمع
            </span>
          </div>
          <div className="px-1 py-2 text-right">
            <span className="text-black text-md font-bold">
              اختبار فرز عسر الحساب
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-8xl">
        <div className="relative flex py-3 sm:mx-auto">
          <div className="flex flex-row w-full">
            <div className="flex flex-col gap-4 justify-start h-fit w-[20%]">
              <button onClick={resetQuestion} className="mt-36">
                <img src={resetBtn} alt="" />
              </button>
            </div>

            <div className="relative w-[60%] h-[400px] px-4 py-10 justify-center transform translate-y-20 items-center">
              <div className="mx-auto my-auto">
                <div className="border-4 border-yellow-400 flex justify-center h-72 my-auto rounded-lg p-6">
                  <div className="flex flex-col items-center my-auto">
                    {!currentQuestion.needsRemainder ? (
                      <div className="flex items-center space-x-4 text-5xl">
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          {currentQuestion.dropzones.map((dropzone, i) => (
                            <div
                              key={`answer-${i}`}
                              className="w-12 h-12 border-2 border-gray-400 text-green-870 rounded flex items-center justify-center text-5xl"
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={() => handleAnswerDrop(i)}
                            >
                              {userAnswers[i] || ""}
                            </div>
                          ))}
                        </div>
                        <span>=</span>
                        <span>{paddedFirst}</span>
                        <span>+</span>
                        <span>{paddedSecond}</span>
                      </div>
                    ) : (
                      <>
                        {needsCarry && (
                          <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
                            {Array.from({ length: maxLength }, (_, i) => (
                              <div
                                key={`carry-${i}`}
                                className={`w-12 h-12 border-2 ${
                                  carries[i]
                                    ? "border-green-600"
                                    : "border-transparent"
                                } text-green-600 text-3xl rounded-full flex items-center justify-center`}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => handleCarryDrop(i)}
                              >
                                {carries[i] || ""}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex mb-2 space-x-2 rtl:space-x-reverse items-center">
                          {paddedFirst.split("").map((digit, i) => (
                            <div
                              key={`first-${i}`}
                              className="w-12 h-12 flex items-center justify-center text-5xl"
                            >
                              {digit === " " ? "" : digit}
                            </div>
                          ))}
                        </div>
                        <div className="flex mb-2 -mr-6 space-x-2 rtl:space-x-reverse">
                          {paddedSecond.split("").map((digit, i) => (
                            <div
                              key={`second-${i}`}
                              className="w-12 h-12 flex items-center justify-center text-5xl"
                            >
                              {digit === " " ? "" : digit}
                            </div>
                          ))}
                          <h1 className="text-3xl -mr-20 transform">+</h1>
                        </div>
                        <div className="w-[300px] border-t-2 border-black mb-4"></div>
                        <div
                          className={`flex space-x-2 rtl:space-x-reverse ${
                            currentQuestionIndex === 6 ? "ml-[-45px]" : ""
                          }`}
                        >
                          {currentQuestion.dropzones.map((dropzone, i) => (
                            <div
                              key={`answer-${i}`}
                              className="w-12 h-12 border-2 border-gray-400 text-green-700 rounded flex items-center justify-center text-5xl"
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={() => handleAnswerDrop(i)}
                            >
                              {userAnswers[i] || ""}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-4 w-[15%] ml-20 border-yellow-400 rounded-lg p-4">
              <div className="grid grid-cols-1 gap-2">
                {Array.from({ length: 10 }, (_, rowIndex) => {
                  const startNum = rowIndex * 2;
                  const endNum = startNum + 1;
                  return (
                    <div key={rowIndex} className="flex justify-between">
                      <div
                        className="w-20 h-14 flex text-4xl items-center justify-center border-2 border-yellow-400 rounded bg-gray-100 cursor-grab"
                        draggable
                        onDragStart={() =>
                          handleDragStart(arabicNumerals[startNum.toString()])
                        }
                      >
                        {arabicNumerals[startNum.toString()]}
                      </div>
                      {endNum <= 19 && (
                        <div
                          className="w-20 h-14 text-4xl flex items-center justify-center border-2 border-yellow-400 rounded bg-gray-100 cursor-grab"
                          draggable
                          onDragStart={() =>
                            handleDragStart(arabicNumerals[endNum.toString()])
                          }
                        >
                          {arabicNumerals[endNum.toString()]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <button onClick={nextQuestion} className="-mt-96 ml-44">
          <img
            src={nextBtn}
            className="w-96 transform -translate-y-20"
            alt=""
          />
        </button>
        {/* Modal Dialog */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-center">
                تم الانتهاء من التمرين!
              </h2>
              <p className="text-center mt-4">جاري إعادة التوجيه...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ArabicMathQuiz;
