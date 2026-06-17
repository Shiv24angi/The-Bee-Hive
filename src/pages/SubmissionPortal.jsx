import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, Trash2, ArrowRight } from 'lucide-react';

export default function SubmissionPortal({ onSubmitSubmission, addToast }) {
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    email: '',
    category: '',
    title: '',
    avatarUrl: '',
    content: ''
  });
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const categories = ['Article', 'Poetry', 'Photography', 'Artwork', 'Story', 'Experience'];

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        addToast("Please upload an image file (PNG/JPG).", "error");
        return;
      }
      if (selectedFile.size > 2 * 1024 * 1024) {
        addToast("Avatar image must be smaller than 2MB.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, avatarUrl: event.target.result }));
        setErrors(prev => {
          const copy = { ...prev };
          delete copy.avatarUrl;
          return copy;
        });
        addToast("Profile photo uploaded successfully!", "success");
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required.";
    if (!formData.grade.trim()) tempErrors.grade = "Class/Grade is required.";
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!formData.category) tempErrors.category = "Please select the type of work.";
    if (!formData.title.trim()) tempErrors.title = "Title of the work is required.";
    if (!formData.avatarUrl) tempErrors.avatarUrl = "Please upload a photo of yourself.";
    if (!formData.content.trim()) tempErrors.content = "Content or description details are required.";
    if (!file) tempErrors.file = "Please upload your work file (PDF, DOCX, JPG, PNG).";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
      'image/jpeg',
      'image/png'
    ];
    
    const extension = selectedFile.name.split('.').pop().toLowerCase();
    const isAllowedExt = ['pdf', 'docx', 'jpg', 'jpeg', 'png'].includes(extension);

    if (!allowedTypes.includes(selectedFile.type) && !isAllowedExt) {
      addToast("Unsupported file type! Please upload PDF, DOCX, JPG, or PNG.", "error");
      return;
    }

    // Check size limit: 10MB
    if (selectedFile.size > 10 * 1024 * 1024) {
      addToast("File is too large! Maximum limit is 10MB.", "error");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileUrl(e.target.result);
    };
    reader.readAsDataURL(selectedFile);

    // Clear file error if any
    setErrors(prev => {
      const copy = { ...prev };
      delete copy.file;
      return copy;
    });
    addToast(`File "${selectedFile.name}" selected!`, "success");
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setFileUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      let finalFileUrl = fileUrl;
      if (!finalFileUrl && file) {
        finalFileUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
      }

      // Create submission payload
      const submission = {
        id: `sub-${Date.now()}`,
        name: formData.name,
        grade: formData.grade,
        email: formData.email,
        category: formData.category + 's', // Make plural to match standard catalog format
        title: formData.title,
        avatarUrl: formData.avatarUrl,
        content: formData.content,
        fileName: file.name,
        fileUrl: finalFileUrl,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        status: "Pending"
      };

      onSubmitSubmission(submission);
      setIsSubmitted(true);
      addToast("Work submitted successfully to the editorial queue!", "success");
    } else {
      addToast("Please complete all required fields and upload your file.", "error");
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      grade: '',
      email: '',
      category: '',
      title: '',
      avatarUrl: '',
      content: ''
    });
    setFile(null);
    setFileUrl(null);
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <div className="submission-page fade-in-up">
      {!isSubmitted ? (
        <div className="submission-card">
          <h2>Submit Your Work</h2>
          <p className="submission-intro">
            We review and publish works on a rolling basis. Please complete the form below, upload your file, 
            and our editorial board will review your piece during the current cycle.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label htmlFor="sub-name">Full Name</label>
                <input
                  id="sub-name"
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Elena Rostova"
                />
                {errors.name && <p className="form-error-msg">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="sub-grade">Class / Grade</label>
                <input
                  id="sub-grade"
                  type="text"
                  className="form-control"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  placeholder="Grade 11"
                />
                {errors.grade && <p className="form-error-msg">{errors.grade}</p>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sub-email">Email Address</label>
              <input
                id="sub-email"
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="elena@student.edu"
              />
              {errors.email && <p className="form-error-msg">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="sub-category">Type of Work</label>
              <select
                id="sub-category"
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select Category...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="form-error-msg">{errors.category}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="sub-title">Title of Work</label>
              <input
                id="sub-title"
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Chasing Fireflies"
              />
              {errors.title && <p className="form-error-msg">{errors.title}</p>}
            </div>

            <div className="form-group">
              <label style={{ fontWeight: 700 }}>Your Profile Photo</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.5rem' }}>
                <div className="avatar-preview-box">
                  {formData.avatarUrl ? (
                    <img src={formData.avatarUrl} alt="Preview" className="avatar-preview-img" />
                  ) : (
                    <div className="avatar-preview-placeholder">👤</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="file"
                    accept="image/*"
                    id="student-avatar-upload"
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => document.getElementById('student-avatar-upload').click()}
                    style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                  >
                    Upload Photo
                  </button>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', margin: 0 }}>
                    Upload a portrait photo of yourself (PNG/JPG up to 2MB).
                  </p>
                </div>
              </div>
              {errors.avatarUrl && <p className="form-error-msg">{errors.avatarUrl}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="sub-content">Content / Body / Statement</label>
              <textarea
                id="sub-content"
                className="form-control"
                rows="6"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Paste the full text of your poem, essay, story, or artist statement for visuals..."
              ></textarea>
              {errors.content && <p className="form-error-msg">{errors.content}</p>}
            </div>

            <div className="form-group">
              <label>Upload File</label>
              <div 
                className={`file-upload-area ${isDragOver ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input 
                  type="file" 
                  style={{ display: 'none' }} 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.jpg,.jpeg,.png"
                />
                
                {!file ? (
                  <>
                    <Upload className="file-upload-icon" size={36} />
                    <p className="file-upload-label">Drag & drop your file here, or click to browse</p>
                    <p className="file-upload-subtext">Supports PDF, DOCX, JPG, PNG up to 10MB</p>
                  </>
                ) : (
                  <div className="uploaded-file-preview" onClick={(e) => e.stopPropagation()}>
                    <div className="uploaded-file-info">
                      <FileText size={20} style={{ color: 'var(--primary)' }} />
                      <div style={{ textAlign: 'left' }}>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>{file.name}</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button type="button" className="remove-file-btn" onClick={handleRemoveFile}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              {errors.file && <p className="form-error-msg">{errors.file}</p>}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
              Submit Application
            </button>
          </form>
        </div>
      ) : (
        <div className="submission-card success-overlay">
          <div className="success-icon-container">
            <CheckCircle2 size={48} />
          </div>
          <h2 style={{ marginBottom: '1rem' }}>Submission Received!</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeights: '1.6' }}>
            Thank you, <strong>{formData.name}</strong>. Your work <strong>"{formData.title}"</strong> has been successfully 
            sent to the editorial queue. A confirmation email has been sent to <strong>{formData.email}</strong>.
          </p>
          
          <div style={{ border: '1px solid var(--border)', borderRadius: '4px', padding: '1.5rem', marginBottom: '2.5rem', backgroundColor: 'var(--primary-bg)' }}>
            <h5 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Future Ready Live Demo Notice:</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              In this prototype, your submission is immediately loaded into the **Editorial Dashboard**. 
              You can navigate to the dashboard to review, approve, and publish your work to the live catalog!
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={handleResetForm}>
              Submit Another Piece
            </button>
            <button className="btn btn-primary" onClick={() => onSubmitSubmission(null, 'dashboard')}>
              Go to Dashboard <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
