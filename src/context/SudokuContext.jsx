import { createContext, useContext, useEffect, useMemo, useReducer, useCallback } from 'react';
import {
  generatePuzzle,
  getInvalidCells,
  isBoardComplete,
  isCorrectBoard,
  findHintCell
} from '../utils/sudoku';

const SudokuContext = createContext(null);

const initialState = {
  currentGame: null,
  elapsedSeconds: 0,
  isComplete: false,
  selectedCell: null,
  invalidCells: new Set(),
  hintCell: null
};

function serializeState(state) {
  if (!state.currentGame) return null;

  return {
    currentGame: {
      ...state.currentGame,
      board: state.currentGame.board,
      initialBoard: state.currentGame.initialBoard,
      solution: state.currentGame.solution
    },
    elapsedSeconds: state.elapsedSeconds,
    isComplete: state.isComplete,
    selectedCell: state.selectedCell,
    invalidCells: Array.from(state.invalidCells),
    hintCell: state.hintCell
  };
}

function deserializeState(saved) {
  if (!saved) return initialState;

  return {
    ...saved,
    invalidCells: new Set(saved.invalidCells || [])
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_SAVED':
      return deserializeState(action.payload);

    case 'NEW_GAME': {
      const puzzle = generatePuzzle(action.payload.mode);
      const invalidCells = getInvalidCells(
          puzzle.board,
          puzzle.size,
          puzzle.boxRows,
          puzzle.boxCols
      );

      return {
        currentGame: puzzle,
        elapsedSeconds: 0,
        isComplete: false,
        selectedCell: null,
        invalidCells,
        hintCell: null
      };
    }

    case 'RESET_GAME': {
      if (!state.currentGame) return state;

      const resetBoard = state.currentGame.initialBoard.map((row) => [...row]);
      const updatedGame = {
        ...state.currentGame,
        board: resetBoard
      };

      return {
        ...state,
        currentGame: updatedGame,
        elapsedSeconds: 0,
        isComplete: false,
        invalidCells: new Set(),
        selectedCell: null,
        hintCell: null
      };
    }

    case 'TICK':
      if (!state.currentGame || state.isComplete) return state;
      return {
        ...state,
        elapsedSeconds: state.elapsedSeconds + 1
      };

    case 'SELECT_CELL':
      return {
        ...state,
        selectedCell: action.payload
      };

    case 'UPDATE_CELL': {
      if (!state.currentGame || state.isComplete) return state;

      const { row, col, value } = action.payload;

      if (state.currentGame.initialBoard[row][col] !== null) {
        return state;
      }

      const newBoard = state.currentGame.board.map((r) => [...r]);
      newBoard[row][col] = value;

      const updatedGame = {
        ...state.currentGame,
        board: newBoard
      };

      const invalidCells = getInvalidCells(
          newBoard,
          state.currentGame.size,
          state.currentGame.boxRows,
          state.currentGame.boxCols
      );

      const complete =
          invalidCells.size === 0 &&
          isBoardComplete(newBoard) &&
          isCorrectBoard(newBoard, state.currentGame.solution);

      return {
        ...state,
        currentGame: updatedGame,
        invalidCells,
        isComplete: complete,
        hintCell: null
      };
    }

    case 'SHOW_HINT':
      if (!state.currentGame || state.isComplete) return state;
      return {
        ...state,
        hintCell: findHintCell(state.currentGame.board, state.currentGame.solution)
      };

    case 'CLEAR_STORAGE':
      return initialState;

    default:
      return state;
  }
}

export function SudokuProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem('sudoku-project2-state');
    if (saved) {
      dispatch({ type: 'LOAD_SAVED', payload: JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    const serialized = serializeState(state);

    if (serialized && state.currentGame && !state.isComplete) {
      localStorage.setItem('sudoku-project2-state', JSON.stringify(serialized));
    }

    if (state.isComplete || !state.currentGame) {
      localStorage.removeItem('sudoku-project2-state');
    }
  }, [state]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const startNewGame = useCallback((mode) => {
    dispatch({ type: 'NEW_GAME', payload: { mode } });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const selectCell = useCallback((row, col) => {
    dispatch({ type: 'SELECT_CELL', payload: { row, col } });
  }, []);

  const updateCell = useCallback((row, col, value) => {
    dispatch({ type: 'UPDATE_CELL', payload: { row, col, value } });
  }, []);

  const showHint = useCallback(() => {
    dispatch({ type: 'SHOW_HINT' });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_STORAGE' });
  }, []);

  const value = useMemo(
      () => ({
        state,
        startNewGame,
        resetGame,
        selectCell,
        updateCell,
        showHint,
        clearAll
      }),
      [state, startNewGame, resetGame, selectCell, updateCell, showHint, clearAll]
  );

  return <SudokuContext.Provider value={value}>{children}</SudokuContext.Provider>;
}

export function useSudoku() {
  const context = useContext(SudokuContext);

  if (!context) {
    throw new Error('useSudoku must be used within SudokuProvider');
  }

  return context;
}