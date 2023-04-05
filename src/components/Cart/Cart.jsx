import React from 'react';
import './Cart.css'
const Cart = ({cart}) => {
    // console.log(cart);

    let totalPrice = 0;
    let totalShipping = 0;
    let quantity =0;
    for(const product of cart){

        // or
        // if(product.quantity === 0){
        //     product.quantity =1;
        // }
        // or
        // product.quantity = product.quantity || 1;

        totalPrice = totalPrice + (product.price * product.quantity);
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }
    const tax = totalPrice*7/100;
    const grandTotal = totalPrice + totalShipping + tax;
    // Option-1
    // const cart =props.cart;
    // Option-2
    // const {cart} = props;
    return (
        <div className='cart'>
            <h4>Order summary</h4>
            <p>Selected Items: {quantity} </p>
            <p>Total Price:${totalPrice} </p>
            <p>Total Shipping:${totalShipping} </p>
            <p>Tax:${tax.toFixed(2)}</p>
            <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
        </div>
    );
};

export default Cart;