import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Product extends Component {

    getClasses() {
        return this.props.product.count === 0? "badge bg-warning m-2" : "badge bg-primary m-2";
    }    
    render() { 
        const {product, onIncrement} = this.props;
        return (
            <div className="row">
                <div className="col-2 m-2">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                </div>

                <div className="col">
                    <span className= {this.getClasses()} >{product.count}</span>

                    <button 
                        onClick={() => onIncrement(product)} 
                        className="btn btn-primary btn-sm m-2"
                    >+</button>

                </div>
            </div>
        );
    }
}

export default Product;