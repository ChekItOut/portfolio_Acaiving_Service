import { useParams, useNavigate } from 'react-router-dom';
import type { Portfolio } from '../types';

interface Props {
  portfolios: Portfolio[];
}

export default function PortfolioDetail({ portfolios }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const portfolio = portfolios.find((p) => p.id === id);

  if (!portfolio) {
    return (
      <div className="detail-not-found">
        <h2>Portfolio not found</h2>
        <button className="btn btn-back" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-container">
        <button className="btn btn-back" onClick={() => navigate('/')}>
          &larr; Back
        </button>

        <div className="detail-hero">
          {portfolio.thumbnail ? (
            <img src={portfolio.thumbnail} alt={portfolio.title} className="detail-image" />
          ) : (
            <div className="detail-placeholder">
              <span>{portfolio.title.charAt(0)}</span>
            </div>
          )}
        </div>

        <h1 className="detail-title">{portfolio.title}</h1>

        <div className="detail-skills">
          {portfolio.skills.map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>

        <div className="detail-description">
          <p>{portfolio.description}</p>
        </div>
      </div>
    </div>
  );
}
