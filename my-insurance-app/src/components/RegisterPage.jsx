import React, { useContext, useState, useEffect } from 'react';
import { InsuranceContext } from '../InsuranceContext.jsx';

const RegisterPage = () => {
  const { registerForGroup, payPremium, numUsersInGroup, getGroupBalance } = useContext(InsuranceContext);
  const [groupIndex, setGroupIndex] = useState('');
  const [premiumAmount, setPremiumAmount] = useState('');
  const [numUsers, setNumUsers] = useState(null);
  const [groupBalance, setGroupBalance] = useState(null);

  const handleRegister = async () => {
    await registerForGroup(groupIndex);
    // Optionally, refresh group details after registration
    fetchGroupDetails();
  };

  const handlePayPremium = async () => {
    await payPremium(groupIndex, premiumAmount);
    // Optionally, refresh group details after paying premium
    fetchGroupDetails();
  };

  const fetchGroupDetails = async () => {
    if (groupIndex) {
      try {
        const users = await numUsersInGroup(groupIndex);
        const balance = await getGroupBalance(groupIndex);
        setNumUsers(users);
        setGroupBalance(balance);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    }
  };

  useEffect(() => {
    fetchGroupDetails();
  }, [groupIndex]);

  return (
    <div className="container">
      <h1>Register for Insurance Group</h1>
      <div className="form-group">
        <label>Group Index:</label>
        <input
          type="number"
          value={groupIndex}
          onChange={(e) => setGroupIndex(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
      <div className="form-group">
        <label>Premium Amount (ETH):</label>
        <input
          type="number"
          value={premiumAmount}
          onChange={(e) => setPremiumAmount(e.target.value)}
        />
        <button onClick={handlePayPremium}>Pay Premium</button>
      </div>
      <div className="form-group">
        <h2>Group Details</h2>
        <p>Number of Users: {numUsers !== null ? numUsers : '0'}</p>
        <p>Group Balance (ETH): {groupBalance !== null ? groupBalance : '0'}</p>
      </div>
    </div>
  );
};

export default RegisterPage;
