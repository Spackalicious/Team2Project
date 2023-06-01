import { getLocalStorage } from "./utils.mjs";
//import { checkout } from "./externalServices.mjs";

//function formDataToJSON(formElement) {
    //const formData = new FormData(formElement),
    //convertedJSON = {};

    //formData.forEach(function (value, key) {
        //convertedJSON[key] = value;
    //});
//}

const checkoutProcess = {
key: "",
outputSelector: "",
list: [],
itemTotal: 0,
tax: 0,
shipping: 0,
orderTotal: 0,
init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage (key);
    this.calculateItemSummary();
},
calculateItemSummary: function () {
    document.querySelector("#checkout-counter").innerHTML = this.list.length;
    const cartItemsTotal = document.querySelector("#subtotal");
    //const itemsInCart = getLocalStorage("so-cart");
  
    let cartTotalCost = 0;
    let roundedCartTotalCost;

    function addPrices(price) {
      cartTotalCost += price;
      roundedCartTotalCost = cartTotalCost.toFixed(2);
    };
  
    if (this.list != null) {
      const itemPrices = this.list.map((item) => item.FinalPrice);
      itemPrices.forEach(addPrices);
      cartItemsTotal.append(` $${roundedCartTotalCost}`);
      cartItemsTotal.style.display = "inline";
    }
    },
    calculateOrderTotal: function () {
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
            )
            this.displayOrderTotals();
    },
    displayOrderTotals: function () {
        document.querySelector(this.outputSelector + "#shipping");
        document.querySelector(this.outputSelector + "#tax");
        document.querySelector(this.outputSelector + "#orderTotal");
    },
}
export default checkoutProcess;