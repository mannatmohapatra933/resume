import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './ResumeContext';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import History from './pages/History';
import Expertise from './pages/Expertise';
import FullResume from './pages/FullResume';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/resume" element={<FullResume />} />
          </Routes>
        </Layout>
      </Router>
    </ResumeProvider>
  );
}

export default App;