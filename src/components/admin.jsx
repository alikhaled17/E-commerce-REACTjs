import React, { Component } from 'react';
import ProductForm from './product_form';

class Admin extends Component {
    state = {  }
    render() { 
        const { products, onDelete } = this.props;

        return ( 
            <React.Fragment>
                <h1> Admin </h1>
                <button
                    onClick={() => this.props.history.push("/product-form/new")}
                    className="btn btn-primary"
                >
                    Add New
                </button>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        products.map(product  =>  (
                            <tr key={product.id}>
                                <th>{product.name}</th>
                                <th>{`${product.price} $`}</th>
                                <th><i 
                                    onClick={() => this.props.history.push(`/product-form/${product.id}`)}
                                    className="fas fa-edit"></i>
                                </th>
                                <th><i 
                                    onClick={() => onDelete(product)}
                                    className="fas fa-trash"></i>
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
 
export default Admin;