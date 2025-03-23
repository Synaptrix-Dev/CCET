import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import Distance_Instruction01 from "./Audios/Distance_Instruction01.wav";
import Distance_Instruction02 from "./Audios/Distance_Instruction02.wav";
import Distance_Instruction03 from "./Audios/Distance_Instruction03.wav";
import Distance_Instruction04 from "./Audios/Distance_Instruction04.wav";
import Show_Quarter_25 from "./Audios/Quareter-25.wav";
import Hide_Quarter_25 from "./Audios/Quarter-25-hidden.wav";
import Show_Quarter_50 from "./Audios/Quareter-50.wav";
import Hide_Quarter_50 from "./Audios/Disappaear-50.wav";
import Show_All_Quarter from "./Audios/All-Quarter.wav";
import Hide_All_Quarter from "./Audios/All-Quarter-hidden.wav";
import Value06 from "./Audios/Value06.wav";
import Value011 from "./Audios/Value011.wav";
import Value018 from "./Audios/Value018.wav";
import Value021 from "./Audios/Value021.wav";
import Value063 from "./Audios/Value063.wav";
import Value075 from "./Audios/Value075.wav";
import Value088 from "./Audios/Value088.wav";
import Value097 from "./Audios/Value097.wav";

const mainQuestions = [
  { displayValue: "٦", answerValue: "6", audioValue: "Value06" },
  { displayValue: "١١", answerValue: "11", audioValue: "Value011" },
  { displayValue: "١٨", answerValue: "18", audioValue: "Value018" },
  { displayValue: "٢١", answerValue: "21", audioValue: "Value021" },
  { displayValue: "٦٣", answerValue: "63", audioValue: "Value063" },
  { displayValue: "٧٥", answerValue: "75", audioValue: "Value075" },
  { displayValue: "٨٨", answerValue: "88", audioValue: "Value088" },
  { displayValue: "٩٧", answerValue: "97", audioValue: "Value097" },
];

const audioInstructions = [
  Distance_Instruction01,
  Distance_Instruction02,
  Distance_Instruction03,
  Distance_Instruction04,
];

