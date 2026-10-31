const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
async function main() {
  const file = path.join(__dirname, "../frontend/src/artifacts/Voting.json");
  if (!fs.existsSync(file)) throw new Error("Deploy the contract first.");
  const { address, abi } = JSON.parse(fs.readFileSync(file, "utf8"));
  const contract = await hre.ethers.getContractAt(abi, address);
  console.log("Contract:", address);
  console.log("Owner:", await contract.owner());
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
