import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, Position } from './types';
import FloatingHearts from './components/FloatingHearts';
import PhotoGallery from './components/PhotoGallery';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.ASK);
  const [noBtnPos, setNoBtnPos] = useState<Position | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  
  const timerRef = useRef<number | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleNoInteraction = useCallback(() => {
    // Start the "Angry" timer on first interaction
    if (!timerStarted && gameState === GameState.ASK) {
      setTimerStarted(true);
      timerRef.current = window.setTimeout(() => {
        setGameState(GameState.ANGRY);
      }, 15000); // 15 seconds tolerance
    }

    if (gameState !== GameState.ASK) return;

    // Increment interactions
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Make YES bigger
    setYesScale(prev => Math.min(prev + 0.5, 4));

    // Trigger Angry state if they persist too much
    if (newCount > 10) {
      setGameState(GameState.ANGRY);
      return;
    }

    // Move logic
    const padding = 50;
    const btnWidth = 140; 
    const btnHeight = 60; 
    
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    const newX = Math.max(padding, Math.random() * maxX);
    const newY = Math.max(padding, Math.random() * maxY);

    setNoBtnPos({ x: newX, y: newY });
  }, [clickCount, gameState, timerStarted]);

  const handleYesClick = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setGameState(GameState.SUCCESS);
  };

  const handleReset = () => {
    setGameState(GameState.ASK);
    setNoBtnPos(null);
    setClickCount(0);
    setTimerStarted(false);
    setYesScale(1);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div className="overflow-x-hidden min-h-screen font-sans selection:bg-pink-200">
      
      {/* --- ASK SCREEN --- */}
      {gameState === GameState.ASK && (
        <div className="flex flex-col items-center justify-center min-h-screen w-full relative p-4 transition-colors duration-500 bg-pink-50">
           <FloatingHearts />
           
           <div className="z-10 flex flex-col items-center max-w-lg w-full">
            <h1 className="text-5xl md:text-7xl text-pink-600 mb-12 drop-shadow-sm text-center font-bold tracking-tight">
                Will you be my Valentine? 🌹
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full h-48 relative">
                {/* YES BUTTON */}
                <button
                    onClick={handleYesClick}
                    style={{ transform: `scale(${yesScale})` }}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full shadow-xl transition-all duration-200 ease-in-out z-20 whitespace-nowrap text-2xl active:scale-95"
                >
                    Yes! 🥰
                </button>

                {/* NO BUTTON */}
                <button
                    onMouseEnter={handleNoInteraction}
                    onTouchStart={(e) => {
                        handleNoInteraction();
                    }}
                    onClick={handleNoInteraction}
                    style={
                        noBtnPos
                            ? { position: 'fixed', left: noBtnPos.x, top: noBtnPos.y }
                            : { position: 'static' }
                    }
                    className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-full shadow-xl transition-all duration-300 ease-out z-20 whitespace-nowrap text-2xl"
                >
                    {clickCount === 0 ? "No" : "No..."}
                </button>
            </div>

            {clickCount > 2 && clickCount < 10 && (
                <p className="mt-8 text-rose-400 italic animate-pulse font-semibold">
                    Don't be stubborn! 😤
                </p>
            )}
           </div>
        </div>
      )}

      {/* --- SUCCESS SCREEN --- */}
      {gameState === GameState.SUCCESS && (
        <div className="flex flex-col items-center min-h-screen w-full bg-gradient-to-b from-red-50 to-pink-100 p-4 animate-fadeIn overflow-y-auto pb-20">
            <FloatingHearts />
            <div className="mt-8 text-center z-10">
              <h1 className="text-5xl md:text-7xl text-red-600 mb-2 font-bold drop-shadow-sm">
                  Yay! I knew it! ❤️
              </h1>
              <p className="text-2xl text-rose-500 mb-8 font-['Pacifico']">
                  You just made me the happiest person ever!
              </p>
            </div>
            
            <PhotoGallery />

            <div className="my-12 z-10 text-center bg-white/50 p-6 rounded-2xl backdrop-blur-sm shadow-sm max-w-md mx-auto">
              <p className="text-xl text-gray-700 mb-2 font-['Nunito']">I love you so much! 💖</p>
              <p className="text-sm text-gray-500 mb-4">Can't wait to celebrate with you.</p>
              <button 
                  onClick={handleReset}
                  className="text-pink-500 underline hover:text-pink-700 transition-colors font-bold"
              >
                  Ask me again?
              </button>
            </div>
        </div>
      )}

      {/* --- ANGRY SCREEN --- */}
      {gameState === GameState.ANGRY && (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900 text-white p-4 animate-fadeIn">
            <h1 className="text-4xl md:text-6xl text-red-500 mb-8 text-center font-bold">
                Okay, that's enough! 😾
            </h1>
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <img 
                    src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3R6b3h6b3h6b3h6b3h6b3h6b3h6b3h6b3h6b3h6/mlvSeq872hSCg/giphy.gif"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placecats.com/400/400";
                    }}
                    alt="Angry Cat" 
                    className="w-full max-w-md rounded-lg shadow-2xl relative z-10 border-2 border-red-500"
                />
            </div>
            <p className="mt-8 text-2xl text-gray-300 text-center font-light">
                You're testing my patience... <br/><span className="font-bold text-white">Just say YES!</span>
            </p>
            <button
                onClick={handleReset}
                className="mt-8 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold py-4 px-12 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
                Try Again
            </button>
        </div>
      )}
    </div>
  );
};

export default App;