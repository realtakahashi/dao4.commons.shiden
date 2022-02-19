// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/** 
* dao運用に特化したERC20
*/
contract DaoERC20 is ERC20,ReentrancyGuard{

    // event IssuedMemberToken(address indexed sender, uint256 id);
    // event BurnedMemberToken(address indexed sender, uint256 id);

    address public owner;
    uint256 public priceWei;
    address public daoAddress;
    uint256 public salesAmount;
    bool public onSale;

    /** 
    * constructor
    */
    constructor(string memory name,string memory symbol,address _daoAddress) ERC20(name,symbol) {
        owner = msg.sender;
        daoAddress = _daoAddress;
        onSale = false;
    }

    modifier onlyOwner(){
        require(owner == msg.sender,"only owner does.");
        _;
    }

    /** 
    * Mintを実行する関数です。
    */
    function mint(uint256 _priceWei,uint256 amount) public onlyOwner {
        priceWei = _priceWei;
        _mint(address(this),amount);        
    }

    /** 
    * トークンを販売する
    */
    function buy(uint256 _amount) public payable {
        require(onSale,"now not on sale.");
        require(_amount>0 && _amount<=totalSupply(),"invalid aamount.");
        require(msg.value==_amount*priceWei,"invalid transfering value.");

        _transfer(address(this),msg.sender,_amount);
        salesAmount += msg.value;
    }

    /** 
    * トークンセールの開始・終了を制御する
    */
    function controlTokenSale(bool _onSale) public onlyOwner {
        onSale = _onSale;
    }

    /** 
    * contract addressの残高を確認する
    */
    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    /** 
    * 収益を還元する
    */
    function withdraw() public onlyOwner {
        payable(daoAddress).transfer(salesAmount);
        salesAmount = 0;
    }

}

