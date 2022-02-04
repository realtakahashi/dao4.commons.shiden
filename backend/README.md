# How to use This Backend project
- This project is made by Hardhat.So you have to install and set hardhat environment.

# Install hardhat
- Hardhat official document is [here](https://hardhat.org/)
```
npm install --save-dev hardhat
```
# Initialization this project
```
git clone https://github.com/realtakahashi/dao4.commons.shiden.git
cd dao4.commons.shiden/backend
npm i
```
# Metakask settings for local account
- When we impliment this project,we need to operate tokens with metamask.
- You get development account privte key, and you import the key to metamask.
- When you execute "npx hardhat node", Some private key is appered.
```
npx hardhat node
```

# Deploy Contract
```
cd dao4.commons.shiden/backend
npx hardhat compile
npx hardhat run scripts/deploy_subdao.js 
```

# Excecute contract by Hardhat console
- You have to run a local node.
- With another termial,you can execute Hardhat concole.
```
npx hardhat node
```
```
npx hardhat console --network localhost
```
```
const DAO = await ethers.getContractFactory("SubDAO");
const dao = await DAO.attach("YOUR DEPLOYED CONTRACT ADDRESS ");
dao.createDAO("test","test.com","shin",{value:ethers.utils.parseEther("1.0")});
```
