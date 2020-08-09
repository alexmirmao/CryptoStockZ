pragma solidity ^0.6.3;
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol';
import './Product.sol';
import './StockZStorage.sol';

contract ProductToken is ERC721{
     // Diferencia entre transfer y approved
    /**
    Transfer transfiere directamente el token de from a to
    function transferFrom(address from, address to, uint256 tokenId)

    envía la misma información que el caso anterior. Después, el contrato almacena quién está 
    autorizado para tomar un token, generalmente en un mapping (uint256 => address). Entonces, cuando alguien
    llame a takeOwnership, el contrato comprueba si ese msg.sender está autorizado por el propietario para
    tomar ese token y si es así, le transfiere el token.
    function approve(address to, uint256 tokenId)

    La función mint es por la que se crea un token (https://www.youtube.com/watch?v=7TiXsOLiIrc)
    _safeMint(address to, uint256 tokenId)
    */
    StockZStorage stockZStorage = new StockZStorage(msg.sender);
    constructor() ERC721("Stock Z Products", "SZP") public{}


    //This function initialize the token associated to a Product
    function mint(address _to, string memory _ean, string memory _sku, string memory _name) public {
        Product product = new Product(_ean,_sku,_name);  
        uint256 tokenId = stockZStorage.getProducts().length;
        stockZStorage.setProduct(_to, product);
        stockZStorage.setPositionProduct(product.getAddress(), tokenId);
        _mint(_to, tokenId);
    }
    
    function getProducts()public view returns(Product[] memory ){
        return stockZStorage.getProducts();
    }
    
    function getProductFromAddress(address _idProduct) public view returns(string memory, string memory, string memory, uint, uint8){
        uint256 tokenId = stockZStorage.getProductToken(_idProduct);
        return(stockZStorage.getProducts()[tokenId].getName(), stockZStorage.getProducts()[tokenId].getEan(),stockZStorage.getProducts()[tokenId].getSku(),stockZStorage.getProducts()[tokenId].getTransactions(), stockZStorage.getProducts()[tokenId].getLevel());
    }

    //return the product´s owner
    function getOwner(address _idProduct) public view returns(address){
        uint256 tokenId = stockZStorage.getProductToken(_idProduct);
        return super.ownerOf(tokenId);
    }

    function setProductLevel(uint8 _level, address _idProduct) public{
        uint256 tokenId = stockZStorage.getProductToken(_idProduct);
        stockZStorage.getProducts()[tokenId].setLevel(_level);
    }
    
    function transferToken(address _from, address _to, address _idProduct) public{
        uint256 tokenId = stockZStorage.getProductToken(_idProduct);
        _transfer(_from, _to, tokenId);
        stockZStorage.setProduct(_to, stockZStorage.getProducts()[tokenId]);
    }

}
