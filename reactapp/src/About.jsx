import React from 'react';
import Layout from './components/Layout/Layout';
import './App.css';

const AboutContent = () => {
  return (
    <div style={{ color: '#eaf1ff', lineHeight: 1.7 }}>
      <h1 style={{ color: '#03e9f4', marginBottom: 12 }}>About Us</h1>
      <p>
        We are a small, passionate team building clean, fast, and delightful web apps.
        Our focus is on crafting helpful tools that feel familiar and get out of your way.
      </p>
      <p>
        From dashboards to directories, we care about thoughtful details: smooth animations,
        responsive design, and a cohesive visual language.
      </p>
      <p>
        Have feedback or ideas? We’d love to hear from you. Let’s build something awesome together.
      </p>
    </div>
  );
};

// Wrapped with shared layout for consistent header/footer
const About = () => (
  <Layout>
    <AboutContent />
  </Layout>
);

export default About;