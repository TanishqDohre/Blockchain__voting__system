# VoteChain – Blockchain-Based Voting System

VoteChain is an educational decentralized voting DApp built with React 17, Web3.js, MetaMask, Solidity 0.8.9 and Hardhat 2.22.19. The smart contract is the source of truth for elections, voter authorization and vote totals.

## 1. Requirements
- Node.js 20 LTS (or a compatible Node version)
- npm
- VS Code
- MetaMask browser extension

## 2. Install dependencies
Open a terminal in the `VoteChain_Project` root folder:

```bash
npm install
```

Then install frontend packages:

```bash
cd frontend
npm install
cd ..
```

## 3. Compile and test the smart contract

```bash
npx hardhat compile
npx hardhat test
```

## 4. Run the local blockchain
Open terminal 1 in the project root:

```bash
npx hardhat node
```

Keep this terminal running. Copy one of the displayed test account private keys and import it into a separate MetaMask test account. Never use a real wallet private key for local testing.

## 5. Deploy the contract
Open terminal 2 in the project root:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

The script writes the deployed contract address and ABI into `frontend/src/artifacts/Voting.json`.

## 6. Configure MetaMask
Add a custom network:
- Network name: Hardhat Local
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `1337`
- Currency: ETH

Import the first Hardhat test account into MetaMask. The first account deploys the contract and becomes administrator.

## 7. Start React
Open terminal 3:

```bash
cd frontend
npm start
```

Open the local URL printed by Create React App (normally `http://localhost:3000`). Connect MetaMask.

## 8. Admin workflow
1. Connect the same wallet that deployed the contract.
2. Open Admin.
3. Create an election with a future start and end time.
4. Add candidates before the election starts.
5. Register voter wallet addresses.
6. Voters connect their own registered wallets and vote during the election period.

## 9. Sepolia (optional)
Copy `.env.example` to `.env`, add a Sepolia RPC URL and a test wallet private key, then run:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Use only a dedicated test wallet with no valuable funds. Never commit `.env`.

## Important privacy and security note
This project is for learning and demonstration. A public blockchain does not provide secret ballots by default. This contract stores the selected candidate ID in public transaction state, and addresses can be linked to votes. Do not use it for real government, company-critical or high-stakes elections. It has not been professionally audited.
