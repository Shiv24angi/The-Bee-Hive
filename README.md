# 🐝 The Bee Hive

> **"Where Creativity Finds Its Hive"**

[![React](https://img.shields.io/badge/React-19.2.6-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0.12-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-1.17.0-F4D58D?style=for-the-badge&logo=lucide)](https://lucide.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-0F3A20?style=for-the-badge)](https://opensource.org/licenses/MIT)

**The Bee Hive** is a student-led, high-fidelity digital literary magazine and creative publication platform. Designed with a clean, editorial-magazine aesthetic, it serves as a collaborative sanctuary for student writing, poetry, photography, experiences, and digital arts. It features a complete client-side publication workflow, allowing student editors to review submissions and publish them directly to a live, persistent catalog.

---

## 🎨 Key Features & Modules

### 1. Interactive Home & Hero
- **Floating Honeycomb Design**: Smooth SVG background patterns, radial hero gradients, and responsive animations.
- **Featured Works Carousel**: Showcases the three latest published student works.
- **Live Platform Statistics**: Displays live platform metrics (e.g., Published Works, Contributors, and Active Editions).

### 2. Publications Catalogue & Reader
- **Dynamic Category Filtering**: Browse works filtered by *Articles*, *Poetry*, *Short Stories*, *Experiences*, *Photography*, and *Artwork*.
- **Live Search**: Instant keyword filtering across author names, titles, and excerpts.
- **Interactive Reading Modal**: High-end reader overlays with adjustable typography, full-text layout, a "Liking" system, and a nested comments section.

### 3. Submission Portal
- **Draft Composition**: Simple submission forms for students to select categories, write content, and provide details (grade, name, contact email).
- **Custom Avatars & Mock Uploads**: Custom avatar selector and drag-and-drop file upload interfaces for graphic art or photography.

### 4. Editorial Board Dashboard (Internal Review)
- **Status Tracking**: Counters for *Total Submissions*, *Pending Review*, *Approved*, and *Published* works.
- **Editorial Action Console**: Table view of submissions where student editors can review drafts, approve, reject, or publish them instantly.
- **Archive Manager**: Ability to move older publications into the archive, dynamically updating the database.

### 5. Historical Archive
- **Dual Layout Views**: Toggle between an interactive timeline-style timeline history and a magazine-card grid layout.
- **Persisted Zine Cycles**: Keeps a record of previous editions and publications.

### 6. Editorial Guidelines & Policy Portal
- **Strict Content Policies**: Clearly defined parameters for school-friendly content, originality, respect, and non-partisan writing.
- **Multilingual Support**: Accepts submissions in English, Hindi, Punjabi, Sanskrit, French, and German.
- **AI Verification Standard**: Transparent limits on AI assistance (maximum 12% AI-generated threshold).

---

## 💻 Technology Stack

*   **Frontend Library:** [React 19](https://react.dev/) (Hooks, state composition, and effect encapsulation)
*   **Build Tooling & Dev Server:** [Vite 8](https://vitejs.dev/) (Fast HMR, optimized bundler)
*   **Iconography:** [Lucide React](https://lucide.dev/) (Sleek, lightweight vector icons)
*   **Styling System:** Vanilla CSS3 (Custom properties, grid systems, flexible flexboxes, glassmorphism, responsive queries, and animations)
*   **State Persistence:** LocalStorage API (Actions like publishing, comment additions, likes, and submission states are persistent on reload)

---

## 📂 Project Structure

```bash
beehive/
├── public/                 # Static assets (logos, mock member pictures)
├── src/
│   ├── assets/             # Global graphics and stylesheet attachments
│   ├── data/
│   │   └── mockData.js     # Default mock dataset (editorial board, initial articles)
│   ├── pages/              # Routing Components (Page Screens)
│   │   ├── About.jsx       # About us page & centered contact details
│   │   ├── Archive.jsx     # Timeline & grid views of historic publications
│   │   ├── Dashboard.jsx   # Editor workflow console
│   │   ├── Guidelines.jsx  # Submission policies & criteria
│   │   ├── Home.jsx        # Landing hero, platform statistics, featured works
│   │   ├── Publications.jsx# Filterable works database with reader overlay
│   │   └── SubmissionPortal.jsx # Student submission writing room
│   ├── App.css             # Entry Styles overrides
│   ├── App.jsx             # Main router, local storage sync, global states
│   ├── index.css           # CSS Variables, fonts, global UI system
│   └── main.jsx            # React mounting hook
├── index.html              # HTML shell & SEO meta-tags
├── package.json            # Script targets & dependencies
└── vite.config.js          # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/beehive.git
   cd beehive
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173` to view the application.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```

---

## 📜 Editorial Guidelines Summary

| Category | Length Limit | Supported Types / Details |
| :--- | :--- | :--- |
| **Articles** | Max 2 Pages | Book reviews, film reviews, opinion pieces, historical essays, commentary |
| **Short Stories** | Max 3 Pages | Fiction, narratives, creative prose, literary experiments |
| **Poetry** | Max 1 Page | All poetic forms and styles |
| **Experiences** | Max 4 Pages | Personal experiences, reflections, travel accounts, memories |
| **Photography** | Up to 5 Photos | High-resolution photographs with titles and captions |
| **Artwork** | Traditional & Digital | Paintings, sketches, digital art, illustrations |

### Core Policies
*   **School-Friendly**: Content must be appropriate for a general student audience.
*   **Political Neutrality**: No content promoting, attacking, or campaigning for current Indian political parties, politicians, or active elections.
*   **AI Policy**: AI tools may be used for brainstorming or grammar corrections (e.g., QuillBot), but the final submission must contain less than **12% AI-generated content**.
*   **Originality**: Standard anti-plagiarism guidelines apply.

---

## 👥 The Editorial Board (2026-2027)

*   **Neil James Peter** – President & Co-founder
*   **Kavya Sharma** – Secretary & Co-founder
*   **Sanaa Vig** – Secretary & Co-founder
*   **Pakhi Dogra** – Vice-President & Co-founder
*   **Harshita Srikrishna** – Vice-President & Co-founder
*   **Mrs. Ranjot Kaur** – Faculty Advisor

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
