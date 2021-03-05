import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, prd) => total + prd.price, 0 )
    let total = 0;
    for(let i = 0; i < cart.length; i++){
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if(total > 15){
        shipping = 8.99;
    }
    else if (total > 0){ 
        shipping = 12.99;
    }

    const tax = total / 10;
    const totalAmount =  total + shipping +tax ;

    const formatNumber = num =>{
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h4>Order Summery</h4>
            <p>Item ordered : {cart.length}</p>
            <p>Product price : {formatNumber(total)}</p>
            <p><small>Tax + VAT (10%) : {formatNumber(tax)}</small></p>
            <p><small>Shipping : {formatNumber(shipping)}</small></p>
            <p>Total Price : {formatNumber(totalAmount)}</p>
            {
                props.children
            }
        </div>

    );
};

export default Cart;