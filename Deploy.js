async function main() {
const [deployer] = await ethers.getSigners();
console.log('Deploying with', deployer.address);
const Rel = await ethers.getContractFactory('ReliefRoute');
const rel = await Rel.deploy();
await rel.deployed();
console.log('ReliefRoute deployed to', rel.address);
}


main().catch((e)=>{console.error(e); process.exit(1);});
