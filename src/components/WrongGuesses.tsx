
import React from 'react';

interface WrongGuessesProps {
  guesses: string[];
}

const WrongGuesses: React.FC<WrongGuessesProps> = ({ guesses }) => {
  if (guesses.length === 0) return null;

  return (
    <div className="mb-4">
      <p className="text-sm text-gray-600 mb-2">Previous guesses:</p>
      <div className="flex flex-wrap gap-2">
        {guesses.map((guess, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
            {guess}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WrongGuesses;
