
export interface ClueSet {
  theme: string;
  keyword: string; // The specific answer that needs to be matched
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
