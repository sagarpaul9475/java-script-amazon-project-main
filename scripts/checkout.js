import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";

//import "../data/cart-class.js";//Runs the data directly.
// import '../data/backend_practice.js';
loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
