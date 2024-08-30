import { ethers } from "hardhat";

async function main() {
    const web3CXITokenAddress = await ethers.getContractFactory('Web3CXI')
    const web3CXI = await web3CXITokenAddress.deploy();
   web3CXI.waitForDeployment()

   console.log('Token deployed to',web3CXI.target)


   const saveERC20 = await ethers.getContractFactory('SaveERC20')
    const s20 = await saveERC20.deploy(web3CXI.target);
   s20.waitForDeployment()

   console.log('Staking Contract deployed to',s20.target)

    // const saveERC20ContractAddress = "0xD410219f5C87247d3F109695275A70Da7805f1b1";
    // const saveERC20 = await ethers.getContractAt("ISaveERC20", saveERC20ContractAddress);

    // Approve savings contract to spend token
    const approvalAmount = ethers.parseUnits("1000", 18);

    const approveTx = await web3CXI.approve(s20.target, approvalAmount);
    approveTx.wait();
    console.log('approved')

    const contractBalanceBeforeDeposit = await s20.getContractBalance();
    console.log("Contract balance before :::", contractBalanceBeforeDeposit);

    const depositAmount = ethers.parseUnits("150", 18);
    const depositTx = await s20.deposit(depositAmount);

    console.log(depositTx);

    depositTx.wait();

    const contractBalanceAfterDeposit = await s20.getContractBalance();

    console.log("Contract balance after :::", contractBalanceAfterDeposit);



    // Withdrawal Interaction

    const withdrawaTx=await s20.withdraw(depositAmount);
    const t=await withdrawaTx.wait()
    console.log('Withdrawal txn',t)

    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
