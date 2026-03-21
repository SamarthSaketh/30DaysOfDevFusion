import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Projects.css";
import { FiGithub, FiExternalLink, FiX, FiCode } from "react-icons/fi";

const techColors = {
  HTML: "#E34F26", CSS: "#1572B6", JavaScript: "#F7DF1E", React: "#61DAFB",
  "Node.js": "#339933", Express: "#888", MongoDB: "#47A248", Python: "#3776AB",
  Django: "#09c47c", Bootstrap: "#7952B3", Tkinter: "#FF6F00",
  TensorFlow: "#FF6F00", Keras: "#D00000", Git: "#F05032", GitHub: "#9b9b9b",
  "VS Code": "#007ACC", ".NET": "#512BD4", "C#": "#9B4F96", Vite: "#646CFF",
};

const filterMap = {
  Personal: "Personal",
  "Bharat Intern": "Internship",
  "Exposys Data Labs": "Internship",
  University: "University",
};

const projectsData = [
  {
    title: "30 Days of DevFusion",
    description: "A 30-day intensive development challenge where I built multiple real-world projects to strengthen full-stack skills – frontend, backend, and database integration.",
    details: "Built across 30 days, this challenge covers a wide range of technologies including React, Node.js, Django, .NET, MongoDB, and more. Each day tackled a new project concept — from responsive UIs to REST APIs to database-driven apps.",
    tech: ["HTML", "CSS", "JavaScript", "React", "Vite", "Bootstrap", "Python", "Node.js", "Django", ".NET", "C#", "MongoDB"],
    link: "https://github.com/SamarthSaketh/30DaysOfDevFusion",
    source: "Personal",
    featured: true,
  },
  {
    title: "Skin Lesion Detection (CNN)",
    description: "Deep learning model using CNNs to detect and classify skin diseases like eczema, psoriasis, and melanoma with high accuracy.",
    details: "Trained on a large dermatological image dataset, this model classifies skin conditions using a custom CNN architecture. Built with Python, TensorFlow/Keras, and served via a Django web interface for healthcare professionals.",
    tech: ["HTML", "CSS", "Python", "Django", "TensorFlow", "Keras"],
    link: "",
    source: "University",
    featured: true,
  },
  {
    title: "Library Management System",
    description: "Desktop app using Python & Tkinter to manage books, members, and due dates with MongoDB-based data persistence.",
    details: "A fully functional desktop library management system with book issuing, returning, member tracking, and due date management. Built with Python and Tkinter for the GUI and MongoDB for data persistence.",
    tech: ["Python", "Tkinter", "MongoDB"],
    link: "https://github.com/SamarthSaketh/University_Projects/tree/main/Library%20Management%20System",
    source: "University",
  },
  {
    title: "Registration Form",
    description: "Responsive user registration system using HTML, CSS, and Node.js, with data securely stored in MongoDB.",
    details: "A clean, fully responsive registration form with client-side validation, server-side processing using Node.js/Express, and secure data storage in MongoDB. Includes proper form UX patterns.",
    tech: ["HTML", "CSS", "Node.js", "MongoDB"],
    link: "https://github.com/SamarthSaketh/Bharat-Intern/tree/main/Registration_Form",
    source: "Bharat Intern",
  },
  {
    title: "Money Tracker",
    description: "Web app to manage expenses and income with budget tracking, financial insights, and MongoDB storage.",
    details: "A comprehensive personal finance tracking application. Users can log income/expenses by category, view budget summaries, and get insights into spending patterns. Built with Node.js and MongoDB.",
    tech: ["HTML", "CSS", "Node.js", "MongoDB"],
    link: "https://github.com/SamarthSaketh/Bharat-Intern/tree/main/Money_Tracker_App",
    source: "Bharat Intern",
  },
  {
    title: "Blog Website",
    description: "Dynamic blogging platform with post creation, editing, categorization, and secure user management.",
    details: "A full-featured CMS-style blog platform allowing users to create, publish, and manage articles. Features include post categorization, comment sections, and secure authentication using Node.js and MongoDB.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB", "Express"],
    link: "https://github.com/SamarthSaketh/Bharat-Intern/tree/main/Blog_Website",
    source: "Bharat Intern",
  },
  {
    title: "Burger Customization Website",
    description: "Interactive frontend for real-time burger customization with live selection preview.",
    details: "A fun and interactive UI where users can build their own burger by selecting ingredients. The interface updates in real-time, showing the visual burger and price dynamically as selections change.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/SamarthSaketh/Exposys-Data-Labs/tree/main/Burger_Customize",
    source: "Exposys Data Labs",
  },
  {
    title: "DDOS Packet Monitor",
    description: "Network monitoring tool to detect and track potential DDoS attacks with real-time visualization.",
    details: "A real-time packet monitoring dashboard that tracks network traffic patterns and flags anomalies indicative of DDoS attacks. Visualizes incoming packet rates over time and logs suspicious activity for analysis.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/SamarthSaketh/Exposys-Data-Labs/tree/main/DDOS_Monitor",
    source: "Exposys Data Labs",
  },
  {
    title: "CRUD Blog Application",
    description: "Blog platform with create/edit/delete posts and PDF export feature for offline sharing.",
    details: "A complete CRUD blogging application where users can create, read, update, and delete posts. A unique feature allows exporting any post as a formatted PDF for offline access or printing.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB", "Express"],
    link: "https://github.com/SamarthSaketh/Exposys-Data-Labs/tree/main/CRUD_Blog",
    source: "Exposys Data Labs",
  },
];

