import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts , loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import "../data/cart-class.js";//Runs the data directly.
// import '../data/backend_practice.js';

async function loadPage(){
    try{
        //throw 'error1';It will skip all the code below this line and go to catch block.

         await loadProductsFetch();

        const value=await new Promise((resolve,reject) => {
            //throw 'error2';It will skip all the code below this line and go to catch block.
            loadCart(() => {
                //reject('error3');  Rejecting the promise to simulate an error
                resolve('value3');
            });
        });

    }catch(error){
        console.error('Unexpected error while loading produucts');
    }
  renderOrderSummary();
  renderPaymentSummary();

}
loadPage();

/*
Promise.all([
loadProductsFetch(),
new Promise((resolve) => {
    loadCart(() => {
        resolve();
    });
}),
]).then((values)=>{
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(()=>{
        resolve('value1');
    });
}).then((value) => {
    console.log(value); // 'value1'
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});

*/

// loadProducts(()=>{
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// });
