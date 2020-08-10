//SPDX-License-Identifier: None
// solium-disable linebreak-style
pragma solidity >=0.4.21;

import "./ProductToken.sol";
import "./StockZStorage.sol";
import "./Ownable.sol";
import "./Product";


contract CryptoStockZ is Ownable {

    ProductToken productToken = new ProductToken();
    StockZStorage stockZStorage = new StockZStorage(msg.sender);

    event createProductEvent(address _owner, string _name, string _ean, string _sku, uint256 _numberTransactions, uint8 _level);
    event transferTokenEvent(address _from, address _to, address _idProduct);

    function createProduct(string memory _ean, string memory  _sku, string memory _name) public {
        Product product = new Product(_ean,_sku,_name);  
        uint256 tokenId = stockZStorage.getProducts().length;
        stockZStorage.setProduct(_to, product);
        stockZStorage.setPositionProduct(product.getAddress(), tokenId);
        productToken.mint(msg.sender,tokenId);
        emit createProductEvent(msg.sender,_name,_ean,_sku,0,0);
    }

    function getProducts()public view returns(Product[] memory ) onlyOwner{
        return stockZStorage.getProducts();
    }
    
    function transferProduct(address _to, address _idProduct) public {
        emit transferTokenEvent(msg.sender, _to, _idProduct);
        return productToken.transferToken(msg.sender, _to, _idProduct);
    }
    
    function getProductFromAddress(address _idProduct) public view returns(string memory, string memory, string memory, uint, uint8){
        return productToken.getProductFromAddress(_idProduct);
    }
}