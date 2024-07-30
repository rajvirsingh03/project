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
    <div className="container">
      <h1>Investor Operations</h1>
      <div className="form-group">
        <label>Investment Amount (ETH):</label>
        <input
          type="number"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(e.target.value)}
        />
        <button onClick={handleRegister}>Register as Investor</button>
        <button onClick={handleAddBalance}>Add Balance</button>
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
      <div className="form-group">
        <label>Claim Group Index:</label>
        <input
          type="number"
          value={claimGroup}
          onChange={(e) => setClaimGroup(e.target.value)}
        />
        <label>Claim Index:</label>
        <input
          type="number"
          value={claimIndex}
          onChange={(e) => setClaimIndex(e.target.value)}
        />
        <button onClick={handleApproveClaim}>Approve Claim</button>
      </div>
    </div>
  );
};

export default InvestorPage;
