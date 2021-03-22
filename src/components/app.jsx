import React, { Component } from 'react';
import Navbar from './navbar';
import {Redirect, Route, Switch} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Menu from './menu';
import Home from './home';
import ShoppingCart from './shopping_cart';
import ProductDetails from './productDetails';
import PageNotFound from './notfound';
import Login from './login';
import axios from 'axios';
import Admin from './admin';
import ProductForm from './product_form';



class App extends Component {
    state = { 
        products: []
    }

    async componentDidMount(){
        //Call Backend
        let { data } = await axios.get(
        "http://localhost:3000/products"
        );

        //Convert Object reterned from Firebase to Array
        //In Lecture we use JSON-SERVER
        // const dataArray = [];
        // for (const key in data) {
        //   dataArray[parseInt(data[key].id)] = data[key];
        // }

        //Set State
        this.setState({ products: data });
            
    }

    handleDelete = async product => {
        // let products = [...this.state.products];
        // const i = products.indexOf(product);
        // products[i].cart = !products[i].cart ;
        // products[i].count = 0;
        // this.setState({products});
        const oldProducts = [...this.state.products];


        const products = this.state.products.filter(p => p.id !== product.id);
        this.setState({products});

        try {
            await axios.delete('http://localhost:3000/products/'+product.id);
        } catch(ex) {
            toast.error('Can\'t Delete');
            this.setState({products: oldProducts});
        }
    };

    handleEdit = product => {
        console.log('handleEdit');
    };

    handleReset = () => {
        let products = [...this.state.products];
        products = products.map(p => {
            p.count = 0;
            return p;
        });
        this.setState({products});
    }

    inCart = product => {
        let products = [...this.state.products];
        const i = products.indexOf(product);
        products[i].cart = !products[i].cart ;
        this.setState({products});
    }

    increamentHandler = product => {
        let products = [...this.state.products];
        const i = products.indexOf(product);
        products[i].count++;
        this.setState({products});
    }

    render() { 
        return ( 
            <React.Fragment>
                
                <ToastContainer />
                <Navbar productsCount = {this.state.products.filter((p => p.count !== 0 )).length}/>
                <main className="container">
                    <Switch>
                        <Route path='/page-not-found' component={PageNotFound} />
                        <Route path='/home' exact component={Home} />                       
                        {/* <Route path='/menu' component={Menu} /> */}

                        <Route path='/menu' render={ props => (
                            <Menu 
                                products={this.state.products}
                                addCart={this.inCart} 
                                {...props}
                            />
                        )} />

                        <Route path='/product-form/:id' component={ProductForm} />
                        <Route path='/admin' render={ props => (
                            <Admin
                                products={this.state.products}
                                onDelete={this.handleDelete}    
                                {...props}
                            />
                        )} />


                        <Route path='/login' component={Login} />


                        <Route path='/products/:id/:name?' render={ props => (
                            <ProductDetails 
                                products={this.state.products}  
                                {...props}
                            />
                        )} 
                        />
                        <Route path='/cart' render={ props => (
                            <ShoppingCart 
                                products={this.state.products.filter((p) => p.cart)}
                                onIncrement = {this.increamentHandler}
                                onReset = {this.handleReset}
                                {...props}
                            />
                        )} />

                        <Redirect from='/' to='/home' />
                        <Redirect to='/page-not-found' />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}
 
export default App;