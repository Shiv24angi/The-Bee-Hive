import React, { useState, useMemo, useEffect } from 'react';
import { Download, Calendar, List, Grid, Search, FileText } from 'lucide-react';

export default function Archive({ archive, addToast }) {
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [editions, setEditions] = useState(archive);

  useEffect(() => {
    setEditions(archive);
  }, [archive]);

  // Search filter
  const filteredEditions = useMemo(() => {
    return editions.filter(ed => {
      return (
        ed.edition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ed.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ed.year.toString().includes(searchQuery)
      );
    });
  }, [editions, searchQuery]);

  // Group by year for timeline view
  const groupedEditions = useMemo(() => {
    const groups = {};
    filteredEditions.forEach(ed => {
      if (!groups[ed.year]) {
        groups[ed.year] = [];
      }
      groups[ed.year].push(ed);
    });
    
    // Sort years descending
    return Object.keys(groups)
      .sort((a, b) => b - a)
      .reduce((obj, key) => {
        obj[key] = groups[key];
        return obj;
      }, {});
  }, [filteredEditions]);

  const handleDownload = (id, title) => {
    addToast(`Downloading ${title}...`, "info");
    
    // Simulate short network delay for PDF download
    setTimeout(() => {
      // Increment download count in local state
      setEditions(prev => prev.map(ed => {
        if (ed.id === id) {
          return { ...ed, downloadCount: ed.downloadCount + 1 };
        }
        return ed;
      }));

      // Trigger dummy blob download for visual effect
      const element = document.createElement("a");
      const file = new Blob([`Dummy PDF content for ${title}`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      addToast(`${title} downloaded successfully!`, "success");
    }, 1500);
  };

  return (
    <div className="archive-container fade-in-up">
      <div className="archive-header">
        <div className="archive-header-text">
          <span className="section-label">Past Volumes</span>
          <h2>The Bee Hive Archives</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Access full publication catalog from previous semesters.</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="search-bar-container" style={{ width: '220px', margin: 0 }}>
            <input
              type="text"
              className="search-input"
              style={{ padding: '0.5rem 0.5rem 0.5rem 2.25rem', fontSize: '0.85rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search past editions..."
            />
            <Search className="search-icon-inside" size={14} />
          </div>

          <div className="view-toggle">
            <button 
              className={`view-toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => setViewMode('timeline')}
              title="Timeline View"
            >
              <List size={18} />
            </button>
            <button 
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid size={18} />
            </button>
          </div>
        </div>
      </div>

      {filteredEditions.length > 0 ? (
        viewMode === 'timeline' ? (
          /* Timeline View */
          <div className="archive-timeline">
            {Object.keys(groupedEditions).map(year => (
              <div key={year} className="timeline-year-group">
                <span className="timeline-year-label">{year}</span>
                <div className="timeline-nodes">
                  {groupedEditions[year].map(ed => (
                    <div key={ed.id} className="timeline-node">
                      <div className="timeline-node-info">
                        <h4>{ed.edition}</h4>
                        <p>{ed.description}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--accent-dark)', marginTop: '0.5rem', fontWeight: 600 }}>
                          Downloaded {ed.downloadCount} times
                        </p>
                      </div>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                        onClick={() => handleDownload(ed.id, ed.edition)}
                      >
                        <Download size={14} /> PDF
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Grid View */
          <div className="archive-grid">
            {filteredEditions.map(ed => (
              <div key={ed.id} className="archive-grid-card fade-in-up">
                <div className="archive-grid-cover" style={{ backgroundColor: ed.coverColor }}>
                  <div className="pub-card-cover-pattern honeycomb-bg"></div>
                  <FileText size={48} opacity={0.6} />
                </div>
                <div className="archive-grid-body">
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem', display: 'block' }}>
                    {ed.year} Edition
                  </span>
                  <h4>{ed.edition}</h4>
                  <p>{ed.description}</p>
                  
                  <div className="archive-grid-footer">
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {ed.downloadCount} downloads
                    </span>
                    <button 
                      className="btn btn-primary" 
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                      onClick={() => handleDownload(ed.id, ed.edition)}
                    >
                      <Download size={14} /> Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', border: '1px dashed var(--border)', borderRadius: '4px' }}>
          <h4 style={{ fontSize: '1.4rem', color: 'var(--text-secondary)' }}>No past editions found matching your search.</h4>
        </div>
      )}
    </div>
  );
}
