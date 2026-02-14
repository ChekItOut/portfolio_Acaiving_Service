import { useState } from 'react';
import { compressImage } from '../utils/imageCompression';
import type { Profile } from '../types';

interface Props {
  profile: Profile;
  onSave: (profile: Profile) => void;
  onCancel: () => void;
}

export default function ProfileEditForm({ profile, onSave, onCancel }: Props) {
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [bio, setBio] = useState(profile.bio);
  const [email, setEmail] = useState(profile.email);
  const [skills, setSkills] = useState(profile.skills.join(', '));
  const [avatar, setAvatar] = useState(profile.avatar || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const compressedImage = await compressImage(file);
      setAvatar(compressedImage);
    } catch (error) {
      console.error('Image compression failed:', error);
      alert('이미지 처리에 실패했습니다. 다른 이미지를 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updatedProfile: Profile = {
      name: name.trim(),
      role: role.trim(),
      bio: bio.trim(),
      email: email.trim(),
      skills: skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      avatar: avatar || undefined,
    };

    onSave(updatedProfile);
  };

  return (
    <div className="form-overlay">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Edit Profile</h2>

        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Role</label>
          <input
            type="text"
            className="form-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Your role"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea
            className="form-textarea"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            rows={4}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
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

        <div className="form-group">
          <label className="form-label">Profile Photo</label>
          <input
            type="file"
            className="form-input-file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isLoading}
          />
          {avatar && (
            <div className="form-avatar-preview">
              <img src={avatar} alt="Profile preview" />
              <button
                type="button"
                className="form-avatar-remove"
                onClick={handleRemoveAvatar}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-save" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
