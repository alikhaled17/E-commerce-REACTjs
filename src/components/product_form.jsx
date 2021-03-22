import axios from 'axios';
import React, { Component } from 'react';

class ProductForm extends Component {
    state = { id: '', name: '', price: '' }

    async componentDidMount() {
        const id = this.props.match.params.id;

        if(id !== "new") {
            const {data} = await axios.get('http://localhost:3000/products/' + id);
            // clone 
            const state = {...this.state};
            // edit
            state.name = data.name;
            state.price = data.price;

            this.setState(state);
        }
    }
    
    handleSubmit = async e => {
        e.preventDefault();
        const id = this.props.match.params.id;
        const obj = { ...this.state, count: 0, cart: false };
        if(id !== "new") {
            delete obj.id;
            await axios.put('http://localhost:3000/products/' + id, obj);
        } else {
            await axios.post('http://localhost:3000/products/', obj); 
        }
        this.props.history.replace('/admin'); 
        
    }
    
    handleChange = e => {
        let state = {...this.state};
        state[e.currentTarget.name] = e.currentTarget.value;
        this.setState(state);
    }

    render() { 
        return ( 
            <React.Fragment>
                <h1> Product Form </h1> 
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.name}
                            id="name"
                            name="name"
                            type="text"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">price</label>
                        <input
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.price}
                            id="price"
                            name="price"
                            type="text"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </React.Fragment>
        );
    }
}
 
export default ProductForm;