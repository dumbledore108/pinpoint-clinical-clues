
import React from 'react';

interface ClueCardProps {
  clue: string;
  index: number;
  totalClues: number;
  isActive: boolean;
}

const ClueCard: React.FC<ClueCardProps> = ({ clue, index, totalClues, isActive }) => {
  // Calculate a gradient based on the index using our medical theme colors
  const getCardGradient = () => {
    if (!isActive) return 'bg-gray-100 text-gray-400';
    
    const gradients = [
      'bg-medical-light text-medical-dark',
      'bg-medical-primary bg-opacity-20 text-medical-dark',
      'bg-medical-primary bg-opacity-40 text-medical-dark',
      'bg-medical-primary bg-opacity-70 text-white',
      'bg-medical-primary text-white',
    ];
    
    return gradients[index] || gradients[gradients.length - 1];
  };

  return (
    <div className={`w-full p-4 mb-2 rounded-lg shadow-sm transition-all ${getCardGradient()}`}>
      {isActive ? clue : '?????'}
    </div>
  );
};

export default ClueCard;
