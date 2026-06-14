import React from 'react';
import { Mail, ShieldCheck, MapPin } from 'lucide-react';
import { editorialBoard } from '../data/mockData';

export default function About({ addToast }) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="about-page fade-in-up">
      {/* Page Hero */}
      <section className="about-hero">
        <span className="section-label">Our Identity</span>
        <h2 className="section-title" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Behind the Hive</h2>
        <p className="about-intro-text">
          "A digital home where student art, stories, and reflections converge to build a collaborative mosaic of creativity."
        </p>
      </section>

      {/* History and Impact */}
      <section className="about-history-impact">
        <div className="history-text">
          <h3>Evolution</h3>
          <p>
            The Beehive is envisioned as an accessible digital platform that brings together diverse forms of student expression. By embracing articles, poetry, artwork, photography, and multimedia storytelling, it aims to provide students with meaningful opportunities to share their work, explore their creativity, and engage with the wider school community.
          </p>
        </div>

        <div className="impact-text" style={{ borderLeft: '1px solid var(--border)', paddingLeft: '3rem' }}>
          <h3>Community Impact</h3>
          <p>
           The Beehive aims to create a space where students can share their ideas, stories, perspectives, and creative work while learning from one another in the process. Through collaboration, publication opportunities, and peer mentorship, we hope to encourage self-expression, strengthen communication skills, and build confidence in young writers, artists, and creators. As the platform grows, we aspire to foster a culture of creativity, curiosity, and mutual appreciation, bringing together diverse voices and helping students feel more connected to the wider school community.
          </p>
        </div>
      </section>

      {/* Editorial Board */}
      <section className="editorial-section" style={{ backgroundColor: 'var(--primary-bg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Editorial Board</span>
          <h2 className="section-title">The Worker Bees</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.5rem auto 0' }}>
            The dedicated team of students who review, select, and compile each edition of The Bee Hive.
          </p>
        </div>

        <div className="editorial-grid">
          {editorialBoard.map((member) => (
            <div key={member.id} className="profile-card">
              {member.image ? (
                <img src={member.image} alt={member.name} className="profile-avatar" />
              ) : (
                <div className="profile-avatar-placeholder">
                  {getInitials(member.name)}
                </div>
              )}
              <h3 className="profile-name">{member.name}</h3>
              <p className="profile-role">{member.role}</p>
              <p className="profile-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="contact-form-card" style={{ maxWidth: '600px', width: '100%' }}>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Get In Touch</h3>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2.5rem' }}>
            Have questions about submission guidelines, editorial schedules, or joining the board? Send us a message, or reach out to our primary contact points below.
          </p>

          <div className="contact-info-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="contact-info-item" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={20} />
              </div>
              <div>
                <h5 style={{ fontWeight: 700, margin: 0, fontSize: '1.1rem' }}>General Inquiry</h5>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>dpschdeditorialboard2627@gmail.com</p>
              </div>
            </div>
            
            <div className="contact-info-item" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={20} />
              </div>
              <div>
                <h5 style={{ fontWeight: 700, margin: 0, fontSize: '1.1rem' }}>Location</h5>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>DPS Chandigarh sec 40-C</p>
              </div>
            </div>
            
            <div className="contact-info-item" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h5 style={{ fontWeight: 700, margin: 0, fontSize: '1.1rem' }}>Faculty Advisor</h5>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>Mrs. Ranjot Kaur</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
