const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {
  let voting, owner, voter, other;
  let start, end;
  beforeEach(async function () {
    [owner, voter, other] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("Voting");
    voting = await Factory.deploy();
    await voting.waitForDeployment();
    const now = (await ethers.provider.getBlock("latest")).timestamp;
    start = now + 60; end = now + 3600;
    await voting.createElection("College Election", "Student council", start, end);
    await voting.addCandidate(1, "Candidate A", "First candidate");
    await voting.addCandidate(1, "Candidate B", "Second candidate");
    await voting.registerVoter(1, voter.address);
  });
  it("sets deployer as owner", async () => expect(await voting.owner()).to.equal(owner.address));
  it("creates an election", async () => expect((await voting.getElection(1))[1]).to.equal("College Election"));
  it("adds candidates", async () => expect((await voting.getCandidates(1)).length).to.equal(2));
  it("registers a voter", async () => expect(await voting.registeredVoters(1, voter.address)).to.equal(true));
  it("allows bulk registration", async () => { await voting.registerVoters(1, [other.address]); expect(await voting.registeredVoters(1, other.address)).to.equal(true); });
  it("blocks non-admin election creation", async () => await expect(voting.connect(voter).createElection("X", "Y", start, end)).to.be.revertedWith("Only administrator can perform this action"));
  it("blocks duplicate voter registration", async () => await expect(voting.registerVoter(1, voter.address)).to.be.revertedWith("Voter already registered"));
  it("accepts a valid vote and prevents a second vote", async () => {
    await ethers.provider.send("evm_setNextBlockTimestamp", [start]); await ethers.provider.send("evm_mine", []);
    await voting.connect(voter).vote(1, 1);
    expect((await voting.getCandidate(1, 1))[3]).to.equal(1);
    await expect(voting.connect(voter).vote(1, 2)).to.be.revertedWith("You have already voted");
  });
  it("rejects an unregistered voter", async () => {
    await ethers.provider.send("evm_setNextBlockTimestamp", [start]); await ethers.provider.send("evm_mine", []);
    await expect(voting.connect(other).vote(1, 1)).to.be.revertedWith("You are not registered to vote");
  });
  it("rejects an invalid candidate", async () => {
    await ethers.provider.send("evm_setNextBlockTimestamp", [start]); await ethers.provider.send("evm_mine", []);
    await expect(voting.connect(voter).vote(1, 99)).to.be.revertedWith("Invalid candidate ID");
  });
  it("rejects invalid election IDs", async () => await expect(voting.getElection(99)).to.be.revertedWith("Election does not exist"));
  it("rejects voting before opening", async () => await expect(voting.connect(voter).vote(1, 1)).to.be.revertedWith("Election has not started"));
  it("rejects voting after closing", async () => {
    await ethers.provider.send("evm_setNextBlockTimestamp", [end + 1]); await ethers.provider.send("evm_mine", []);
    await expect(voting.connect(voter).vote(1, 1)).to.be.revertedWith("Election has ended");
  });
  it("calculates election totals", async () => {
    await ethers.provider.send("evm_setNextBlockTimestamp", [start]); await ethers.provider.send("evm_mine", []);
    await voting.connect(voter).vote(1, 2);
    expect((await voting.getElection(1))[8]).to.equal(1);
  });
  it("supports multiple elections", async () => {
    await voting.createElection("Second", "Another election", start, end);
    expect(await voting.getElectionCount()).to.equal(2);
  });
  it("allows admin to close election", async () => { await voting.setElectionStatus(1, false); expect((await voting.getElection(1))[6]).to.equal(false); });
});
