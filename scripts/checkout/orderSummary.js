import { cart,removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { updateCartQuantity } from "../amazon.js";
// import {hello} from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";//Default Export {dayjs} no curley braces.
import { deliveryOptions ,getDeliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
// hello();

// const today=dayjs();
// const deliveryDate=today.add(7,'days');
// console.log(deliveryDate.format('dddd, MMMM D'));

export function renderOrderSummary(){

    let CartSummaryHTML='';

    cart.forEach((cartItem)=>{

        const productId=cartItem.productId;

        const matchingProduct=getProduct(productId);

        const deliveryOptionId=cartItem.deliveryOptionId;

        const deliveryOption=getDeliveryOptions(deliveryOptionId);

        const today=dayjs();

        const deliveryDate=today.add(
          deliveryOption.deliveryDays,
          'days'
        );
        const dateString=deliveryDate.format(
          'dddd, MMMM D'
        )
        CartSummaryHTML +=`
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-get-quantity">
                    ${cartItem.quantity}
                </span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id=${matchingProduct.id}>
                Delete
              </span>
            </div>
          </div>


          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct,cartItem)}
          </div>
        </div>
      </div>
        `;
    });
    function deliveryOptionsHTML(matchingProduct,cartItem){
      let html='';
      deliveryOptions.forEach((deliveryOption)=>{
        const today=dayjs();
        const deliveryDate=today.add(
          deliveryOption.deliveryDays,
          'days'
        );
        const dateString=deliveryDate.format(
          'dddd, MMMM D'
        )
        const priceString=deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked=deliveryOption.id === cartItem.deliveryOptionId;
        html +=`
          <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
        </div>
        `
      });
      return html;
    }
    let x=cart.length;

      document.querySelector('.js-return-to-home-link').innerHTML = x;
      document.querySelector('.js-order-summary').innerHTML = CartSummaryHTML;

      document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
          const productId = link.dataset.productId;
          removeFromCart(productId);
          document.querySelector(`.js-cart-item-container-${productId}`).remove();
          x--;
          document.querySelector('.js-return-to-home-link').innerHTML = x;
          updateCartQuantity();

          renderPaymentSummary();
        });
      });


      document.querySelectorAll('.js-update-quantity').forEach((updateBtn) => {
        updateBtn.addEventListener('click', () => {
          const productContainer = updateBtn.closest('.cart-item-container');
          const quantitySpan = productContainer.querySelector('.js-get-quantity');
          const currentQuantity = parseInt(quantitySpan.innerText);

          const select = document.createElement('select');
          select.classList.add('js-edit-quantity');

          for (let i = 1; i <= 10; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            if (i === currentQuantity) {
              option.selected = true;
            }
            select.appendChild(option);
          }

          quantitySpan.replaceWith(select);
          select.focus();

          select.addEventListener('change', () => {
            const newQuantity = parseInt(select.value);
            const productId = productContainer
              .querySelector('.js-delete-link')
              .dataset.productId;

            const item = cart.find((item) => item.productId === productId);
            if (item) {
              item.quantity = newQuantity;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartQuantity();

            const updatedSpan = document.createElement('span');
            updatedSpan.className = 'quantity-label js-get-quantity';
            updatedSpan.innerText = newQuantity;

            select.replaceWith(updatedSpan);
            renderPaymentSummary();
          });
        });
      });
      document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click',()=>{
          const {productId,deliveryOptionId}=element.dataset;
          updateDeliveryOption(productId,deliveryOptionId);
          renderOrderSummary();
          renderPaymentSummary();
        });
      });
  }