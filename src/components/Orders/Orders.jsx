import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItam/ReviewItem';
import './Order.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart)
    // console.log(savedCart);
    const handleRemoveFromCart = (id)=>{
        // console.log(id);
        const remaining = cart.filter(product => product.id !== id)
        // console.log(remaining);
        setCart(remaining);
        removeFromDb(id);
    }
    const handleClearCart =() =>{
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="review-container">
                {
                    cart.map(product => <ReviewItem
                    key={product.id}
                    product={product}
                    handleRemoveFromCart={handleRemoveFromCart}
                    ></ReviewItem> )
                }
            </div>
            <div className="cart-container">
                <Cart 
                cart={savedCart} 
                handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="/checkout" >
                    <button className='btn-proceed' >Proceed Checkout</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Orders;