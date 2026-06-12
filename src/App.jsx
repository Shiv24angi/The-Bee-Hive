import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Heart,
  Mail,
  Info,
  CheckCircle2,
  ChevronRight,
  PenTool,
} from "lucide-react";
import { initialPublications, initialSubmissions } from "./data/mockData";
import { supabase } from "./supabaseClient";

// Import Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Guidelines from "./pages/Guidelines";
import Publications from "./pages/Publications";
import SubmissionPortal from "./pages/SubmissionPortal";
import Dashboard from "./pages/Dashboard";
import Archive from "./pages/Archive";

export default function App() {
  // Navigation & Theme State
  const [currentPage, setCurrentPage] = useState("home");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Stateful Data (from Supabase cloud database with LocalStorage backup)
  const [publications, setPublications] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [archive, setArchive] = useState([]);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Load initial data on mount
  useEffect(() => {
    const fetchData = async () => {
      if (supabase) {
        try {
          // Fetch publications
          const { data: pubs, error: pubsError } = await supabase
            .from("publications")
            .select("*")
            .order("created_at", { ascending: false });
          if (pubsError) throw pubsError;
          setPublications(pubs || []);

          // Fetch submissions
          const { data: subs, error: subsError } = await supabase
            .from("submissions")
            .select("*")
            .order("created_at", { ascending: false });
          if (subsError) throw subsError;
          setSubmissions(subs || []);

          // Fetch archive
          const { data: archs, error: archsError } = await supabase
            .from("archive")
            .select("*")
            .order("created_at", { ascending: false });
          if (archsError) throw archsError;
          setArchive(archs || []);
        } catch (err) {
          console.error("Error loading data from Supabase:", err);
          addToast(
            "Database connection offline. Using local browser backup.",
            "error",
          );
          loadFallback();
        }
      } else {
        loadFallback();
      }
    };

    const loadFallback = () => {
      const savedPubs = localStorage.getItem("beehive_pubs_real");
      setPublications(savedPubs ? JSON.parse(savedPubs) : initialPublications);

      const savedSubs = localStorage.getItem("beehive_subs_real");
      setSubmissions(savedSubs ? JSON.parse(savedSubs) : initialSubmissions);

      const savedArchive = localStorage.getItem("beehive_archive_real");
      setArchive(savedArchive ? JSON.parse(savedArchive) : []);
    };

    fetchData();
  }, []);

  // Apply dark mode theme attribute to html tag
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toast Notification helper
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    addToast(
      `Switched to ${theme === "light" ? "Dark" : "Light"} Mode!`,
      "success",
    );
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // State modifiers for live interactivity (synced to Supabase/localStorage)
  const handleLikePublication = async (pubId) => {
    let updatedLikes = 0;
    setPublications((prev) =>
      prev.map((pub) => {
        if (pub.id === pubId) {
          updatedLikes = pub.likes + 1;
          return { ...pub, likes: updatedLikes };
        }
        return pub;
      }),
    );

    if (supabase) {
      try {
        const { error } = await supabase
          .from("publications")
          .update({ likes: updatedLikes })
          .eq("id", pubId);
        if (error) throw error;
      } catch (err) {
        console.error("Error updating likes on Supabase:", err);
      }
    }
  };

  const handleAddComment = async (pubId, comment) => {
    let updatedComments = [];
    setPublications((prev) =>
      prev.map((pub) => {
        if (pub.id === pubId) {
          const comments = pub.comments || [];
          updatedComments = [...comments, comment];
          return { ...pub, comments: updatedComments };
        }
        return pub;
      }),
    );
    addToast("Comment posted successfully!", "success");

    if (supabase) {
      try {
        const { error } = await supabase
          .from("publications")
          .update({ comments: updatedComments })
          .eq("id", pubId);
        if (error) throw error;
      } catch (err) {
        console.error("Error adding comment on Supabase:", err);
      }
    }
  };

  const handleAddSubmission = async (submission, redirectPage = null) => {
    if (submission) {
      setSubmissions((prev) => [submission, ...prev]);
      if (supabase) {
        try {
          const { error } = await supabase
            .from("submissions")
            .insert([submission]);
          if (error) throw error;
        } catch (err) {
          console.error("Error writing submission to Supabase:", err);
          addToast("Database error. Saved to local backup only.", "error");
        }
      }
    }
    if (redirectPage) {
      handleNavigate(redirectPage);
    }
  };

  const handleUpdateSubmissionStatus = async (subId, newStatus) => {
    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === subId) {
          return { ...sub, status: newStatus };
        }
        return sub;
      }),
    );

    if (supabase) {
      try {
        const { error } = await supabase
          .from("submissions")
          .update({ status: newStatus })
          .eq("id", subId);
        if (error) throw error;
      } catch (err) {
        console.error("Error updating status on Supabase:", err);
      }
    }
  };

  const handleDeletePublication = async (pubId) => {
    setPublications((prev) => prev.filter((pub) => pub.id !== pubId));
    addToast("Publication deleted successfully.", "info");

    if (supabase) {
      try {
        const { error } = await supabase
          .from("publications")
          .delete()
          .eq("id", pubId);
        if (error) throw error;
      } catch (err) {
        console.error("Error deleting publication on Supabase:", err);
      }
    }
  };

  const handlePublishSubmission = async (submission) => {
    // 1. Mark status as Published
    await handleUpdateSubmissionStatus(submission.id, "Published");

    // 2. Add to publications catalogue
    const newPub = {
      id: `pub-new-${Date.now()}`,
      title: submission.title,
      author: submission.name,
      grade: submission.grade,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      category: submission.category,
      excerpt: "By " + submission.name,
      content: submission.content,
      avatarUrl: submission.avatarUrl || "",
      coverUrl: "",
      coverColor:
        submission.category === "Poetries" || submission.category === "Poetry"
          ? "var(--honey-gold-light)"
          : "var(--forest-green-light)",
      readTime: "3 min read",
      likes: 0,
      comments: [],
    };

    setPublications((prev) => [newPub, ...prev]);

    if (supabase) {
      try {
        const { error } = await supabase.from("publications").insert([newPub]);
        if (error) throw error;
      } catch (err) {
        console.error("Error saving new publication to Supabase:", err);
      }
    }
  };

  const handleSetArchive = async (value) => {
    if (typeof value === "function") {
      setArchive((prev) => {
        const next = value(prev);
        if (next.length > prev.length && supabase) {
          const addedItem = next[0];
          supabase
            .from("archive")
            .insert([addedItem])
            .catch((err) => {
              console.error("Error writing archive to Supabase:", err);
            });
        }
        return next;
      });
    } else {
      setArchive(value);
      if (supabase && Array.isArray(value)) {
        try {
          const { error } = await supabase.from("archive").insert(value);
          if (error) throw error;
        } catch (err) {
          console.error("Error batch writing archive to Supabase:", err);
        }
      }
    }
  };

  // Route Renderer
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home
            onNavigate={handleNavigate}
            onReadPublication={(pub) => {
              handleNavigate("publications");
              sessionStorage.setItem("open_pub_id", pub.id);
            }}
          />
        );
      case "about":
        return <About addToast={addToast} />;
      case "guidelines":
        return <Guidelines />;
      case "publications":
        return (
          <Publications
            publications={publications}
            onLikePublication={handleLikePublication}
            onAddComment={handleAddComment}
          />
        );
      case "submissions":
        return (
          <SubmissionPortal
            onSubmitSubmission={handleAddSubmission}
            addToast={addToast}
          />
        );
      case "dashboard":
        return (
          <Dashboard
            submissions={submissions}
            publications={publications}
            onDeletePublication={handleDeletePublication}
            onUpdateStatus={handleUpdateSubmissionStatus}
            onPublish={handlePublishSubmission}
            archive={archive}
            setArchive={handleSetArchive}
            addToast={addToast}
          />
        );
      case "archive":
        return <Archive archive={archive} addToast={addToast} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app-container">
      {/* Sticky Header */}
      <header className="sticky-header">
        <nav className="navbar">
          <div className="nav-brand" onClick={() => handleNavigate("home")}>
            <img
              src="/Beehive.svg"
              alt="The Bee Hive Logo"
              className="nav-logo"
            />
            <span>The Bee Hive</span>
          </div>

          <ul className={`nav-links ${mobileMenuOpen ? "mobile-show" : ""}`}>
            <li>
              <a
                href="#home"
                className={currentPage === "home" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("home");
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={currentPage === "about" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("about");
                }}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#guidelines"
                className={currentPage === "guidelines" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("guidelines");
                }}
              >
                Guidelines
              </a>
            </li>
            <li>
              <a
                href="#publications"
                className={currentPage === "publications" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("publications");
                }}
              >
                Publications
              </a>
            </li>
            <li>
              <a
                href="#submissions"
                className={currentPage === "submissions" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("submissions");
                }}
              >
                Submit Work
              </a>
            </li>
            <li>
              <a
                href="#archive"
                className={currentPage === "archive" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("archive");
                }}
              >
                Archive
              </a>
            </li>
            <li>
              <a
                href="#dashboard"
                className={currentPage === "dashboard" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("dashboard");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <ShieldCheck size={16} /> Board Dashboard
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title="Toggle Theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              title="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Router */}
      <main className="main-content">{renderPage()}</main>

      {/* Footer */}
      <footer className="footer">
        <div className="honeycomb-bg" style={{ opacity: 0.03 }}></div>
        <div className="footer-content">
          <div className="footer-brand">
            <h3>The Bee Hive</h3>
            <p>
              A collaborative sanctuary for student writing, poetry,
              photography, experiences, and digital arts.
            </p>
            <div className="footer-socials">
              <a href="#instagram" className="social-link" title="Instagram">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#twitter" className="social-link" title="Twitter">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
              <a href="#medium" className="social-link" title="Medium">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate("home");
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate("about");
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#guidelines"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate("guidelines");
                  }}
                >
                  Guidelines
                </a>
              </li>
              <li>
                <a
                  href="#publications"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate("publications");
                  }}
                >
                  Creative Works
                </a>
              </li>
              <li>
                <a
                  href="#archive"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate("archive");
                  }}
                >
                  Archives
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>
              <Mail size={14} /> dpschdeditorialboard2627@gmail.com
            </p>
            <p>
              <Info size={14} /> Submissions rolling quarterly
            </p>
            <p>
              <ShieldCheck size={14} /> Student-Led & Faculty-Advised
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} The Bee Hive Publication. All
            rights reserved.
          </p>
          <p>Created by students for creative growth.</p>
        </div>
      </footer>

      {/* Dynamic Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast ${toast.type === "success" ? "toast-success" : ""}`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={18} style={{ color: "#1E5C36" }} />
            ) : (
              <Info size={18} style={{ color: "var(--accent-dark)" }} />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
