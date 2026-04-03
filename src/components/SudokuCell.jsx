export default function SudokuCell({
  value,
  row,
  col,
  readOnly,
  isSelected,
  isInvalid,
  isHint,
  maxValue,
  onSelect,
  onChange
}) {
  const classNames = [
    'sudoku-cell',
    readOnly ? 'prefilled' : '',
    isSelected ? 'selected' : '',
    isInvalid ? 'invalid' : '',
    isHint ? 'hint' : ''
  ]
  .filter(Boolean)
  .join(' ');

  const handleChange = (event) => {
    const raw = event.target.value;

    if (raw === '') {
      onChange(row, col, null);
      return;
    }

    const numeric = Number(raw);
    if (Number.isNaN(numeric)) return;
    if (numeric < 1 || numeric > maxValue) return;

    onChange(row, col, numeric);
  };

  return (
      <input
          className={classNames}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={value ?? ''}
          readOnly={readOnly}
          onFocus={() => onSelect(row, col)}
          onClick={() => onSelect(row, col)}
          onChange={handleChange}
      />
  );
}