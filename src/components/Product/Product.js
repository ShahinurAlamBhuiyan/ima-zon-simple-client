import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faCoffee } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
const Product = (props) => {
    const { img, name, seller, price, stock } = props.product;
    // console.log(props)
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='product-details'>
                <h4 className='product-name'>{name}</h4>
                <p><small>by : {seller}</small></p>
                <p>price : ${price}</p>
                <p><small>Only {stock} left in stock- Order soon</small></p>
                <button className='add-cart-btn' 
                onClick={()=>props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;