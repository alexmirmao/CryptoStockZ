//SPDX-License-Identifier: None
// solium-disable linebreak-style
pragma solidity >=0.4.21;

/**
@title Interface of the logic behind the Products.
@notice This contract only defines the functions needed and implemented in ProductLogic.
*/
interface LogicInterface {
}

/**
@title Product
@notice This contract contains the smart contract associated to the product
*/
contract Product {
    uint id;
    uint ean;
    uint sku;
    uint number_transactions;
    string name;
    // no hace falta owner porque esta en los tokens

    LogicInterface productLogicContract;
    function setLogicInterfaceAddress(address _address) external  {
        productLogicContract = LogicInterface(_address);
    }

    function getLogicContract() public view returns (LogicInterface) {
        return productLogicContract;
    }

    constructor(uint _id, uint _ean, uint _sku, string memory _name) public{
        id = _id;
        ean = _ean;
        sku = _sku;
        number_transactions = 0;
        name = _name;
    }
    //GETTERS y SETTEERS

    //getters
    function getId() public view returns(uint){
        return id;
    }
    function getEan() public view returns(uint){
        return ean;
    }
    function getSku() public view returns(uint){
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

    //setters
    function setTransactions() internal{
        number_transactions++;
    }

}