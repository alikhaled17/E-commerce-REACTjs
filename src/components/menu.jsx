import React, { Component } from 'react';
// import MenueItem from './menuitem';

class Menu extends Component {
    state = {  }

    
    render() { 
        const { products, addCart } = this.props;
        return ( 
            <React.Fragment>
                <h1>Menu</h1>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        products.map(product  =>  (
                            <tr key={product.id}>
                                <th>{product.name}</th>
                                <th>{`${product.price} $`}</th>
                                <th><i 
                                    onClick={() => addCart(product)}
                                    style={product.cart ? {opacity: "1"} : {opacity: ".5"}} 
                                    className="fas fa-cart-arrow-down"></i>
                                </th>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </React.Fragment>
            
        );
    }
}
 
export default Menu;