//SPDX-License-Identifier: None
// solium-disable linebreak-style
pragma solidity >=0.4.21;

import "./ProductToken.sol";
import "./StockZStorage.sol";
import "./Ownable.sol";


contract CryptoStockZ is Ownable {

    ProductToken productToken = new ProductToken();

    event createProductEvent(address _owner, string _name, string _ean, string _sku, uint256 _numberTransactions, uint8 _level);

    function createProduct(string memory _ean, string memory  _sku, string memory _name) public {
        productToken.mint(msg.sender, _ean, _sku, _name);
        emit createProductEvent(msg.sender,_name,_ean,_sku,0,0);
    }
    function getProducts() public view returns(Product[] memory){
        return productToken.getProducts();
    }
    
    function transferProduct(address _to, address _idProduct) public {
        return productToken.transferToken(msg.sender, _to, _idProduct);
    }
    
    function getProductFromAddress(address _idProduct) public view returns(string memory, string memory, string memory, uint, uint8){
        return productToken.getProductFromAddress(_idProduct);
    }
}