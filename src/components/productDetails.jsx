import React, { Component } from 'react';

class ProductDetails extends Component {
    
    handleSave = () => {
        // Backend -> Save
        
        // this.props.history.push('/cart'); // keeping history
        this.props.history.replace('/cart');
    }
    render() { 
        const product = this.props.products.filter( 
            c => c.id === parseInt(this.props.match.params.id)
        )[0];
        return ( 
            <React.Fragment>
                <h2>Details No.{product.id}</h2>
                <h3>{product.name}</h3>
                <h4>Count {product.count}</h4>

                <button
                    onClick={this.handleSave} 
                    className="btn btn-primary m-2">Save</button>
            </React.Fragment>
         );
    }
}
 
export default ProductDetails;