
import { useState, useRef, useEffect } from 'react';
import { ClueSet, GameState } from '../types/game';
import { CLUE_SETS } from '../data/cluesets';

const sendGtagEvent = (event: string, params: any) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    window.gtag('event', event, params);
  }
};

export const useGameState = () => {
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
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  const isFirstMount = useRef(true);
  const lastThemeId = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && 'gtag' in window) {
      sendGtagEvent('page_visit', {
        page_title: 'Pinpoint',
        page_path: '/pinpoint'
      });
    }
    selectNewClueSet();
  }, []);

  useEffect(() => {
    if (gameState.currentSet.theme && lastThemeId.current !== gameState.currentSet.keyword) {
      sendGtagEvent('theme_seen', {
        theme_id: gameState.currentSet.keyword
      });
      lastThemeId.current = gameState.currentSet.keyword;
      sendGtagEvent('clue_seen', {
        clue_index: 1
      });
    }
  }, [gameState.currentSet.theme]);

  useEffect(() => {
    if (!isFirstMount.current && gameState.currentSet.theme && gameState.currentClueIndex > 0) {
      sendGtagEvent('clue_seen', {
        clue_index: gameState.currentClueIndex + 1
      });
    }
    isFirstMount.current = false;
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
    setWrongGuesses([]);
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
      setWrongGuesses(prev => [...prev, userGuess]);
      const nextClueIndex = gameState.currentClueIndex + 1;
      
      if (nextClueIndex >= gameState.currentSet.clues.length) {
        setGameState(prev => ({
          ...prev,
          isGameOver: true,
          message: `⛔ Out of guesses! The theme was: ${gameState.currentSet.theme}.`,
          messageType: 'error',
        }));
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(selectNewClueSet, 7000);
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

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    gameState,
    userGuess,
    setUserGuess,
    wrongGuesses,
    allThemesExhausted,
    handleGuess,
    selectNewClueSet
  };
};
