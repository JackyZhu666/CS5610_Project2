import { useEffect } from 'react';
import PageHero from '../components/PageHero';
import Timer from '../components/Timer';
import SudokuBoard from '../components/SudokuBoard';
import GameToolbar from '../components/GameToolbar';
import StatusBanner from '../components/StatusBanner';
import { useSudoku } from '../context/SudokuContext';

export default function GameNormalPage() {
  const { state, startNewGame, resetGame, selectCell, updateCell, showHint } = useSudoku();

  useEffect(() => {
    if (!state.currentGame || state.currentGame.mode !== 'normal') {
      startNewGame('normal');
    }
  }, [state.currentGame, startNewGame]);

  const isReady = state.currentGame && state.currentGame.mode === 'normal';

  return (
    <div className="container">
      <PageHero
        title="Normal Sudoku"
        subtitle="9×9 board with 28–30 cells filled to start."
      />

      {!isReady ? (
        <section className="content-card">
          <p>Loading normal puzzle...</p>
        </section>
      ) : (
        <div className="game-layout">
          <section className="game-panel">
            <div className="game-topbar">
              <Timer seconds={state.elapsedSeconds} />
            </div>

            <StatusBanner isComplete={state.isComplete} />

            <SudokuBoard
              game={state.currentGame}
              selectedCell={state.selectedCell}
              invalidCells={state.invalidCells}
              hintCell={state.hintCell}
              onSelect={selectCell}
              onChange={updateCell}
            />

            <GameToolbar
              onNewGame={() => startNewGame('normal')}
              onReset={resetGame}
              onHint={showHint}
            />
          </section>

          <aside className="info-panel">
            <h3>Normal Mode</h3>
            <p>Values allowed: 1–9</p>
            <p>Timer runs until the board is solved.</p>
            <p>Board locks after a valid completion.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
