import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { compressImage } from '../utils/imageCompression';
import type { Portfolio } from '../types';

interface Props {
  portfolio?: Portfolio;
  onSave: (portfolio: Portfolio) => void;
  onCancel: () => void;
}

const MAX_IMAGES = 7;

export default function PortfolioForm({ portfolio, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(portfolio?.title || '');
  const [description, setDescription] = useState(portfolio?.description || '');
  const [skills, setSkills] = useState(portfolio?.skills.join(', ') || '');
  const [images, setImages] = useState<string[]>(portfolio?.images || []);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const isEditMode = !!portfolio;
  const canAddMoreImages = images.length < MAX_IMAGES;

  const handleImageCompression = async (files: FileList | null) => {
    if (!files) return;

    const remainingSlots = MAX_IMAGES - images.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    try {
      setIsLoading(true);
      const compressedImages = await Promise.all(
        filesToProcess.map((file) => compressImage(file))
      );
      setImages((prev) => [...prev, ...compressedImages]);
    } catch (error) {
      console.error('Image compression failed:', error);
      alert('이미지 처리에 실패했습니다. 다른 이미지를 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageCompression(e.target.files);
    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.add('active');
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.remove('active');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.remove('active');
    }
    handleImageCompression(e.dataTransfer.files);
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleImageDragOverItem = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleImageDropOnItem = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (sourceIndex === targetIndex) return;

    setImages((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(targetIndex, 0, removed);
      return result;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('프로젝트 제목을 입력해주세요.');
      return;
    }

    const updatedPortfolio: Portfolio = {
      id: portfolio?.id || uuidv4(),
      title: title.trim(),
      thumbnail: images[0] || portfolio?.thumbnail || '',
      images: images.length > 0 ? images : portfolio?.images,
      description: description.trim(),
      skills: skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    onSave(updatedPortfolio);
  };

  return (
    <div className="form-overlay">
      <form className="portfolio-form" onSubmit={handleSubmit}>
        <h2 className="form-title">{isEditMode ? 'Edit Portfolio' : 'New Portfolio'}</h2>

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
          <label className="form-label">Images (up to {MAX_IMAGES})</label>

          <div
            ref={dropzoneRef}
            className="form-dropzone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className="dropzone-text">
              {canAddMoreImages ? 'Drag and drop images here or click to select' : 'Maximum images reached'}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              className="form-input-file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={!canAddMoreImages || isLoading}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => fileInputRef.current?.click()}
              disabled={!canAddMoreImages || isLoading}
            >
              {isLoading ? 'Processing...' : 'Select Images'}
            </button>
          </div>

          {images.length > 0 && (
            <>
              <div className="form-images-grid">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="form-image-item"
                    draggable
                    onDragStart={(e) => handleImageDragStart(e, index)}
                    onDragOver={handleImageDragOverItem}
                    onDrop={(e) => handleImageDropOnItem(e, index)}
                  >
                    <img src={image} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="form-image-remove"
                      onClick={() => handleImageRemove(index)}
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="form-image-counter">
                {images.length} / {MAX_IMAGES} images
              </div>
            </>
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
            {isEditMode ? 'Update Portfolio' : 'Save Portfolio'}
          </button>
        </div>
      </form>
    </div>
  );
}
