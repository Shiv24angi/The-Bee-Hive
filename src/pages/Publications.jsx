import React, { useState, useMemo } from 'react';
import { Search, Heart, X, MessageSquare, PenTool, Send } from 'lucide-react';

export default function Publications({ publications, onLikePublication, onAddComment }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePubReader, setActivePubReader] = useState(null);
  
  // Comment Form state
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');

  const categories = ['All', 'Articles', 'Poetry', 'Photography', 'Artwork', 'Stories', 'Experiences'];

  // Filter and Search logic combined
  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const matchesCategory = selectedCategory === 'All' || pub.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [publications, selectedCategory, searchQuery]);

  // Open full reader
  const handleOpenReader = (pub) => {
    setActivePubReader(pub);
    // Body scroll lock
    document.body.style.overflow = 'hidden';
  };

  // Close reader
  const handleCloseReader = () => {
    setActivePubReader(null);
    setCommentAuthor('');
    setCommentText('');
    setCommentError('');
    document.body.style.overflow = 'auto';
  };

  // Submit comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentText.trim()) {
      setCommentError('Both name and comment are required.');
      return;
    }
    
    onAddComment(activePubReader.id, {
      author: commentAuthor,
      text: commentText
    });

    // Update active reader reference with the new comment immediately in UI
    setActivePubReader(prev => ({
      ...prev,
      comments: [...(prev.comments || []), { author: commentAuthor, text: commentText }]
    }));

    setCommentAuthor('');
    setCommentText('');
    setCommentError('');
  };

  return (
    <div className="publications-page-container fade-in-up">
      <div style={{ marginBottom: '3rem' }}>
        <span className="section-label">Browse Creative Works</span>
        <h2 className="section-title">The Creative Archives</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Explore poetry, experiences, photography, and essays written and captured by our students.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="pub-controls">
        <div className="search-bar-container">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, keywords..."
          />
          <Search className="search-icon-inside" size={18} />
        </div>

        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Publications Grid */}
      {filteredPublications.length > 0 ? (
        <div className="publications-grid">
          {filteredPublications.map((pub) => (
            <article key={pub.id} className="pub-card fade-in-up">
              <div className="pub-card-cover" style={{ backgroundColor: pub.coverColor }}>
                <div className="pub-card-cover-pattern honeycomb-bg"></div>
                <div className="pub-card-cover-graphic">
                  {pub.avatarUrl ? (
                    <img src={pub.avatarUrl} alt={pub.author} className="pub-card-avatar" />
                  ) : (
                    <PenTool size={36} opacity={0.6} />
                  )}
                  <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 600, marginTop: pub.avatarUrl ? '0.5rem' : '0' }}>
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
                <h3 className="pub-card-title" onClick={() => handleOpenReader(pub)}>
                  {pub.title}
                </h3>
                <p className="pub-card-author">By {pub.author} ({pub.grade})</p>
                <p className="pub-card-excerpt">{pub.excerpt}</p>
                <div className="pub-card-footer">
                  <span className="read-more-link" onClick={() => handleOpenReader(pub)}>
                    Read More
                  </span>
                  <div className="pub-likes" onClick={() => onLikePublication(pub.id)}>
                    <Heart size={14} fill="currentColor" style={{ color: 'var(--accent)' }} />
                    <span>{pub.likes}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', border: '1px dashed var(--border)', borderRadius: '4px' }}>
          <h4 style={{ fontSize: '1.4rem', color: 'var(--text-secondary)' }}>No publications found matching your search.</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Try modifying your search term or selecting another category.</p>
        </div>
      )}

      {/* Reader Modal Overlay */}
      {activePubReader && (
        <div className="reader-modal-overlay" onClick={handleCloseReader}>
          <div className="reader-modal-content fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="reader-modal-header">
              <div>
                <span className="reader-modal-category">{activePubReader.category}</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Published on {activePubReader.date}</p>
              </div>
              <button className="reader-modal-close" onClick={handleCloseReader}>
                <X size={24} />
              </button>
            </div>
            
            <div className="reader-modal-body">
              <h2 className="reader-modal-title">{activePubReader.title}</h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                {activePubReader.avatarUrl && (
                  <img src={activePubReader.avatarUrl} alt={activePubReader.author} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }} />
                )}
                <div>
                  <p style={{ margin: 0, fontWeight: 700, textAlign: 'left' }}>By {activePubReader.author} ({activePubReader.grade})</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'left' }}>{activePubReader.readTime} • Published on {activePubReader.date}</p>
                </div>
              </div>

              <div className="reader-modal-text-content">
                {activePubReader.content}
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <div className="pub-likes" style={{ fontSize: '1rem' }} onClick={() => {
                  onLikePublication(activePubReader.id);
                  // Refresh active viewer likes count
                  setActivePubReader(prev => ({ ...prev, likes: prev.likes + 1 }));
                }}>
                  <Heart size={18} fill="currentColor" style={{ color: 'var(--accent)' }} />
                  <span>{activePubReader.likes} Likes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MessageSquare size={18} />
                  <span>{(activePubReader.comments || []).length} Comments</span>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="reader-modal-comments-section">
              <h3 className="reader-modal-comments-title">Discussion</h3>
              
              <div style={{ marginBottom: '2.5rem' }}>
                <form onSubmit={handleCommentSubmit} noValidate>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '1rem', marginBottom: '1rem' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add a respectful comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                  </div>
                  {commentError && <p className="form-error-msg" style={{ marginBottom: '0.5rem' }}>{commentError}</p>}
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                    <Send size={12} /> Post Comment
                  </button>
                </form>
              </div>

              <div className="comments-list">
                {activePubReader.comments && activePubReader.comments.length > 0 ? (
                  activePubReader.comments.map((c, idx) => (
                    <div key={idx} className="comment-card">
                      <p className="comment-author">{c.author}</p>
                      <p className="comment-text">{c.text}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No comments yet. Start the conversation!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
