import PageHero from '../components/PageHero';

export default function RegisterPage() {
  return (
      <div className="container narrow">
        <PageHero
            title="Register"
            subtitle="Mock page for new account creation."
        />

        <section className="content-card">
          <label className="form-label">Username</label>
          <input className="form-input" type="text" placeholder="Choose username" />

          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="Enter password" />

          <label className="form-label">Verify Password</label>
          <input className="form-input" type="password" placeholder="Re-enter password" />

          <button className="primary-btn">Submit</button>
        </section>
      </div>
  );
}