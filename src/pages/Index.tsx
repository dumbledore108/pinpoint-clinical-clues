
import React from 'react';
import Header from '@/components/Header';
import GameContainer from '@/components/GameContainer';

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 overflow-auto">
        <GameContainer />
      </main>
    </div>
  );
};

export default Index;
