import React, { useContext, useState } from 'react';
import { InsuranceContext } from '../InsuranceContext.jsx';

const ClaimPage = () => {
  const { submitClaim, fetchClaimFromGroupByIndex } = useContext(InsuranceContext);
  const [groupIndex, setGroupIndex] = useState('');
  const [amount, setAmount] = useState('');
  const [textHash, setTextHash] = useState('');
  const [fileHash, setFileHash] = useState('');
  const [claims, setClaims] = useState([]);

  const handleSubmitClaim = async () => {
    await submitClaim(groupIndex, amount, textHash, fileHash);
  };

  const handleFetchClaims = async () => {
    const numClaims = await fetchClaimFromGroupByIndex(groupIndex);
    const claimsList = [];
    for (let i = 0; i < numClaims; i++) {
      const claim = await fetchClaimFromGroupByIndex(groupIndex, i);
      claimsList.push(claim);
    }
    setClaims(claimsList);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Submit and View Claims</h1>
      <div style={styles.formGroup}>
        <label style={styles.label}>Group Index:</label>
        <input
          type="number"
          value={groupIndex}
          onChange={(e) => setGroupIndex(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Amount (ETH):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Text Hash:</label>
        <input
          type="text"
          value={textHash}
          onChange={(e) => setTextHash(e.target.value)}
          style={styles.input}
        />
        <div style={styles.fileHashContainer}>
          <div style={styles.inputWrapper}>
            <label style={styles.label}>File Hash:</label>
            <input
              type="text"
              value={fileHash}
              onChange={(e) => setFileHash(e.target.value)}
              style={styles.input}
            />
          </div>
          <button onClick={handleSubmitClaim} style={styles.button}>Submit Claim</button>
        </div>
      </div>
      <button onClick={handleFetchClaims} style={{ ...styles.button, ...styles.fetchButton }}>Fetch Claims</button>
      <div style={styles.claimsList}>
        {claims.map((claim, index) => (
          <div key={index} style={styles.claim}>
            <p>Sender: {claim.sender}</p>
            <p>Amount: {claim.amount}</p>
            <p>Text Hash: {claim.textHash}</p>
            <p>File Hash: {claim.fileHash}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#0a0f1a',
    color: '#fff',
    fontFamily: 'Open Sans, sans-serif',
    marginTop: '80px', // Move it down from the navbar
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    background: '#2a2a2a',
    color: 'white',
  },
  fileHashContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
  },
  inputWrapper: {
    flexGrow: 1,
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
    marginTop: '28px', // Increased space above button
    marginLeft: '30px', // Increased space to the right
  },
  fetchButton: {
    marginTop: '2px', // Adjust this value to move the button upwards
    marginLeft: '9px',
  },
  claimsList: {
    marginTop: '20px',
  },
  claim: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '8px',
    background: '#1a1a1a',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
  },
};

export default ClaimPage;
