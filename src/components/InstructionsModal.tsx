
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InstructionsModalProps {
  triggerElement: React.ReactNode;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ triggerElement }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerElement}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-medical-primary">How to Play Pinpoint</DialogTitle>
          <DialogDescription className="text-gray-700">
            Test your medical knowledge with this clue-based guessing game.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div>
            <h3 className="font-medium text-medical-dark">Game Rules:</h3>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              <li>You'll be given a series of clues related to a medical theme</li>
              <li>Guess the correct theme using as few clues as possible</li>
              <li>Each game has a maximum of 5 clues</li>
              <li>Enter your guess in the text field and click Submit</li>
              <li>If incorrect, you'll receive another clue</li>
              <li>The game ends when you guess correctly or run out of clues</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-medical-dark">Example:</h3>
            <p className="text-gray-700">
              If the clues are "Semaglutide", "Liraglutide", "Dulaglutide", etc., 
              the theme would be "GLP-1 Agonists".
            </p>
          </div>
          
          <div className="pt-2">
            <Button 
              onClick={() => setIsOpen(false)}
              className="w-full bg-medical-primary hover:bg-medical-secondary text-white"
            >
              Got it
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstructionsModal;
