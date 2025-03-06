import React, { useState, useEffect } from "react";
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
  const [isInstructionPlaying, setIsInstructionPlaying] = useState(true);

  // Define the questions based on the image
  const questions = [
    ["3", "5"], // Question 1
    ["9", "4", "7"], // Question 2
    ["2", "0", "6", "8"], // Question 3
    ["8", "5", "7", "2", "9"], // Question 4
    ["4", "8", "6", "3", "5"], // Question 5
    ["3", "6", "1", "7", "0", "4"], // Question 6
    ["6", "5", "7", "2", "3", "1"], // Question 7
    ["7", "5", "0", "8", "6", "4", "2"], // Question 8
    ["1", "3", "9", "7", "6", "8", "2", "5"], // Question 9
    ["2", "4", "5", "6", "7", "8", "9", "0", "1"], // Question 10
  ];

  // Map numbers to their audio files
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

  // Instruction audio sequence
  const instructionAudios = [
    NumberInstruction1,
    NumberInstruction2,
    NumberInstruction3,
    NumberInstruction4,
  ];

  // Play audio function
  const playAudio = (audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.play().catch((error) => console.log("Audio play error:", error));
    audio.onended = () => {
      if (isInstructionPlaying) {
        // If instructions are playing, move to the next instruction
        const nextInstructionIndex = instructionAudios.indexOf(audioSrc) + 1;
        if (nextInstructionIndex < instructionAudios.length) {
          playAudio(instructionAudios[nextInstructionIndex]);
        } else {
          // Instructions finished, start the first question
          setIsInstructionPlaying(false);
          playQuestionDigit();
        }
      }
    };
  };

  // Play the current digit of the current question
  const playQuestionDigit = () => {
    if (currentQuestionIndex >= questions.length) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (currentDigitIndex < currentQuestion.length) {
      const digit =
        currentQuestion[currentQuestion.length - 1 - currentDigitIndex]; // Play in reverse order
      playAudio(numberAudios[digit]);
    }
  };

  // Play instruction audio when the page loads
  useEffect(() => {
    playAudio(instructionAudios[0]); // Start with the first instruction audio
  }, []);

  // Handle number button click
  const displayNumber = (e, number) => {
    if (isInstructionPlaying) return; // Don't allow input during instructions

    setDisplayValue((prev) => prev + number);
    setCurrentDigitIndex((prev) => prev + 1);

    // Play the next digit if available
    if (currentDigitIndex + 1 < questions[currentQuestionIndex].length) {
      playQuestionDigit();
    }
  };

  // Reset the display
  const resetDisplay = () => {
    setDisplayValue("");
    setCurrentDigitIndex(0);
    playQuestionDigit(); // Replay the current question from the start
  };

  // Move to the next question
  const confirmValue = () => {
    if (isInstructionPlaying) return;

    console.log("Confirmed value:", displayValue);
    setDisplayValue(""); // Clear the display
    setCurrentDigitIndex(0); // Reset digit index
    setCurrentQuestionIndex((prev) => prev + 1); // Move to the next question

    // Play the first digit of the next question
    if (currentQuestionIndex + 1 < questions.length) {
      setTimeout(() => playQuestionDigit(), 500); // Small delay to ensure state updates
    }
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
            className="w-[72px] h-[69px] text-5xl text-green-600 border-4 border-[#8EA851] rounded-2xl bg-transparent flex items-center justify-center cursor-pointer hover:bg-green-50 transition-colors"
            disabled={isInstructionPlaying}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="w-full flex justify-center gap-52 bg-[#757575] py-10">
        <button
          onClick={confirmValue}
          className="w-[180px] h-[100px] bg-gray-300 rounded-md flex items-center justify-center bg-transparent"
          disabled={isInstructionPlaying}
        >
          <img src={NextBtn} alt="Pen" />
        </button>
        <button
          onClick={resetDisplay}
          className="w-[180px] h-[100px] rounded-md flex items-center justify-center bg-transparent"
          disabled={isInstructionPlaying}
        >
          <img src={Reset} className="" alt="إعادة تعيين" />
        </button>
      </div>
    </div>
  );
};

export default NumberRemember;
