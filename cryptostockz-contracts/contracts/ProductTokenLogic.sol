//SPDX-License-Identifier: None
// solium-disable linebreak-style
pragma solidity >=0.4.21;

import './Product.sol';

contract ProductLogic {
    /**
     @notice Upgrade the level of one product
     @param _product Product contract
     @param _addressProduct Address of the product
     */
    function upLevel(Product _product, address _addressProduct) public {
        _product.addLevel();
    }
}