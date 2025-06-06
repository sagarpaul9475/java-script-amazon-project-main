export const cart=[];


export function AddToCart(productId){
    let matchingItem;
    cart.forEach((CartItem)=>{
        if(productId===CartItem.productId){
            matchingItem=CartItem;
        }
    });
    
    if(matchingItem){
        matchingItem.quantity += 1;
    }else{
        cart.push({
            productId: productId,
            quantity : 1
        })
    }
}