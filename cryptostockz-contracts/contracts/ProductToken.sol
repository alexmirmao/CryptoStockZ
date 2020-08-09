pragma solidity ^0.6.3;
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol';
import './Product.sol';
import './User.sol';

contract ProductToken is ERC721{
   
   /**
    @title Interface of the logic behind the Products.
    @notice This contract only defines the functions needed and implemented in ProductLogic.
    */
    interface LogicInterface {
    }



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
    Product[] products;
    mapping(address => uint256) internal mapPosition;
    constructor() ERC721("Stock Z Products", "SZP") public{}


    //This function initialize the token associated to a Product
    function mint(address _to, uint _id, uint _ean, uint _sku, string memory _name ) public {
        Product product = new Product(_id,_ean,_sku,_name);  
        uint256 tokenId = products.length;
        products.push(product);
        mapPosition[address(product)] = tokenId;
        _mint(_to, tokenId);
    }
    
    function getProducts()public view returns(Product[] memory ){
        return products;
    }
    
    // returns the token(position of the product list)
    function getProductToken(address _product) internal view returns(uint256){
        return mapPosition[_product];
    }
    
    function getProductFromAddress(address _product) public view returns(string memory,uint,uint,uint,uint){
        uint256 tokenId = getProductToken(_product)
        return(products[tokenId].getName(), products[tokenId].getId(), products[tokenId].getEan(),products[tokenId].getSku(),products[tokenId].getTransactions(), products[tokenId].getLevel());
    }

    //return the product´s owner
    function getOwner(address _product)public view returns(address){
        uint256 tokenId = getProductToken(_product);
        return super.ownerOf(tokenId);
    }

    function setProductLevel(uint8 _level, address _product){
        uint256 tokenId = getProductToken(_product);
        products[tokenId].setLevel(_level);
    }

}
