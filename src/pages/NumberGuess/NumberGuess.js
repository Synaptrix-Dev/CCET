import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
const NumberGuess = [
  { displayValue: "٥", answerValue: "5", audioValue: "#APP_FILES#Trial_5.wav" },
  {
    displayValue: "٤٠",
    answerValue: "40",
    audioValue: "#APP_FILES#Trial_40.wav",
  },
  {
    displayValue: "٧٥",
    answerValue: "75",
    audioValue: "#APP_FILES#Trial_75.wav",
  },
];

const mainQuestions = [
  {
    displayValue: "١١",
    answerValue: "11",
    audioValue: "#APP_FILES#Value011.wav",
  },
  {
    displayValue: "٦٣",
    answerValue: "63",
    audioValue: "#APP_FILES#Value063.wav",
  },
  {
    displayValue: "١٨",
    answerValue: "18",
    audioValue: "#APP_FILES#Value021.wav",
  },
  {
    displayValue: "٩٧",
    answerValue: "97",
    audioValue: "#APP_FILES#Value06.wav",
  },
  {
    displayValue: "٢١",
    answerValue: "21",
    audioValue: "#APP_FILES#Value075.wav",
  },
  {
    displayValue: "٨٨",
    answerValue: "88",
    audioValue: "#APP_FILES#Value088.wav",
  },
];

const audioInstructions = [
  "Distance_Instruction01.wav",
  "Distance_Instruction02.wav",
  "Distance_Instruction03.wav",
  "Distance_Instruction04.wav",
  "Distance_Instruction05.wav",
  "Distance_Instruction06.wav",
  "Distance_Instruction07.wav",
  "Distance_Instruction08.wav",
  "Distance_Instruction09.wav",
  "Distance_Instruction10.wav",
];

const NumberGuessComponent = () => {
  const [questions] = useState([...NumberGuess, ...mainQuestions]); // Changed trialQuestions to NumberGuess
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlayingInstructions, setIsPlayingInstructions] = useState(true);
  const [clickValue, setClickValue] = useState(null);
  const [hasShown25Marker, setHasShown25Marker] = useState(false);
  const [progress, setProgress] = useState(0);
  // Calculate progress percentage
  useEffect(() => {
    if (currentQuestion > 0) {
      setProgress((currentQuestion / questions.length) * 100);
    }
  }, [currentQuestion]);
  useEffect(() => {
    initializeTest();
  }, []);

  const playAudio = (audioPath) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioPath);
      audio.muted = true;
      audio
        .play()
        .then(() => {
          audio.muted = false;
          audio.onended = resolve;
        })
        .catch(reject);
    });
  };

  const playNextInstruction = async () => {
    if (currentAudioIndex < audioInstructions.length) {
      try {
        await playAudio(`#APP_FILES#${audioInstructions[currentAudioIndex]}`);
        setCurrentAudioIndex(currentAudioIndex + 1);
        playNextInstruction();
      } catch (error) {
        setCurrentAudioIndex(currentAudioIndex + 1);
        playNextInstruction();
      }
    } else {
      setIsPlayingInstructions(false);
      playQuestionAudio();
    }
  };

  const playQuestionAudio = async () => {
    if (currentQuestion < questions.length) {
      await playAudio(questions[currentQuestion].audioValue);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion + 1 < questions.length) {
      playQuestionAudio();
    }
  };

  const calculateRange = (event) => {
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
    console.log(
      `Question ${
        currentQuestion + 1
      }: Answer: ${answer}, Correct: ${isCorrect}`
    );
    setTimeout(nextQuestion, 1000);
  };

  const initializeTest = () => {
    playNextInstruction();
  };
  const studentName = "مهند كمال داوود"; // Define student name here or pass as prop
  return (
    <div className=" flex flex-col items-center p-4">
      {/* New Header */}
      <div className="w-full bg-gray-100 h-10 flex mt-10 items-center">
        <img src={Logo} alt="Logo" className="h-36 w-36" />
        <div
          className="relative w-[60%] rounded-lg h-8 mx-4 bg-gray-200 overflow-hidden"
          style={{ backgroundColor: "#E1E8CE" }}
        >
          <div
            className="h-full transition-all duration-500 ease-in-out shadow-inner"
            style={{
              width: `${progress}%`,
              position: "absolute",
              right: 0,
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
              استبيان في التحصيل
            </span>
          </div>
          <div className="px-1 py-2 text-right">
            <span className="text-black text-md font-bold">
              اختبار فرز عسر الحساب
            </span>
          </div>
        </div>
      </div>

      {/* Range Container */}
      <div className="w-4/5 max-w-5xl mt-24 mx-auto bg-white rounded-xl shadow-md border-l-4 border-amber-400  p-8 relative h-64 overflow-hidden">
        {/* Display value */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-6xl text-gray-800 font-bold">
          {questions[currentQuestion]?.displayValue}
        </div>

        {/* Range line with markers */}
        <div
          className="absolute bottom-16 w-full h-1 bg-gray-300 rounded-full flex justify-between items-center cursor-pointer"
          onClick={calculateRange}
        >
          {/* 100 marker */}
          <div className="relative">
            <div className="absolute bottom-0 -left-1 w-2 h-6 bg-[#AEC03F] rounded-t-full"></div>
            <span className="absolute top-8 -left-3 text-xl font-medium text-gray-700">
              ١٠٠
            </span>
          </div>

          {/* 75 marker */}
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

          {/* 50 marker */}
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

          {/* 25 marker */}
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

          {/* 0 marker */}
          <div className="relative">
            <div className="absolute bottom-0 -left-1 w-2 h-6 bg-[#AEC03F] rounded-t-full"></div>
            <span className="absolute top-8 -left-2 text-xl font-medium text-gray-700">
              ٠
            </span>
          </div>

          {/* User selection marker */}
          {clickValue && (
            <div
              className="absolute w-6 h-6 bg-amber-500 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{
                left: `${(clickValue / 100) * 100}%`,
                top: "50%",
              }}
            >
              <span className="text-white font-bold">{clickValue}</span>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500 text-center w-full">
          <p className="text-sm">انقر على المقياس لتحديد إجابتك</p>
        </div>
      </div>

      {/* End Screen */}
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
