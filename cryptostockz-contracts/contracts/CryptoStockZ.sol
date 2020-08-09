//SPDX-License-Identifier: None
// solium-disable linebreak-style
pragma solidity >=0.4.21;

import "./User.sol";
import "./ProductToken.sol";
import "./stockZStorage.sol";
import "./libs/Ownable.sol";

/**
@title The main service
@notice This contract contains all the functions and events that will be called from the front-end
*/
contract CryptoStockZ is Ownable {

    ProductToken productToken = new ProductToken();

    event createProduct(address _owner, string _name, uint256 _id, uint256 _ean, uint256 _sku, uint256 _numberTransactions, uint8 _level);

    function createProduct(uint _id, uint _ean, uint _sku, string memory _name) public {
        productToken.mint(msg.sender, _id, _ean, _sku, _name);

        emit createProduct(msg.sender);
    }
}