const NumberGuessComponent = () => {
  const navigate = useNavigate();
  const [questions] = useState(mainQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlayingInstructions, setIsPlayingInstructions] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [clickValue, setClickValue] = useState(null);
  const [visibleQuarters, setVisibleQuarters] = useState({
    show25: false,
    show50: false,
    show75: false,
    showAll: false,
  });
  const [redXPosition, setRedXPosition] = useState(null); // New state for red X position
  const [progress, setProgress] = useState(0);
  const [totalDifference, setTotalDifference] = useState(0);
  const audioRef = useRef(null);
  const isMounted = useRef(false);

  const quarterSequence = [
    {
      audio: Show_Quarter_25,
      action: () => {
        setVisibleQuarters({
          show25: true,
          show50: false,
          show75: false,
          showAll: false,
        });
        setRedXPosition(25); // Show red X at 25
      },
    },
    {
      audio: Hide_Quarter_25,
      action: () => {
        setVisibleQuarters({
          show25: false,
          show50: false,
          show75: false,
          showAll: false,
        });
        setRedXPosition(null); // Hide red X
      },
    },
    {
      audio: Show_Quarter_50,
      action: () => {
        setVisibleQuarters({
          show25: false,
          show50: true,
          show75: false,
          showAll: false,
        });
        setRedXPosition(50); // Show red X at 50
      },
    },
    {
      audio: Hide_Quarter_50,
      action: () => {
        setVisibleQuarters({
          show25: false,
          show50: false,
          show75: false,
          showAll: false,
        });
        setRedXPosition(null); // Hide red X
      },
    },
    {
      audio: Show_All_Quarter,
      action: () => {
        setVisibleQuarters({
          show25: true,
          show50: true,
          show75: true,
          showAll: true,
        });
        setRedXPosition(75); // Show red X at 75 (or could cycle through all quarters)
      },
    },
    {
      audio: Hide_All_Quarter,
      action: () => {
        setVisibleQuarters({
          show25: false,
          show50: false,
          show75: false,
          showAll: false,
        });
        setRedXPosition(null); // Hide red X
      },
    },
  ];

  useEffect(() => {
    if (currentQuestion > 0 && !isPlayingInstructions) {
      setProgress((currentQuestion / questions.length) * 100);
    }
  }, [currentQuestion, isPlayingInstructions]);

  useEffect(() => {
    isMounted.current = true;
    initializeTest();

    return () => {
      isMounted.current = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAudio = (audioPath) => {
    return new Promise((resolve) => {
      if (!isMounted.current) {
        resolve();
        return;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(audioPath);
      audioRef.current = audio;
      setIsAudioPlaying(true);

      audio
        .play()
        .then(() => {
          audio.onended = () => {
            if (isMounted.current) {
              setIsAudioPlaying(false);
            }
            resolve();
          };
        })
        .catch((error) => {
          console.error(`Audio play failed for ${audioPath}:`, error);
          if (isMounted.current) {
            setIsAudioPlaying(false);
          }
          resolve();
        });
    });
  };

  const playInstructionsSequentially = async () => {
    if (!isMounted.current) return;

    for (let i = 0; i < audioInstructions.length && isMounted.current; i++) {
      if (i === 1) setRedXPosition(0); // Show red X at 0 for 2nd instruction
      else if (i === 3) setRedXPosition(100); // Show red X at 100 for 4th instruction
      else setRedXPosition(null); // Hide red X for other instructions

      await playAudio(audioInstructions[i]);
      setCurrentAudioIndex(i + 1);
    }
    setRedXPosition(null); // Clear red X after instructions
  };

  const playQuarterSequence = async () => {
    for (const step of quarterSequence) {
      if (!isMounted.current) return;
      await playAudio(step.audio);
      if (isMounted.current) {
        step.action();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  };

  const playQuestionAudio = async () => {
    if (!isMounted.current) return;

    if (currentQuestion < questions.length) {
      await playAudio(questions[currentQuestion].audioValue);
    }
  };

  const nextQuestion = () => {
    if (!isMounted.current) return;

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setClickValue(null);
      playQuestionAudio();
    } else {
      const grade3Z = (110.99 - totalDifference) / 83.15;
      const grade4Z = (92.01 - totalDifference) / 68.75;
      const grade5Z = (72.65 - totalDifference) / 71.58;

      console.log({
        totalDifference: totalDifference,
        grade3LineEstimationError: grade3Z,
        grade4LineEstimationError: grade4Z,
        grade5LineEstimationError: grade5Z,
      });

      navigate("/testselection/");
    }
  };

  const calculateRange = (event) => {
    if (isAudioPlaying || isPlayingInstructions) return;

    const rangeLine = event.currentTarget;
    const rect = rangeLine.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    const rangeValue = Math.round(100 - percentage);
    setClickValue(rangeValue);

    setTimeout(() => setClickValue(null), 1000);
    handleAnswer(rangeValue);
  };

  const handleAnswer = (answer) => {
    const correctAnswer = Number(questions[currentQuestion].answerValue);
    const difference = Math.abs(answer - correctAnswer);
    const isCorrect = difference <= 5;

    setTotalDifference((prev) => prev + difference);

    console.log({
      questionNumber: currentQuestion + 1,
      clickedValue: answer,
      correctAnswer: correctAnswer,
      difference: difference,
      isCorrect: isCorrect,
    });

    setTimeout(nextQuestion, 1000);
  };

  const initializeTest = async () => {
    if (!isMounted.current) return;

    await playInstructionsSequentially();
    await playQuarterSequence();

    if (isMounted.current) {
      setIsPlayingInstructions(false);
      await playQuestionAudio();
    }
  };

  const studentName = "مهند كمال داوود";

  return (
    <div className="flex flex-col items-center">
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
              إختبار تقدير المسافة
            </span>
          </div>
          <div className="px-1 py-2 text-right">
            <span className="text-black text-md font-bold">
              اختبار فرز عسر الحساب
            </span>
          </div>
        </div>
      </div>

      <div className="w-4/5 max-w-5xl mt-24 mx-auto bg-[#F3F4F6] rounded-xl shadow-md p-8 relative h-64 overflow-hidden">
        {!isPlayingInstructions && (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-8xl text-green-700 -mt-10">
            {questions[currentQuestion]?.displayValue}
          </div>
        )}

        <div
          className={`absolute bottom-16 w-[95%] h-1 bg-gray-300 -mt-5 rounded-full flex justify-between items-center cursor-pointer ${
            isAudioPlaying ? "pointer-events-none opacity-50" : ""
          }`}
          onClick={calculateRange}
        >
          <div className="relative">
            <div className="absolute bottom-0 -left-1 w-2 h-6 bg-[#AEC03F] rounded-t-full"></div>
            <span className="absolute top-0 -left-3 text-[30px] font-bold text-gray-700">
              ١٠٠
            </span>
          </div>

          <div className="relative">
            {(visibleQuarters.show75 || visibleQuarters.showAll) && (
              <div className="absolute bottom-0 -left-1 w-2 h-4 bg-[#AEC03F] rounded-t-full"></div>
            )}
            <span
              className={`absolute top-0 -left-2 text-[30px] font-bold text-gray-700 transition-opacity duration-300 ${
                visibleQuarters.show75 || visibleQuarters.showAll
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              ٧٥
            </span>
          </div>

          <div className="relative">
            {(visibleQuarters.show50 || visibleQuarters.showAll) && (
              <div className="absolute bottom-0 -left-1 w-2 h-4 bg-[#AEC03F] rounded-t-full"></div>
            )}
            <span
              className={`absolute top-0 -left-2 text-[30px] font-bold text-gray-700 transition-opacity duration-300 ${
                visibleQuarters.show50 || visibleQuarters.showAll
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              ٥٠
            </span>
          </div>

          <div className="relative">
            {(visibleQuarters.show25 || visibleQuarters.showAll) && (
              <div className="absolute bottom-0 -left-1 w-2 h-4 bg-[#AEC03F] rounded-t-full"></div>
            )}
            <span
              className={`absolute top-0 -left-2 text-[30px] font-bold text-gray-700 transition-opacity duration-300 ${
                visibleQuarters.show25 || visibleQuarters.showAll
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              ٢٥
            </span>
          </div>

          <div className="relative">
            <div className="absolute bottom-0 -left-1 w-2 h-6 bg-[#AEC03F] rounded-t-full"></div>
            <span className="absolute top-0 font-bold -left-2 text-[30px] text-gray-700">
              ٠
            </span>
          </div>

          {clickValue && !isPlayingInstructions && (
            <div
              className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ left: `${100 - (clickValue / 100) * 100}%`, top: "50%" }}
            >
              <span className="text-red-700 font-bold">X</span>
            </div>
          )}

          {redXPosition !== null && isPlayingInstructions && (
            <div
              className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ left: `${100 - (redXPosition / 100) * 100}%`, top: "50%" }}
            >
              <span className="text-red-700 font-bold">X</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberGuessComponent;