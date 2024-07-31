import React, { useContext, useState, useEffect } from 'react';
import { InsuranceContext } from '../InsuranceContext.jsx';

const HomePage = () => {
  const { createInsuranceGroup, GroupCount, getInvestorBalance } = useContext(InsuranceContext);
  const [newGroupBalance, setNewGroupBalance] = useState('');
  const [account, setAccount] = useState('');

  useEffect(() => {
    const loadAccount = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } else {
        console.error('Ethereum provider not found');
      }
    };

    loadAccount();
  }, []);

  const handleCreateGroup = async () => {
    await createInsuranceGroup(newGroupBalance);
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPane}>
        <h1 style={styles.projectTitle}>InsureChain</h1>
        <p style={styles.projectDescription}>
          Revolutionizing insurance with blockchain technology. Create and manage insurance groups with transparency and efficiency.
        </p>
      </div>
      <div style={styles.rightPane}>
        <div style={styles.transparentBox}>
          <header style={styles.header}>
            <div style={styles.metamaskConnection}>
              <p>Connected Account: {account}</p>
            </div>
          </header>
          <p style={styles.groupCount}>Total Insurance Groups: {GroupCount}</p>
          <div style={styles.formGroup}>
            <label style={styles.label}>Initial Balance for New Group (ETH):</label>
            <input
              type="number"
              value={newGroupBalance}
              onChange={(e) => setNewGroupBalance(e.target.value)}
              style={styles.input}
              placeholder="Enter amount in ETH"
            />
            <button onClick={handleCreateGroup} style={styles.button}>Create Group</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    fontFamily: 'Open Sans, sans-serif',
    color: 'white',
    minHeight: '100vh',
    width: '100vw',
  },
  leftPane: {
    flex: '0 0 40%',
    backgroundColor: '#16416e',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightPane: {
    flex: '1',
    backgroundColor: '#0a0f1a',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  transparentBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Lightened semi-transparent black background
    border: '1px solid rgba(255, 255, 255, 0.5)', // Darkened semi-transparent white border
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // Darker drop shadow
    padding: '20px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  projectTitle: {
    fontSize: '5rem',
    fontWeight: 'bold',
    margin: '0 0 10px',
    color: '#fff',
    textAlign: 'left',
  },
  projectDescription: {
    fontSize: '1.2rem',
    color: '#fff',
    textAlign: 'left',
  },
  header: {
    width: '100%',
  },
  metamaskConnection: {
    marginTop: '20px',
    fontSize: '1.2rem',
    color: '#ccc',
  },
  groupCount: {
    fontSize: '1.5rem',
    marginBottom: '30px',
    textAlign: 'center',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    width: '100%',
    maxWidth: '400px',
  },
  label: {
    marginBottom: '10px',
    fontSize: '1.2rem',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    background: '#2a2a2a',
    color: 'white',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.2rem',
    color: 'white',
    background: 'linear-gradient(90deg, #ff6f00, #ff3d00)',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
};

export default HomePage;
