import { useState } from 'react';
import ProfileSection from '../components/ProfileSection';
import PortfolioCard from '../components/PortfolioCard';
import PortfolioForm from '../components/PortfolioForm';
import type { Profile, Portfolio } from '../types';

interface Props {
  profile: Profile;
  portfolios: Portfolio[];
  onAddPortfolio: (portfolio: Portfolio) => void;
}

export default function Home({ profile, portfolios, onAddPortfolio }: Props) {
  const [showForm, setShowForm] = useState(false);

  const handleSave = (portfolio: Portfolio) => {
    onAddPortfolio(portfolio);
    setShowForm(false);
  };

  return (
    <>
      <section className="hero-section">
        <iframe
          src="https://my.spline.design/hoverscrolleffect-8OxLPcePSrumkFGHu2b5dLVR/"
          className="hero-spline"
          frameBorder="0"
          title="Spline 3D Scene"
        />
        <div className="hero-content">
          
          <p className="hero-subtitle">Archive & Portfolio</p>
        </div>
      </section>

      <ProfileSection profile={profile} />

      <section id="portfolio" className="portfolio-section">
        <div className="portfolio-container">
          <div className="portfolio-header">
            <h2 className="section-title">Portfolio</h2>
            <button className="btn btn-add" onClick={() => setShowForm(true)}>
              + Add Project
            </button>
          </div>
          <div className="portfolio-grid">
            {portfolios.map((p) => (
              <PortfolioCard key={p.id} portfolio={p} />
            ))}
          </div>
          {portfolios.length === 0 && (
            <p className="empty-message">No portfolios yet. Add your first project!</p>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-brand">PROFILING</span>
          <span className="footer-copy">&copy; 2025</span>
        </div>
      </footer>

      {showForm && (
        <PortfolioForm onSave={handleSave} onCancel={() => setShowForm(false)} />
      )}
    </>
  );
}
