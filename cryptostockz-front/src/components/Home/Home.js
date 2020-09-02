import React, {Component} from "react"
import Title from "../Title";
import Icono from "../../Images/Icono.png";
import Eth from "../../Images/eth.png";
import Meta from "../../Images/metamask.png";

export default class Home extends Component{
  render() {
    return(
      <div>
        <Title name="Welcome to" title="CryptoStockZ"/>
        <div className="mx-auto text-center">
          <img style={{width: '200px', height: '180px'}} src={Icono} alt="Icono_CSZ" />
          <img style={{width: '130px', height: '200px'}} src={Eth} alt="Icono_Eth" />
          <img style={{width: '200px', height: '200px'}} src={Meta} alt="Icono_Meta" />
        </div>
      </div>
    )
  }
}
