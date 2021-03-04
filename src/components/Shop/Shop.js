import React, { useState } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const first10 = fakeData.slice(0, 5)
    const [products, setProducts] =useState(first10)
    const [cart, setCart] =useState([])

    const handleAddProduct = (product) =>{
        // console.log('i am click', product);
        const newCart = [...cart, product]
        setCart(newCart);

        // that's all for local storage....
        const sameProduct = newCart.filter( pd => pd.key === product.key );
        const count = sameProduct.length;
        addToDatabaseCart(product.key, count)
        // ..............
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                    key={product.key}
                    product={product}
                    showAddToCart ={true}
                    handleAddProduct={handleAddProduct}
                    ></Product> )
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
           
        </div>
    );
};

export default Shop;