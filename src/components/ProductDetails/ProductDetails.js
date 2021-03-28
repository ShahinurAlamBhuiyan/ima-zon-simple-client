import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import './ProductDetails.css'

const ProductDetails = () => {
    document.title = 'product details'
    const { productKey } = useParams()
    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch('https://fierce-hamlet-80213.herokuapp.com/product/' + productKey)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productKey])

    return (
        <div>
            <h1>This product key is {productKey}</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;