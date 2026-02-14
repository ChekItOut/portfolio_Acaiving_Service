import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PortfolioForm from '../components/PortfolioForm';
import ConfirmDialog from '../components/ConfirmDialog';
import type { Portfolio } from '../types';

interface Props {
  portfolios: Portfolio[];
  onUpdate: (portfolio: Portfolio) => void;
  onDelete: (id: string) => void;
}

export default function PortfolioDetail({ portfolios, onUpdate, onDelete }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const portfolio = portfolios.find((p) => p.id === id);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const handleSave = (updatedPortfolio: Portfolio) => {
    onUpdate(updatedPortfolio);
    setShowEditForm(false);
  };

  const handleDelete = () => {
    onDelete(portfolio.id);
    navigate('/');
  };

  const hasImages = portfolio.images && portfolio.images.length > 0;

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div className="detail-header">
          <button className="btn btn-back" onClick={() => navigate('/')}>
            &larr; Back
          </button>
          <div className="detail-actions">
            <button className="btn btn-edit" onClick={() => setShowEditForm(true)}>
              Edit
            </button>
            <button className="btn btn-delete" onClick={() => setShowDeleteConfirm(true)}>
              Delete
            </button>
          </div>
        </div>

        {hasImages ? (
          <div className="detail-gallery">
            {portfolio.images!.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`${portfolio.title} ${index + 1}`} />
              </div>
            ))}
          </div>
        ) : portfolio.thumbnail ? (
          <div className="detail-hero">
            <img src={portfolio.thumbnail} alt={portfolio.title} className="detail-image" />
          </div>
        ) : (
          <div className="detail-placeholder">
            <span>{portfolio.title.charAt(0)}</span>
          </div>
        )}

        <h1 className="detail-title">{portfolio.title}</h1>

        <div className="detail-skills">
          {portfolio.skills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>

        <div className="detail-description">
          <p>{portfolio.description}</p>
        </div>
      </div>

      {showEditForm && (
        <PortfolioForm
          portfolio={portfolio}
          onSave={handleSave}
          onCancel={() => setShowEditForm(false)}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmDialog
          title="Delete Portfolio"
          message="Are you sure you want to delete this portfolio? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          confirmText="Delete"
          isDangerous
        />
      )}
    </div>
  );
}
