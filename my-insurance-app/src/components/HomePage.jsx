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
    <div className="container">
      <header className="header">
        <h1>Insurance Groups</h1>
        <div className="metamask-connection">
          <p>Connected Account: {account}</p>
        </div>
      </header>
      <p>Total Insurance Groups: {GroupCount}</p>
      <div className="form-group">
        <label>Initial Balance for New Group (ETH):</label>
        <input
          type="number"
          value={newGroupBalance}
          onChange={(e) => setNewGroupBalance(e.target.value)}
        />
        <button onClick={handleCreateGroup}>Create Group</button>
      </div>
    </div>
  );
};

export default HomePage;
