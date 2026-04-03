import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { mockGames } from '../data/mockGames';

export default function GamesPage() {
  return (
      <div className="container">
        <PageHero
            title="Game Selection"
            subtitle="Choose a mocked game listing. Easy and Normal pages generate a new puzzle."
        />

        <div className="card-list">
          {mockGames.map((game) => (
              <Link key={game.id} to={game.path} className="card-link">
                <div>
                  <h3>{game.title}</h3>
                  <p>Author: {game.author}</p>
                </div>
                <span className={`difficulty-pill ${game.difficulty}`}>
              {game.difficulty}
            </span>
              </Link>
          ))}
        </div>
      </div>
  );
}