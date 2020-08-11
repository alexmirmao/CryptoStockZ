//SPDX-License-Identifier: None
// solium-disable linebreak-style
pragma solidity >=0.4.21;

import './Product.sol';



contract ProductLogic {
    function getLastDigits(uint256 _mixedDna) internal pure returns(uint256){
        uint256 suma = 0;
        for (uint256 i = 0; i < 4; i++){
            uint256 lastDigit = _mixedDna % 10;
            _mixedDna = _mixedDna / 10;
            suma = suma + lastDigit * 10**i;
        }
        return suma;
    }

    function mixDna(Product _product, address _user) public {
        uint256 convertAddress = uint256(_user);
        uint256 dna = _product.getDnaProduct();
        uint256 mixed = (dna + convertAddress);
        _product.setDnaProduct(getLastDigits(mixed));
    }
  
}