// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract NFTDToken is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("NFTinder", "NFTD") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

}

contract NFTinderCollection is ERC721Enumerable, ERC721Burnable, Ownable {
    using Strings for uint256;

    uint256          maxSupply;
    string           baseURI;// = "ipfs://QmbeT7zTp5nFbg4BzZJMKT1Ck71MxxXix4oBTr7GzRWKL6/"; donuts collection

    constructor(string memory _baseURI, uint _maxSupply) ERC721("NFTinder Collection", "NFTD") {
        baseURI = _baseURI;
        maxSupply = _maxSupply;   
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
                : "";
    }

    function changeBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }


    function safeMint(address to, uint256 tokenId) public onlyOwner {
        require(tokenId<=maxSupply);
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}

// import "./NFTDToken.sol";
// import "./NFTinderCollection.sol"; - перенести в другие файлы? деплоить отдельно?

contract NFTDProtocol {
    NFTDToken public          token;
    NFTinderCollection public nft;
    uint                      nftId = 0;
    mapping(address => mapping(string => uint)) userStats;

    //uint public constant    REWARDS_TIMEOUT = 1 seconds; - for test
    uint public constant    REWARDS_TIMEOUT = 1 days;
    uint public constant    REWARDS_AMOUNT  = 10;
    uint public constant DAYS_TO_NFT_REWARD = 5;

    event RewardToken (address indexed user, uint amount, string message);
    event RewardNFT (address indexed user, string uri, string message);

    constructor(uint _premint, string memory _baseURI, uint _maxSupply) {
        token = new NFTDToken();
        nft = new NFTinderCollection(_baseURI,_maxSupply);
        token.mint(address(this), _premint);
    }

    function acquireReward () external returns (uint) {
        require(block.timestamp - userStats[msg.sender]["lastReward"] >= REWARDS_TIMEOUT, "You can receive the reward only once a day");
        require(token.balanceOf(address(this)) >= REWARDS_AMOUNT, "Not enough tokens in the reserve");

        if (userStats[msg.sender]["dayStreak"] < DAYS_TO_NFT_REWARD) {
            userStats[msg.sender]["lastReward"] = block.timestamp;
            token.transfer(msg.sender, REWARDS_AMOUNT);
            userStats[msg.sender]["dayStreak"]++;
            emit RewardToken(msg.sender, REWARDS_AMOUNT, "You received a reward for activity");
            return (DAYS_TO_NFT_REWARD - userStats[msg.sender]["dayStreak"]);
        } else {
            userStats[msg.sender]["lastReward"] = block.timestamp;
            nft.safeMint(msg.sender, nftId);
            nftId++;
            userStats[msg.sender]["dayStreak"] = 0;

            emit RewardToken(msg.sender, REWARDS_AMOUNT * DAYS_TO_NFT_REWARD, "You received a reward for activity");
            return userStats[msg.sender]["dayStreak"];
        }
    }

    //test functions - delete later
    function getDayStreak(address _user) external view returns (uint) {
        return userStats[_user]["dayStreak"];
    }

    function getLastReward(address _user) external view returns (uint) {
        return userStats[_user]["lastReward"];
    }

    function getNFTId() external view returns (uint) {
        return nftId;
    }

    //get token balance of user
    function getTokenBalance(address _user) external view returns (uint) {
        return token.balanceOf(_user);
    }

    //get nft balance of user
    function getNFTBalance(address _user) external view returns (uint) {
        return nft.balanceOf(_user);
    }
}

