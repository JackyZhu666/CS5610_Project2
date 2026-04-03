import PageHero from '../components/PageHero';

export default function LoginPage() {
  return (
      <div className="container narrow">
        <PageHero
            title="Login"
            subtitle="Mock page with minimal interactivity."
        />

        <section className="content-card">
          <label className="form-label">Username</label>
          <input className="form-input" type="text" placeholder="Enter username" />

          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="Enter password" />

          <button className="primary-btn">Submit</button>
        </section>
      </div>
  );
}