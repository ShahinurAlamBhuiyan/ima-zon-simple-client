import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {product , handleAddProduct} = props;
    const { img, name, seller, price, stock, key } = product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='product-details'>
                <h4 className='product-name'> <Link to={'/product/'+key}>{name}</Link> </h4>
                <p><small>by : {seller}</small></p>
                <p>price : ${price}</p>
                <p><small>Only {stock} left in stock- Order soon</small></p>

                { props.showAddToCart && <button className='add-cart-btn' 
                onClick={()=>handleAddProduct(product)}><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;