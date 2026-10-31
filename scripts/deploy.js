const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  await voting.waitForDeployment();
  const address = await voting.getAddress();
  console.log("Voting contract deployed to:", address);
  const artifact = await hre.artifacts.readArtifact("Voting");
  const outputDir = path.join(__dirname, "../frontend/src/artifacts");
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "Voting.json"), JSON.stringify({ contractName: "Voting", address, abi: artifact.abi }, null, 2));
  console.log("ABI and address copied to frontend/src/artifacts/Voting.json");
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
