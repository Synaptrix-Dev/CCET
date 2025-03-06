import React, { useState, useEffect, useRef } from "react";
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

const NumberRemember = ({ Logo, progress, studentName }) => {
  const [displayValue, setDisplayValue] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentDigitIndex, setCurrentDigitIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isQuestionPlaying, setIsQuestionPlaying] = useState(false);
  const [isResetDisabled, setIsResetDisabled] = useState(false);
  const [sequenceStarted, setSequenceStarted] = useState(false); // New state to track if sequence has started
  const audioRef = useRef(null);

  const questions = [
    ["5", "3"],
    ["7", "4", "9"],
    ["8", "6", "0", "2"],
    ["9", "2", "7", "5", "8"],
    ["5", "3", "6", "8", "4"],
    ["4", "0", "7", "1", "6", "3"],
    ["1", "3", "2", "7", "5", "6"],
    ["2", "4", "6", "8", "0", "5", "7"],
    ["5", "2", "8", "6", "7", "9", "3", "1"],
    ["1", "0", "9", "8", "7", "6", "5", "4", "2"],
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

  const playAudio = (audioSrc, onEnd) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    setIsAudioPlaying(true);

    console.log(`Playing audio: ${audioSrc.split("/").pop()}`);

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
        // Start question sequence after instructions
        setSequenceStarted(true); // Mark that initial sequence has started
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
        setIsQuestionPlaying(false); // Allow user input after sequence
      }
    };

    playNextDigit();
  };

  // Only play instructions when component mounts
  useEffect(() => {
    playInstructions();
  }, []);

  // When currentQuestionIndex changes, play the next sequence
  // but only after the initial sequence has started
  useEffect(() => {
    if (sequenceStarted && currentQuestionIndex > 0) {
      playQuestionSequence();
    }
  }, [currentQuestionIndex]);

  const displayNumber = (e, number) => {
    if (isAudioPlaying || isQuestionPlaying) return; // Disable input during playback

    const digitValue =
      number === "٠" ? "0" : String.fromCharCode(number.charCodeAt(0) - 1632);
    setDisplayValue((prev) => prev + number);
  };

  const resetDisplay = () => {
    if (isAudioPlaying || isQuestionPlaying || isResetDisabled) return;
    setDisplayValue("");
    setCurrentDigitIndex(0);
    playQuestionSequence(); // Replay the current sequence
  };

  const confirmValue = () => {
    if (isAudioPlaying || isQuestionPlaying) return;

    console.log("Confirmed value:", displayValue);
    setDisplayValue("");
    setCurrentDigitIndex(0);
    setIsResetDisabled(true); // Disable reset button

    // Increment to next question index
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    // Re-enable reset after a short delay
    setTimeout(() => {
      setIsResetDisabled(false);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Header Section */}
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
            <span className="text-black text-xl font-bold">{studentName}</span>
            <span className="ml-1 text-gray-600 text-md font-bold">
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

      {/* Display Container */}
      <div className="w-[1200px] h-[180px] bg-[#FDFCF7] rounded-[11px] border-4 border-[#8EA851] flex flex-col items-center justify-between p-5 shadow-lg mt-[60px] mb-10">
        <div
          id="display"
          className="w-full h-[350px] bg-[#FDFCF7] tracking-[20px] text-green-700 rounded-[20px] flex items-center justify-center text-7xl overflow-x-auto text-black"
        >
          {displayValue}
        </div>
      </div>

      {/* Number Buttons Grid */}
      <div className="w-3/5 flex flex-wrap justify-center flex-row-reverse gap-3 mb-24">
        {["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"].map((num) => (
          <button
            key={num}
            onClick={(e) => displayNumber(e, num)}
            className="w-[72px] h-[69px] text-5xl text-green-600 border-4 border-[#8EA851] rounded-2xl bg-transparent flex items-center justify-center cursor-pointer hover:bg-green-50 transition-colors disabled:opacity-50"
            disabled={isAudioPlaying || isQuestionPlaying} // Disable during playback
          >
            {num}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
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
