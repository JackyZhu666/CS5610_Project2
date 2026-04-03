import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function HomePage() {
  return (
      <div className="container">
        <PageHero
            title="Neon Sudoku"
            subtitle="A React + Context API Sudoku app with Easy and Normal modes."
        />

        <section className="hero-card">
          <div>
            <h2>Welcome</h2>
            <p>
              Start a new puzzle, read the rules, or explore the mock pages from Project 1
              now rebuilt in React.
            </p>
            <div className="button-row">
              <Link className="primary-btn" to="/games">
                Play Game
              </Link>
              <Link className="secondary-btn" to="/rules">
                Rules
              </Link>
            </div>
          </div>

          <div className="hero-grid-preview">
            <div className="mini-grid" />
          </div>
        </section>
      </div>
  );
}