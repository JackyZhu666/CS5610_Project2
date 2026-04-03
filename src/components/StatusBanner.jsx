export default function StatusBanner({ isComplete }) {
  if (!isComplete) return null;

  return (
      <div className="status-banner success">
        🎉 Congratulations! You solved the puzzle. The board is now locked.
      </div>
  );
}