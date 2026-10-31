import { getAllElections, getCandidates, getElection, getVoterStatus } from "./contractService";
export async function loadElectionDashboard(contract) {
  const elections = await getAllElections(contract);
  const enriched = await Promise.all(elections.map(async election => ({ ...election, candidates: await getCandidates(contract, election.id) })));
  return enriched;
}
export async function loadElectionDetails(contract, electionId, account) {
  const [election, candidates, voterStatus] = await Promise.all([getElection(contract, electionId), getCandidates(contract, electionId), account ? getVoterStatus(contract, electionId, account) : Promise.resolve({ registered: false, voted: false })]);
  return { ...election, candidates, voterStatus };
}
