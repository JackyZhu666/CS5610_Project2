import PageHero from '../components/PageHero';

const scores = [
  { user: 'gridMaster', completed: 41 },
  { user: 'neonNine', completed: 37 },
  { user: 'logicQueen', completed: 29 },
  { user: 'sudokuSpark', completed: 24 },
  { user: 'coffeeCoder', completed: 19 }
];

export default function ScoresPage() {
  return (
      <div className="container">
        <PageHero
            title="High Scores"
            subtitle="Mocked, hardcoded leaderboard data."
        />

        <section className="content-card">
          <table className="scores-table">
            <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Completed</th>
            </tr>
            </thead>
            <tbody>
            {scores.map((entry, index) => (
                <tr key={entry.user}>
                  <td>{index + 1}</td>
                  <td>{entry.user}</td>
                  <td>{entry.completed}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </section>
      </div>
  );
}