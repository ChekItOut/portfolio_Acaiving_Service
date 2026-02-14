import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">PROFILING</Link>
        <nav className="header-nav">
          <a href="#profile" className="header-link">Profile</a>
          <a href="#portfolio" className="header-link">Portfolio</a>
          <a href="#contact" className="header-link">Contact</a>
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
}
