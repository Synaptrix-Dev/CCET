import React, { useState, useRef } from "react";
import nextBtn from "../../assets/next-question.png";
import resetBtn from "../../assets/eraser.png";
import Logo from "../../assets/Logo.png";

const ArabicMathQuiz = () => {
  // Questions array (unchanged)
  const questions = [
    // Q1: 5 + 4 = 9
    {
      grid: [
        { type: "empty", value: "" },
        { type: "fixed", value: "٥" },
      ],
      operation: "+",
      operands: [{ type: "fixed", value: "٤" }],
      dropzones: [{ correct: "٩", type: "regular" }],
      needsRemainder: false,
      incorrectAttempts: 0,
    },

    // Q2: 7 + 3 = 10
    {
      grid: [
        { type: "empty", value: "" },
        { type: "fixed", value: "٣" },
      ],
      operation: "+",
      operands: [{ type: "fixed", value: "٧" }],
      dropzones: [
        { correct: "١", type: "regular" },
        { correct: "٠", type: "regular" },
      ],
      needsRemainder: false,
      incorrectAttempts: 0,
    },
    // Q3: 6 + 8 = 14
    {
      grid: [
        { type: "empty", value: "" },
        { type: "fixed", value: "٨" },
      ],
      operation: "+",
      operands: [{ type: "fixed", value: "٦" }],
      dropzones: [
        { correct: "١", type: "regular" },
        { correct: "٤", type: "regular" },
      ],
      needsRemainder: false,
      incorrectAttempts: 0,
    },
    // Q4: 9 + 7 = 16
    {
      grid: [
        { type: "empty", value: "" },
        { type: "fixed", value: "٧" },
      ],
      operation: "+",
      operands: [{ type: "fixed", value: "٩" }],
      dropzones: [
        { correct: "١", type: "regular" },
        { correct: "٦", type: "regular" },
      ],
      needsRemainder: false,
      incorrectAttempts: 0,
    },
    // Q5: 23 + 35 = 58
    {
      grid: [
        { type: "empty", value: "" },
        { type: "fixed", value: "٢٣" },
      ],
      operation: "+",
      operands: [{ type: "fixed", value: "٣٥" }],
      dropzones: [
        { correct: "٥", type: "regular" },
        { correct: "٨", type: "regular" },
      ],
      needsRemainder: true,
      incorrectAttempts: 0,
    },
    // Q6: 36 + 48 = 84
    {
      grid: [
        { type: "empty", value: "" },
        { type: "fixed", value: "٣٦" },
      ],
      operation: "+",
      operands: [{ type: "fixed", value: "٤٨" }],
      dropzones: [
        { correct: "٨", type: "regular" },
        { correct: "٤", type: "regular" },
      ],
      needsRemainder: true,
      incorrectAttempts: 0,
    },
    // Q7: 97 + 68 = 165
    {
      grid: [
        { type: "empty", value: "" },
        { type: "fixed", value: "٦٨" },
      ],
      operation: "+",
      operands: [{ type: "fixed", value: "٩٧" }],
      dropzones: [
        { correct: "١", type: "regular" },
        { correct: "٦", type: "regular" },
        { correct: "٥", type: "regular" },
      ],
      needsRemainder: true,
      incorrectAttempts: 0,
    },
    // Q8: 437 + 89 = 526
    {
      grid: [
        { type: "empty", value: "" },
        { type: "fixed", value: "٤٣٧" },
      ],
      operation: "+",
      operands: [{ type: "fixed", value: "٨٩" }],
      dropzones: [
        { correct: "٥", type: "regular" },
        { correct: "٢", type: "regular" },
        { correct: "٦", type: "regular" },
      ],
      needsRemainder: true,
      incorrectAttempts: 0,
    },
    // Q9: 6538 + 2676 = 9914
    {
      grid: [
        { type: "empty", value: "" },
        { type: "fixed", value: "٦٥٣٨" },
      ],
      operation: "+",
      operands: [{ type: "fixed", value: "٢٦٧٦" }],
      dropzones: [
        { correct: "٩", type: "regular" },
        { correct: "٩", type: "regular" },
        { correct: "١", type: "regular" },
        { correct: "٤", type: "regular" },
      ],
      needsRemainder: true,
      incorrectAttempts: 0,
    },
  ];

  // Arabic numerals mapping (unchanged)
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
  };

  // State declarations
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [carries, setCarries] = useState([]);
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [feedback, setFeedback] = useState("");

  const currentQuestion = questions[currentQuestionIndex];
  const dragNumberRef = useRef(null);

  // Calculate progress (0-100%) based on completed questions
  const totalQuestions = questions.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  // Handle drag start (unchanged)
  const handleDragStart = (number) => {
    setDraggedNumber(number);
  };

  // Handle drop into answer dropzone (unchanged)
  const handleAnswerDrop = (index) => {
    if (draggedNumber !== null) {
      const newAnswers = [...userAnswers];
      newAnswers[index] = draggedNumber;
      setUserAnswers(newAnswers);
      setDraggedNumber(null);
    }
  };

  // Handle drop into carry dropzone (unchanged)
  const handleCarryDrop = (index) => {
    if (draggedNumber !== null) {
      const newCarries = [...carries];
      newCarries[index] = draggedNumber;
      setCarries(newCarries);
      setDraggedNumber(null);
    }
  };

  // Handle checking answer (modified to update progress)
  const checkAnswer = () => {
    const currentDropzones = currentQuestion.dropzones;
    let isCorrect = true;

    currentDropzones.forEach((dropzone, index) => {
      if (userAnswers[index] !== dropzone.correct) {
        isCorrect = false;
      }
    });

    if (isCorrect) {
      setFeedback("صحيح!");
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          nextQuestion();
        } else {
          setFeedback("أحسنت! لقد أكملت جميع الأسئلة");
        }
      }, 1500);
    } else {
      setFeedback("غير صحيح، حاول مرة أخرى");
      questions[currentQuestionIndex].incorrectAttempts += 1;
    }
  };

  // Move to next question (updated to handle progress implicitly)
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswers([]);
      setCarries([]);
      setFeedback("");
    }
  };

  // Reset current question (unchanged)
  const resetQuestion = () => {
    setUserAnswers([]);
    setCarries([]);
    setFeedback("");
  };

  // Get max length and padding (unchanged)
  const firstOperand = currentQuestion.grid[1].value;
  const secondOperand = currentQuestion.operands[0].value;
  const maxLength = Math.max(firstOperand.length, secondOperand.length);
  const needsCarry = currentQuestion.needsRemainder;
  const paddedFirst = firstOperand.padStart(maxLength, " ");
  const paddedSecond = secondOperand.padStart(maxLength, " ");

  // Number buttons (unchanged)
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

  const singleDigitButtons = Array.from({ length: 10 }, (_, i) => i).map(
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
        {/* Progress bar section */}
        <div
          className="relative w-[65%] rounded-lg h-8 mx-4 bg-gray-200 overflow-hidden"
          style={{ backgroundColor: "#E1E8CE" }}
        >
          <div
            className="h-full transition-all duration-500 ease-in-out shadow-inner"
            style={{
              width: `${progress}%`, // Dynamic progress
              backgroundImage:
                "linear-gradient(90deg, #AEC03F 0px, #AEC03F 28px, #b7d10f 28px, #b7d10f 30px)",
              backgroundSize: "30px 100%",
              backgroundPosition: "0 0",
              backgroundRepeat: "repeat-x",
              boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.1)",
              marginLeft: "auto",
            }}
          ></div>
        </div>
        {/* Student info section */}
        <div className="flex w-[35%]">
          <div className="px-8 py-2 border-l border-r border-gray-300 flex items-center justify-center">
            <span className="text-black text-xl font-bold">{studentName}</span>
            <span className="ml-1 text-gray-600 text-md font-bold">
              : اسم الطالب
            </span>
          </div>
          <div className="px-8 py-2 border-r border-gray-300 flex items-center justify-center">
            <span className="text-black text-md font-bold"></span>
          </div>
          <div className="px-8 py-2 text-right">
            <span className="text-black text-md font-bold">
              اختبار فرز عسر الحساب
            </span>
          </div>
        </div>
      </div>
      {/* Exercise */}
      <div className="max-w-8xl">
        <div className="relative flex py-3 sm:mx-auto">
          <div className="flex flex-row w-full">
            {/* Control buttons */}
            <div className="flex flex-col gap-4 justify-start h-fit w-[20%]">
              <button onClick={resetQuestion} className="mt-36">
                <img src={resetBtn} alt="" />
              </button>
            </div>

            {/* Main question area */}
            <div className="relative w-[60%] h-[400px] px-4 py-10 justify-center transform translate-y-20 items-center">
              <div className="mx-auto my-auto">
                <div className="border-4 border-yellow-400 flex justify-center h-72 my-auto rounded-lg p-6">
                  <div className="flex flex-col items-center my-auto">
                    {!currentQuestion.needsRemainder ? (
                      <div className="flex items-center space-x-4 text-5xl">
                        <div className="flex space-x-2">
                          {Array.from({ length: maxLength }, (_, i) => (
                            <div
                              key={`answer-${i}`}
                              className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center text-2xl"
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
                                className="w-12 h-12 border-2 border-none text-green-600 text-3xl border-gray-400 rounded-full flex items-center justify-center"
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
                        <div className="flex mb- -mr-6 space-x-2 rtl:space-x-reverse">
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
                        <div className="w-full border-t-2 border-black mb-4"></div>
                        <div className="flex space-x-2 rtl:space_x-reverse">
                          {Array.from({ length: maxLength }, (_, i) => {
                            const answerIndex = maxLength - 1 - i;
                            const hasDropzone =
                              answerIndex < currentQuestion.dropzones.length;
                            return (
                              <div
                                key={`answer-${i}`}
                                className="w-12 h-12 flex items-center justify-center"
                              >
                                {hasDropzone ? (
                                  <div
                                    className="w-12 h-12 border-2 text-4xl border-gray-400 rounded flex items-center justify-center text-2xl"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => handleAnswerDrop(answerIndex)}
                                  >
                                    {userAnswers[answerIndex] || ""}
                                  </div>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Number selection grid */}
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
                      <div
                        className="w-20 h-14 text-4xl flex items-center justify-center border-2 border-yellow-400 rounded bg-gray-100 cursor-grab"
                        draggable
                        onDragStart={() =>
                          handleDragStart(arabicNumerals[endNum.toString()])
                        }
                      >
                        {arabicNumerals[endNum.toString()]}
                      </div>
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
            className=" w-96 transform -translate-y-20"
            alt=""
          />
        </button>
      </div>
    </>
  );
};

export default ArabicMathQuiz;
