import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../../assets/Logo.png";
import Reset from "../../assets/num_reset.png";
import NextBtn from "../../assets/num_confirm.png";

// Instruction audios
import NumberInstruction1 from "./Audios/NUM_Remember_Intruction_1.wav";
import NumberInstruction2 from "./Audios/NUM_Remember_Intruction_2.wav";
import NumberInstruction3 from "./Audios/NUM_Remember_Intruction_3.wav";
import NumberInstruction4 from "./Audios/NUM_Remember_Intruction_4.wav";

// Question Audio
import Number_0 from "./Audios/N_0.wav";
import Number_1 from "./Audios/N_1.wav";
import Number_2 from "./Audios/N_2.wav";
import Number_3 from "./Audios/N_3.wav";
import Number_4 from "./Audios/N_4.wav";
import Number_5 from "./Audios/N_5.wav";
import Number_6 from "./Audios/N_6.wav";
import Number_7 from "./Audios/N_7.wav";
import Number_8 from "./Audios/N_8.wav";
import Number_9 from "./Audios/N_9.wav";

const NumberRemember = ({ Logo }) => {
  const [displayValue, setDisplayValue] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentDigitIndex, setCurrentDigitIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isQuestionPlaying, setIsQuestionPlaying] = useState(false);
  const [isResetDisabled, setIsResetDisabled] = useState(false);
  const [sequenceStarted, setSequenceStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const [totalScore, setTotalScore] = useState(0); // Changed to totalScore
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const studentName = "مهند داوود كمال";
  let grade = 3;

  const questions = [
    ["5", "3"],
    ["7", "4", "9"],
    ["8", "6", "0", "2"],
    ["9", "2", "7", "5", "8"],
    ["5", "3", "6", "8", "4"],
    ["4", "0", "7", "1", "6", "3"],
    ["1", "3", "2", "7", "5", "6"],
    ["2", "4", "6", "8", "0", "5", "7"],
    ["8", "6", "7", "4", "9", "3", "1"],
    ["5", "2", "8", "6", "7", "9", "3", "1"],
  ];

  const numberAudios = {
    0: Number_0,
    1: Number_1,
    2: Number_2,
    3: Number_3,
    4: Number_4,
    5: Number_5,
    6: Number_6,
    7: Number_7,
    8: Number_8,
    9: Number_9,
  };

  const instructionAudios = [
    NumberInstruction1,
    NumberInstruction2,
    NumberInstruction3,
    NumberInstruction4,
  ];

  const progress = ((currentQuestionIndex / questions.length) * 100).toFixed(2);

  const playAudio = (audioSrc, onEnd) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    setIsAudioPlaying(true);

    audio.play().catch((error) => {
      console.log("Audio play error:", error);
      setIsAudioPlaying(false);
    });

    audio.onended = () => {
      setIsAudioPlaying(false);
      if (onEnd) onEnd();
    };
  };

  const playInstructions = () => {
    let index = 0;
    const playNext = () => {
      if (index < instructionAudios.length) {
        playAudio(instructionAudios[index], () => {
          index++;
          playNext();
        });
      } else {
        setSequenceStarted(true);
        playQuestionSequence();
      }
    };
    playNext();
  };

  const playQuestionSequence = () => {
    if (currentQuestionIndex >= questions.length) return;

    setIsQuestionPlaying(true);
    const currentQuestion = questions[currentQuestionIndex];
    let digitIndex = 0;

    const playNextDigit = () => {
      if (digitIndex < currentQuestion.length) {
        const digit = currentQuestion[digitIndex];
        playAudio(numberAudios[digit], () => {
          digitIndex++;
          setCurrentDigitIndex(digitIndex);
          playNextDigit();
        });
      } else {
        setIsQuestionPlaying(false);
      }
    };

    playNextDigit();
  };

  useEffect(() => {
    if (!sequenceStarted || isAudioPlaying || isQuestionPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sequenceStarted, isAudioPlaying, isQuestionPlaying]);

  useEffect(() => {
    playInstructions();
  }, []);

  useEffect(() => {
    if (sequenceStarted && currentQuestionIndex > 0) {
      playQuestionSequence();
    }
  }, [currentQuestionIndex]);

  const displayNumber = (e, number) => {
    if (isAudioPlaying || isQuestionPlaying) return;

    // Convert Arabic numeral to English for internal processing
    const digitValue =
      number === "٠"
        ? "0"
        : number === "١"
        ? "1"
        : number === "٢"
        ? "2"
        : number === "٣"
        ? "3"
        : number === "٤"
        ? "4"
        : number === "٥"
        ? "5"
        : number === "٦"
        ? "6"
        : number === "٧"
        ? "7"
        : number === "٨"
        ? "8"
        : number === "٩"
        ? "9"
        : number;

    setDisplayValue((prev) => prev + digitValue);
  };

  const resetDisplay = () => {
    if (isAudioPlaying || isQuestionPlaying || isResetDisabled) return;
    setDisplayValue((prev) => prev.slice(0, -1));
  };

  // Updated scoring function to check presence of digits rather than sequence
  const checkAnswer = (input, correct) => {
    const inputArray = input.split("");
    const correctArray = correct;

    let score = 0;
    inputArray.forEach((digit) => {
      if (correctArray.includes(digit)) {
        score += 1;
      }
    });

    return Math.min(score, correctArray.length); // Cap at correct answer length
  };

  const calculateZScore = (X) => {
    let Z;
    switch (grade) {
      case 3:
        Z = (X - 6.52) / 4.56;
        break;
      case 4:
        Z = (X - 9.02) / 6.62;
        break;
      case 5:
        Z = (X - 10.94) / 5.88;
        break;
      default:
        throw new Error("Invalid grade. Grade must be 3, 4, or 5.");
    }
    return Z.toFixed(2);
  };

  const handleTimeout = () => {
    setConsecutiveErrors((prev) => {
      const newErrors = prev + 1;
      if (newErrors >= 2) {
        const Z = calculateZScore(totalScore);
        console.log(
          `Test ended due to timeout. Total score: ${totalScore},Grade:${grade}, Z Score: ${Z}`
        );
        navigate("/dashboard/testselection");
        return 0;
      }
      return newErrors;
    });
    moveToNextQuestion();
  };

  const confirmValue = () => {
    if (isAudioPlaying || isQuestionPlaying) return;

    const score = checkAnswer(displayValue, questions[currentQuestionIndex]);
    setTotalScore((prev) => prev + score);

    const isQuestionWrong = score === 0;

    setConsecutiveErrors((prev) => (isQuestionWrong ? prev + 1 : 0));

    if (consecutiveErrors + (isQuestionWrong ? 1 : 0) >= 2) {
      const Z = calculateZScore(totalScore);
      console.log(
        `Test ended due to errors. Total score: ${totalScore}, Z Score: ${Z}`
      );
      navigate("/dashboard/testselection");
      return;
    }

    console.log(`Question ${currentQuestionIndex + 1}: Score: ${score}`);
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    setDisplayValue("");
    setCurrentDigitIndex(0);
    setIsResetDisabled(true);
    setTimeLeft(120);

    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= questions.length) {
        const Z = calculateZScore(totalScore);
        console.log(
          `Test completed. Total score: ${totalScore}, Z Score: ${Z}`
        );
        navigate("/dashboard/testselection");
        return prevIndex;
      }
      return nextIndex;
    });

    setTimeout(() => {
      setIsResetDisabled(false);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-gray-100 h-10 flex mt-10 items-center justify-between">
        <img src={LogoImg} alt="Logo" className="h-36 w-36" />
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
              إختبار تذكر الأرقام{" "}
            </span>
          </div>
          <div className="px-1 py-2 text-right">
            <span className="text-black text-md font-bold">
              اختبار فرز عسر الحساب
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xl font-bold">
        الوقت المتبقي: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </div>

      <div className="w-[1200px] h-[180px] bg-[#FDFCF7] rounded-[11px] border-4 border-[#8EA851] flex flex-col items-center justify-between p-5 shadow-lg mt-[60px] mb-10">
        <div
          id="display"
          className="w-full h-[350px] bg-[#FDFCF7] tracking-[20px] text-green-700 rounded-[20px] flex items-center justify-center text-7xl overflow-x-auto text-black"
          style={{ fontFamily: "Arial, Tahoma, sans-serif" }}
        >
          {displayValue
            .split("")
            .map((digit) => {
              return String.fromCharCode(parseInt(digit) + 1632);
            })
            .join(" ")}
        </div>
      </div>

      <div className="w-3/5 flex flex-wrap justify-center flex-row-reverse gap-3 mb-24">
        {["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"].map((num) => (
          <button
            key={num}
            onClick={(e) => displayNumber(e, num)}
            className="w-[72px] h-[69px] text-5xl text-green-600 border-4 border-[#8EA851] rounded-2xl bg-transparent flex items-center justify-center cursor-pointer hover:bg-green-50 transition-colors disabled:opacity-50"
            disabled={isAudioPlaying || isQuestionPlaying}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="w-full flex justify-center gap-52 bg-[#757575] py-10">
        <button
          onClick={confirmValue}
          className="w-[180px] h-[100px] bg-gray-300 rounded-md flex items-center justify-center bg-transparent disabled:opacity-50"
          disabled={isAudioPlaying || isQuestionPlaying}
        >
          <img src={NextBtn} alt="Next" />
        </button>
        <button
          onClick={resetDisplay}
          className="w-[180px] h-[100px] rounded-md flex items-center justify-center bg-transparent disabled:opacity-50"
          disabled={isAudioPlaying || isQuestionPlaying || isResetDisabled}
        >
          <img src={Reset} alt="Reset" />
        </button>
      </div>
    </div>
  );
};

export default NumberRemember;
