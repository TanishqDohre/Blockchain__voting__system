# VoteChain Architecture

## Layers
1. **Presentation:** React 17 components render the home page, election list, voter flow and administrator dashboard.
2. **Wallet/Web3:** `Web3Context.js` detects MetaMask, connects the account, checks the chain and creates the Web3 contract instance.
3. **Services:** `contractService.js` contains reusable smart-contract calls. `electionService.js` assembles election and candidate data for screens.
4. **Blockchain:** `Voting.sol` stores elections, candidates, voter permissions, one-vote flags and vote totals.

## Request flow
User action → React component → `useWeb3()` → service function → Web3.js → MetaMask confirmation → Ethereum transaction → `Voting.sol` → updated on-chain state → UI refresh.

## Main connections
- `App.js` creates exactly one `Web3Provider` and configures routes.
- `Navbar.js` uses `WalletConnect.js` to connect the wallet.
- `AdminPage.js` uses the admin components, which call the contract service.
- `VotingPage.js` renders `VoterDashboard.js`.
- `ElectionDetails.js` reads election/candidate data and submits votes.
- `ElectionResults.js` reads candidate vote totals directly from the contract.
- `scripts/deploy.js` copies the ABI and deployed address into `frontend/src/artifacts/Voting.json`.

The browser does not store authoritative voting data in localStorage. The contract is authoritative.
