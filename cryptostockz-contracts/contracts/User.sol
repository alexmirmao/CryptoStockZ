//SPDX-License-Identifier: None
// solium-disable linebreak-style
pragma solidity >=0.4.21;

import './Product.sol';

/**
@title Interface of the logic behind the Users
@notice This contract only defines the functions needed and implemented in UserLogic
*/
interface LogicInterface {
    function addProduct(User _user, address _product) external;
    function removeProduct(User _user, address _product) external;
    function addToWishlist(User _user, address _product) external;
    function removeToWishlist(User _user, address _product) external;
}

/**
@title User
@notice This contract saves the info related to the user.
*/
contract User{
    address id;    
    uint purchase;
    uint sales;
    uint level;
    uint create_date;
    
    mapping (address => bool) public ownArticles;
    address[] internal ownArticlesList;

    mapping (address => bool) public favArticles;
    address[] internal favArticlesList;

    LogicInterface userLogicContract;
    function setLogicInterfaceAddress(address _address) external  {
        userLogicContract = LogicInterface(_address);
    }

    function getLogicContract() public view returns (LogicInterface) {
        return userLogicContract;
    }

    constructor(address _id, uint _purchase, uint _sales, uint _level) public {
        id = _id;
        purchase = _purchase;
        sales = _sales;
        level = _level;
        create_date = block.timestamp;
    }

    // getters/setters USER

    /**
    @notice gets id of the USER
    @return the address which is the id
    */
    function getId() public view returns(address){
        return id;
    }

    /**
    @notice Get all the articles belong to the USER
    @return the address of all the products
    */
    function getOwnArticles() public view returns(address[] memory){
        return ownArticlesList;
    }

    /**
    @notice Get favorite articles belong to the USER
    @return the address of all the products
    */
    function getFavArticles() public view returns(address[] memory){
        return favArticlesList;
    }
    
    /**
     @notice Add the product to the array and set true to the mapping of ownArticles.
     @param _product address of the product.
     */
    function setOwnArticles(address _product) external {
        ownArticlesList.push(_product);
        ownArticles[_product]=true;
    }

    /**
     @notice Add the product to the array and set true to the mapping of favArticles.
     @param _product address of the product.
     */
    function setFavArticles(address _product) external {
        favArticlesList.push(_product);
        favArticles[_product]=true;
    }
    
    /**
     @notice Look for a product and return true or false if the product exists.
     @param _product address of the product.
     */
    function ownArticleExists(address _product) external view returns(bool){
        return ownArticles[_product];
    }

    /**
     @notice Look for a product and return true or false if the product exists.
     @param _product address of the product.
     */
    function favArticleExists(address _product) external view returns(bool){
        return favArticles[_product];
    }

    /**
     @notice Remove the product to the array and set false to the mapping of ownArticles.
     @param _product address of the product.
     */
    function unsetOwnArticles(address _product) external {
        ownArticlesList.pop();
        ownArticles[_product]=false;
    }

    /**
     @notice Remove the product to the array and set false to the mapping of favArticles.
     @param _product address of the product.
     */
    function unsetFavArticles(address _product) external {
        favArticlesList.pop();
        favArticles[_product]=false;
    }

    // getters setters level
    /**
    @notice gets the level of the USER
    @return the level
    */
    function getUserLevel() public view returns(uint){
        return level;
    }

    function setLevel(uint _level) external {
        level = _level;
    }
    
     /**
    @notice adds 1 to the level of a USER
    */
    function addLevel() external {
        level++;
    }

    // getters/setters sales
    /**
    @notice gets the number of products sold from a USER
    @return sales
    */
    function getSales() public view returns(uint){
        return sales;
    }

    function setSales(uint _sales) external {
        sales = _sales;
    }
    
    /**
    @notice adds 1 to the number of products sold of an USER
    */
    function addSales() external{
        sales++;
    }
    
    // getters/setters purchase
    /**
    @notice gets the number of products purchased for a USER
    @return purchase
    */
    function getPurchase() public view returns(uint){
        return purchase;
    }

    function setPurchase(uint _purchase) external {
        purchase = _purchase;
    }
    
    /**
    @notice adds 1 to the number of products purchased of an USER
    */
    function addPurchase() external {
        purchase++;
    }
    
    /**
     * @notice get the date where the account was created. It must be parsed to YYYY-mm-dd.
     */
    function getCreateDate() public view returns(uint){
        return create_date;
    }
    
    /**
     @notice add a product to an user
     @param _product address of the product.
     */
    function addProductToUser(address _product) public {
        userLogicContract.addProduct(this, _product);
    }
    
    /**
     @notice remove a product to an user
     @param _product address of the product.
     */
    function removeProductToUser(address _product) public {
        userLogicContract.removeProduct(this, _product);
    }

    /**
     @notice add a product to an user's wishlist.
     @param _product address of the product.
     */
    function addToWishlist(address _product) public {
        userLogicContract.addToWishlist(this, _product);
    }
    
    /**
     @notice remove a product to an user
     @param _product address of the product.
     */
    function removeToWishlist(address _product) public {
        userLogicContract.removeToWishlist(this, _product);
    }
}