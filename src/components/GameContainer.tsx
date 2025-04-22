
import React, { useState, useEffect } from 'react';
import { ClueSet, GameState } from '../types/game';
import { CLUE_SETS } from '../data/cluesets';
import ClueCard from './ClueCard';
import { Input } from './ui/input';
import { Button } from './ui/button';

const GameContainer: React.FC = () => {
  // Initialize state
  const [gameState, setGameState] = useState<GameState>({
    currentClueIndex: 0,
    currentSet: { theme: '', keyword: '', clues: [] }, // Added the keyword property here
    hasGuessedCorrectly: false,
    isGameOver: false,
    message: '',
    messageType: null,
  });
  
  const [userGuess, setUserGuess] = useState('');
  
  // Select a random clue set on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * CLUE_SETS.length);
    const selectedSet = CLUE_SETS[randomIndex];
    
    setGameState({
      currentClueIndex: 0,
      currentSet: selectedSet,
      hasGuessedCorrectly: false,
      isGameOver: false,
      message: `What's the theme? Here's your first clue:`,
      messageType: 'info',
    });
  }, []);
  
  const normalizeGuess = (input: string): string => {
    return input
      .toLowerCase()
      .replace(/[-\s]/g, '')  // Remove hyphens and spaces
      .trim();
  };
  
  const handleGuess = () => {
    if (!userGuess.trim()) return;
    
    // Check if the guess matches the keyword
    const normalizedGuess = normalizeGuess(userGuess);
    const normalizedKeyword = normalizeGuess(gameState.currentSet.keyword);
    const isCorrect = normalizedGuess === normalizedKeyword;
    
    if (isCorrect) {
      // Reveal all clues and mark as correct
      setGameState(prev => ({
        ...prev,
        currentClueIndex: prev.currentSet.clues.length - 1, // Show all clues
        hasGuessedCorrectly: true,
        isGameOver: true,
        message: `✅ Correct! The theme was: ${gameState.currentSet.theme}.`,
        messageType: 'success',
      }));
    } else {
      // Wrong guess handling
      const nextClueIndex = gameState.currentClueIndex + 1;
      
      if (nextClueIndex >= gameState.currentSet.clues.length) {
        setGameState(prev => ({
          ...prev,
          isGameOver: true,
          message: `⛔ Out of guesses! The theme was: ${gameState.currentSet.theme}.`,
          messageType: 'error',
        }));
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
  
  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * CLUE_SETS.length);
    const selectedSet = CLUE_SETS[randomIndex];
    
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
  
  // Get message color based on the message type
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

  if (!gameState.currentSet.theme) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Status message */}
      <div className={`mb-6 text-lg font-medium ${getMessageColor()}`}>
        {gameState.message}
      </div>
      
      {/* Clue cards */}
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
      
      {/* Input area */}
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
      ) : (
        <Button 
          onClick={startNewGame}
          className="w-full bg-medical-dark hover:bg-medical-tertiary text-white"
        >
          New Game
        </Button>
      )}
    </div>
  );
};

export default GameContainer;
