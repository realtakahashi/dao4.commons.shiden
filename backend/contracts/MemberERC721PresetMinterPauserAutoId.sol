// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/** 
* DAOのメンバーようにMintするERC721トークン
* DAOを作成時にデプロイして、DAOにこのトークンのアドレスを保存します。
* メンバー追加を依頼するものはこのトークンをまずMintしてから追加を申し出る必要があります。
*/
contract MemberERC721PresetMinterPauserAutoId is ERC721PresetMinterPauserAutoId,ReentrancyGuard{
    using Counters for Counters.Counter;

    uint256 DEPOSITE_AMOUNT = 2000000000000000000;
    
    address owner;
    Counters.Counter private _tokenIdTracker;
    address daoAddress;

    // eoa => tokenId
    mapping(address => uint256) public ownedTokenId;

    event IssuedMemberToken(address indexed sender, uint256 id);
    event BurnedMemberToken(address indexed sender, uint256 id);

    /** 
    * constructor
    * baseTokenURI: 絵画とかアートとかを標榜していないので、有効なURLである必要はありません。
    */
    constructor(string memory name,
                string memory symbol,
                string memory baseTokenURI,
                address _daoAddress
    ) ERC721PresetMinterPauserAutoId(name,symbol,baseTokenURI) {
        // This NFT start One
        _tokenIdTracker.increment();

        owner = msg.sender;
        daoAddress = _daoAddress;
    }

    // modifier onlyOwner(){
    //     require(owner == msg.sender);
    //     _;
    // }

    /** 
    * Mintを実行する関数です。
    * Mintするためには一定額のNativeトークンのDepositが必要となります。
    * 脱退時にBurn関数を呼び出すことでトークンは返却されます。
    */
    function original_mint(address to) public payable {
        // require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
        // console.log("msg.value is :", msg.value);
        require(ownedTokenId[msg.sender]==0,"Already minted.");
        require(msg.value==DEPOSITE_AMOUNT,"10 token is needed as deposit.");
        _mint(to, _tokenIdTracker.current());
        ownedTokenId[msg.sender] = _tokenIdTracker.current();
        emit IssuedMemberToken(to, _tokenIdTracker.current());
        _tokenIdTracker.increment();
    }

    /** 
    * 通常のMint関数は呼べないようにしています。
    */
    function mint(address to) public pure override {
        revert("this function is not useful.");
    }

    /**
     * 譲渡不能にしています。
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public pure override {
        // safeTransferFrom(from, to, tokenId, "");
        revert("can't transfer.");
    }

    /**
     * 譲渡不能にしています。
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public  pure override  {
        revert("can't transfer.");
        // require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        //_safeTransfer(from, to, tokenId, _data);
    }

    /** 
    * 譲渡不能にしています。
    */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public pure override {
        revert("can't transfer.");
    }

    /** 
    * トークンをバーンします。
    * Mint時にDepositしたトークンを返却します。
    */
    function burn(uint256 tokenId) override public {
        address tokenOwner = ownerOf(tokenId);
        require(tokenOwner!=address(0)&&(msg.sender == owner || ownerOf(tokenId)==msg.sender),"can't burn");
        _burn(tokenId);
        payable(msg.sender).transfer(DEPOSITE_AMOUNT);
        ownedTokenId[msg.sender] = 0;
        emit BurnedMemberToken(tokenOwner, tokenId);
    }
}

