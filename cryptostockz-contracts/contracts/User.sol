//SPDX-License-Identifier: None
// solium-disable linebreak-style
pragma solidity >=0.4.21;



/**
@title The interface of the logic behind the lotteries
@notice This contract only defines the functions needed and implemented in LotteryLogic

interface LogicInterface {
    function addParticipant(Lottery _ml, address _participant, uint _cost) external;
    function checkLotteryParticipation(Lottery _ml) external returns (bool);
    function rafflePrize(Lottery _ml, uint _seed) external;
    function withdrawParticipation(Lottery _ml, address _receiver) external;
}
*/
/**
@title The lotteries created by the users
@notice This contract saves the participations of the users and the information relative to each created lottery
*/
contract User {
    
    address id;
    address[] public products;
    uint bought;
    uint sold;
    uint number_products;
    uint level;
    
    string nick_name;
    
    Rol rol;
    
    enum Rol {
        NormalUser,
        CompanyUser,
        RetailerUser
    }

    //LogicInterface logicContract;

    constructor(address _id, Rol _rol, string memory _name) public {
        id = _id;
        level = 0;
        bought = 0;
        sold = 0;
        number_products = 0;
        rol = _rol;
        nick_name = _name;
        //logicContract = LogicInterface(_lotteryLogic);
        
    }

    /**
    @notice fallback function to receive the participations
    */
    receive() external payable {

    }

    /**
    @notice sets the address of the logic
    @param _address address of the interface
    @param _sender address that wants to set the interface address
    
    function setLogicInterfaceAddress(address _address, address _sender) external  {
        require(_sender == owner, "Solo el dueño de la loteria");
        logicContract = LogicInterface(_address);
    }
    */
    /**
    @notice gets the address where the logic contract is set
    @return logicContract
    
    function getLogicContract() public view returns (LogicInterface) {
        return logicContract;
    }
    */
   

    /**
    @notice adds a product to the User
    @param _product the address of the product
    */
    function addProduct(address _product) public {
        products.push(_product);
        number_products = number_products + 1;
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
    @notice gets all the products of the USER
    @return the address of all the products
    */
    function getProducts() public view returns(address[] memory){
        return products;
    }

    // getters setters level
    /**
    @notice gets the level of the USER
    @return the level
    */
    function getUserLevel() public view returns(uint){
        return level;
    }
    
     /**
    @notice adds 1 to the level of a USER
    */
     function addLevel() private {
        level = level + 1;
    }
    
    // getters setters number_products
    /**
    @notice gets the pot of the lottery
    @return pot of the lottery
    */
    function getNumberProducts() public view returns(uint){
        return number_products;
    }

    // getters/setters sold
    /**
    @notice gets the number of products sold from a USER
    @return sold
    */
    function getSold() public view returns(uint){
        return sold;
    }
    
    /**
    @notice adds 1 to the number of products sold of an USER
    */
    function addSold() private{
        sold = sold + 1;
    }
    
    // getters/setters bought
    /**
    @notice gets the number of products brought for a USER
    @return bought
    */
    function getBought() public view returns(uint){
        return bought;
    }
    
    /**
    @notice adds 1 to the number of products bought of an USER
    */
    function addBought() private{
        bought = bought + 1;
    }
    
    //getter/setter nick_name
    function getNickName() public view returns(string memory){
        return nick_name;
    }

    // getters/setters stage
    /**
    @notice gets the rol of the USER
    @return rol of the USER as a string
    */
    function getRol() public view returns(string memory){
        if (Rol.NormalUser == rol ) return "NormalUser";
        if (Rol.CompanyUser == rol ) return "CompanyUser";
        if (Rol.RetailerUser == rol ) return "RetailerUser";
    }

    /**
    @notice gets the rol by its string
    @param _value the rol as a string
    @return rol of the User as a Rol
    */
    function getRolByValue(string memory _value) public pure returns (Rol) {
        if (keccak256(abi.encodePacked(_value)) == keccak256(abi.encodePacked("NormalUser"))) return Rol.NormalUser;
        else if (keccak256(abi.encodePacked(_value)) == keccak256(abi.encodePacked("CompanyUser"))) return Rol.CompanyUser;
        else if (keccak256(abi.encodePacked(_value)) == keccak256(abi.encodePacked("RetailerUser"))) return Rol.RetailerUser;
        
    }

    /**
    @notice sets the rol of the User
    @param _rol the rol to be set
    */
    function setRol(Rol _rol) internal {
        rol = _rol;
    }

    /**
    @notice sets the rol of the USER by a string
    @param _value the rol string to be set
    */
    function setStageByValue(string calldata _value) external {
        setRol(getRolByValue(_value));
    }

    /**
    @notice checks if the user is an specified Rol
    @param _value the rol string to compare to
    */
    function isCurrentStageByValue(string memory _value) public view returns (bool) {
        if (getRolByValue(_value) == rol) {
            return true;
        }
        return false;
    }

    

    
}