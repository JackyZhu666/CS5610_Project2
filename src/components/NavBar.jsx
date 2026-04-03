import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
      <header className="site-nav">
        <div className="container nav-inner">
          <NavLink to="/" className="brand">
            <img src="/logo.svg" alt="Neon Sudoku logo" />
            <span>Neon Sudoku</span>
          </NavLink>

          <nav className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/games">Games</NavLink>
            <NavLink to="/games/easy">Easy</NavLink>
            <NavLink to="/games/normal">Normal</NavLink>
            <NavLink to="/rules">Rules</NavLink>
            <NavLink to="/scores">Scores</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </nav>
        </div>
      </header>
  );
}