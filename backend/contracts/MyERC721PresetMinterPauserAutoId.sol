// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract MyERC721PresetMinterPauserAutoId is ERC721PresetMinterPauserAutoId{
    using Counters for Counters.Counter;
    
    address owner;
    Counters.Counter private _tokenIdTracker;

    event IssuedMemberToken(address indexed sender, uint256 id);

    constructor(string memory name,
                string memory symbol,
                string memory baseTokenURI
    ) ERC721PresetMinterPauserAutoId(name,symbol,baseTokenURI) {
        owner = msg.sender;
    }

    // modifier onlyOwner(){
    //     require(owner == msg.sender);
    //     _;
    // }

    function member_token_mint(address to) public returns (uint256) {
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");

        uint256 tokenId = _tokenIdTracker.current();
        _mint(to, tokenId);
        emit IssuedMemberToken(to, tokenId);
        _tokenIdTracker.increment();
        return tokenId;
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
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
     * @dev See {IERC721-safeTransferFrom}.
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

    // function _burn(uint256 tokenId) internal override {
    //     address owner = ERC721.ownerOf(tokenId);

    //     _beforeTokenTransfer(owner, address(0), tokenId);

    //     // Clear approvals
    //     _approve(address(0), tokenId);

    //     _balances[owner] -= 1;
    //     delete _owners[tokenId];

    //     emit Transfer(owner, address(0), tokenId);

    //     _afterTokenTransfer(owner, address(0), tokenId);
    // }


}

