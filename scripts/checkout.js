import { cart,removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { updateCartQuantity } from "./amazon.js";
let CartSummaryHTML='';

cart.forEach((cartItem)=>{

    const productId=cartItem.productId;

    let matchingProduct;

    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    });

    CartSummaryHTML +=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          ${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-get-quantity">
                ${cartItem.quantity}
            </span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
});
let x=cart.length;
document.addEventListener('DOMContentLoaded', () => {

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
      });
    });
  });  
});



