import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import ClaimPage from './components/ClaimPage';
import InvestorPage from './components/InvestorPage';
import { InsuranceProvider } from './InsuranceContext.jsx';
import Navbar from './components/Navbar.jsx';
import './styles/styles.css';


const App = () => {
  return (
    <InsuranceProvider>
      <div style={styles.appContainer}>
        <Navbar />
        <div style={styles.contentContainer}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/claim" element={<ClaimPage />} />
            <Route path="/investor" element={<InvestorPage />} />
          </Routes>
        </div>
      </div>
    </InsuranceProvider>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Ensure the app takes full height of the viewport
    fontFamily: 'Open Sans, sans-serif',
    color: '#fff',
  },
  contentContainer: {
    flex: 1, // Allows the content to take the remaining space after the navbar
    padding: '20px',
  },
};

export default App;

