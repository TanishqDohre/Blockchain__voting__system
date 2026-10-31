export const shortenAddress = (address = "") => address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected";
export const formatDate = (seconds) => seconds ? new Date(Number(seconds) * 1000).toLocaleString() : "Not set";
export const formatNumber = (value) => Number(value || 0).toLocaleString();
export const isElectionOpen = (e) => Boolean(e && e.active && Date.now() / 1000 >= Number(e.startTime) && Date.now() / 1000 <= Number(e.endTime));
