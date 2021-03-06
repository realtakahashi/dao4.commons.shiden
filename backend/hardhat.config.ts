import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "hardhat-contract-sizer";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

import { privateKey } from './private.json'

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    shibuya: {
      url: "https://evm.shibuya.astar.network",
      chainId: 81,
      accounts: privateKey,
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
      accounts: privateKey,
    }
  }
};
