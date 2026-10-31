import Web3 from "web3";
import artifact from "../artifacts/Voting.json";

export function createContract(web3, address = artifact.address) {
  if (!web3) throw new Error("Web3 is not initialized. Connect MetaMask first.");
  if (!address || !artifact.abi?.length) throw new Error("Contract is not deployed. Run the deployment script first.");
  return new web3.eth.Contract(artifact.abi, address);
}
export async function getElectionCount(contract) { return Number(await contract.methods.getElectionCount().call()); }
export async function getElection(contract, id) {
  const x = await contract.methods.getElection(id).call();
  return { id: Number(x[0]), title: x[1], description: x[2], startTime: Number(x[3]), endTime: Number(x[4]), exists: x[5], active: x[6], candidateCount: Number(x[7]), totalVotes: Number(x[8]) };
}
export async function getAllElections(contract) {
  const count = await getElectionCount(contract); const rows = [];
  for (let id = 1; id <= count; id++) rows.push(await getElection(contract, id));
  return rows.reverse();
}
export async function getCandidates(contract, electionId) {
  const rows = await contract.methods.getCandidates(electionId).call();
  return rows.map(c => ({ id: Number(c.id), name: c.name, description: c.description, voteCount: Number(c.voteCount) }));
}
export async function createElection(contract, from, title, description, start, end) { return contract.methods.createElection(title, description, start, end).send({ from }); }
export async function addCandidate(contract, from, electionId, name, description) { return contract.methods.addCandidate(electionId, name, description).send({ from }); }
export async function registerVoter(contract, from, electionId, address) { return contract.methods.registerVoter(electionId, address).send({ from }); }
export async function registerVoters(contract, from, electionId, addresses) { return contract.methods.registerVoters(electionId, addresses).send({ from }); }
export async function castVote(contract, from, electionId, candidateId) { return contract.methods.vote(electionId, candidateId).send({ from }); }
export async function getVoterStatus(contract, electionId, address) {
  const [registered, voted] = await Promise.all([contract.methods.registeredVoters(electionId, address).call(), contract.methods.hasVoted(electionId, address).call()]);
  return { registered, voted };
}
export async function setElectionStatus(contract, from, electionId, active) { return contract.methods.setElectionStatus(electionId, active).send({ from }); }
