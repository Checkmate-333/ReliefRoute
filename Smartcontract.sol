// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ReliefRoute is ERC721, Ownable {
uint256 public nextId;


enum Status { Created, InTransit, Delivered }


struct Package {
uint256 id;
string metadataURI; // IPFS or HTTP
Status status;
address recipient;
uint256 createdAt;
}


mapping(uint256 => Package) public packages;


event PackageMinted(uint256 indexed id, address indexed minter, string metadataURI);
event StatusUpdated(uint256 indexed id, Status status);
event RecipientAssigned(uint256 indexed id, address indexed recipient);


constructor() ERC721("ReliefRoute", "RRTE") {}


function mintPackage(address to, string memory metadataURI) external onlyOwner returns (uint256) {
uint256 id = nextId++;
_safeMint(to, id);
packages[id] = Package({
id: id,
metadataURI: metadataURI,
status: Status.Created,
recipient: address(0),
createdAt: block.timestamp
});
emit PackageMinted(id, msg.sender, metadataURI);
return id;
}


function updateStatus(uint256 id, Status status) external onlyOwner {
packages[id].status = status;
emit StatusUpdated(id, status);
}


function assignRecipient(uint256 id, address recipient) external onlyOwner {
packages[id].recipient = recipient;
emit RecipientAssigned(id, recipient);
}


function tokenURI(uint256 tokenId) public view override returns (string memory) {
return packages[tokenId].metadataURI;
}
}
