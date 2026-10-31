import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import Web3 from "web3";
import artifact from "../artifacts/Voting.json";
import { EXPECTED_CHAIN_ID } from "../utils/constants";

export const Web3Context = createContext(null);
export function Web3Provider({ children }) {
  const [web3, setWeb3] = useState(null); const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState(null); const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const isAdmin = Boolean(account && owner && account.toLowerCase() === owner.toLowerCase());
  const connectWallet = useCallback(async () => {
    setError("");
    if (!window.ethereum) { setError("MetaMask was not found. Install the MetaMask browser extension."); return; }
    setLoading(true);
    try {
      const provider = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const network = await provider.eth.getChainId();
      setWeb3(provider); setAccount(accounts[0] || ""); setChainId(Number(network));
      if (artifact.address && artifact.abi?.length) {
        const instance = new provider.eth.Contract(artifact.abi, artifact.address);
        setContract(instance); setOwner(await instance.methods.owner().call());
      } else { setContract(null); setOwner(""); }
    } catch (e) { setError(e.code === 4001 ? "Wallet connection was rejected." : e.message || "Could not connect wallet."); }
    finally { setLoading(false); }
  }, []);
  const disconnectWallet = useCallback(() => { setAccount(""); setWeb3(null); setContract(null); setOwner(""); setChainId(null); }, []);
  useEffect(() => {
    if (!window.ethereum) return undefined;
    const onAccounts = (accounts) => { if (!accounts.length) disconnectWallet(); else { setAccount(accounts[0]); if (web3 && artifact.address && artifact.abi?.length) { const c = new web3.eth.Contract(artifact.abi, artifact.address); setContract(c); c.methods.owner().call().then(setOwner).catch(() => setOwner("")); } } };
    const onChain = () => window.location.reload();
    window.ethereum.on("accountsChanged", onAccounts); window.ethereum.on("chainChanged", onChain);
    return () => { window.ethereum.removeListener("accountsChanged", onAccounts); window.ethereum.removeListener("chainChanged", onChain); };
  }, [disconnectWallet, web3]);
  const value = useMemo(() => ({ web3, account, chainId, contract, owner, isAdmin, loading, error, connectWallet, disconnectWallet, expectedChainId: EXPECTED_CHAIN_ID, isCorrectNetwork: chainId === EXPECTED_CHAIN_ID }), [web3, account, chainId, contract, owner, isAdmin, loading, error, connectWallet, disconnectWallet]);
  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}
