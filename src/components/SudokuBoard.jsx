import SudokuCell from './SudokuCell';

export default function SudokuBoard({
  game,
  selectedCell,
  invalidCells,
  hintCell,
  onSelect,
  onChange
}) {
  const { board, initialBoard, size, boxRows, boxCols, maxValue } = game;

  return (
      <div
          className={`sudoku-board ${size === 9 ? 'board-9' : 'board-6'}`}
          style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;
              const readOnly = initialBoard[rowIndex][colIndex] !== null;
              const isSelected =
                  selectedCell &&
                  selectedCell.row === rowIndex &&
                  selectedCell.col === colIndex;
              const isInvalid = invalidCells.has(key);
              const isHint =
                  hintCell &&
                  hintCell.row === rowIndex &&
                  hintCell.col === colIndex;

              const borderStyle = {
                borderRight:
                    (colIndex + 1) % boxCols === 0 && colIndex !== size - 1
                        ? '3px solid rgba(255,255,255,.28)'
                        : undefined,
                borderBottom:
                    (rowIndex + 1) % boxRows === 0 && rowIndex !== size - 1
                        ? '3px solid rgba(255,255,255,.28)'
                        : undefined
              };

              return (
                  <div key={key} style={borderStyle}>
                    <SudokuCell
                        value={cell}
                        row={rowIndex}
                        col={colIndex}
                        readOnly={readOnly}
                        isSelected={isSelected}
                        isInvalid={isInvalid}
                        isHint={isHint}
                        maxValue={maxValue}
                        onSelect={onSelect}
                        onChange={onChange}
                    />
                  </div>
              );
            })
        )}
      </div>
  );
}