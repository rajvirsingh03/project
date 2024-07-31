import React, { useContext, useState } from 'react';
import { InsuranceContext } from '../InsuranceContext.jsx';

const RegisterPage = () => {
  const { registerForGroup, payPremium, getGroupBalance, GroupCount } = useContext(InsuranceContext);
  const [groupIndex, setGroupIndex] = useState('');
  const [premiumAmount, setPremiumAmount] = useState('');
  const [groupBalance, setGroupBalance] = useState('0');
  const [userCount, setUserCount] = useState(0);

  const handleRegister = async () => {
    await registerForGroup(groupIndex);
    updateGroupDetails();
  };

  const handlePayPremium = async () => {
    await payPremium(groupIndex);
    updateGroupDetails();
  };

  const updateGroupDetails = async () => {
    const balance = await getGroupBalance(groupIndex);
    setGroupBalance(balance);
    const count = await GroupCount();
    setUserCount(count);
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
        <label>Enter Group Index value to pay Premium Amount (ETH):</label>
        <input
          type="number"
          value={premiumAmount}
          onChange={(e) => setPremiumAmount(e.target.value)}
        />
        <button onClick={handlePayPremium}>Pay Premium</button>
      </div>
      <div className="form-group">
        <h2>Group Details</h2>
        <p>Number of Users: {userCount}</p>
        <p>Group Balance (ETH): {groupBalance}</p>
      </div>
    </div>
  );
};

export default RegisterPage;
