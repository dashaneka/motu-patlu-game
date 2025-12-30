import React, { useState, useEffect } from 'react';
import { Trophy, Star, ArrowRight, RefreshCw, Heart, Pizza } from 'lucide-react';

// --- Assets as SVG Components ---

const MotuCharacter = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg">
    <circle cx="50" cy="60" r="35" fill="#f43f5e" /> {/* Red shirt body */}
    <circle cx="50" cy="35" r="22" fill="#ffdbac" /> {/* Face */}
    <rect x="35" y="42" width="30" height="4" rx="2" fill="#333" /> {/* Mustache */}
    <circle cx="42" cy="32" r="2" fill="#000" /> {/* Left eye */}
    <circle cx="58" cy="32" r="2" fill="#000" /> {/* Right eye */}
    <path d="M 40 48 Q 50 55 60 48" stroke="#333" strokeWidth="2" fill="none" /> {/* Smile */}
    <rect x="35" y="90" width="10" height="8" fill="#333" /> {/* Left foot */}
    <rect x="55" y="90" width="10" height="8" fill="#333" /> {/* Right foot */}
  </svg>
);

const PatluCharacter = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg">
    <rect x="42" y="50" width="16" height="40" fill="#fbbf24" /> {/* Yellow shirt body */}
    <circle cx="50" cy="30" r="18" fill="#ffdbac" /> {/* Face */}
    <rect x="40" y="28" width="8" height="6" rx="1" stroke="#333" fill="none" /> {/* Glasses left */}
    <rect x="52" y="28" width="8" height="6" rx="1" stroke="#333" fill="none" /> {/* Glasses right */}
    <path d="M 48 30 H 52" stroke="#333" />
    <circle cx="44" cy="31" r="1" fill="#000" /> {/* Eye L */}
    <circle cx="56" cy="31" r="1" fill="#000" /> {/* Eye R */}
    <path d="M 45 40 Q 50 45 55 40" stroke="#333" strokeWidth="1" fill="none" /> {/* Smile */}
    <rect x="42" y="90" width="6" height="8" fill="#333" /> {/* Left foot */}
    <rect x="52" y="90" width="6" height="8" fill="#333" /> {/* Right foot */}
  </svg>
);

