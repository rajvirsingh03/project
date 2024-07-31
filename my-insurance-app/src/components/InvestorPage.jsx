import React, { useContext, useState } from 'react';
import { InsuranceContext } from '../InsuranceContext.jsx';

const InvestorPage = () => {
  const { registerAsInvestor, addBalanceAsInvestor, withdrawAsInvestor, approveClaim } = useContext(InsuranceContext);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [claimGroup, setClaimGroup] = useState('');
  const [claimIndex, setClaimIndex] = useState('');

  const handleRegister = async () => {
    await registerAsInvestor(investmentAmount);
  };

  const handleAddBalance = async () => {
    await addBalanceAsInvestor(investmentAmount);
  };

  const handleWithdraw = async () => {
    await withdrawAsInvestor(investmentAmount);
  };

  const handleApproveClaim = async () => {
    await approveClaim(claimGroup, claimIndex);
  };

  return (
    <div style={styles.formContainer}>
      <h1 style={styles.header}>Investor Operations</h1>
      <div style={styles.formGroup}>
        <label style={styles.label}>Investment Amount (ETH):</label>
        <input
          type="number"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(e.target.value)}
          style={styles.input}
        />
        <div style={styles.buttonGroup}>
          <button onClick={handleRegister} style={styles.button}>Register as Investor</button>
          <button onClick={handleAddBalance} style={styles.button}>Add Balance</button>
          <button onClick={handleWithdraw} style={styles.button}>Withdraw</button>
        </div>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Claim Group Index:</label>
        <input
          type="number"
          value={claimGroup}
          onChange={(e) => setClaimGroup(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Claim Index:</label>
        <input
          type="number"
          value={claimIndex}
          onChange={(e) => setClaimIndex(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleApproveClaim} style={styles.button}>Approve Claim</button>
      </div>
    </div>
  );
};

const styles = {
  formContainer: {
    padding: '20px',
    maxWidth: '800px',
    margin: '80px auto 0', // Increased top margin to move content lower
    backgroundColor: '#0a0f1a',
    color: '#fff',
    fontFamily: 'Open Sans, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
    padding: '20px',
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
    backgroundColor: '#2a2a2a',
    color: 'white',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '25px', // Rounded corners for the button
    background: 'linear-gradient(90deg, #ff6f00, #ff3d00)', // Dark orange gradient background
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 'bold', // Make text bold
    transition: 'background 0.3s ease',
  }
};

export default InvestorPage;
