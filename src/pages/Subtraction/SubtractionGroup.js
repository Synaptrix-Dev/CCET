import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import nextBtn from "../../assets/next-question.png";
import resetBtn from "../../assets/eraser.png";
import Logo from "../../assets/Logo.png";
import Questions from "./QuestionData";

const SubtractionGroup = () => {
  const questions = Questions;
  const navigate = useNavigate();
  const timerRef = useRef(null);

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

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [carries, setCarries] = useState([]);
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(120000);
  const [partIncorrect, setPartIncorrect] = useState({
    part1: 0, // q1, q2, q3, q4, q5 (indices 0-4)
    part2: 0, // q6, q7 (indices 5-6)
    part3: 0, // q8 (index 7)
    part4: 0, // q9 (index 8)
  });
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [results, setResults] = useState(Array(questions.length).fill(0));
  const [showModal, setShowModal] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  // Define parts and their allowed incorrect attempts
  const getPartForQuestion = (index) => {
    if (index <= 4) return { part: "part1", maxIncorrect: 2 }; // Part 1: q1-q5
    if (index <= 6) return { part: "part2", maxIncorrect: 2 }; // Part 2: q6-q7
    if (index === 7) return { part: "part3", maxIncorrect: 1 }; // Part 3: q8
    if (index === 8) return { part: "part4", maxIncorrect: 1 }; // Part 4: q9
    return { part: "unknown", maxIncorrect: 0 };
  };

  useEffect(() => {
    setStartTime(new Date());
    console.log("Test Start Time:", new Date().toLocaleString());
  }, []);

  useEffect(() => {
    console.log("useEffect triggered for question:", currentQuestionIndex);
    setTimer(120); // Set to 5 seconds for testing (instead of 1200)
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        console.log("Timer tick:", prev);
        if (prev <= 0) {
          console.log("Timer reached zero");
          clearInterval(intervalId);
          handleTimerTimeout();
          return 5; // Reset for next question
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      console.log("Cleaning up timer for question:", currentQuestionIndex);
      clearInterval(intervalId);
    };
  }, [currentQuestionIndex]);

  const handleDragStart = (number) => setDraggedNumber(number);
  const handleAnswerDrop = (index) => {
    if (draggedNumber !== null) {
      const newAnswers = [...userAnswers];
      const digits = draggedNumber.split("");
      const dropzoneCount = currentQuestion.dropzones.length;

      if (index === dropzoneCount - 1 && digits.length > 1) {
        for (let i = 0; i < digits.length; i++) {
          const targetIndex = index - i;
          if (targetIndex >= 0) {
            newAnswers[targetIndex] = digits[digits.length - 1 - i];
          }
        }
      } else {
        digits.forEach((digit, i) => {
          if (index + i < dropzoneCount) {
            newAnswers[index + i] = digit;
          }
        });
      }

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

    // Calculate and log total marks and Z-scores for all grades
    const totalMarks = newResults.reduce((sum, mark) => sum + mark, 0);
    const zScoreGrade3 = (totalMarks - 10.11) / 4.78;
    const zScoreGrade4 = (totalMarks - 15.68) / 9.98;
    const zScoreGrade5 = (totalMarks - 30.36) / 13.12;

    console.log("Updated Results:", newResults);
    console.log("Total Marks:", totalMarks);
    console.log("Grade 3 Z-Score:", zScoreGrade3.toFixed(2));
    console.log("Grade 4 Z-Score:", zScoreGrade4.toFixed(2));
    console.log("Grade 5 Z-Score:", zScoreGrade5.toFixed(2));

    return isCorrect;
  };

  // Log results by part
  const logResultsByPart = () => {
    const partResults = {
      part1: results.slice(0, 5), // q1-q5
      part2: results.slice(5, 7), // q6-q7
      part3: results.slice(7, 8), // q8
      part4: results.slice(8, 9), // q9
    };

    console.log("Results by Part:");
    Object.keys(partResults).forEach((part) => {
      const partScore = partResults[part].reduce((a, b) => a + b, 0);
      const totalInPart = partResults[part].length;
      console.log(`${part}: ${partScore}/${totalInPart}`);
    });

    const totalScore = results.reduce((a, b) => a + b, 0);
    console.log("Total Score:", totalScore, `/${totalQuestions}`);

    // Calculate and log Z-scores for all grades
    const zScoreGrade3 = (totalScore - 10.11) / 4.78;
    const zScoreGrade4 = (totalScore - 15.68) / 9.98;
    const zScoreGrade5 = (totalScore - 30.36) / 13.12;

    console.log("Grade 3 Z-Score:", zScoreGrade3.toFixed(2));
    console.log("Grade 4 Z-Score:", zScoreGrade4.toFixed(2));
    console.log("Grade 5 Z-Score:", zScoreGrade5.toFixed(2));
  };
  const handleTimerTimeout = () => {
    const newResults = [...results];
    newResults[currentQuestionIndex] = 0;
    setResults(newResults);
    console.log(
      `Question ${currentQuestionIndex + 1} Result: Incorrect (Timer, 0 marks)`
    );

    const { part, maxIncorrect } = getPartForQuestion(currentQuestionIndex);
    const newIncorrectAttempts = (currentQuestion.incorrectAttempts || 0) + 1;
    questions[currentQuestionIndex].incorrectAttempts = newIncorrectAttempts;

    if (newIncorrectAttempts === 1) {
      setPartIncorrect((prev) => {
        const newPartIncorrect = { ...prev, [part]: prev[part] + 1 };
        console.log(`Incorrect Attempts in ${part}:`, newPartIncorrect[part]);

        if (newPartIncorrect[part] >= maxIncorrect) {
          setFeedback(
            "لقد أجبت على عدد كافٍ من الأسئلة بشكل غير صحيح في هذا الجزء، سيتم إعادة توجيهك..."
          );
          setEndTime(new Date());
          console.log("Test End Time (Redirect):", new Date().toLocaleString());
          logResultsByPart();
          setTimeout(() => navigate("/dashboard/testselection"), 1000);
          return newPartIncorrect;
        }

        moveToNextQuestion();
        return newPartIncorrect;
      });
    } else {
      moveToNextQuestion();
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      const currentPart = getPartForQuestion(currentQuestionIndex).part;
      const nextPart = getPartForQuestion(nextIndex).part;

      if (currentPart !== nextPart) {
        setPartIncorrect((prev) => ({
          ...prev,
          [nextPart]: 0,
        }));
        console.log(`Reset incorrect attempts for ${nextPart}`);
      }

      setCurrentQuestionIndex(nextIndex);
      setUserAnswers([]);
      setCarries([]);
      setFeedback("");
      setTimer(120000);
    } else {
      setFeedback("أحسنت! لقد أكملت جميع الأسئلة");
      setEndTime(new Date());
      console.log("Test End Time:", new Date().toLocaleString());
      logResultsByPart();
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/dashboard/testselection");
      }, 2000);
    }
  };

  const nextQuestion = () => {
    clearInterval(timerRef.current);

    if (userAnswers.length > 0) {
      const isCorrect = checkAnswer();
      setFeedback(isCorrect ? "صحيح!" : "غير صحيح");

      if (!isCorrect) {
        const { part, maxIncorrect } = getPartForQuestion(currentQuestionIndex);
        const newIncorrectAttempts =
          (currentQuestion.incorrectAttempts || 0) + 1;
        questions[currentQuestionIndex].incorrectAttempts =
          newIncorrectAttempts;

        if (newIncorrectAttempts === 1) {
          setPartIncorrect((prev) => {
            const newPartIncorrect = { ...prev, [part]: prev[part] + 1 };
            console.log(
              `Incorrect Attempts in ${part}:`,
              newPartIncorrect[part]
            );

            if (newPartIncorrect[part] >= maxIncorrect) {
              setFeedback(
                "لقد أجبت على عدد كافٍ من الأسئلة بشكل غير صحيح في هذا الجزء، سيتم إعادة توجيهك..."
              );
              setEndTime(new Date());
              console.log(
                "Test End Time (Redirect):",
                new Date().toLocaleString()
              );
              logResultsByPart();
              setTimeout(() => navigate("/dashboard/testselection"), 1000);
              return newPartIncorrect;
            }

            setTimeout(() => moveToNextQuestion(), 10);
            return newPartIncorrect;
          });
        } else {
          setTimeout(() => moveToNextQuestion(), 10);
        }
      } else {
        setTimeout(() => moveToNextQuestion(), 10);
      }
    } else {
      const newResults = [...results];
      newResults[currentQuestionIndex] = 0;
      setResults(newResults);
      console.log(
        `Question ${
          currentQuestionIndex + 1
        } Result: Incorrect (Skipped, 0 marks)`
      );

      const { part, maxIncorrect } = getPartForQuestion(currentQuestionIndex);
      const newIncorrectAttempts = (currentQuestion.incorrectAttempts || 0) + 1;
      questions[currentQuestionIndex].incorrectAttempts = newIncorrectAttempts;

      if (newIncorrectAttempts === 1) {
        setPartIncorrect((prev) => {
          const newPartIncorrect = { ...prev, [part]: prev[part] + 1 };
          console.log(`Incorrect Attempts in ${part}:`, newPartIncorrect[part]);

          if (newPartIncorrect[part] >= maxIncorrect) {
            setFeedback(
              "لقد أجبت على عدد كافٍ من الأسئلة بشكل غير صحيح في هذا الجزء، سيتم إعادة توجيهك..."
            );
            setEndTime(new Date());
            console.log(
              "Test End Time (Redirect):",
              new Date().toLocaleString()
            );
            logResultsByPart();
            setTimeout(() => navigate("/dashboard/testselection"), 1000);
            return newPartIncorrect;
          }

          moveToNextQuestion();
          return newPartIncorrect;
        });
      } else {
        moveToNextQuestion();
      }
    }
  };

  const resetQuestion = () => {
    setUserAnswers([]);
    setCarries([]);
    setFeedback("");
  };

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

  const studentName = "مهند كمال داوود";

  return (
    <>
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
              إختبار العمليات الأساسية | الطرح
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
                <div className="border-4 border-yellow-400 bg-[#F3F4F6] flex justify-center h-72 my-auto rounded-lg p-6">
                  <div className="flex flex-col items-center my-auto">
                    {!currentQuestion.needsRemainder ? (
                      <div className="flex items-center space-x-4 text-5xl">
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          {currentQuestion.dropzones.map((dropzone, i) => (
                            <div
                              key={`answer-${i}`}
                              className="w-12 h-12 border-2 text-green-700 bg-white border-gray-400 rounded flex items-center justify-center text-5xl"
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={() => handleAnswerDrop(i)}
                            >
                              {userAnswers[i] || ""}
                            </div>
                          ))}
                        </div>
                        <span>=</span>
                        <span>{paddedFirst}</span>
                        <span className="border-t border-4 border-black w-4 transform -translate-y-1"></span>
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
                              className={`w-12 h-12 flex items-center justify-center text-5xl ${
                                carries[i] ? "relative text-red-600" : ""
                              }`}
                            >
                              {digit === " " ? "" : digit}
                              {carries[i] && (
                                <div
                                  className="absolute w-full h-1 bg-red-600 transform rotate-45"
                                  style={{ top: "50%" }}
                                ></div>
                              )}
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
                          <h1 className="text-4xl border-t-4 border-black w-5 transform translate-x-6 translate-y-5"></h1>
                        </div>
                        <div className="w-[230px] border-t-2 border-black mb-4"></div>
                        <div
                          className={`flex space-x-2 rtl:space-x-reverse ${
                            currentQuestionIndex === 6 ? "ml-[-0px]" : ""
                          }`}
                        >
                          {currentQuestion.dropzones.map((dropzone, i) => (
                            <div
                              key={`answer-${i}`}
                              className="w-12 h-12 border-2 text-green-700 border-gray-400 rounded flex items-center justify-center text-5xl"
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
                    <div key={rowIndex} className="flex flex-row-reverse justify-between">
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

export default SubtractionGroup;
