import {extendObservable} from "mobx";

/**
  * Memoria de info de usuario
  */

class UserStore{
  constructor(){
    extendObservable(this,{

      loading: true,
      isLoggedIn:false,
      username:""
    })
  }
}

export default new UserStore();