const SamosaIcon = ({ size = 40, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={`${className} drop-shadow-md`}>
    <path d="M 50 10 L 90 85 L 10 85 Z" fill="#fcd34d" stroke="#b45309" strokeWidth="4" />
    <path d="M 30 70 Q 50 60 70 70" stroke="#b45309" strokeWidth="2" fill="none" />
    <circle cx="40" cy="50" r="2" fill="#b45309" opacity="0.5" />
    <circle cx="60" cy="40" r="2" fill="#b45309" opacity="0.5" />
  </svg>
);

const App = () => {
  const [gameState, setGameState] = useState('START'); // START, PLAYING, LEVEL_UP, FINISH
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [shake, setShake] = useState(false);

  // Generate a random question based on level
  const generateQuestion = (lvl) => {
    setFeedback(null);
    if (lvl === 1) {
      // Level 1: Simple counting 1-5
      const count = Math.floor(Math.random() * 5) + 2;
      const options = [count, count + 1, count - 1].sort(() => Math.random() - 0.5);
      return { type: 'COUNT', target: count, options, prompt: "Oye Hoye! How many samosas does Motu want to eat?" };
    } else if (lvl === 2) {
      // Level 2: Missing Number 1-10
      const start = Math.floor(Math.random() * 6) + 1;
      const missingIdx = Math.floor(Math.random() * 3);
      const sequence = [start, start + 1, start + 2];
      const answer = sequence[missingIdx];
      sequence[missingIdx] = '?';
      const options = [answer, answer + 2, answer - 1].sort(() => Math.random() - 0.5);
      return { type: 'SEQUENCE', sequence, answer, options, prompt: "Idea! Patlu needs to find the missing number!" };
    } else {
      // Level 3: Simple addition up to 10
      const a = Math.floor(Math.random() * 4) + 1;
      const b = Math.floor(Math.random() * 4) + 1;
      const answer = a + b;
      const options = [answer, answer + 1, answer - 1].sort(() => Math.random() - 0.5);
      return { type: 'ADDITION', a, b, answer, options, prompt: "Motu had some, Patlu gave more! Total?" };
    }
  };

  const startLevel = (lvl) => {
    setCurrentQuestion(generateQuestion(lvl));
    setGameState('PLAYING');
  };

  const handleAnswer = (choice) => {
    const isCorrect = currentQuestion.type === 'COUNT'
      ? choice === currentQuestion.target
      : choice === currentQuestion.answer;

    if (isCorrect) {
      setScore(score + 10);
      setFeedback({ type: 'success', text: "Oye Hoye! Correct answer!" });
      setTimeout(() => {
        if (level < 3) {
          setLevel(level + 1);
          setGameState('LEVEL_UP');
        } else {
          setGameState('FINISH');
        }
      }, 1500);
    } else {
      setShake(true);
      setFeedback({ type: 'error', text: "Khaali pet mere dimaag ki batti nahi jalti! Try again." });
      setTimeout(() => setShake(false), 500);
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setGameState('START');
  };

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col items-center p-4 font-sans select-none">
      {/* Header */}
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur rounded-3xl p-4 flex justify-between items-center shadow-md mb-6 border-b-4 border-sky-300">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 p-2 rounded-full">
            <Trophy className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-sky-800 text-xl">{score}</span>
        </div>
        <h1 className="text-2xl font-black text-sky-600 tracking-tight">FURFURI NAGAR MATH</h1>
        <div className="flex gap-1">
          {[1, 2, 3].map((l) => (
            <div
              key={l}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-inner
                ${level >= l ? 'bg-green-400 text-white' : 'bg-slate-200 text-slate-400'}`}
            >
              {l}
            </div>
          ))}
        </div>
      </div>

      {/* Main Game Container */}
      <div className="w-full max-w-2xl flex-grow flex flex-col items-center justify-center gap-8">

        {gameState === 'START' && (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <div className="flex justify-center gap-8 mb-8 scale-110">
              <MotuCharacter size={150} />
              <PatluCharacter size={150} />
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-4">Masti and Math!</h2>
            <p className="text-slate-600 mb-8 max-w-xs mx-auto text-lg font-medium">
              Join Motu and Patlu on a delicious number adventure in Furfuri Nagar!
            </p>
            <button
              onClick={() => startLevel(1)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-12 rounded-full text-2xl shadow-[0_8px_0_rgb(194,65,12)] active:shadow-none active:translate-y-2 transition-all flex items-center gap-3"
            >
              CHALO KHELTE HAIN! <ArrowRight className="w-8 h-8" />
            </button>
          </div>
        )}

        {gameState === 'PLAYING' && currentQuestion && (
          <div className={`w-full flex flex-col items-center gap-8 ${shake ? 'animate-bounce' : ''}`}>

            {/* Characters and Dialogue */}
            <div className="flex items-end justify-center gap-4 w-full relative">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white p-4 rounded-2xl shadow-xl border-2 border-sky-100 max-w-sm">
                <p className="text-sky-800 font-bold text-center text-lg">{currentQuestion.prompt}</p>
                <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
              </div>
              <MotuCharacter />
              <PatluCharacter />
            </div>

            {/* Question Visualizer */}
            <div className="bg-white/50 p-8 rounded-[3rem] w-full min-h-[200px] flex items-center justify-center shadow-inner border-4 border-dashed border-white">
              {currentQuestion.type === 'COUNT' && (
                <div className="grid grid-cols-5 gap-4">
                  {[...Array(currentQuestion.target)].map((_, i) => (
                    <div key={i} className="animate-in zoom-in spin-in duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                      <SamosaIcon size={60} />
                    </div>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'SEQUENCE' && (
                <div className="flex gap-4">
                  {currentQuestion.sequence.map((num, i) => (
                    <div
                      key={i}
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black shadow-lg border-4
                        ${num === '?' ? 'bg-yellow-200 border-yellow-400 text-yellow-600 animate-pulse' : 'bg-white border-sky-400 text-sky-600'}`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'ADDITION' && (
                <div className="flex items-center gap-4 flex-wrap justify-center">
                  <div className="flex gap-1 p-3 bg-white/40 rounded-xl">
                    {[...Array(currentQuestion.a)].map((_, i) => <SamosaIcon key={i} size={40} />)}
                  </div>
                  <span className="text-4xl font-black text-sky-800">+</span>
                  <div className="flex gap-1 p-3 bg-white/40 rounded-xl">
                    {[...Array(currentQuestion.b)].map((_, i) => <SamosaIcon key={i} size={40} />)}
                  </div>
                  <span className="text-4xl font-black text-sky-800">=</span>
                  <div className="w-16 h-16 rounded-xl bg-sky-200 border-2 border-sky-400 flex items-center justify-center text-3xl font-black text-sky-800">
                    ?
                  </div>
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="flex gap-4 w-full">
              {currentQuestion.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="flex-1 bg-white hover:bg-sky-50 text-sky-600 font-black text-4xl py-6 rounded-3xl shadow-[0_8px_0_rgb(226,232,240)] border-2 border-slate-100 active:shadow-none active:translate-y-1 transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Feedback Message */}
            {feedback && (
              <div className={`p-4 rounded-xl font-bold text-center text-lg animate-in slide-in-from-bottom duration-300 w-full
                ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {feedback.text}
              </div>
            )}
          </div>
        )}

        {gameState === 'LEVEL_UP' && (
          <div className="text-center animate-in zoom-in duration-500">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <Star className="w-32 h-32 text-yellow-400 fill-yellow-400 animate-spin-slow" />
                <div className="absolute inset-0 flex items-center justify-center font-black text-4xl text-white">
                  {level - 1}
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">Shaabaash!</h2>
            <p className="text-xl text-slate-600 mb-8 font-bold">Level {level - 1} Complete!</p>
            <button
              onClick={() => startLevel(level)}
              className="bg-green-500 hover:bg-green-600 text-white font-black py-4 px-12 rounded-full text-2xl shadow-[0_8px_0_rgb(22,163,74)] active:shadow-none active:translate-y-2 transition-all flex items-center gap-3 mx-auto"
            >
              NEXT LEVEL <ArrowRight className="w-8 h-8" />
            </button>
          </div>
        )}

        {gameState === 'FINISH' && (
          <div className="text-center animate-in zoom-in duration-500">
            <div className="flex justify-center mb-8 relative">
              <div className="absolute -top-10 -left-10 animate-bounce">
                <SamosaIcon size={80} />
              </div>
              <div className="absolute -bottom-10 -right-10 animate-bounce delay-300">
                <SamosaIcon size={80} />
              </div>
              <MotuCharacter size={180} />
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              Samosa Party!
            </h2>
            <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-yellow-400 mb-8">
              <p className="text-2xl font-bold text-sky-800 mb-2">Total Score: {score}</p>
              <p className="text-slate-600 font-medium">Motu is happy and Patlu is proud of you!</p>
            </div>
            <button
              onClick={resetGame}
              className="bg-sky-500 hover:bg-sky-600 text-white font-black py-4 px-12 rounded-full text-2xl shadow-[0_8px_0_rgb(14,165,233)] active:shadow-none active:translate-y-2 transition-all flex items-center gap-3 mx-auto"
            >
              KHEL PHIR SE! <RefreshCw className="w-8 h-8" />
            </button>
          </div>
        )}

      </div>

      {/* Footer Decoration */}
      <div className="w-full h-24 mt-8 relative overflow-hidden flex items-end opacity-40 pointer-events-none">
        <div className="w-full flex justify-around items-end">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <SamosaIcon size={30} className="mb-[-10px]" />
              <div className="w-24 h-12 bg-green-400 rounded-t-full"></div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
