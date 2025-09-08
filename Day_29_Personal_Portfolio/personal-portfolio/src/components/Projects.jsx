import React from "react";
import "./Projects.css";

const techColors = {
  HTML: "#E34F26",
  CSS: "#1572B6",
  JavaScript: "#F7DF1E",
  React: "#61DAFB",
  "Node.js": "#81cb81ff",
  Express: "#000000",
  MongoDB: "#47A248",
  Python: "#3776AB",
  Django: "#092E20",
  Bootstrap: "#7952B3",
  Tkinter: "#FF6F00",
  Tensorflow: "#4479A1",
  Git: "#F05032",
  GitHub: "#171515",
  "VS Code": "#007ACC",
  "Visual Studio": "#5C2D91",
  ".NET": "#512BD4",
  "C#": "#9B4F96",
  SocketIO: "#010101",
  Keras: "#D00000",
  Vite: "#646CFF",
};

const sourceColors = {
  Personal: "#28a745",
  "Bharat Intern": "#6610f2",
  University: "#0e65e8ff",
  "Exposys Data Labs": "#fd7e14",
};

const projectsData = [
  {
    title: "Library Management System(Tkinter)",
    description:
      "Library Management System – Developed a desktop app using Python and Tkinter to manage books, members, and due dates with features like issuing/returning books and real-time updates. Implemented basic data persistence using file handling/MongoDB.",
    tech: ["Python", "Tkinter", "MongoDB"],
    link: "https://github.com/SamarthSaketh/University_Projects/tree/main/Library%20Management%20System",
    source: "University",
  },
  {
    title: "Registration Form",
    description:
      "Registration Form – Built a responsive user registration system using HTML, CSS, and Node.js, with data securely stored in MongoDB for efficient user management.",
    tech: ["HTML", "CSS", "Node.js", "MongoDB"],
    link: "https://github.com/SamarthSaketh/Bharat-Intern/tree/main/Registration_Form",
    source: "Bharat Intern",
  },
  {
    title: "Money Tracker",
    description:
      "Money Tracker App – Developed a web application using HTML, CSS, Node.js, and MongoDB to manage expenses and income, featuring budget tracking and financial insights for better money management.",
    tech: ["HTML", "CSS", "Node.js", "MongoDB"],
    link: "https://github.com/SamarthSaketh/Bharat-Intern/tree/main/Money_Tracker_App",
    source: "Bharat Intern",
  },
  {
    title: "Blog Website",
    description:
      "Blog Website – Designed and developed a dynamic blogging platform using HTML, CSS, Node.js, and MongoDB, enabling users to read, write, and manage posts with secure data storage.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB","Express"],
    link: "https://github.com/SamarthSaketh/Bharat-Intern/tree/main/Blog_Website",
    source: "Bharat Intern",
  },
  {
    title: "Burger Customization Website",
    description:
      "Designed a responsive frontend interface using HTML, CSS, and JavaScript, allowing users to customize burgers and view their selections in real time for an interactive user experience.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/SamarthSaketh/Exposys-Data-Labs/tree/main/Burger_Customize",
    source: "Exposys Data Labs",
  },
  {
    title: "DDOS Packet Monitor",
    description:
      "Created a network monitoring tool to detect and track potential DDoS attacks, featuring real-time data visualization and storage for analysis.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/SamarthSaketh/Exposys-Data-Labs/tree/main/DDOS_Monitor",
    source: "Exposys Data Labs",
  },
  {
    title: "CRUD Blog Application",
    description:
      "Built a dynamic platform for creating, editing, and managing blog posts, with an integrated feature to export posts as PDFs for easy sharing and offline access.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB","Express"],
    link: "https://github.com/SamarthSaketh/Exposys-Data-Labs/tree/main/CRUD_Blog",
    source: "Exposys Data Labs",
  },
  {
    title:"Skin Lesion Detection using CNN",
    description:
      "Skin Disease Detection System – Developed a deep learning model using CNNs to detect and classify common skin diseases like eczema, psoriasis, and melanoma. Trained on a dermatological image dataset, achieving high accuracy to assist healthcare professionals in early and accurate diagnosis. Built with Python and TensorFlow/Keras.",
    tech:["HTML","CSS","Python","Django","TensorFlow","Keras"],
    link:"",
    source:"University"
  },
    {
    title:"30 Days of DevFusion",
    description:
      "30 Days Dev Fusion – A 30-day intensive development challenge where I built multiple real-world projects to strengthen my full-stack development skills, including frontend, backend, and database integration. The projects focused on responsive design, interactivity, and practical problem-solving.",
    tech: ["HTML", "CSS", "JavaScript", "React", "Vite", "Bootstrap", "Python", "Node.js", "Django", ".NET", "C#",  "MongoDB", "Git", "GitHub",  "VS Code", ],
    link:"https://github.com/SamarthSaketh/30DaysOfDevFusion",
    source:"Personal"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="projects-ref-section">
      <div className="projects-ref-container">
        <h2 className="projects-ref-title">Projects</h2>
        <div className="projects-ref-grid">
          {projectsData.map((proj, idx) => (
            <div key={idx} className="projects-ref-card">
              <div
                className="projects-ref-badge"
                style={{ backgroundColor: sourceColors[proj.source] }}
              >
                {proj.source}
              </div>
              <h3 className="projects-ref-name">{proj.title}</h3>
              <p className="projects-ref-desc">{proj.description}</p>
              <div className="projects-ref-tech">
                {proj.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="projects-ref-tech-badge"
                    style={{ backgroundColor: techColors[tech] || "#6610f2" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="projects-ref-link"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
