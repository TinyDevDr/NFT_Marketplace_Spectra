// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SPCToken is ERC20 {
    constructor () ERC20("SPC token", "SPC") {
        // mint(msg.sender, 1000000 * (10 ** 18));
    }

    function mintToken(address _to, uint256 _amount) public {
        _mint(_to, _amount);
    }
}
