import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImg from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)
    const history = useHistory();
    document.title = 'Order reviews'

    const handleProceedCheckout = () => {
        history.push('/shipment')
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        // remove data from local storage...
        removeFromDatabaseCart(productKey)
    }

    // get data from local storage...
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
    }, [])

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImg} alt="" />
    }

    return (
        <div className='twin-container'>

            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        removeProduct={removeProduct}
                        key={pd.key}
                        product={pd}></ReviewItem>)
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button
                        onClick={handleProceedCheckout}
                        className="add-cart-btn">Proceed checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;