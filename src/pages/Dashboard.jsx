import React, { useState, useMemo } from 'react';
import { Eye, Check, X, FileText, Upload, CheckCircle, Clock, Search, Trash2, Database } from 'lucide-react';

export default function Dashboard({
  submissions,
  publications,
  onDeletePublication,
  onUpdateStatus,
  onPublish,
  archive,
  setArchive,
  addToast
}) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreview, setActivePreview] = useState(null);
  const [activeTab, setActiveTab] = useState('submissions'); // 'submissions' | 'publications' | 'compile'

  // Archive Compilation form state
  const [archiveEditionName, setArchiveEditionName] = useState('');
  const [archiveDescription, setArchiveDescription] = useState('');
  const [archiveCoverColor, setArchiveCoverColor] = useState('var(--honey-gold)');

  // Authentication State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return sessionStorage.getItem('beehive_authorized') === 'true';
  });
  const [showDenied, setShowDenied] = useState(false);

  // Hardcoded Board Members
  const BOARD_MEMBERS = {
    'neiljamespeters12@gmail.com': 'MiaLikesCoffee!09',
    'sanaavig@gmail.com': 'sanaaskids0302',
    'dograpakhi3011@gmail.com': 'hellomellow3011',
    'harshita.srikrishna@gmail.com': 'BlueBerry',
    'kavyadps2010@gmail.com': 'kavya2010'
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = BOARD_MEMBERS[email.toLowerCase().trim()];
    if (correctPassword && correctPassword === password) {
      setIsAuthorized(true);
      setShowDenied(false);
      sessionStorage.setItem('beehive_authorized', 'true');
      addToast("Welcome back, Editor!", "success");
    } else {
      setShowDenied(true);
      addToast("Unauthorized credentials!", "error");
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem('beehive_authorized');
    setEmail('');
    setPassword('');
    addToast("Logged out of editor session.", "info");
  };

  // Statistics calculation
  const stats = useMemo(() => {
    const total = submissions.length;
    const pending = submissions.filter(s => s.status === 'Pending').length;
    const approved = submissions.filter(s => s.status === 'Approved' || s.status === 'Published').length;
    const rejected = submissions.filter(s => s.status === 'Rejected').length;

    // Calculate approximate storage used
    const bytesSubmissions = new Blob([JSON.stringify(submissions)]).size;
    const bytesPublications = new Blob([JSON.stringify(publications)]).size;
    const totalBytes = bytesSubmissions + bytesPublications;
    const megabytes = (totalBytes / (1024 * 1024)).toFixed(2);

    return { total, pending, approved, rejected, storageMB: megabytes };
  }, [submissions, publications]);

  // Combined filters for Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      const matchesStatus = statusFilter === 'All' || sub.status === statusFilter;
      const matchesSearch =
        sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [submissions, statusFilter, searchQuery]);

  const handleApprove = (sub) => {
    onPublish(sub);
    addToast(`"${sub.title}" has been approved and published to the live site!`, "success");
  };

  const handleReject = (id) => {
    onUpdateStatus(id, 'Rejected');
    addToast("Submission marked as rejected.", "info");
  };

  // Archive compile submit
  const handleCompileSubmit = (e) => {
    e.preventDefault();
    if (!archiveEditionName.trim() || !archiveDescription.trim()) {
      addToast("Please fill out all fields to compile.", "error");
      return;
    }

    const newEdition = {
      id: `arch-${Date.now()}`,
      year: new Date().getFullYear(),
      edition: archiveEditionName,
      description: archiveDescription,
      downloadCount: 0,
      coverColor: archiveCoverColor
    };

    setArchive(prev => [newEdition, ...prev]);
    setArchiveEditionName('');
    setArchiveDescription('');
    addToast(`Successfully compiled and archived "${archiveEditionName}"!`, "success");
  };

  // Recent activity mock log (driven by the state changes)
  const activities = useMemo(() => {
    const list = [
      { id: 1, text: "Elena Rostova submitted a poem 'Chasing Fireflies'", time: "May 20, 2026", type: "submit" },
      { id: 2, text: "Marcus Chen submitted an article 'The Rise of Algorithmic Art'", time: "April 15, 2026", type: "submit" }
    ];

    submissions.forEach((sub, i) => {
      if (sub.status === 'Published' || sub.status === 'Approved') {
        list.unshift({ id: `act-pub-${i}`, text: `Dr. Sterling approved & published '${sub.title}' by ${sub.name}`, time: "Just now", type: "publish" });
      } else if (sub.status === 'Rejected') {
        list.unshift({ id: `act-rej-${i}`, text: `Devon Reynolds rejected '${sub.title}' by ${sub.name}`, time: "Just now", type: "reject" });
      } else {
        // Pending
        if (sub.id.startsWith('sub-17')) {
          list.unshift({ id: `act-sub-${i}`, text: `${sub.name} submitted '${sub.title}'`, time: "Just now", type: "submit" });
        }
      }
    });

    return list.slice(0, 5); // display top 5
  }, [submissions]);

  if (showDenied) {
    return (
      <div className="auth-container fade-in-up">
        <div className="auth-card denied">
          <div className="bee-lock-icon">
            <span style={{ fontSize: '4.5rem' }} role="img" aria-label="Access Denied">🐝🚫</span>
          </div>
          <h2 className="auth-title denied-title" style={{ color: '#EF4444' }}>OUT OF REACH!</h2>
          <p className="auth-subtitle">
            Bzzzt! Swarm protection activated! 🚫
          </p>
          <div className="denied-box">
            <p>
              This chamber of the hive is reserved strictly for Queen Bees and Editor Bees.
              If you aren't a registered member of the Editorial Board, you cannot browse or manage the submission queues.
            </p>
            <p style={{ marginTop: '0.75rem', fontWeight: 'bold', fontStyle: 'italic' }}>
              Back to the flowers for you! 🌸
            </p>
          </div>
          <div className="auth-actions" style={{ marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={() => setShowDenied(false)}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="auth-container fade-in-up">
        <div className="auth-card">
          <div className="auth-logo">
            <img src="/Beehive.svg" alt="The Bee Hive Logo" className="auth-logo-img" />
          </div>
          <h2 className="auth-title">Editor Authentication</h2>
          <p className="auth-subtitle">Enter your board credentials to access the editorial queue.</p>

          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group" style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
              <label htmlFor="auth-email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Board Email</label>
              <input
                id="auth-email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dpschdeditorialboard2627@gmail.com"
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <label htmlFor="auth-password" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Secret Key</label>
              <input
                id="auth-password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Unlock Dashboard
            </button>
          </form>

          <div className="auth-hint" style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              💡 Hint for testing: Use <code>neiljamespeters12@gmail.co</code> / <code>MiaLikesCoffee!09</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container fade-in-up">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <span className="section-label">Editorial Command</span>
          <h2 className="section-title">Editorial Board Dashboard</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Review pending student submissions and coordinate publication schedules.</p>
        </div>
        <button className="btn btn-secondary" onClick={handleLogout} style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
          Lock Session
        </button>
      </div>

      {/* Stats Panel */}
      <div className="dashboard-stats-row">
        <div className="dash-stat-card">
          <div className="dash-stat-icon">
            <Upload size={20} />
          </div>
          <div>
            <p className="dash-stat-value">{stats.total}</p>
            <p className="dash-stat-label">Total Submissions</p>
          </div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid var(--accent)' }}>
          <div className="dash-stat-icon" style={{ color: 'var(--accent-dark)' }}>
            <Clock size={20} />
          </div>
          <div>
            <p className="dash-stat-value">{stats.pending}</p>
            <p className="dash-stat-label">Pending Review</p>
          </div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid #1E5C36' }}>
          <div className="dash-stat-icon" style={{ color: '#1E5C36' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="dash-stat-value">{stats.approved}</p>
            <p className="dash-stat-label">Approved & Live</p>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon" style={{ color: '#EF4444' }}>
            <X size={20} />
          </div>
          <div>
            <p className="dash-stat-value">{stats.rejected}</p>
            <p className="dash-stat-label">Rejected</p>
          </div>
        </div>

        <div className="dash-stat-card" style={{ borderLeft: '4px solid #3B82F6' }}>
          <div className="dash-stat-icon" style={{ color: '#3B82F6' }}>
            <Database size={20} />
          </div>
          <div>
            <p className="dash-stat-value">{stats.storageMB} MB</p>
            <p className="dash-stat-label">Supabase Storage</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs" style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', marginBottom: '2.5rem' }}>
        <button
          className={`btn-tab ${activeTab === 'submissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('submissions')}
          style={{
            padding: '0.75rem 1.25rem',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'submissions' ? '3px solid var(--accent)' : '3px solid transparent',
            color: activeTab === 'submissions' ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem'
          }}
        >
          Submissions Queue
        </button>
        <button
          className={`btn-tab ${activeTab === 'publications' ? 'active' : ''}`}
          onClick={() => setActiveTab('publications')}
          style={{
            padding: '0.75rem 1.25rem',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'publications' ? '3px solid var(--accent)' : '3px solid transparent',
            color: activeTab === 'publications' ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem'
          }}
        >
          Live Publications ({publications.length})
        </button>
        <button
          className={`btn-tab ${activeTab === 'compile' ? 'active' : ''}`}
          onClick={() => setActiveTab('compile')}
          style={{
            padding: '0.75rem 1.25rem',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'compile' ? '3px solid var(--accent)' : '3px solid transparent',
            color: activeTab === 'compile' ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem'
          }}
        >
          Compile Archive
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'submissions' && (
        <div className="dashboard-grid">
          <div className="dashboard-main-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h3>Submitted Works Queue</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="search-bar-container" style={{ width: '220px' }}>
                  <input
                    type="text"
                    className="search-input"
                    style={{ padding: '0.5rem 0.5rem 0.5rem 2.25rem', fontSize: '0.85rem' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search queue..."
                  />
                  <Search className="search-icon-inside" size={14} />
                </div>

                <select
                  className="form-control"
                  style={{ width: '130px', padding: '0.5rem', fontSize: '0.85rem' }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Published">Published</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="submissions-table-container">
              {filteredSubmissions.length > 0 ? (
                <table className="submissions-table">
                  <thead>
                    <tr>
                      <th>Title & Creator</th>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Attachment</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((sub) => (
                      <tr key={sub.id}>
                        <td>
                          <strong style={{ display: 'block', fontSize: '0.95rem' }}>{sub.title}</strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{sub.name} ({sub.grade})</span>
                        </td>
                        <td style={{ fontSize: '0.85rem' }}>{sub.date}</td>
                        <td>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                            {sub.category.replace('s', '')}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--accent-dark)' }}>
                            <FileText size={12} />
                            <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setActivePreview(sub)}>
                              {sub.fileName}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge badge-${sub.status.toLowerCase()}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td>
                          <div className="actions-cell">
                            <button
                              className="btn-icon"
                              title="Preview Content"
                              onClick={() => setActivePreview(sub)}
                            >
                              <Eye size={14} />
                            </button>

                            {sub.status === 'Pending' && (
                              <>
                                <button
                                  className="btn-icon btn-approve"
                                  title="Approve & Publish"
                                  onClick={() => handleApprove(sub)}
                                  style={{ color: '#1E5C36' }}
                                >
                                  <Check size={14} />
                                </button>
                                <button
                                  className="btn-icon btn-reject"
                                  title="Reject"
                                  onClick={() => handleReject(sub.id)}
                                >
                                  <X size={14} style={{ color: '#EF4444' }} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>No submissions in queue matching filters.</p>
              )}
            </div>
          </div>

          <div>
            {/* Recent Activity Sidebar */}
            <div className="dashboard-sidebar-panel">
              <h3>Recent Actions</h3>
              <div className="activity-list">
                {activities.map((act) => (
                  <div key={act.id} className="activity-item">
                    <div className="activity-icon-container">
                      <Clock size={16} />
                    </div>
                    <div className="activity-details">
                      <p>{act.text}</p>
                      <p className="activity-time">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'publications' && (
        <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="dashboard-main-panel">
            <div style={{ marginBottom: '2rem' }}>
              <h3>Live Publications Catalog</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Review and manage active student works showing on the live website pages.
              </p>
            </div>

            <div className="submissions-table-container">
              {publications.length > 0 ? (
                <table className="submissions-table">
                  <thead>
                    <tr>
                      <th>Title & Creator</th>
                      <th>Category</th>
                      <th>Publish Date</th>
                      <th>Likes & Comments</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {publications.map((pub) => (
                      <tr key={pub.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {pub.avatarUrl && (
                              <img src={pub.avatarUrl} alt={pub.author} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--accent)' }} />
                            )}
                            <div>
                              <strong style={{ display: 'block', fontSize: '0.95rem' }}>{pub.title}</strong>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>By {pub.author} ({pub.grade})</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{pub.category}</span>
                        </td>
                        <td style={{ fontSize: '0.85rem' }}>{pub.date}</td>
                        <td style={{ fontSize: '0.85rem' }}>❤️ {pub.likes} Likes • 💬 {(pub.comments || []).length} Comments</td>
                        <td>
                          <button
                            className="btn-icon btn-reject"
                            title="Delete Publication"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete the publication "${pub.title}"?`)) {
                                onDeletePublication(pub.id);
                              }
                            }}
                          >
                            <Trash2 size={14} style={{ color: '#EF4444' }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>No live publications in catalog yet. Approve student applications to publish them here!</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'compile' && (
        <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="dashboard-main-panel" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <h3>Compile & Archive Volume</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Bundle the current collection of student publications into a new downloadable edition archive.
              </p>
            </div>

            <form onSubmit={handleCompileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Edition Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={archiveEditionName}
                  onChange={(e) => setArchiveEditionName(e.target.value)}
                  placeholder="e.g. Summer Edition - Issue 13"
                  required
                />
              </div>

              <div className="form-group" style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Theme Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={archiveDescription}
                  onChange={(e) => setArchiveDescription(e.target.value)}
                  placeholder="e.g. Theme: 'Metamorphosis' — Exploring growth, adaptation, and technology's role in our changing worlds."
                  required
                ></textarea>
              </div>

              <div className="form-group" style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Cover Theme Color</label>
                <select
                  className="form-control"
                  value={archiveCoverColor}
                  onChange={(e) => setArchiveCoverColor(e.target.value)}
                >
                  <option value="var(--honey-gold)">Honey Gold</option>
                  <option value="var(--forest-green)">Forest Green</option>
                  <option value="var(--charcoal)">Obsidian Charcoal</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Compile & Publish Volume
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {activePreview && (
        <div className="reader-modal-overlay" onClick={() => setActivePreview(null)}>
          <div className="reader-modal-content fade-in-up" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
            <div className="reader-modal-header" style={{ padding: '1.5rem 2rem' }}>
              <div>
                <span className="reader-modal-category">Submission Review</span>
                <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Reviewing Attachment: {activePreview.fileName}</h4>
              </div>
              <button className="reader-modal-close" onClick={() => setActivePreview(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="reader-modal-body" style={{ padding: '2rem 3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                {activePreview.avatarUrl && (
                  <img src={activePreview.avatarUrl} alt={activePreview.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }} />
                )}
                <div style={{ textAlign: 'left' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>{activePreview.name} ({activePreview.grade})</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{activePreview.email} • {activePreview.date}</p>
                </div>
              </div>

              <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', textAlign: 'left' }}>{activePreview.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'left' }}>
                <strong>Category:</strong> {activePreview.category.replace('s', '')}
              </p>

              <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', padding: '1.25rem', background: 'var(--primary-bg)', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.9rem', lineHeight: 1.6, textAlign: 'left' }}>
                {activePreview.content}
              </div>

              {activePreview.fileUrl && (
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  {activePreview.fileUrl.startsWith('data:application/pdf') ? (
                    <object data={activePreview.fileUrl} type="application/pdf" width="100%" height="600px" style={{ border: 'none', borderRadius: '4px' }}>
                      <p>Your browser doesn't support embedded PDFs. <a href={activePreview.fileUrl} download={activePreview.fileName} style={{ color: 'var(--accent)' }}>Download it here</a>.</p>
                    </object>
                  ) : activePreview.fileUrl.startsWith('data:image/') ? (
                    <img src={activePreview.fileUrl} alt={activePreview.fileName} style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain', borderRadius: '4px' }} />
                  ) : (
                    <div style={{ padding: '1rem', background: 'var(--primary-bg)', border: '1px solid var(--border)', borderRadius: '4px' }}>
                      <a href={activePreview.fileUrl} download={activePreview.fileName} style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 'bold' }}>📄 Download Attached File ({activePreview.fileName})</a>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="reader-modal-header" style={{ borderBottom: 'none', borderTop: '1px solid var(--border)', padding: '1rem 2rem', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => setActivePreview(null)}>Close Preview</button>
              {activePreview.status === 'Pending' && (
                <button className="btn btn-accent" onClick={() => { handleApprove(activePreview); setActivePreview(null); }}>Approve & Publish</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
