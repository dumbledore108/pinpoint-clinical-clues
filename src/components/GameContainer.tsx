
import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import ClueCard from './ClueCard';
import WrongGuesses from './WrongGuesses';
import GameMessage from './GameMessage';
import { useGameState } from '../hooks/useGameState';

const GameContainer: React.FC = () => {
  const {
    gameState,
    userGuess,
    setUserGuess,
    wrongGuesses,
    allThemesExhausted,
    handleGuess,
    selectNewClueSet
  } = useGameState();

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
      <GameMessage message={gameState.message} messageType={gameState.messageType} />
      
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
      
      <WrongGuesses guesses={wrongGuesses} />
      
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
