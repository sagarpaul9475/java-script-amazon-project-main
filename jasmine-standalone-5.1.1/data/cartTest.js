import {AddToCart,cart,loadFromStorage} from '../../data/cart.js';

describe('test suite: AddToCart',()=>{
    it('adds an existing product to the cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
    it('adds a new product to the cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();
        AddToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(0);
    });
});