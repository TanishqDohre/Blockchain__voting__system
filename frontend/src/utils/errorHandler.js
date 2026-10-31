export function friendlyError(error) {
  const code = error?.code;
  if (code === 4001) return "You rejected the request in MetaMask.";
  const message = error?.reason || error?.data?.message || error?.message || "An unexpected error occurred.";
  if (message.includes("User denied") || message.includes("rejected")) return "Transaction was cancelled in MetaMask.";
  if (message.includes("not registered")) return "Your wallet is not registered for this election.";
  if (message.includes("already voted")) return "This wallet has already voted in this election.";
  if (message.includes("Only administrator")) return "Only the administrator wallet can perform this action.";
  return message.replace(/^execution reverted: /, "");
}
