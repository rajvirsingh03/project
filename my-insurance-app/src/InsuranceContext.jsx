import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import InsuranceABI from './InsuranceABI.json';

const InsuranceContext = createContext();

const InsuranceProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const contractAddress = '0x3A90C4013Fd28f10A56A1Cf1cA3c1B48D88875BF';

  const initProvider = async () => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
      const web3Signer = web3Provider.getSigner();
      setSigner(web3Signer);
      const insuranceContract = new ethers.Contract(contractAddress, InsuranceABI, web3Signer);
      setContract(insuranceContract);
    } else {
      console.error('Ethereum provider not found');
    }
  };

  useEffect(() => {
    initProvider();
  }, []);

  const addBalanceAsInvestor = async (amount) => {
    if (contract) {
      try {
        const tx = await contract.addBalanceAsInvestor({ value: ethers.utils.parseEther(amount) });
        await tx.wait();
      } catch (error) {
        console.error('Error adding balance:', error);
      }
    }
  };

  const registerAsInvestor = async () => {
    if (contract) {
      try {
        const tx = await contract.registerAsInvestor({ value: ethers.utils.parseEther('0.1') });
        await tx.wait();
      } catch (error) {
        console.error('Error registering as investor:', error);
      }
    }
  };

  const withdrawAsInvestor = async (amount) => {
    if (contract) {
      try {
        const tx = await contract.withdrawAsInvestor(ethers.utils.parseEther(amount));
        await tx.wait();
      } catch (error) {
        console.error('Error withdrawing:', error);
      }
    }
  };

  const getInvestorBalance = async () => {
    if (contract) {
      try {
        const balance = await contract.getInvestorBalance();
        return ethers.utils.formatEther(balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
        return '0';
      }
    }
  };

  const createInsuranceGroup = async () => {
    if (contract) {
      try {
        const tx = await contract.createInsuranceGroup({ value: ethers.utils.parseEther('1') });
        await tx.wait();
      } catch (error) {
        console.error('Error creating insurance group:', error);
      }
    }
  };

  const registerForGroup = async (groupIndex) => {
    if (contract) {
      try {
        const tx = await contract.registerForGroup(groupIndex, { value: ethers.utils.parseEther('0.1') });
        await tx.wait();
      } catch (error) {
        console.error('Error registering for group:', error);
      }
    }
  };

  const payPremium = async (groupIndex, premiumAmount) => {
    if (contract) {
      try {
        const tx = await contract.payPremium(groupIndex, { value: ethers.utils.parseEther(premiumAmount) });
        await tx.wait();
      } catch (error) {
        console.error('Error paying premium:', error);
      }
    }
  };

  const submitClaim = async (groupIndex, amount, textHash, fileHash) => {
    if (contract) {
      try {
        const tx = await contract.submitClaim(groupIndex, ethers.utils.parseEther(amount), textHash, fileHash);
        await tx.wait();
      } catch (error) {
        console.error('Error submitting claim:', error);
      }
    }
  };

  const approveClaim = async (groupIndex, claimIndex) => {
    if (contract) {
      try {
        const tx = await contract.approveClaim(groupIndex, claimIndex);
        await tx.wait();
      } catch (error) {
        console.error('Error approving claim:', error);
      }
    }
  };

  const fetchClaimFromGroupByIndex = async (groupIndex, claimIndex) => {
    if (contract) {
      try {
        const claim = await contract.fetchClaimFromGroupByIndex(groupIndex, claimIndex);
        return claim;
      } catch (error) {
        console.error('Error fetching claim:', error);
        return null;
      }
    }
  };

  const getGroupBalance = async (groupIndex) => {
    if (contract) {
      try {
        const balance = await contract.getGroupBalance(groupIndex);
        return ethers.utils.formatEther(balance);
      } catch (error) {
        console.error('Error fetching group balance:', error);
        return '0';
      }
    }
  };

  const GroupCount = async () => {
    if (contract) {
      try {
        const count = await contract.GroupCount();
        return count.toNumber();
      } catch (error) {
        console.error('Error fetching group count:', error);
        return 0;
      }
    }
  };

  // Implementing the numUsersInGroup function
  const numUsersInGroup = async (groupIndex) => {
    if (contract) {
      try {
        const numUsers = await contract.numUsersInGroup(groupIndex);
        return numUsers.toNumber(); // Convert BigNumber to a number
      } catch (error) {
        console.error('Error fetching number of users in group:', error);
        return 0;
      }
    }
  };

  return (
    <InsuranceContext.Provider
      value={{
        addBalanceAsInvestor,
        registerAsInvestor,
        withdrawAsInvestor,
        getInvestorBalance,
        createInsuranceGroup,
        registerForGroup,
        payPremium,
        submitClaim,
        approveClaim,
        fetchClaimFromGroupByIndex,
        getGroupBalance,
        GroupCount,
        numUsersInGroup, // Add numUsersInGroup to context
      }}
    >
      {children}
    </InsuranceContext.Provider>
  );
};

export { InsuranceContext, InsuranceProvider };