const filterTabs = ["All", "Personal", "Internship", "University"];
const INITIAL_SHOW = 6;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, scale: 0.92, transition: { duration: 0.2 } },
};

/* 3D tilt on mouse */
function useTilt(ref) {
  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - 0.5) * 16;
    const y = ((e.clientY - top)  / height - 0.5) * -12;
    el.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) translateZ(6px)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return { onMouseMove, onMouseLeave };
}

function ProjectCard({ proj, onClick }) {
  const ref = React.useRef(null);
  const { onMouseMove, onMouseLeave } = useTilt(ref);
  return (
    <motion.div
      ref={ref}
      className={`proj-card ${proj.featured ? "proj-card-featured" : ""}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(proj)}
      style={{ cursor: "pointer" }}
    >
      <div className="proj-card-header">
        <span className={`proj-source ${(filterMap[proj.source] || proj.source).toLowerCase()}`}>
          {proj.source}
        </span>
        {proj.featured && <span className="proj-featured-badge">⭐ Featured</span>}
        {proj.link && (
          <a
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-gh-link"
            onClick={(e) => e.stopPropagation()}
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
        )}
      </div>
      <h3 className="proj-title">{proj.title}</h3>
      <p className="proj-desc">{proj.description}</p>
      <div className="proj-tech">
        {proj.tech.slice(0, 5).map((t, i) => (
          <span key={i} className="proj-tech-tag" style={{ "--tc": techColors[t] || "#888" }}>{t}</span>
        ))}
        {proj.tech.length > 5 && <span className="proj-tech-more">+{proj.tech.length - 5}</span>}
      </div>
      <div className="proj-card-footer">
        <span className="proj-detail-hint"><FiExternalLink size={13} /> View Details</span>
      </div>
    </motion.div>
  );
}

/* Modal */
function ProjectModal({ proj, onClose }) {
  if (!proj) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-card"
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.94 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close"><FiX /></button>

          <div className="modal-header">
            <span className={`proj-source ${(filterMap[proj.source] || proj.source).toLowerCase()}`}>{proj.source}</span>
            {proj.featured && <span className="proj-featured-badge">⭐ Featured</span>}
          </div>

          <h2 className="modal-title">{proj.title}</h2>
          <p className="modal-detail">{proj.details || proj.description}</p>

          <div className="modal-tech">
            <h4 className="modal-section-label"><FiCode size={14} /> Tech Stack</h4>
            <div className="proj-tech">
              {proj.tech.map((t, i) => (
                <span key={i} className="proj-tech-tag" style={{ "--tc": techColors[t] || "#888" }}>{t}</span>
              ))}
            </div>
          </div>

          {proj.link && (
            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="btn-gold modal-btn">
              <FiGithub size={16} /> View on GitHub
            </a>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedProj, setSelectedProj] = useState(null);

  const filtered = projectsData.filter(
    (p) => activeFilter === "All" || filterMap[p.source] === activeFilter || p.source === activeFilter
  );
  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_SHOW);

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <p className="section-label">— Things I've built</p>
        <h2 className="section-title reveal">Projects</h2>
        <div className="section-divider reveal delay-100" />

        {/* Filter Tabs */}
        <div className="proj-filters">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              className={`proj-filter-btn ${activeFilter === tab ? "active" : ""}`}
              onClick={() => { setActiveFilter(tab); setShowAll(false); }}
            >
              {tab}
              <span className="proj-filter-count">
                {tab === "All" ? projectsData.length
                  : projectsData.filter(p => filterMap[p.source] === tab || p.source === tab).length}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div className="proj-grid" layout>
          <AnimatePresence mode="popLayout">
            {displayed.map((proj) => (
              <ProjectCard key={proj.title} proj={proj} onClick={setSelectedProj} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More */}
        {filtered.length > INITIAL_SHOW && (
          <div className="proj-show-more">
            <button className="proj-more-btn" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less ↑" : `Show ${filtered.length - INITIAL_SHOW} More ↓`}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProj && (
        <ProjectModal proj={selectedProj} onClose={() => setSelectedProj(null)} />
      )}
    </section>
  );
};

export default Projects;
