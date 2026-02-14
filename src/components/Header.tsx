import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">PROFILING</Link>
        <nav className="header-nav">
          <a href="#profile" className="header-link">Profile</a>
          <a href="#portfolio" className="header-link">Portfolio</a>
          <a href="#contact" className="header-link">Contact</a>
        </nav>
      </div>
    </header>
  );
}
