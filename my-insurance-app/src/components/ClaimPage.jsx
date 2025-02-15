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
    <div className="container">
      <h1>Submit and View Claims</h1>
      <div className="form-group">
        <label>Group Index:</label>
        <input
          type="number"
          value={groupIndex}
          onChange={(e) => setGroupIndex(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Amount (ETH):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label>Text Hash:</label>
        <input
          type="text"
          value={textHash}
          onChange={(e) => setTextHash(e.target.value)}
        />
        <label>File Hash:</label>
        <input
          type="text"
          value={fileHash}
          onChange={(e) => setFileHash(e.target.value)}
        />
        <button onClick={handleSubmitClaim}>Submit Claim</button>
      </div>
      <button onClick={handleFetchClaims}>Fetch Claims</button>
      <div className="claims-list">
        {claims.map((claim, index) => (
          <div key={index} className="claim">
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

export default ClaimPage;
