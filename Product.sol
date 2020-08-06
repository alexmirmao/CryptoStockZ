pragma solidity ^0.6.3;
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol';

contract ProductToken is ERC721{
    /**
    implementados en el ERC721 
     mapping (address => EnumerableSet.UintSet) private _holderTokens;

    // Enumerable mapping from token ids to their owners
    EnumerableMap.UintToAddressMap private _tokenOwners;

    // Mapping from token ID to approved address
    mapping (uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping (address => mapping (address => bool)) private _operatorApprovals;
    */



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

    constructor() ERC721("StockZ Products", "SZP") public{}

    struct Product{
        string name;
        uint ean;
    }

    Product[] products;

    function mint(/**address _to, address _productId*/) public {
        //productId = uint256(_productId);
        Product memory _product = Product("air force",327);
        products.push(_product);
        uint _id = products.length;
        _mint(msg.sender, _id);
    }

    function getProductFromId(uint _id) public view returns(string memory,uint){
        return(products[_id].name,products[_id].ean);
    }
    
 
}