import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/Logo.png";
import Distance_Instruction01 from "./Audios/Distance_Instruction01.wav";
import Distance_Instruction02 from "./Audios/Distance_Instruction02.wav";
import Distance_Instruction03 from "./Audios/Distance_Instruction03.wav";
import Distance_Instruction04 from "./Audios/Distance_Instruction04.wav";
import Distance_Instruction05 from "./Audios/Distance_Instruction05.wav";
import Distance_Instruction06 from "./Audios/Distance_Instruction06.wav";
import Distance_Instruction07 from "./Audios/Distance_Instruction07.wav";
import Distance_Instruction08 from "./Audios/Distance_Instruction08.wav";
import Distance_Instruction09 from "./Audios/Distance_Instruction09.wav";
import Distance_Instruction10 from "./Audios/Distance_Instruction010.wav";
import Value011 from "./Audios/Value011.wav";
import Value063 from "./Audios/Value063.wav";
import Value021 from "./Audios/Value021.wav";
import Value06 from "./Audios/Value06.wav";
import Value075 from "./Audios/Value075.wav";
import Value088 from "./Audios/Value088.wav";

const NumberGuess = [
  { displayValue: "٥", answerValue: "5", audioValue: Distance_Instruction01 },
  { displayValue: "٤٠", answerValue: "40", audioValue: Distance_Instruction01 },
  { displayValue: "٧٥", answerValue: "75", audioValue: Distance_Instruction01 },
];

const mainQuestions = [
  { displayValue: "١١", answerValue: "11", audioValue: Value011 },
  { displayValue: "٦٣", answerValue: "63", audioValue: Value063 },
  { displayValue: "١٨", answerValue: "18", audioValue: Value021 },
  { displayValue: "٩٧", answerValue: "97", audioValue: Value06 },
  { displayValue: "٢١", answerValue: "21", audioValue: Value075 },
  { displayValue: "٨٨", answerValue: "88", audioValue: Value088 },
];

const audioInstructions = [
  Distance_Instruction01,
  Distance_Instruction02,
  Distance_Instruction03,
  Distance_Instruction04,
  Distance_Instruction05,
  Distance_Instruction06,
  Distance_Instruction07,
  Distance_Instruction08,
  Distance_Instruction09,
  Distance_Instruction10,
];

