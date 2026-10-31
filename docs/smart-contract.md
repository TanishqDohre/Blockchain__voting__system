# Voting.sol – Contract Guide

- `owner`: wallet that deployed the contract; administrator-only methods use `onlyOwner`.
- `createElection`: creates an election with a future opening time and a later closing time.
- `addCandidate`: adds candidates before voting starts.
- `registerVoter`: authorizes one wallet for one election.
- `registerVoters`: authorizes multiple wallets in one transaction.
- `vote`: checks election status, time window, voter registration, duplicate-vote flag and candidate ID before recording a vote.
- `setElectionStatus`: administrator can enable or disable an election.
- `getElection`: returns election metadata and vote count.
- `getCandidate` / `getCandidates`: returns candidate data and vote totals.
- `registeredVoters` / `hasVoted`: public mappings for voter eligibility and duplicate-vote checks.
- `getVoterChoice`: returns the selected candidate ID for an address that voted. This is public-chain data and is not secret.

All vote totals are changed only inside `vote`; there is no administrator function to edit candidate vote totals.
