import React, { useState, useRef, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import Listen from "../../assets/listen_btn.png";
import NotSure from "../../assets/unsureBtn.png";
import AgreeBtn from "../../assets/agree.png";
import DisagreeBtn from "../../assets/disagreepng.png";
// /////////////////////////////////////////////////////Insturction Audios
import Anxiety_Intruction_1 from "./Audios/Anxiety_Intruction_1.wav";
import Anxiety_Intruction_2 from "./Audios/Anxiety_Intruction_2.wav";
import Anxiety_Intruction_3 from "./Audios/Anxiety_Intruction_3.wav";
import Anxiety_Intruction_4 from "./Audios/Anxiety_Intruction_4.wav";
import Anxiety_Intruction_5 from "./Audios/Anxiety_Intruction_5.wav";
// /////////////////////////////////////////////////////Question Audios
import Anxiety_Q01 from "./Audios/Anxiety_Q01.wav";
import Anxiety_Q02 from "./Audios/Anxiety_Q02.wav";
import Anxiety_Q03 from "./Audios/Anxiety_Q03.wav";
import Anxiety_Q04 from "./Audios/Anxiety_Q04.wav";
import Anxiety_Q05 from "./Audios/Anxiety_Q05.wav";
import Anxiety_Q06 from "./Audios/Anxiety_Q06.wav";
import Anxiety_Q07 from "./Audios/Anxiety_Q07.wav";
import Anxiety_Q08 from "./Audios/Anxiety_Q08.wav";
import Anxiety_Q09 from "./Audios/Anxiety_Q09.wav";
import Anxiety_Q010 from "./Audios/Anxiety_Q010.wav";
import Anxiety_Q011 from "./Audios/Anxiety_Q011.wav";
import Anxiety_Q012 from "./Audios/Anxiety_Q012.wav";
import Anxiety_Q013 from "./Audios/Anxiety_Q013.wav";
import Anxiety_Q014 from "./Audios/Anxiety_Q014.wav";
import Anxiety_Q015 from "./Audios/Anxiety_Q015.wav";
import Anxiety_Q016 from "./Audios/Anxiety_Q016.wav";
import Anxiety_Q017 from "./Audios/Anxiety_Q017.wav";
import Anxiety_Q018 from "./Audios/Anxiety_Q018.wav";
import Anxiety_Q019 from "./Audios/Anxiety_Q019.wav";
import Anxiety_Q020 from "./Audios/Anxiety_Q020.wav";
import Anxiety_Q021 from "./Audios/Anxiety_Q021.wav";
import Anxiety_Q022 from "./Audios/Anxiety_Q022.wav";

const AnxietyTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const instructionAudios = [
    Anxiety_Intruction_1,
    Anxiety_Intruction_2,
    Anxiety_Intruction_3,
    Anxiety_Intruction_4,
    Anxiety_Intruction_5,
  ];

  const questionAudios = [
    Anxiety_Q01,
    Anxiety_Q02,
    Anxiety_Q03,
    Anxiety_Q04,
    Anxiety_Q05,
    Anxiety_Q06,
    Anxiety_Q07,
    Anxiety_Q08,
    Anxiety_Q09,
    Anxiety_Q010,
    Anxiety_Q011,
    Anxiety_Q012,
    Anxiety_Q013,
    Anxiety_Q014,
    Anxiety_Q015,
    Anxiety_Q016,
    Anxiety_Q017,
    Anxiety_Q018,
    Anxiety_Q019,
    Anxiety_Q020,
    Anxiety_Q021,
    Anxiety_Q022,
  ];

  const questions = [
    {
      question:
        "أشعر بالخوف في أثناء امتحان الرياضيات مما يجعلني لا أفهم الأسئلة، ولا أجيب عنها جيداً.",
      correctAnswer: "No",
    },
    {
      question:
        "عندما أعلم بموعد اختبار الرياضيات، أشعر بالخوف طوال فترة الاستعداد له.",
      correctAnswer: "No",
    },
    {
      question: "الرياضيات مادة لا أحبها، بسبب فشلي فيها.",
      correctAnswer: "No",
    },
    {
      question: "أشعر بالخوف كلما اقتربت حصة الرياضيات.",
      correctAnswer: "No",
    },
    {
      question:
        "حينما أجلس لأداء امتحان الرياضيات أرتعش حتى قبل قراءة ورقة الأسئلة.",
      correctAnswer: "No",
    },
    {
      question:
        "بعد الانتهاء من امتحان الرياضيات اكتشف أنني كنت أعرف إجابات لأسئلة لم أحلها في أثناء الامتحان.",
      correctAnswer: "No",
    },
    {
      question:
        "أشعر دائما أنني لا أفهم ما يقوله لنا معلم الرياضيات مثل زملائي.",
      correctAnswer: "No",
    },
    {
      question:
        "أخجل أن أسأل معلم الرياضيات لأنني أظن أنني لن أفهم مهما أعاد الشرح.",
      correctAnswer: "No",
    },
    {
      question: "أرتبك إذا طلب مني معلم الرياضيات الإجابة شفوياً أمام زملائي.",
      correctAnswer: "No",
    },
    {
      question:
        "مع بدء امتحان الرياضيات أشعر أنني قد نسيت كل ما تعلمته، فأبدأ بالإجابة متأخراً.",
      correctAnswer: "No",
    },
    {
      question:
        "الاستعداد لامتحان الرياضيات يصيبني بالتعب، مما يجعلني غير مهتم بنتيجة الاختبار.",
      correctAnswer: "No",
    },
    {
      question:
        "إذا طلب إلي عمل يحتاج إلى الحساب، أعطيه لغيري أو أعتذر عن القيام به.",
      correctAnswer: "No",
    },
    {
      question:
        "أدرس الرياضيات حتى أنجح فيها فقط، مع علمي بأنني لن أستخدمها في حياتي.",
      correctAnswer: "No",
    },
    {
      question:
        "إحساسي بأن مستواي في الرياضيات أقل من مستوى زملائي، يشعرني بالفشل في تحقيق النجاح مثلهم.",
      correctAnswer: "No",
    },
    {
      question: "خوفي المستمر من الفشل في الرياضيات، هو سبب ضعفي وكرهي لها.",
      correctAnswer: "No",
    },
    {
      question:
        "لا أستعد لامتحان الرياضيات إلا في اليوم السابق له رغم معرفتي بالموعد قبل أيام.",
      correctAnswer: "No",
    },
    {
      question:
        "أتهرب من حصص الرياضيات، بالاشتراك في نشاط يسمح لي بالخروج من الحصة.",
      correctAnswer: "No",
    },
    {
      question: "رغم تنبيه معلم الرياضيات لي أنشغل عنه بأمور أخرى.",
      correctAnswer: "No",
    },
    {
      question:
        "لا أرغب في الأكل قبل امتحان الرياضيات أو بعده، وهذا لا يحدث في المواد الأخرى.",
      correctAnswer: "No",
    },
    {
      question:
        "أشعر أنني كلما درست أكثر لامتحان الرياضيات كلما جاءت درجاتي فيه أسوأ.",
      correctAnswer: "No",
    },
    {
      question:
        "أشعر أنني الوحيد في الصف الذي لا يفهم الرياضيات، لذلك أشعر بالحرج والفشل.",
      correctAnswer: "No",
    },
    {
      question:
        "أشعر أن كثيرين غيري في الصف لا يفهمون ولا يحبون الرياضيات، لذلك لا أهتم بها.",
      correctAnswer: "No",
    },
  ];

  useEffect(() => {
    playInstructionSequence();
  }, []);

  const playInstructionSequence = async () => {
    setLoading(true);
    for (let i = 0; i < instructionAudios.length; i++) {
      await playAudioFile(instructionAudios[i]);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    await playAudioFile(questionAudios[0]); // Play first question audio after instructions
    setIsIntroComplete(true);
    setLoading(false);
    setAudioPlayed(true);
  };

  const playAudioFile = (audioSrc) => {
    return new Promise((resolve) => {
      if (!audioRef.current) {
        console.error("Audio element not found.");
        resolve();
        return;
      }

      audioRef.current.src = audioSrc;
      audioRef.current.muted = false; // Ensure audio is not muted
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audioRef.current.onended = () => resolve();
          })
          .catch((error) => {
            console.error("Autoplay failed:", error);
            // Fallback: Retry after a short delay
            setTimeout(() => {
              audioRef.current
                .play()
                .then(() => {
                  audioRef.current.onended = () => resolve();
                })
                .catch((err) => {
                  console.error("Retry failed:", err);
                  resolve(); // Continue even if it fails
                });
            }, 1000);
          });
      } else {
        // For older browsers without promise support
        audioRef.current.onended = () => resolve();
        resolve();
      }
    });
  };

  useEffect(() => {
    if (isIntroComplete && currentQuestion < questions.length) {
      setLoading(true);
      setAudioPlayed(false);
      playAudioFile(questionAudios[currentQuestion]).then(() => {
        setAudioPlayed(true);
        setLoading(false);

        const repeatTimer = setInterval(() => {
          if (audioRef.current && !audioRef.current.paused) return;
          playAudioFile(questionAudios[currentQuestion]);
        }, 450000);

        return () => clearInterval(repeatTimer);
      });
    }
  }, [currentQuestion, isIntroComplete]);

  useEffect(() => {
    if (currentQuestion > 0) {
      setProgress((currentQuestion / questions.length) * 100);
    }
  }, [currentQuestion]);

  const playAudio = () => {
    if (isIntroComplete && currentQuestion < questions.length) {
      setLoading(true);
      playAudioFile(questionAudios[currentQuestion]).then(() => {
        setLoading(false);
        setAudioPlayed(true);
      });
    }
  };

  const handleAnswer = (answer) => {
    if (!audioPlayed || loading) return;

    setAnswers([...answers, { question: currentQuestion, answer }]);
    setCurrentQuestion(currentQuestion + 1);
    setAudioPlayed(false);
  };

  const studentName = "مهند كمال داوود";

  return (
    <div className="flex flex-col">
      <audio ref={audioRef} preload="auto" />
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

      <div className="flex-grow flex flex-col items-center justify-between">
        <div className="flex flex-row-reverse mt-10 gap-4">
          <div className="bg-[#FDF6EA] shadow-md rounded-xl p-8 w-[1200px] mt-8 border-2 border-yellow-400 transition-all hover:shadow-lg">
            <p className="text-4xl md:text-7xl leading-tight text-gray-800 font-medium text-right">
              {questions[currentQuestion]?.question || ""}
            </p>
          </div>
          <button
            onClick={playAudio}
            disabled={loading || !isIntroComplete}
            className={`transform hover:scale-105 translate-y-6 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <img src={Listen} alt="Play" className="w-36 h-64" />
          </button>
        </div>

        <div className="w-full flex items-center justify-center mt-32 bg-[#757575]">
          <div className="grid grid-cols-1 max-w-4xl md:grid-cols-4 gap-4 ml-44 md:gap-6">
            <button
              onClick={() => handleAnswer("غير متأكد")}
              disabled={!audioPlayed || loading || !isIntroComplete}
              className={`rounded-xl p-6 flex flex-col items-center justify-center transition-all transform hover:scale-105 ${
                !audioPlayed || loading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <img src={NotSure} alt="Not Sure" className="h-28 w-28" />
            </button>

            <button
              onClick={() => handleAnswer("غير موافق")}
              disabled={!audioPlayed || loading || !isIntroComplete}
              className={`rounded-xl p-6 flex flex-col items-center justify-center transition-all transform hover:scale-105 ${
                !audioPlayed || loading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <img
                src={DisagreeBtn}
                alt="Disagree"
                className="h-[6.5rem] w-28"
              />
            </button>

            <button
              onClick={() => handleAnswer("موافق")}
              disabled={!audioPlayed || loading || !isIntroComplete}
              className={`rounded-xl p-6 flex flex-col items-center justify-center transition-all transform hover:scale-105 ${
                !audioPlayed || loading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <img src={AgreeBtn} alt=" Agree" className="h-[6.5rem] w-28" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnxietyTest;
