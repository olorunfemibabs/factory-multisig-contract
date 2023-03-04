import { ethers } from "hardhat";

async function main() {
  const [owner, addr1, addr2, newAddr] = await ethers.getSigners();
  const admin = [addr1.address, addr2.address, owner.address];

  const CloneMultiSig = await ethers.getContractFactory("cloneMultiSig");
  const cloneMultiSig = await CloneMultiSig.deploy();
  await cloneMultiSig.deployed();

  console.log(`Multisig Address is ${cloneMultiSig.address}`);
  console.log(addr1.address, addr2.address, owner.address);

  const newMultisig = await cloneMultiSig.createMultiSig(admin);
  let event = await newMultisig.wait();
  let newChild = event.events[0].args[0];
  console.log(newChild);

  //////////////////////////////////////////////////

  const childMultisig = await ethers.getContractAt("IMultisig", newChild);
  const addresses = await childMultisig.returnAdmins();
  console.log(addresses);

  await childMultisig.addAdmin(newAddr.address);
  await childMultisig.connect(addr1).addAdmin(newAddr.address);

  const addressesNew = await childMultisig.returnAdmins();
  console.log(addressesNew);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});