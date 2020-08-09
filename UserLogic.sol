//SPDX-License-Identifier: None
// solium-disable linebreak-style
pragma solidity >=0.4.21;

import './User.sol';

contract UserLogic {

    /**
     @notice adds a product to the User. Add a product to the list, improve the level and the add the number of purchases.
     @param _user User contract
     @param _product Address of the product
     */
    function addProduct(User _user, address _product) public {
        _user.setOwnArticles(_product);
        _user.addPurchase();
        _user.addLevel();
    }
    
    /**
     @notice remove a product to the User. Remove a product to the list, improve the level and the add the number of sales.
     @param _user User contract
     @param _product Address of the product
     */
    function removeProduct(User _user, address _product) public {
        require(_user.ownArticleExists(_product), "This user has not this product.");
        _user.unsetOwnArticles(_product);
        _user.addSales();
        _user.addLevel();
    }

    /**
     @notice adds a product to the User's wishlist.
     @param _user User contract
     @param _product Address of the product
    function addToWishlist(User _user, address _product) public {
        _user.setFavArticles(_product);
    }
    */

    /**
     @notice remove a product to the User's wishlist.
     @param _user User contract
     @param _product Address of the product
    function removeToWishlist(User _user, address _product) public {
        require(_user.favArticleExists(_product), "This user has not this product.");
        _user.unsetFavArticles(_product);
    }
    */
}