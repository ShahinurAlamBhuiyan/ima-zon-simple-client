import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [ search, setSearch ] = useState('')
    document.title = 'shop more'

    useEffect(() => {
        fetch('http://localhost:4000/products?search='+search)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [search])

    // set data in local storage...
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://fierce-hamlet-80213.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
        // if (products.length) {
        //     const previousCart = productKeys.map(existingKey => {
        //         const product = products.find(pd => pd.key === existingKey);
        //         product.quantity = savedCart[existingKey]
        //         return product;
        //     })
        //     setCart(previousCart)
        // }
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div className='twin-container'>
            <div className="product-container">
                <input type="text" onBlur={handleSearch} className="product-container" placeholder='search your product...' />
                {products.map(product => <Product
                    key={product.key}
                    product={product}
                    showAddToCart={true}
                    handleAddProduct={handleAddProduct}
                ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className="add-cart-btn">review order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;