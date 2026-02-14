import { useNavigate } from 'react-router-dom';
import type { Portfolio } from '../types';

interface Props {
  portfolio: Portfolio;
}

export default function PortfolioCard({ portfolio }: Props) {
  const navigate = useNavigate();

  return (
    <div className="portfolio-card" onClick={() => navigate(`/portfolio/${portfolio.id}`)}>
      <div className="card-thumbnail">
        {portfolio.thumbnail ? (
          <img src={portfolio.thumbnail} alt={portfolio.title} />
        ) : (
          <div className="card-placeholder">
            <span>{portfolio.title.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{portfolio.title}</h3>
        <div className="card-skills">
          {portfolio.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="card-skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
