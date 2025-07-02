export let cart= JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart=[{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2,
        deliveryOptionId:'1'

    },{
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId:'2'
    }];
}


function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function AddToCart(productId, selectedQuantity = 0) {
    let matchingItem;

    cart.forEach((CartItem) => {
        if (productId === CartItem.productId) {
            matchingItem = CartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += selectedQuantity;
    } else {
        cart.push({
            productId: productId,
            quantity: selectedQuantity,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
}


export function removeFromCart(productId){
    const newCart=[];

    cart.forEach((CartItem)=>{
        if(CartItem.productId !=productId){
            newCart.push(CartItem);
        }
    });

    cart=newCart;
    saveToStorage();
}

