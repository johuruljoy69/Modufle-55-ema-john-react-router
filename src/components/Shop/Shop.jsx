import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        // console.log('products', products);
        const storedCart = getShoppingCart()
        const savedCart = [];
        // console.log(storedCart);
        // Step 1: get id of addedProduct
        for (const id in storedCart) {
            // console.log(id);
            // step 2: get the product from products by using id
            const addedProduct = products.find(product => product.id === id);
            // console.log(addedProduct);
            // step 3: get quantity of the product
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the added Product to the saved cart
                savedCart.push(addedProduct);
            }
        }
        // step 5: set the cart
        setCart(savedCart);
    }, [products]);

    const addProductHandler = (product) => {
        // cart.push(product)
        let newCart = [];
        // or use
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity =1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists]
        }
        setCart(newCart);
        addToDb(product.id)
    }
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        addProductHandler={addProductHandler}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart
                 cart={cart} 
                 handleClearCart={handleClearCart}
                 >
                    <Link className='proceed-link' to="/orders" >
                        <button className='btn-proceed'>Review Order</button>
                    </Link>
                 </Cart>
            </div>
        </div>
    );
};

export default Shop;