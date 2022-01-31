// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SpectraNFT is ERC721 {

    uint256 _tokenCounter;

    mapping(string => uint256) _getNFTId;
    mapping(uint256 => string) _uriFromId;

    constructor() ERC721("Spectra NFT", "SPCNFT") {
        _tokenCounter = 0;
    }

    function mintNFT(string memory _tokenHash) external payable returns (uint256) {
        // require(msg.value == 0.5 ether);
        _mint(msg.sender, _tokenCounter);
        _getNFTId[_tokenHash] = _tokenCounter;
        _setTokenUri(_tokenCounter, _tokenHash);
        _tokenCounter++;
        return _tokenCounter;
    }

    function tranferNFT(address _from, address _to, string memory _tokenHash) external payable {
        transferFrom(_from, _to, _getNFTId[_tokenHash]);
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        super.tokenURI(_tokenId);
        return _uriFromId[_tokenId];
    }

    function _setTokenUri(uint256 _tokenId, string memory _uri) internal {
        _uriFromId[_tokenId] = _uri;
    }
}