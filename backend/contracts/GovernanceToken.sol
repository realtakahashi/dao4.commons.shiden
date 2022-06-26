// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/** 
* dao運用に特化したERC20
*/
contract GovernanceToken is ERC20,ReentrancyGuard{

    address public owner;
    address public daoAddress;
    uint256 public mintedAmount;

    event Minted(address indexed executer, uint256 amount);

    /** 
    * constructor
    */
    constructor(string memory name,string memory symbol,address _daoAddress) ERC20(name,symbol) {
        owner = msg.sender;
        daoAddress = _daoAddress;
        mintedAmount = 0;
    }

    modifier onlyOwner(){
        require(owner == msg.sender,"only owner does.");
        _;
    }

    /** 
    * Mintを実行する関数です。
    */
    function mint(uint256 amount) public onlyOwner {
        _mint(address(this),amount);
        mintedAmount = mintedAmount + amount;
        emit Minted(msg.sender, amount);   
    }

    /**
    * コントラクトアドレスから指定のアドレスにトークンを送信する
    */
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _transfer(address(this),recipient,amount);
        return true;
    }
}

