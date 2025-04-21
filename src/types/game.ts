
export interface ClueSet {
  theme: string;
  clues: string[];
}

export interface GameState {
  currentClueIndex: number;
  currentSet: ClueSet;
  hasGuessedCorrectly: boolean;
  isGameOver: boolean;
  message: string;
  messageType: 'success' | 'error' | 'info' | 'warning' | null;
}
