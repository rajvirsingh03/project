import React, { useContext, useState } from 'react';
import { InsuranceContext } from '../InsuranceContext.jsx';

const RegisterPage = () => {
  const { registerForGroup, payPremium, numUsersInGroup, getGroupBalance } = useContext(InsuranceContext);
  const [groupIndex, setGroupIndex] = useState('');
  const [premiumAmount, setPremiumAmount] = useState('');

  const handleRegister = async () => {
    await registerForGroup(groupIndex);
  };

  const handlePayPremium = async () => {
    await payPremium(groupIndex, premiumAmount);
  };

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
        <p>Number of Users: {numUsersInGroup(groupIndex)}</p>
        <p>Group Balance (ETH): {getGroupBalance(groupIndex)}</p>
      </div>
    </div>
  );
};

export default RegisterPage;
