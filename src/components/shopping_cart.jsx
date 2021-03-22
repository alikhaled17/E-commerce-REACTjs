import React, { Component } from 'react';
import Product from './product';

class ShoppingCart extends Component {
    render() { 
        const { products, onIncrement, onReset} = this.props;
        return (
            <React.Fragment>
                <h1>Shopping Cart</h1>
                <button
                    onClick = {onReset} 
                    className="btn btn-secondary btn-sm m-2"
                > Reset
                </button> 

                {
                
                products.map(product  =>  (
                    <Product 
                    key={product.id} 
                    product={product} 
                    onIncrement={onIncrement}
                    />
                    
                ))
                
                }
            </React.Fragment>
        );
    }
}
 
export default ShoppingCart;