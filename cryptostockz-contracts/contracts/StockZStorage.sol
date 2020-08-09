//SPDX-License-Identifier: None
pragma solidity >=0.4.25 <0.7.0;

import './User.sol';
import './Product.sol';

/**
@title Storage of all the bussines
@notice This contract contains all the lotteries created in the system
@dev This contract makes easy to update the logic by dividing the logic and the storage
*/
contract StockZStorage {

    address owner;
    address latestVersion;

    // Structures where bussines is saved
    // keep al the Usersby address
    mapping(address => User) userStorage;
    User[] users;
    
    //keep the products by address
    mapping(address => Product) productStorage;
    Product[] products;
    
    //given a product address maps the owner of that product
    mapping(Product => User)productOwnedByUser;
    
    constructor(address _sender) public {
        owner = _sender;
        latestVersion = msg.sender;
    }


    /**
    @notice checks if the contract calling is the latest version provided
    */
    modifier onlyLatestVersion() {
       require(msg.sender == latestVersion, 'only owner');
        _;
    }

    /**
    @notice upgrade the address of the logic
    @dev this will be called by the owner of the contract (user) when an upgrade of the logic is made
    @param _newVersion address of the new contract logic
    */
    function upgradeVersion(address _newVersion) public {
        require(msg.sender == owner,'only owner');
        latestVersion = _newVersion;
    }

    // *** Getter Methods ***
    /**
    @notice gets a User by its address
    @param _key address of the User
    @return the User
    */
    function getUser(address _key) external view returns(User){
        return userStorage[_key];
    }

    /**
    @notice gets all the Users saved
    @return the Users
    */
    function getUser() external view returns (User[] memory){
        return users;
    }
    
    /**
    @notice gets a Product by its address
    @param _key address of the Product
    @return the Product
    */
    function getProduct(address _key) external view returns(User){
        return productStorage[_key];
    }

    /**
    @notice gets all the Products saved
    @return the Products
    */
    function getProducts() external view returns (User[] memory){
        return products;
    }
    
    /**
    @notice gets the owner(User) of a given Product
    @param _product of the User
    @return the User
    */
    function getproductsOwner(Product _product) external view returns(User){
        return productOwnedByUser[_product];
    }


    // *** Setter Methods ***
    /**
    @notice adds a new User to the storage mapping and array
    @dev can only be executed by the latest version contract
    @param _key the address of the User
    @param _value the User to save
    */
    function setUser(address _key, User _value) external onlyLatestVersion {
        userStorage[_key] = _value;
        users.push(_value);
    }
    
     /**
    @notice adds a new Product to the storage mapping and array
    @dev can only be executed by the latest version contract
    @param _key the address of the Product
    @param _value the Product to save
    */
    function setProduct(address _key, Product _value) external onlyLatestVersion {
        productStorage[_key] = _value;
        products.push(_value);
    }
    
     /**
    @notice adds a new User to the storage mapping and array
    @dev can only be executed by the latest version contract
    @param _key the Product owned by the User
    @param _value the User to save
    */
    function setProductOwnedByUser(Product _key, User _value) external onlyLatestVersion {
        productOwnedByUser[_key] = _value;

    }
}