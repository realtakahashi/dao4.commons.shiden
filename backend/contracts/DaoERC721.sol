// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/** 
* dao運用に特化したERC20
*/
contract DaoERC721 is ERC721,ReentrancyGuard{
    using Counters for Counters.Counter;
    using Strings for uint256;

    address public owner;
    address public daoAddress;
    uint256 public priceWei;
    uint256 public salesAmount;
    bool public onSale;
    string public baseUri;

    Counters.Counter private _tokenIdTracker;

    event Bought(address indexed executer, uint256 tokenId);
    event ControledTokenSale(address indexed executer, bool onSale);
    event Withdrawn(address indexed executer, uint256 amount);

    /** 
    * constructor
    */
    constructor(string memory name,string memory symbol,address _daoAddress,uint256 _priceWei, string memory _baseUri) ERC721(name,symbol) {
        owner = msg.sender;
        daoAddress = _daoAddress;
        priceWei = _priceWei;
        onSale = false;
        baseUri = _baseUri;
    }

    modifier onlyOwner(){
        require(owner == msg.sender,"only owner does");
        _;
    }

    /** 
    * トークンを販売する
    */
    function buy() public payable {
        require(onSale,"now not on sale.");
        require(msg.value==priceWei,"invalid transfering value.");
        uint256 _tokenId = _tokenIdTracker.current();
        _safeMint(msg.sender,_tokenId);
        _tokenIdTracker.increment();
        salesAmount += msg.value;
        emit Bought(msg.sender,_tokenId);
    }

    /** 
    * トークンセールの開始・終了を制御する
    */
    function controlTokenSale(bool _onSale) public onlyOwner {
        onSale = _onSale;
        emit ControledTokenSale(msg.sender, onSale);
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
        emit Withdrawn(msg.sender, salesAmount);
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view  override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(),".json")) : "";
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overridden in child contracts.
     */
    function _baseURI() internal view override returns (string memory) {
        return baseUri;
    }
}