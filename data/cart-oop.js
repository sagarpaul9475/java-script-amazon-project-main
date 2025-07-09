function Cart(localStorageKey){
    const cart={
        cartItems: undefined,
        loadFromStorage(){
            this.cartItems= JSON.parse(localStorage.getItem(localStorage.getItem(localStorageKey)));
            if(!this.cartItems){
                this.cartItems=[{
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity:2,
                    deliveryOptionId:'1'
                },{
                    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionId:'2'
                }];
            }
        },
        saveToStorage(){
            localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
        },
        AddToCart(productId, selectedQuantity = 0) {
            let matchingItem;

            this.cartItems.forEach((CartItem) => {
                if (productId === CartItem.productId) {
                    matchingItem = CartItem;
                }
            });
            if (matchingItem) {
                matchingItem.quantity += selectedQuantity;
            } else {
                this.cartItems.push({
                    productId: productId,
                    quantity: selectedQuantity,
                    deliveryOptionId: '1'
                });
            }
            this.saveToStorage();
        },
        removeFromCart(productId){
            const newCart=[];

            this.cartItems.forEach((CartItem)=>{
                if(CartItem.productId !=productId){
                    newCart.push(CartItem);
                }
            });

            this.cartItems=newCart;
            this.saveToStorage();
        },
        updateDeliveryOption(productId,deliveryOptionId){
            let matchingItem;

            this.cartItems.forEach((CartItem) => {
                if (productId === CartItem.productId) {
                    matchingItem = CartItem;
                }
            });
            matchingItem.deliveryOptionId=deliveryOptionId;

            this.saveToStorage();
        }
    };
    return cart;
}


const cart = Cart('cart-loop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

// cart.AddToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

// console.log(cart);

// const businessCart={
//     cartItems: undefined,
//     loadFromStorage(){
//         this.cartItems= JSON.parse(localStorage.getItem('cart-business'));
//         if(!this.cartItems){
//             this.cartItems=[{
//                 productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//                 quantity:2,
//                 deliveryOptionId:'1'
//             },{
//                 productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
//                 quantity: 1,
//                 deliveryOptionId:'2'
//             }];
//         }
//     },
//     saveToStorage(){
//         localStorage.setItem('cart-business',JSON.stringify(this.cartItems));
//     },
//     AddToCart(productId, selectedQuantity = 0) {
//         let matchingItem;

//         this.cartItems.forEach((CartItem) => {
//             if (productId === CartItem.productId) {
//                 matchingItem = CartItem;
//             }
//         });
//         if (matchingItem) {
//             matchingItem.quantity += selectedQuantity;
//         } else {
//             this.cartItems.push({
//                 productId: productId,
//                 quantity: selectedQuantity,
//                 deliveryOptionId: '1'
//             });
//         }
//         this.saveToStorage();
//     },
//     removeFromCart(productId){
//         const newCart=[];

//         this.cartItems.forEach((CartItem)=>{
//             if(CartItem.productId !=productId){
//                 newCart.push(CartItem);
//             }
//         });

//         this.cartItems=newCart;
//         this.saveToStorage();
//     },
//     updateDeliveryOption(productId,deliveryOptionId){
//         let matchingItem;

//         this.cartItems.forEach((CartItem) => {
//             if (productId === CartItem.productId) {
//                 matchingItem = CartItem;
//             }
//         });
//         matchingItem.deliveryOptionId=deliveryOptionId;

//         this.saveToStorage();
//     }
// };

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);