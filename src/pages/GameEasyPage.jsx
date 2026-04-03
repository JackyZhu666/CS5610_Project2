import { useEffect } from 'react';
import PageHero from '../components/PageHero';
import Timer from '../components/Timer';
import SudokuBoard from '../components/SudokuBoard';
import GameToolbar from '../components/GameToolbar';
import StatusBanner from '../components/StatusBanner';
import { useSudoku } from '../context/SudokuContext';

export default function GameEasyPage() {
  const { state, startNewGame, resetGame, selectCell, updateCell, showHint } = useSudoku();

  useEffect(() => {
    if (!state.currentGame || state.currentGame.mode !== 'easy') {
      startNewGame('easy');
    }
  }, [state.currentGame, startNewGame]);

  const isReady = state.currentGame && state.currentGame.mode === 'easy';

  return (
    <div className="container">
      <PageHero
        title="Easy Sudoku"
        subtitle="6×6 board, half the cells filled to start."
      />

      {!isReady ? (
        <section className="content-card">
          <p>Loading easy puzzle...</p>
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
              onNewGame={() => startNewGame('easy')}
              onReset={resetGame}
              onHint={showHint}
            />
          </section>

          <aside className="info-panel">
            <h3>Easy Mode</h3>
            <p>Values allowed: 1–6</p>
            <p>Prefilled cells are locked.</p>
            <p>Wrong placements are highlighted in red.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
