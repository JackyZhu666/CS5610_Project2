export default function Timer({ seconds }) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  return (
      <div className="timer-card">
        <span className="timer-label">Time</span>
        <span className="timer-value">
        {mins}:{secs}
      </span>
      </div>
  );
}