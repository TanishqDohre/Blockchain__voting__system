import React from "react";
import useWeb3 from "../../hooks/useWeb3";
import { shortenAddress } from "../../utils/helpers";
export default function WalletConnect() {
  const { account, connectWallet, disconnectWallet, loading, chainId, isCorrectNetwork, error } = useWeb3();
  return <div className="wallet-area">{account ? <><span className="wallet-address">{shortenAddress(account)}</span><span className={isCorrectNetwork ? "network-ok" : "network-bad"}>{isCorrectNetwork ? `Chain ${chainId}` : `Wrong network (${chainId})`}</span><button className="vc-button secondary" onClick={disconnectWallet}>Disconnect</button></> : <button className="vc-button primary" onClick={connectWallet} disabled={loading}>{loading ? "Connecting..." : "Connect MetaMask"}</button>}{error && <small className="error-text">{error}</small>}</div>;
}
