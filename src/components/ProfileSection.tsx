import type { Profile } from '../types';

interface Props {
  profile: Profile;
}

export default function ProfileSection({ profile }: Props) {
  return (
    <section id="profile" className="profile-section">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.name.charAt(0)}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{profile.name}</h1>
            <p className="profile-role">{profile.role}</p>
          </div>
        </div>
        <p className="profile-bio">{profile.bio}</p>
        <div className="profile-skills">
          {profile.skills.map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
        <div id="contact" className="profile-contact">
          <a href={`mailto:${profile.email}`} className="contact-link">
            {profile.email}
          </a>
        </div>
      </div>
    </section>
  );
}
