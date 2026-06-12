import {
  BookOpen,
  FileText,
  PenTool,
  Heart,
  Camera,
  Palette,
  ShieldCheck,
  AlertCircle,
  Brain,
  Copy,
} from "lucide-react";

export default function Guidelines() {
  return (
    <div className="about-page fade-in-up">
      {/* Page Hero */}
      <section className="about-hero">
        <span className="section-label">Submission Policy</span>
        <h2
          className="section-title"
          style={{ fontSize: "3rem", marginBottom: "1.5rem" }}
        >
          Editorial Guidelines
        </h2>
        <p className="about-intro-text">
          "Ensuring a high-quality, creative, and respectful space for every
          student voice in The Bee Hive."
        </p>
      </section>

      {/* Accepted Categories Section */}
      <section
        className="editorial-section"
        style={{ backgroundColor: "var(--primary-bg)", padding: "5rem 2rem" }}
      >
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-label">What We Publish</span>
          <h2 className="section-title" style={{ fontSize: "2.5rem" }}>
            Accepted Categories
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0.5rem auto 0",
            }}
          >
            Review the types of works we accept and their respective
            length/submission guidelines.
          </p>
        </div>

        <div
          className="editorial-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Card 1: Articles */}
          <div
            className="profile-card"
            style={{
              padding: "2.5rem",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: "50%",
                  backgroundColor: "rgba(var(--accent-rgb), 0.1)",
                  color: "var(--accent-dark)",
                }}
              >
                <FileText size={24} />
              </div>
              <h3
                className="profile-name"
                style={{ margin: 0, fontSize: "1.4rem" }}
              >
                Articles
              </h3>
            </div>
            <p
              className="profile-role"
              style={{
                color: "var(--accent-dark)",
                fontWeight: 750,
                fontSize: "0.85rem",
                marginBottom: "0.75rem",
              }}
            >
              MAX LENGTH: 2 PAGES
            </p>
            <p
              className="profile-bio"
              style={{
                margin: 0,
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
              }}
            >
              Book reviews, film reviews, opinion pieces, historical essays,
              educational articles, and commentary.
            </p>
          </div>

          {/* Card 2: Short Stories */}
          <div
            className="profile-card"
            style={{
              padding: "2.5rem",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: "50%",
                  backgroundColor: "rgba(var(--accent-rgb), 0.1)",
                  color: "var(--accent-dark)",
                }}
              >
                <BookOpen size={24} />
              </div>
              <h3
                className="profile-name"
                style={{ margin: 0, fontSize: "1.4rem" }}
              >
                Short Stories
              </h3>
            </div>
            <p
              className="profile-role"
              style={{
                color: "var(--accent-dark)",
                fontWeight: 750,
                fontSize: "0.85rem",
                marginBottom: "0.75rem",
              }}
            >
              MAX LENGTH: 3 PAGES
            </p>
            <p
              className="profile-bio"
              style={{
                margin: 0,
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
              }}
            >
              Fiction, narratives, creative prose, and literary experiments.
            </p>
          </div>

          {/* Card 3: Poetry */}
          <div
            className="profile-card"
            style={{
              padding: "2.5rem",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: "50%",
                  backgroundColor: "rgba(var(--accent-rgb), 0.1)",
                  color: "var(--accent-dark)",
                }}
              >
                <PenTool size={24} />
              </div>
              <h3
                className="profile-name"
                style={{ margin: 0, fontSize: "1.4rem" }}
              >
                Poetry
              </h3>
            </div>
            <p
              className="profile-role"
              style={{
                color: "var(--accent-dark)",
                fontWeight: 750,
                fontSize: "0.85rem",
                marginBottom: "0.75rem",
              }}
            >
              MAX LENGTH: 1 PAGE
            </p>
            <p
              className="profile-bio"
              style={{
                margin: 0,
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
              }}
            >
              All poetic styles and forms are welcome.
            </p>
          </div>

          {/* Card 4: Experiences */}
          <div
            className="profile-card"
            style={{
              padding: "2.5rem",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: "50%",
                  backgroundColor: "rgba(var(--accent-rgb), 0.1)",
                  color: "var(--accent-dark)",
                }}
              >
                <Heart size={24} />
              </div>
              <h3
                className="profile-name"
                style={{ margin: 0, fontSize: "1.4rem" }}
              >
                Experiences
              </h3>
            </div>
            <p
              className="profile-role"
              style={{
                color: "var(--accent-dark)",
                fontWeight: 750,
                fontSize: "0.85rem",
                marginBottom: "0.75rem",
              }}
            >
              MAX LENGTH: 4 PAGES
            </p>
            <p
              className="profile-bio"
              style={{
                margin: 0,
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
              }}
            >
              Personal experiences, reflections, travel accounts, school
              memories, and life lessons.
            </p>
          </div>

          {/* Card 5: Photography */}
          <div
            className="profile-card"
            style={{
              padding: "2.5rem",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: "50%",
                  backgroundColor: "rgba(var(--accent-rgb), 0.1)",
                  color: "var(--accent-dark)",
                }}
              >
                <Camera size={24} />
              </div>
              <h3
                className="profile-name"
                style={{ margin: 0, fontSize: "1.4rem" }}
              >
                Photography
              </h3>
            </div>
            <p
              className="profile-role"
              style={{
                color: "var(--accent-dark)",
                fontWeight: 750,
                fontSize: "0.85rem",
                marginBottom: "0.75rem",
              }}
            >
              UP TO 5 PHOTOS
            </p>
            <p
              className="profile-bio"
              style={{
                margin: 0,
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
              }}
            >
              High-resolution photographs. Titles and descriptive captions are
              highly encouraged.
            </p>
          </div>

          {/* Card 6: Artwork */}
          <div
            className="profile-card"
            style={{
              padding: "2.5rem",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: "50%",
                  backgroundColor: "rgba(var(--accent-rgb), 0.1)",
                  color: "var(--accent-dark)",
                }}
              >
                <Palette size={24} />
              </div>
              <h3
                className="profile-name"
                style={{ margin: 0, fontSize: "1.4rem" }}
              >
                Artwork
              </h3>
            </div>
            <p
              className="profile-role"
              style={{
                color: "var(--accent-dark)",
                fontWeight: 750,
                fontSize: "0.85rem",
                marginBottom: "0.75rem",
              }}
            >
              TRADITIONAL & DIGITAL
            </p>
            <p
              className="profile-bio"
              style={{
                margin: 0,
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
              }}
            >
              Paintings, sketches, digital art, and illustrations. Please
              include a title where possible.
            </p>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section
        className="about-history-impact"
        style={{ padding: "6rem 2rem", maxWidth: "1000px", margin: "0 auto" }}
      >
        <div
          className="history-text"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span className="section-label">Expression Without Borders</span>
          <h3 style={{ fontSize: "2.2rem", marginBottom: "1.25rem" }}>
            Languages Accepted
          </h3>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
            }}
          >
            The Bee Hive is a multilingual platform celebrating cultural and
            linguistic diversity. We accept individual submissions or
            multilingual/translated combinations in the following languages:
          </p>
        </div>

        <div
          className="impact-text"
          style={{
            borderLeft: "1px solid var(--border)",
            paddingLeft: "3rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--text-secondary)",
                display: "inline-block",
                width: "35px",
                textAlign: "center",
              }}
            >
              EN
            </span>
            <div>
              <h5 style={{ fontWeight: 700, margin: 0 }}>English</h5>
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span style={{ fontSize: "1.75rem" }}>🇮🇳</span>
            <div>
              <h5 style={{ fontWeight: 700, margin: 0 }}>Hindi</h5>
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span style={{ fontSize: "1.75rem" }}>🇮🇳</span>
            <div>
              <h5 style={{ fontWeight: 700, margin: 0 }}>Punjabi</h5>
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span style={{ fontSize: "1.75rem" }}>🇮🇳</span>
            <div>
              <h5 style={{ fontWeight: 700, margin: 0 }}>Sanskrit</h5>
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span style={{ fontSize: "1.75rem" }}>🇫🇷</span>
            <div>
              <h5 style={{ fontWeight: 700, margin: 0 }}>French</h5>
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span style={{ fontSize: "1.75rem" }}>🇩🇪</span>
            <div>
              <h5 style={{ fontWeight: 700, margin: 0 }}>German</h5>
            </div>
          </div>
        </div>
      </section>

      {/* Content Guidelines Section */}
      <section
        className="editorial-section"
        style={{
          backgroundColor: "var(--bg-card)",
          borderTop: "1px solid var(--border)",
          padding: "5rem 2rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-label">Editorial Standards</span>
          <h2 className="section-title" style={{ fontSize: "2.5rem" }}>
            Content Guidelines
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0.5rem auto 0",
            }}
          >
            All contributors must strictly adhere to our core content
            requirements.
          </p>
        </div>

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          {/* Rule 1: School-Friendly */}
          <div
            style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}
          >
            <div
              style={{
                padding: "0.75rem",
                borderRadius: "50%",
                backgroundColor: "rgba(var(--primary-rgb), 0.1)",
                color: "var(--primary)",
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                1. School-Friendly Content
              </h4>
              <p
                style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
              >
                All submissions must be appropriate for a school audience. Avoid
                explicit language, mature themes, or graphic depictions of
                violence.
              </p>
            </div>
          </div>

          {/* Rule 2: Party Politics */}
          <div
            style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}
          >
            <div
              style={{
                padding: "0.75rem",
                borderRadius: "50%",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: "#EF4444",
                flexShrink: 0,
              }}
            >
              <AlertCircle size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                2. No Current Indian Party Politics
              </h4>
              <p
                style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
              >
                While discussions of history, philosophy, economics, society,
                culture, and international affairs are welcome, content
                promoting, attacking, or campaigning for current Indian
                political parties, active politicians, or ongoing elections will
                not be accepted.
              </p>
            </div>
          </div>

          {/* Rule 3: AI Use */}
          <div
            style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}
          >
            <div
              style={{
                padding: "0.75rem",
                borderRadius: "50%",
                backgroundColor: "rgba(var(--accent-rgb), 0.1)",
                color: "var(--accent-dark)",
                flexShrink: 0,
              }}
            >
              <Brain size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                3. Responsible Use of AI
              </h4>
              <p
                style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
              >
                AI may be used for brainstorming, proofreading, or improving
                clarity. However, AI-generated content should not exceed 12% of
                the final submission. We value and encourage authentic student
                voices. Tools such as QuillBot may be used for grammar and
                language refinement.
              </p>
            </div>
          </div>

          {/* Rule 4: Originality */}
          <div
            style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}
          >
            <div
              style={{
                padding: "0.75rem",
                borderRadius: "50%",
                backgroundColor: "rgba(var(--primary-rgb), 0.1)",
                color: "var(--primary)",
                flexShrink: 0,
              }}
            >
              <Copy size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                4. Originality
              </h4>
              <p
                style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
              >
                Please submit your own original work. Sources, quotations,
                citations, and references should be properly credited where
                applicable. Plagiarism of any kind will lead to automatic
                rejection.
              </p>
            </div>
          </div>

          {/* Rule 5: Respect */}
          <div
            style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}
          >
            <div
              style={{
                padding: "0.75rem",
                borderRadius: "50%",
                backgroundColor: "rgba(var(--primary-rgb), 0.1)",
                color: "var(--primary)",
                flexShrink: 0,
              }}
            >
              <Heart size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                5. Respect
              </h4>
              <p
                style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
              >
                Submissions should not contain personal attacks, harassment,
                hate speech, slurs, or discriminatory content targeting any
                individual or group.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Review Banner */}
      <section
        className="contact-section"
        style={{
          padding: "4rem 2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "750px",
            backgroundColor: "var(--primary-bg)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "3rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="pub-card-cover-pattern honeycomb-bg"></div>
          <span className="section-label">Review Process</span>
          <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Editorial Board Review
          </h3>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: "1.7",
              marginBottom: 0,
            }}
          >
            All submissions are thoroughly reviewed by the Editorial Board
            before publication. The Board reserves the right to edit for
            style/clarity, reject, or request revisions from authors where
            necessary.
          </p>
        </div>
      </section>
    </div>
  );
}
