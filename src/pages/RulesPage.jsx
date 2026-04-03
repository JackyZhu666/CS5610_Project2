import PageHero from '../components/PageHero';

export default function RulesPage() {
  return (
      <div className="container">
        <PageHero
            title="Rules"
            subtitle="Every row, column, and sub-grid must contain each number exactly once."
        />

        <section className="content-card">
          <ol>
            <li>Each row must contain each number exactly once.</li>
            <li>Each column must contain each number exactly once.</li>
            <li>Each sub-grid must contain each number exactly once.</li>
            <li>If a placement breaks a rule, the cell will be marked red.</li>
          </ol>

          <h3>Credits</h3>
          <p>Made by Jackie Zhu</p>
          <div className="button-row">
            <a className="secondary-btn" href="mailto:jackie@example.com">Email</a>
            <a className="secondary-btn" href="https://github.com/example">GitHub</a>
            <a className="secondary-btn" href="https://linkedin.com/in/example">LinkedIn</a>
          </div>
        </section>
      </div>
  );
}