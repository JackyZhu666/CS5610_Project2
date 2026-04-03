import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
      <div className="container">
        <section className="content-card">
          <h1>404</h1>
          <p>Page not found.</p>
          <Link className="primary-btn" to="/">
            Go Home
          </Link>
        </section>
      </div>
  );
}