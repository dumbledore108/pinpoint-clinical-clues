
import React from 'react';
import { GameState } from '../types/game';

interface GameMessageProps {
  message: string;
  messageType: GameState['messageType'];
}

const GameMessage: React.FC<GameMessageProps> = ({ message, messageType }) => {
  const getMessageColor = () => {
    switch (messageType) {
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

  return (
    <div className={`mb-6 text-lg font-medium ${getMessageColor()}`}>
      {message}
    </div>
  );
};

export default GameMessage;
