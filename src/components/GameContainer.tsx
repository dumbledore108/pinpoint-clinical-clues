
import React, { useState, useEffect, useRef } from 'react';
import { ClueSet, GameState } from '../types/game';
import { CLUE_SETS } from '../data/cluesets';
import ClueCard from './ClueCard';
import { Input } from './ui/input';
import { Button } from './ui/button';

const sendGtagEvent = (event: string, params: any) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
};

const GameContainer: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentClueIndex: 0,
    currentSet: { theme: '', keyword: '', clues: [] },
    hasGuessedCorrectly: false,
    isGameOver: false,
    message: '',
    messageType: null,
  });
  
  const [userGuess, setUserGuess] = useState('');
  const [playedThemes, setPlayedThemes] = useState<Set<string>>(new Set());
  const [allThemesExhausted, setAllThemesExhausted] = useState(false);
  
  // Used to avoid firing certain events more than once per theme load or mount
  const isFirstMount = useRef(true);
  const lastThemeId = useRef<string | null>(null);

  useEffect(() => {
    // Fire page_visit once when component mounts
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      sendGtagEvent('page_visit', {
        page_title: 'Pinpoint',
        page_path: '/pinpoint'
      });
    }
    selectNewClueSet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Fire theme_seen if a new theme is loaded
    if (gameState.currentSet.theme && lastThemeId.current !== gameState.currentSet.keyword) {
      sendGtagEvent('theme_seen', {
        theme_id: gameState.currentSet.keyword
      });
      lastThemeId.current = gameState.currentSet.keyword;
      // Also fire clue_seen for the first clue in the set
      sendGtagEvent('clue_seen', {
        clue_index: 1
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.currentSet.theme]); // Only triggers on theme change

  useEffect(() => {
    // Fire clue_seen every time the clue index increases (but not on initial set)
    if (!isFirstMount.current && gameState.currentSet.theme && gameState.currentClueIndex > 0) {
      sendGtagEvent('clue_seen', {
        clue_index: gameState.currentClueIndex + 1
      });
    }
    isFirstMount.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.currentClueIndex]);

  const normalizeGuess = (input: string): string => {
    return input
      .toLowerCase()
      .replace(/[-\s]/g, '')  
      .trim();
  };

  const selectNewClueSet = () => {
    const availableThemes = CLUE_SETS.filter(set => !playedThemes.has(set.theme));
    
    if (availableThemes.length === 0) {
      setAllThemesExhausted(true);
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * availableThemes.length);
    const selectedSet = availableThemes[randomIndex];
    
    setPlayedThemes(prev => new Set([...prev, selectedSet.theme]));
    setGameState({
      currentClueIndex: 0,
      currentSet: selectedSet,
      hasGuessedCorrectly: false,
      isGameOver: false,
      message: `What's the theme? Here's your first clue:`,
      messageType: 'info',
    });
    
    setUserGuess('');
  };

  const handleGuess = () => {
    if (!userGuess.trim()) return;

    sendGtagEvent('submit_guess', {
      clue_index: gameState.currentClueIndex + 1,
      guess_value: userGuess
    });

    const normalizedGuess = normalizeGuess(userGuess);
    const normalizedKeyword = normalizeGuess(gameState.currentSet.keyword);
    const isCorrect = normalizedGuess === normalizedKeyword;

    if (isCorrect) {
      setGameState(prev => ({
        ...prev,
        currentClueIndex: prev.currentSet.clues.length - 1,
        hasGuessedCorrectly: true,
        isGameOver: true,
        message: `✅ Correct! The theme was: ${gameState.currentSet.theme}.`,
        messageType: 'success',
      }));
    } else {
      const nextClueIndex = gameState.currentClueIndex + 1;
      
      if (nextClueIndex >= gameState.currentSet.clues.length) {
        setGameState(prev => ({
          ...prev,
          isGameOver: true,
          message: `⛔ Out of guesses! The theme was: ${gameState.currentSet.theme}.`,
          messageType: 'error',
        }));
        setTimeout(selectNewClueSet, 2000);
      } else {
        setGameState(prev => ({
          ...prev,
          currentClueIndex: nextClueIndex,
          message: `❌ Not quite. Here's your next clue:`,
          messageType: 'warning',
        }));
      }
    }

    setUserGuess('');
  };

  const getMessageColor = () => {
    switch (gameState.messageType) {
      case 'success':
        return 'text-feedback-success';
      case 'error':
        return 'text-feedback-error';
      case 'warning':
        return 'text-feedback-warning';
      default:
        return 'text-medical-primary';
    }
  };

  if (allThemesExhausted) {
    return (
      <div className="w-full max-w-md mx-auto p-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-medical-primary mb-4">That's a wrap! You've cracked all the current clues.</h2>
        <p className="text-gray-600">We're cooking up more clinical challenges — come back tomorrow for Round 2.</p>
      </div>
    );
  }

  if (!gameState.currentSet.theme) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className={`mb-6 text-lg font-medium ${getMessageColor()}`}>
        {gameState.message}
      </div>
      
      <div className="mb-6">
        {gameState.currentSet.clues.map((clue, index) => (
          <ClueCard 
            key={index}
            clue={clue}
            index={index}
            totalClues={gameState.currentSet.clues.length}
            isActive={index <= gameState.currentClueIndex}
          />
        ))}
      </div>
      
      {!gameState.isGameOver ? (
        <div className="flex flex-col space-y-4">
          <Input
            type="text"
            placeholder="Enter your guess..."
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
            className="border-medical-primary"
          />
          <Button 
            onClick={handleGuess}
            className="w-full bg-medical-primary hover:bg-medical-secondary text-white"
          >
            Submit Guess
          </Button>
        </div>
      ) : gameState.hasGuessedCorrectly && (
        <Button 
          onClick={selectNewClueSet}
          className="w-full bg-medical-dark hover:bg-medical-tertiary text-white"
        >
          New Game
        </Button>
      )}
    </div>
  );
};

export default GameContainer;
