import { useContext } from "react";
import { Web3Context } from "../contexts/Web3Context";
export default function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) throw new Error("useWeb3 must be used inside Web3Provider.");
  return context;
}
