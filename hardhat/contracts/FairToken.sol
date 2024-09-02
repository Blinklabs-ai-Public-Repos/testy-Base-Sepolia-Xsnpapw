
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

/**
 * @title FairToken
 * @dev This contract implements an ERC20 token with additional features:
 * - Multisend (inherits from OpenZeppelin Multicall)
 * - Gasless transactions (inherits from OpenZeppelin ERC20Permit)
 */
contract FairToken is ERC20, ERC20Permit, Multicall {
    uint256 private immutable _maxSupply;
    IUniswapV2Router02 public uniswapRouter;

    /**
     * @dev Constructor that sets the name, symbol, and max supply of the token.
     * @param name_ The name of the token.
     * @param symbol_ The symbol of the token.
     * @param maxSupply_ The maximum supply of the token.
     * @param router_ The uniswap v2 router address
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 maxSupply_,
        address router_
    ) ERC20(name_, symbol_) ERC20Permit(name_) payable {
        require(maxSupply_ > 0, "AdvancedERC20Token: Max supply must be greater than 0");
        _maxSupply = maxSupply_;
        _mint(address(this), maxSupply_);
        uniswapRouter = IUniswapV2Router02(router_);
    }

    function AddLiquidityETH() external payable {
        //approve
        _approve(address(this), address(uniswapRouter), _maxSupply);

        //add liquidity. desired amount is maxSupply
        //desired amount = min amount so that nothing is left over
        uniswapRouter.addLiquidityETH{ value: msg.value }(
            address(this),
            _maxSupply,
            _maxSupply,
            msg.value,
            msg.sender,
            block.timestamp
        );
    }

    // Allow the contract to receive ETH
    //receive() external payable {}

    /**
     * @dev Returns the maximum supply of the token.
     * @return The maximum supply of the token.
     */
    function maxSupply() public view returns (uint256) {
        return _maxSupply;
    }

    /**
     * @dev See {ERC20-_beforeTokenTransfer}.
     * @param from The address tokens are transferred from.
     * @param to The address tokens are transferred to.
     * @param amount The amount of tokens transferred.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
