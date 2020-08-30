import React, {Component} from "react"

export default class Cart extends Component{
  render() {
    return(
      <div>
        //<h3>Aquí irá la cesta de la compra</h3>
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          class="twitter-share-button"
          data-text="Hi! This is my new Token in CryptoStockZ.com do you want to see it?"
          data-related="cryptoStockZ"
          data-show-count="false">Tweet
        </a>
        <script async src="https://platform.twitter.com/widgets.js"
          charset="utf-8">
        </script>
      </div>
    )
  }
}
