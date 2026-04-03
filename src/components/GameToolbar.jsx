export default function GameToolbar({ onNewGame, onReset, onHint }) {
  return (
      <div className="toolbar">
        <button className="primary-btn" onClick={onNewGame}>
          New Game
        </button>
        <button className="secondary-btn" onClick={onReset}>
          Reset
        </button>
        <button className="secondary-btn" onClick={onHint}>
          Hint
        </button>
      </div>
  );
}