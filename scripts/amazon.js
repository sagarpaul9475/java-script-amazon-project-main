import { cart, AddToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from "./utils/money.js";

document.addEventListener('DOMContentLoaded', () => {
  let ProductHtml = '';

  products.forEach((product) => {
    ProductHtml += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">${product.rating.count}</div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-select-quantity">
            ${[...Array(10)].map((_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png" class="Add-image">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  const productsGrid = document.querySelector('.js-products-grid');
  if (productsGrid) {
    productsGrid.innerHTML = ProductHtml;
  }
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      const productContainer = button.closest('.product-container');
      const dropdown = productContainer.querySelector('.js-select-quantity');

      let selectedQuantity = 1;
      if (dropdown) {
        selectedQuantity = parseInt(dropdown.value);
      }

      AddToCart(productId, selectedQuantity);
      Adding(button);
      updateCartQuantity();
    });
  });

  const savedQuantity = JSON.parse(localStorage.getItem('cartQuantity'));
  if (savedQuantity) {
    const cartElement = document.querySelector('.js-cart-quantity');
    if (cartElement) {
      cartElement.innerHTML = savedQuantity;
    }
  }
});

function Adding(button) {
  const productContainer = button.closest('.product-container');
  const checkmarkImg = productContainer.querySelector('.Add-image');
  const addedToCartDiv = productContainer.querySelector('.added-to-cart');

  checkmarkImg.src = "images/icons/checkmark.png";
  addedToCartDiv.style.opacity = '1';

  setTimeout(() => {
    addedToCartDiv.style.opacity = '0';
  }, 2000);
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((CartItem) => {
    cartQuantity += CartItem.quantity;
  });

  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }

  localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));

  return cartQuantity;
}
