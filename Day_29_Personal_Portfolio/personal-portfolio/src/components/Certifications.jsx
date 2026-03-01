import React from "react";
import "./Certifications.css";

const certifications = [
  {
    title: "Microsoft Azure Fundamentals",
    organization: "Microsoft",
    date: "April 26th 2022",
    credentialId: "I241-2821",
    // credentialUrl: "https://www.credly.com/badges/6dbd9c3a-dec5-46db-b603-0b9ffbbab37c",
    credentialUrl: "/certs/microsoft-AZ-900.pdf",
    logo: "/icons/microsoft.svg",
  },
  {
    title: "What Is Generative AI?",
    organization: "Linkedin",
    date: "February 24th 2024",
    credentialId: "d23docc984f501d20970f36f98f847ff4bcc8f5433795260e89b5c44c12a5dab",
    // credentialUrl:"https://www.linkedin.com/learning/certificates/d23d0cc984f501d20970f36f98f847ff4bcc8f5433795260e89b5c44c12a5dab",
    credentialUrl:"/certs/gen-ai-linkedin.jpeg",
    logo: "/icons/linkedin.svg",
  },
  {
    title: "Communication Skills",
    organization: "TCS iON",
    date: "February 2024",
    credentialId: "91306-25935453-1016",
    // credentialUrl: "https://www.tcsion.com/OnlineAssessment/analysisReport.html?1016@@7118@@1@@854421@@QZFQ_b4eO1f7GtN09e5bpUO5jaOztsnopP0YjoiIX_0@@1@@1757261659847@@Pass@@24-02-2024%2020:46:19%20(GMT+05:30)%20@@1@@1",
    credentialUrl: "/certs/tcs-communication-skills.pdf",
    logo: "/icons/tcs.svg",
  },
  {
    title: "Foundational C# with Microsoft",
    organization: "FreeCodeCamp & Microsoft",
    date: "February 20th 2025",
    credentialId: "NA",
    credentialUrl: "https://www.freecodecamp.org/certification/vuppaladhadium_sai_samarth_saketh/foundational-c-sharp-with-microsoft",
    // credentialUrl:"",
    logos: ["/icons/freecodecamp.svg","/icons/microsoft.svg"],
  },
  {
    title: "Prompt Design in Vertex AI Skill Badge",
    organization: "Google",
    date: "April 24th 2025",   
    credentialId: "NA",
    credentialUrl: "https://www.skills.google/public_profiles/58b992e2-59bd-4f37-bd76-8464908c1d31/badges/15208353",
    // credentialUrl:"/certs/prompt-design-vertex-ai-google.jpg",
    logo: "/icons/google.svg",
  },
  {
    title: "Introduction to Generative AI Skill Badge",
    organization: "Google",
    date: "April 24th 2025",   
    credentialId: "NA",
    credentialUrl: "https://www.skills.google/public_profiles/58b992e2-59bd-4f37-bd76-8464908c1d31/badges/15201347",
    // credentialUrl:"/certs/introduction-gen-ai-google.png",
    logo: "/icons/google.svg",
  },
  {
    title: "Introduction to Large Language Models Skill Badge",
    organization: "Google",
    date: "April 25th 2025",   
    credentialId: "NA",
    credentialUrl: "https://www.skills.google/public_profiles/58b992e2-59bd-4f37-bd76-8464908c1d31/badges/15240223",
    // credentialUrl:"/certs/introduction-gen-ai-google.png",
    logo: "/icons/google.svg",
  },
  {
    title: "Crash Course on Python",
    organization: "Coursera & Google",
    date: "April 25th 2025",
    credentialId: "R7V0KCCH4V3T",
    // credentialUrl: "https://www.coursera.org/account/accomplishments/verify/R7V0KCCH4V3T",
    credentialUrl: "/certs/python-coursera.pdf",
    logos: ["/icons/coursera.svg","/icons/google.svg"],
  },
  {
    title: "Programming with JavaScript",
    organization: "Coursera & Meta",
    date: "May 21st 2025",
    credentialId: "UCOA7ZX9IZ1V",
    // credentialUrl: "https://coursera.org/verify/UCOA7ZX9IZ1V",
    credentialUrl: "/certs/javascript-coursera.pdf",
    logos: ["/icons/coursera.svg","/icons/meta.svg"],
  },
  {
    title: "Google Prompting Essentials",
    organization: "Coursera & Google",
    date: "May 27th 2025",
    credentialId: "7KCBFZT7WWIO",
    // credentialUrl: "https://coursera.org/verify/7KCBFZT7WWIO",
    credentialUrl: "/certs/google-prompting-essentials-coursera.pdf",
    logos: ["/icons/coursera.svg","/icons/google.svg"],
  },
  {
    title: "Google AI Essentials",
    organization: "Coursera & Google",
    date: "August 20th 2025",
    credentialId: "4DSB6OZIKEWC",
    // credentialUrl: "https://coursera.org/verify/4DSB6OZIKEWC",
    credentialUrl: "/certs/google-ai-essentials-coursera.pdf",
    logos: ["/icons/coursera.svg","/icons/google.svg"],
  },
];

function Certifications() {
  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <h2 className="certificate-title">Certifications & Badges</h2>
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-card">
              
              {/* Logos Section */}
              <div className="cert-logos">
                {cert.logos ? (
                  cert.logos.map((logo, idx) => (
                    <img key={idx} src={logo} alt={`${cert.organization} logo`} className="cert-logo" />
                  ))
                ) : (
                  <img src={cert.logo} alt={cert.organization} className="cert-logo" />
                )}
              </div>

              <div className="cert-info">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-organization">{cert.organization}</p>
                <p className="cert-date"><strong>Issued:</strong> {cert.date}</p>
                <p className="cert-id"><strong>Credential ID:</strong> {cert.credentialId}</p>
              </div>

              {/* Credential Link */}
              {cert.credentialUrl && (
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="cert-link">
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
