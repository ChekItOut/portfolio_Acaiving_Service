import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Portfolio } from '../types';

interface Props {
  onSave: (portfolio: Portfolio) => void;
  onCancel: () => void;
}

export default function PortfolioForm({ onSave, onCancel }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const portfolio: Portfolio = {
      id: uuidv4(),
      title: title.trim(),
      thumbnail,
      description: description.trim(),
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
    };

    onSave(portfolio);
  };

  return (
    <div className="form-overlay">
      <form className="portfolio-form" onSubmit={handleSubmit}>
        <h2 className="form-title">New Portfolio</h2>

        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Thumbnail</label>
          <input
            type="file"
            className="form-input-file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {thumbnail && (
            <div className="form-preview">
              <img src={thumbnail} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your project..."
            rows={4}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Skills (comma separated)</label>
          <input
            type="text"
            className="form-input"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="React, TypeScript, Figma"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
