import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './ProductDetails.css'

const ProductDetails = () => {
    const {productKey} = useParams()
    const product =fakeData.find(pd => pd.key === productKey )
    console.log(product);
    return (
        <div>
            <h1>This product key is {productKey}</h1>
        <Product showAddToCart ={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;