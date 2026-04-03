function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function makePatternBoard(size, boxRows, boxCols) {
  const nums = Array.from({ length: size }, (_, i) => i + 1);

  const rows = [];
  for (let group = 0; group < size / boxRows; group += 1) {
    rows.push(...shuffle(Array.from({ length: boxRows }, (_, i) => group * boxRows + i)));
  }

  const cols = [];
  for (let group = 0; group < size / boxCols; group += 1) {
    cols.push(...shuffle(Array.from({ length: boxCols }, (_, i) => group * boxCols + i)));
  }

  const shuffledNums = shuffle(nums);

  const board = rows.map((r) =>
      cols.map((c) => {
        const value = shuffledNums[(boxCols * (r % boxRows) + Math.floor(r / boxRows) + c) % size];
        return value;
      })
  );

  return board;
}

function deepCopyBoard(board) {
  return board.map((row) => [...row]);
}

function removeCells(solution, clues) {
  const size = solution.length;
  const board = deepCopyBoard(solution);
  const positions = [];

  for (let r = 0; r < size; r += 1) {
    for (let c = 0; c < size; c += 1) {
      positions.push([r, c]);
    }
  }

  const shuffledPositions = shuffle(positions);
  const cellsToRemove = size * size - clues;

  for (let i = 0; i < cellsToRemove; i += 1) {
    const [r, c] = shuffledPositions[i];
    board[r][c] = null;
  }

  return board;
}

export function generatePuzzle(mode) {
  if (mode === 'easy') {
    const size = 6;
    const solution = makePatternBoard(6, 2, 3);
    const initialBoard = removeCells(solution, 18); // half filled
    return {
      mode,
      size,
      boxRows: 2,
      boxCols: 3,
      minValue: 1,
      maxValue: 6,
      solution,
      initialBoard,
      board: deepCopyBoard(initialBoard)
    };
  }

  const size = 9;
  const solution = makePatternBoard(9, 3, 3);
  const clues = 28 + Math.floor(Math.random() * 3); // 28-30
  const initialBoard = removeCells(solution, clues);

  return {
    mode,
    size,
    boxRows: 3,
    boxCols: 3,
    minValue: 1,
    maxValue: 9,
    solution,
    initialBoard,
    board: deepCopyBoard(initialBoard)
  };
}

export function isBoardComplete(board) {
  return board.every((row) => row.every((cell) => cell !== null && cell !== ''));
}

export function isCorrectBoard(board, solution) {
  for (let r = 0; r < board.length; r += 1) {
    for (let c = 0; c < board[r].length; c += 1) {
      if (Number(board[r][c]) !== Number(solution[r][c])) {
        return false;
      }
    }
  }
  return true;
}

export function getInvalidCells(board, size, boxRows, boxCols) {
  const invalidSet = new Set();

  // rows
  for (let r = 0; r < size; r += 1) {
    const seen = new Map();
    for (let c = 0; c < size; c += 1) {
      const value = board[r][c];
      if (!value) continue;
      if (!seen.has(value)) seen.set(value, []);
      seen.get(value).push([r, c]);
    }
    seen.forEach((positions) => {
      if (positions.length > 1) {
        positions.forEach(([row, col]) => invalidSet.add(`${row}-${col}`));
      }
    });
  }

  // cols
  for (let c = 0; c < size; c += 1) {
    const seen = new Map();
    for (let r = 0; r < size; r += 1) {
      const value = board[r][c];
      if (!value) continue;
      if (!seen.has(value)) seen.set(value, []);
      seen.get(value).push([r, c]);
    }
    seen.forEach((positions) => {
      if (positions.length > 1) {
        positions.forEach(([row, col]) => invalidSet.add(`${row}-${col}`));
      }
    });
  }

  // boxes
  for (let boxRowStart = 0; boxRowStart < size; boxRowStart += boxRows) {
    for (let boxColStart = 0; boxColStart < size; boxColStart += boxCols) {
      const seen = new Map();
      for (let r = boxRowStart; r < boxRowStart + boxRows; r += 1) {
        for (let c = boxColStart; c < boxColStart + boxCols; c += 1) {
          const value = board[r][c];
          if (!value) continue;
          if (!seen.has(value)) seen.set(value, []);
          seen.get(value).push([r, c]);
        }
      }
      seen.forEach((positions) => {
        if (positions.length > 1) {
          positions.forEach(([row, col]) => invalidSet.add(`${row}-${col}`));
        }
      });
    }
  }

  return invalidSet;
}

export function findHintCell(board, solution) {
  for (let r = 0; r < board.length; r += 1) {
    for (let c = 0; c < board[r].length; c += 1) {
      if (!board[r][c]) {
        return { row: r, col: c, value: solution[r][c] };
      }
    }
  }
  return null;
}