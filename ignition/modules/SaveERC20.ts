import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0xaDBA987955Eac146f1983062100046be46e632fA";

const SaveERC20Module = buildModule("SaveERC20Module", (m) => {

    const save = m.contract("SaveERC20", [tokenAddress]);

    return { save };
});

export default SaveERC20Module;

// Deployed SaveERC20: 0xD410219f5C87247d3F109695275A70Da7805f1b1
