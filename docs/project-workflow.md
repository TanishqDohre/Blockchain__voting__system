# Development Workflow

1. Install root and frontend dependencies.
2. Compile the Solidity contract with Hardhat.
3. Run the automated contract tests.
4. Start the local Hardhat node.
5. Deploy the contract to localhost; deployment writes ABI and address to the frontend artifact file.
6. Configure MetaMask for chain ID 1337 and import a local test account.
7. Start the React frontend.
8. Administrator creates an election, adds candidates and registers voter addresses.
9. Registered voter wallets submit votes during the configured time window.
10. Election results are read from the smart contract.
