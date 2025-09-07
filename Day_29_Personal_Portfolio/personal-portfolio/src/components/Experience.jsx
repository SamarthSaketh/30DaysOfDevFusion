import React from 'react';
import './Experience.css';

const experiences = [
  {
    title: 'Full Stack Developer Intern',
    company: 'Bharat Intern',
    date: 'March 2024 - April 2024',
    description: 'Developed a Money Tracker app with budget summaries, designed a secure responsive registration form, and created a Blog app with post categorization and commenting.',
    current: false,
    mode: 'Online',
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'Exposys Data Labs ',
    date: 'June 2024 - August 2024',
    description: 'Built a Blog app with PDF export for posts, developed a Burger Customization website, and implemented a DDoS Packet Monitor tool.',
    current: false,
    mode: 'Online',
  },
  {
    title: '.NET Developer Intern',
    company: 'eMudhra',
    date: 'September 2024 - Present',
    description: 'Completed an internship as a Trainee, gaining hands-on experience and applying C#, .NET MVC, Razor Pages, Blazor, and Web API in real-world projects.',
    current: false,
    mode: 'Offline',
  },
    {
    title: 'Junior Software Developer',
    company: 'eMudhra',
    date: 'June 2025 - Present',
    description: 'Completed an internship as a Trainee, gaining hands-on experience and applying C#, .NET MVC, Razor Pages, Blazor, and Web API in real-world projects.',
    current: true,
    mode: 'Offline',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <h2 className="section-title">Internships & Experience</h2>
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`experience-item ${index % 2 === 0 ? 'top' : 'bottom'}`}
          >
            <div className="experience-dot"></div>
            <div className={`experience-content ${exp.current ? 'present' : ''}`}>
              <h5>{exp.title}</h5>
              <span className="experience-company">{exp.company}</span>
              <span className="experience-duration">{exp.date}</span>

              {/* Badges for current status and mode */}
              <div className="experience-badges">
                <span className={`experience-status ${exp.current ? 'present' : 'past'}`}>
                  {exp.current ? 'Currently Working' : 'Past Role'}
                </span>
                <span className={`experience-mode ${exp.mode.toLowerCase()}`}>
                  {exp.mode}
                </span>
              </div>

              <p className="experience-description">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
