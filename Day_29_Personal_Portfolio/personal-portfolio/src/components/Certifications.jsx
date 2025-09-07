import React from "react";
import "./Certifications.css";

const certifications = [
  {
    title: "Microsoft Azure Fundamentals",
    organization: "Microsoft",
    date: "April 26th 2022",
    credentialId: "I241-2821",
    credentialUrl: "https://www.credly.com/badges/6dbd9c3a-dec5-46db-b603-0b9ffbbab37c",
    logo: "/icons/microsoft.svg",
  },
  {
    title: "What Is Generative AI?",
    organization: "Linkedin",
    date: "February 2024",
    credentialId: "d23docc984f501d20970f36f98f847ff4bcc8f5433795260e89b5c44c12a5dab",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/d23d0cc984f501d20970f36f98f847ff4bcc8f5433795260e89b5c44c12a5dab?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BeOgabl3fTkCahTC%2F3Yjc2Q%3D%3D",
    logo: "/icons/linkedin.svg",
  },
  {
    title: "Communication Skills",
    organization: "TCS iON",
    date: "February 2024",
    credentialId: "91306-25935453-1016",
    credentialUrl: "https://www.tcsion.com/OnlineAssessment/analysisReport.html?1016@@7118@@1@@854421@@QZFQ_b4eO1f7GtN09e5bpUO5jaOztsnopP0YjoiIX_0@@1@@1757261659847@@Pass@@24-02-2024%2020:46:19%20(GMT+05:30)%20@@1@@1",
    logo: "/icons/tcs.svg",
  },
  {
    title: "Foundational C# with Microsoft",
    organization: "FreeCodeCamp & Microsoft",
    date: "February 2025",
    credentialId: "NA",
    credentialUrl:
      "https://www.freecodecamp.org/certification/vuppaladhadium_sai_samarth_saketh/foundational-c-sharp-with-microsoft",
    logos: [
      "/icons/freecodecamp.svg",
      "/icons/microsoft.svg",
    ],
  },
  {
    title: "Prompt Design in Vertex AI Skill Badge",
    organization: "Google",
    date: "April 2025",   
    credentialId: "NA",
    credentialUrl:
      "https://www.credly.com/badges/ecd5cdc4-ac26-45d1-b5da-440d675b2e65",
    logo: "/icons/google.svg",
  },
    {
    title: "Crash Course on Python",
    organization: "Coursera & Google",
    date: "April 2025",
    credentialId: "R7V0KCCH4V3T",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/R7V0KCCH4V3T",
    logos: [
      "/icons/coursera.svg",
      "/icons/google.svg",
    ],
  },
  {
    title: "Programming with JavaScript",
    organization: "Coursera & Meta",
    date: "May 2025",
    credentialId: "UCOA7ZX9IZ1V",
    credentialUrl: "https://coursera.org/verify/UCOA7ZX9IZ1V",
    logos: ["/icons/coursera.svg", "/icons/meta.svg"],
  },
      {
    title: "Google Prompting Essentials",
    organization: "Coursera & Google",
    date: "May 2025",
    credentialId: "7KCBFZT7WWIO",
    credentialUrl: "https://coursera.org/verify/7KCBFZT7WWIO",
    logos: ["/icons/coursera.svg", "/icons/google.svg"],
  },
      {
    title: "Google AI Essentials",
    organization: "Coursera & Google",
    date: "May 2025",
    credentialId: "4DSB6OZIKEWC",
    credentialUrl: "https://coursera.org/verify/4DSB6OZIKEWC",
    logos: ["/icons/coursera.svg", "/icons/google.svg"],
  },
];

function Certifications() {
  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <h2 className="certificate-title">Certifications</h2>
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
                <p className="cert-date">
                  <strong>Issued:</strong> {cert.date}
                </p>
                <p className="cert-id">
                  <strong>Credential ID:</strong> {cert.credentialId}
                </p>
              </div>

              {/* Credential Link */}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-link"
                >
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
