//SPDX-License-Identifier: None
// solium-disable linebreak-style
pragma solidity >=0.4.21;


/**
@title Interface of the logic behind the Users
@notice This contract only defines the functions needed and implemented in UserLogic
*/
interface LogicInterface {
    function mixDna(Product _product, address _user) external;
}

/**
@title Product
@notice This contract contains the smart contract associated to the product
*/
contract Product {
    string ean;
    string sku;
    uint number_transactions;
    uint dnaProduct;
    uint8 level;
    string name;

    LogicInterface productLogicContract;
    function setLogicInterfaceAddress(address _address) external  {
        productLogicContract = LogicInterface(_address);
    }

    function getLogicContract() public view returns (LogicInterface) {
        return productLogicContract;
    }

    constructor(string memory _ean, string memory _sku, string memory _name, address _productLogic) public{
        ean = _ean;
        sku = _sku;
        number_transactions = 0;
        level = 0;
        name = _name;
        dnaProduct = 0;
        productLogicContract = LogicInterface(_productLogic);
    }
    //GETTERS y SETTEERS

    //getters
    function getEan() public view returns(string memory){
        return ean;
    }
    function getSku() public view returns(string memory){
        return sku;
    }
    function getTransactions() public view returns(uint){
        return number_transactions;
    }
    function getName() public view returns(string memory){
        return name;
    }
    function getAddress() public view returns(address){
        return address(this);
    }
    function getLevel() public view returns(uint8){
        return level;
    }
    function getDnaProduct() public view returns(uint256){
        return dnaProduct;
    }

    //setters
    function setTransactions() internal{
        number_transactions++;
    }
    function setDnaProduct(uint _dnaProduct) external{
        dnaProduct = _dnaProduct;
    }

    function setLevel(uint8 _level) public {
        level = _level;
    }

    // Logic functions
    function mixDna(address _user) public view{
        productLogicContract.mixDna(this,_user);
    }

}