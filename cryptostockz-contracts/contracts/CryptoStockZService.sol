//SPDX-License-Identifier: None
// solium-disable linebreak-style
pragma solidity >=0.4.21;

import "./ProductToken.sol";
import "./ProductLogic.sol";
import "./StockZStorage.sol";
import "./Ownable.sol";
import "./Product.sol";
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol';

contract CryptoStockZ is Ownable {
    
    //constructor() ERC721("Stock Z Products", "SZP") public{}
    StockZStorage stockZStorage = new StockZStorage(msg.sender);  // Creamos el storage 1.0
    ProductToken productToken = new ProductToken();
    address productLogic = address(new ProductLogic());

    event createProductEvent(address _owner, string _name, string _ean, string _sku, uint256 _numberTransactions,uint256 dna, uint8 _level);
    event transferTokenEvent(address _from, address _to, address _idProduct);

    // StockZStorage Storage
    /**
    @notice sets the address of the Storage contract
    @dev Storage has all products saved in order to have an eternal storage
    @param _StockZStorageAddr address of the Storage contract
    */
    function setStockZStorage(address _StockZStorageAddr) public onlyOwner {
        stockZStorage = StockZStorage(address(_StockZStorageAddr));
    }

     // ProductToken Storage
    /**
    @notice sets the address of the Token contract
    @dev Storage has all products association with their owners
    @param _productTokenAddr address of the Storage contract
    */
    function setProductToken(address _productTokenAddr) public onlyOwner {
        productToken = ProductToken(address(_productTokenAddr));
    }

    function createProduct(string memory _ean, string memory  _sku, string memory _name) public {
        Product product = new Product(_ean,_sku,_name,productLogic);
        uint256 tokenId = stockZStorage.getProducts().length;
        stockZStorage.setProduct(product);
        stockZStorage.setPositionProduct(product.getAddress(), tokenId);
        productToken.mint(msg.sender, tokenId);
        emit createProductEvent(msg.sender,_name,_ean,_sku,0,0,0);
    }
    
    function transferProduct(address _to, address _idProduct) public {
        uint256 tokenId = stockZStorage.getProductToken(_idProduct);
        productToken.transferToken(msg.sender, _to, tokenId);
        // stockZStorage.setProduct(stockZStorage.getProducts()[tokenId]);
        stockZStorage.getProducts()[tokenId].mixDna(_to);
        emit transferTokenEvent(msg.sender, _to, _idProduct);
    }

    function getProducts()public view returns(Product[] memory) {
        return stockZStorage.getProducts();
    }
    
    function getProductFromAddress(address _idProduct) public view returns(string memory, string memory, string memory, uint, uint, uint8){
        uint256 tokenId = stockZStorage.getProductToken(_idProduct);
        return(stockZStorage.getProducts()[tokenId].getName(), stockZStorage.getProducts()[tokenId].getEan(),stockZStorage.getProducts()[tokenId].getSku(),stockZStorage.getProducts()[tokenId].getTransactions(),stockZStorage.getProducts()[tokenId].getDnaProduct() , stockZStorage.getProducts()[tokenId].getLevel());
    }
    
    function getOwnerOfProduct(address _idProduct) public view returns(address){
        uint256 tokenId = stockZStorage.getProductToken(_idProduct);
        return productToken.getOwner(tokenId);
    }
    
    function getStorageAddress() public view onlyOwner returns(address) {
        return address(stockZStorage);
    }
    
    function getProductTokenAddress() public view onlyOwner returns(address) {
        return address(productToken);
    }
    
    function getTotalTokens() public view returns(uint256) {
        return productToken.totalTokens();
    }
    
    function getCredentials() public view returns(string memory, string memory){
        return(productToken.name(), productToken.symbol());
    }
    
    function getBalanceOwner(address _owner) public view returns(uint256) {
        return productToken.balanceOf(_owner);
    }
    
    // En el caso que el propietario anterior siga con el token y no quiera transferirlo, el siguiente propietario debería
    // tener la posibilidad de reclamar el token. Pudiendo nosotros quitarle el token al propietario A y enviarselo al 
    // propietario B.
    // Para ver si la persona que ha comprado el producto, pueda solicitarlo al propietario anterior.
    /*
    function getApprove(address _to, address _idProduct) public onlyOwner {
        uint256 tokenId = stockZStorage.getProductToken(_idProduct);
        return productToken.approve(_to, tokenId);
    }
    */
}