const NumberGuessComponent = () => {
  const [questions] = useState([...NumberGuess, ...mainQuestions]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlayingInstructions, setIsPlayingInstructions] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [clickValue, setClickValue] = useState(null);
  const [hasShown25Marker, setHasShown25Marker] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (currentQuestion > 0) {
      setProgress((currentQuestion / questions.length) * 100);
    }
  }, [currentQuestion]);

  useEffect(() => {
    isMounted.current = true;
    initializeTest();

    return () => {
      isMounted.current = false;
      if (audioRef.current) {
        console.log("Cleaning up audio on unmount");
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAudio = (audioPath) => {
    return new Promise((resolve) => {
      if (!isMounted.current) {
        console.log("Component unmounted, aborting audio play");
        resolve();
        return;
      }

      if (audioRef.current) {
        console.log("Pausing existing audio");
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(audioPath);
      audioRef.current = audio;
      setIsAudioPlaying(true);

      console.log(`Playing audio: ${audioPath}`);
      audio
        .play()
        .then(() => {
          audio.onended = () => {
            if (isMounted.current) {
              console.log(`Audio ended: ${audioPath}`);
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
      console.log(`Playing instruction ${i + 1}/${audioInstructions.length}`);
      await playAudio(audioInstructions[i]);
      setCurrentAudioIndex(i + 1);
    }

    if (isMounted.current) {
      setIsPlayingInstructions(false);
      await playQuestionAudio();
    }
  };

  const playQuestionAudio = async () => {
    if (!isMounted.current) return;

    if (currentQuestion < questions.length) {
      console.log(`Playing question audio for question ${currentQuestion + 1}`);
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
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const calculateRange = (event) => {
    if (isAudioPlaying) return;

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
    const isCorrect =
      answer >= correctAnswer - 5 && answer <= correctAnswer + 5;

    console.log({
      questionNumber: currentQuestion + 1,
      clickedValue: answer,
      correctAnswer: correctAnswer,
      isCorrect: isCorrect,
    });

    setTimeout(nextQuestion, 1000);
  };

  const initializeTest = () => {
    if (isMounted.current) {
      console.log("Initializing test");
      playInstructionsSequentially();
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
            <span className="text-black text-xl font-bold">{studentName}</span>
            <span className="ml-1 text-gray-600 text-md font-bold">
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
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-8xl text-green-700 -mt-10">
          {questions[currentQuestion]?.displayValue}
        </div>

        <div
          className={`absolute bottom-16 w-[95%] h-1 bg-gray-300 rounded-full flex justify-between items-center cursor-pointer ${
            isAudioPlaying ? "pointer-events-none opacity-50" : ""
          }`}
          onClick={calculateRange}
        >
          <div className="relative">
            <div className="absolute bottom-0 -left-1 w-2 h-6 bg-[#AEC03F] rounded-t-full"></div>
            <span className="absolute top-8 -left-3 text-xl font-bold text-gray-700">
              ١٠٠
            </span>
          </div>
          <div className="relative">
            <div className="absolute bottom-0 -left-1 w-2 h-4 bg-[#AEC03F] rounded-t-full"></div>
            <span
              className={`absolute top-6 -left-2 text-xl font-medium text-gray-700 transition-opacity duration-300 ${
                currentQuestion === 2 ? "opacity-100" : "opacity-0"
              }`}
            >
              ٧٥
            </span>
          </div>
          <div className="relative">
            <div className="absolute bottom-0 -left-1 w-2 h-4 bg-[#AEC03F] rounded-t-full"></div>
            <span
              className={`absolute top-6 -left-2 text-xl font-medium text-gray-700 transition-opacity duration-300 ${
                currentQuestion === 1 ? "opacity-100" : "opacity-0"
              }`}
            >
              ٥٠
            </span>
          </div>
          <div className="relative">
            <div className="absolute bottom-0 -left-1 w-2 h-4 bg-[#AEC03F] rounded-t-full"></div>
            <span
              className={`absolute top-6 -left-2 text-xl font-medium text-gray-700 transition-opacity duration-300 ${
                currentQuestion === 0 && !hasShown25Marker
                  ? "opacity-100"
                  : "opacity-0"
              }`}
              onClick={() => setHasShown25Marker(true)}
            >
              ٢٥
            </span>
          </div>
          <div className="relative">
            <div className="absolute bottom-0 -left-1 w-2 h-6 bg-[#AEC03F] rounded-t-full"></div>
            <span className="absolute top-8 -left-2 text-xl font-medium text-gray-700">
              ٠
            </span>
          </div>
          {clickValue && (
            <div
              className="absolute w-6 h-6 bg-amber-500 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ left: `${100 - (clickValue / 100) * 100}%`, top: "50%" }}
            >
              <span className="text-white font-bold">{clickValue}</span>
            </div>
          )}
        </div>

        {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500 text-center w-full">
          <p className="text-sm">
            {isAudioPlaying
              ? "جاري تشغيل الصوت..."
              : "انقر على المقياس لتحديد إجابتك"}
          </p>
        </div> */}
      </div>

      {currentQuestion >= questions.length && (
        <div className="w-full max-w-4xl bg-gray-50 flex flex-col items-center justify-center h-72 mt-5">
          <h1 className="text-2xl font-bold mb-5">لقد أنهيت جميع الأسئلة!</h1>
          <button
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            onClick={() => console.log("Redirect to Wikipedia")}
          >
            اذهب إلى ويكيبيديا
          </button>
        </div>
      )}
    </div>
  );
};

export default NumberGuessComponent;
