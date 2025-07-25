// LandingPage.jsx (React with plain CSS)

import React from 'react';
import './LandingPage.css';
import whatsapp from '../assets/react.svg';
import gmail from '../assets/react.svg';
import health from '../assets/react.svg';
import calendar from '../assets/react.svg';
import apple from '../assets/react.svg'
import mobile from '../assets/react.svg'

const icons = [whatsapp, gmail, health, calendar, apple];

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h2>Seamless Access with privacy</h2>
      <p>Giving you access to your medical records, anytime, anywhere.</p>

      <div className="content">
        {/* Left: Icons */}
        <div className="left-column">
          {icons.map((icon, index) => (
            <div className="icon-wrapper" key={index}>
              <img src={icon} alt="icon" />
              <svg className="arrow-svg" viewBox="0 0 100 50">
                <path d="M 0 50 Q 50 0 100 50" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="5" className="animate-draw" />
              </svg>
            </div>
          ))}
        </div>

        {/* Center: Rotating Circle */}
        <div className="center-circle">
          <div className="rotating">
            <p>Diagnosis Reports</p>
            <p>Prescriptions</p>
            <p>Lab Results</p>
            <p>Medical Files</p>
          </div>
        </div>

        {/* Right: Phone and Arrow */}
        <div className="right-column">
          <svg className="right-arrow" viewBox="0 0 100 10">
            <line x1="0" y1="5" x2="100" y2="5" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
            </defs>
          </svg>
          <img src={mobile} alt="Mobile UI" className="mobile-preview" />
        </div>
      </div>

      {/* Bottom Text */}
      <div className="bottom-text">
        <div className="column-text">
          <h3>Store</h3>
          <p>Effortlessly organize your medical records with just one click—both digital and physical documents securely stored in one place.</p>
        </div>
        <div className="column-text">
          <h3>We Do The Work</h3>
          <p>Let our technology seamlessly manage backend tasks for efficient medical record organization.</p>
        </div>
        <div className="column-text">
          <h3>Health History</h3>
          <p>Organize your medical records effortlessly with our timeline, ensuring you never worry about them again.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
