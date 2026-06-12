import React from "react";
import {
  BookOpen,
  Send,
  ArrowRight,
  Heart,
  Users,
  Award,
  PenTool,
} from "lucide-react";
import { initialPublications } from "../data/mockData";

export default function Home({ onNavigate, onReadPublication }) {
  // Get latest 3 publications to show as featured
  const featuredPublications = initialPublications.slice(0, 3);

  return (
    <div className="home-page fade-in-up">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="honeycomb-bg"></div>
        <div className="hero-logo-container">
          <img
            src="/Beehive.svg"
            alt="The Bee Hive Logo"
            className="hero-logo"
          />
        </div>
        <h1 className="hero-title">The Bee Hive</h1>
        <p className="hero-tagline">"Where Creativity Finds Its Hive"</p>
        <div className="hero-ctas">
          <button
            className="btn btn-primary"
            onClick={() => onNavigate("publications")}
          >
            <BookOpen size={18} /> Explore Publications
          </button>
          <button
            className="btn btn-accent"
            onClick={() => onNavigate("submissions")}
          >
            <Send size={18} /> Submit Your Work
          </button>
        </div>
      </section>

      {/* Intro and Mission Section */}
      <section className="intro-mission-section">
        <div className="card-intro">
          <span className="section-label">Welcome</span>
          <h2 className="section-title-alt">About Our Hive</h2>
          <p>
            <strong>The Bee Hive</strong> is a student-led digital literary and
            creative publication platform. We provide a sanctuary for students
            to express themselves, share their observations, and highlight the
            beauty of our collaborative community. Here, every voice is a cell
            in a larger, buzzing structure of collective imagination.
          </p>
          <button
            className="btn btn-secondary"
            style={{ marginTop: "1.5rem" }}
            onClick={() => onNavigate("about")}
          >
            Read Our Story <ArrowRight size={16} />
          </button>
        </div>

        <div className="card-mission">
          <span className="section-label">Our Vision</span>
          <h2 className="section-title-alt">Mission Statement</h2>
          <p>
            Our mission is to foster student creativity, storytelling, and
            artistic expression. We strive to provide a platform that celebrates
            diverse student work—from articles and poetry to photography,
            painting, and personal experiences. Through our editorial cycles, we
            encourage artistic feedback and academic growth.
          </p>
        </div>
      </section>

      {/* Latest Published Works */}
      <section className="latest-works-section">
        <div className="latest-works-header">
          <div>
            <span className="section-label">Curated Selection</span>
            <h2 className="section-title">Latest Published Works</h2>
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => onNavigate("publications")}
          >
            View All Publications <ArrowRight size={16} />
          </button>
        </div>

        <div className="publications-grid">
          {featuredPublications.map((pub) => (
            <article key={pub.id} className="pub-card">
              <div
                className="pub-card-cover"
                style={{ backgroundColor: pub.coverColor }}
              >
                <div className="pub-card-cover-pattern honeycomb-bg"></div>
                <div className="pub-card-cover-graphic">
                  <PenTool size={36} opacity={0.6} />
                  <span
                    style={{
                      fontFamily: "var(--font-editorial)",
                      fontStyle: "italic",
                      fontWeight: 600,
                    }}
                  >
                    {pub.category}
                  </span>
                </div>
                <span className="pub-card-tag">{pub.category}</span>
              </div>
              <div className="pub-card-body">
                <div className="pub-card-meta">
                  <span>{pub.date}</span>
                  <span>{pub.readTime}</span>
                </div>
                <h3
                  className="pub-card-title"
                  onClick={() => onReadPublication(pub)}
                >
                  {pub.title}
                </h3>
                <p className="pub-card-author">
                  By {pub.author} ({pub.grade})
                </p>
                <p className="pub-card-excerpt">{pub.excerpt}</p>
                <div className="pub-card-footer">
                  <span
                    className="read-more-link"
                    onClick={() => onReadPublication(pub)}
                  >
                    Read More <ArrowRight size={14} />
                  </span>
                  <div className="pub-likes">
                    <Heart
                      size={14}
                      fill="currentColor"
                      style={{ color: "var(--accent)" }}
                    />
                    <span>{pub.likes}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div
          className="honeycomb-bg"
          style={{ animation: "honeycombPulse 8s infinite" }}
        ></div>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">00+</span>
            <span className="stat-label">Published Works</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">00+</span>
            <span className="stat-label">Contributors</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">00</span>
            <span className="stat-label">Editions Published</span>
          </div>
        </div>
      </section>
    </div>
  );
}
