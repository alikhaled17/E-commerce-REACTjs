import React, { Component } from 'react';
import Joi from 'joi-browser';

class Login extends Component {
    state = {
        username: "",
        password: "",
        errors: {}
    }

    // validate = () => {
    //     const errors = {};
    //     if(this.state.username.trim() === '')
    //         errors.username = 'Username is Required';
    //     if(this.state.password.trim() === '')
    //         errors.password = 'Password is Required';

    //     this.setState({errors});

    //     return Object.keys(errors).length === 0 ? null : errors ;
    // }

    

    // Joi Validate
    schema = {
        username: Joi.string().min(3).required(),
        password: Joi.string().required()
    }

    validate = () => {
        const errors = {};
        const state = {...this.state};
        delete state.errors;
        const res = Joi.validate( state, this.schema, {abortEarly: false});

        if(res.error === null) {
            this.setState({errors: {}});
            return null;
        };

        for(const error of res.error.details) {
            errors[error.path] = error.message;
        }
        this.setState({errors});
        return errors;
    }

    handleSubmit = e => {
        e.preventDefault();
        
        const errors = this.validate();

        if (errors) return;
        
        console.log('submit');
    }

    

    handleChange = e => {
        let state = {...this.state};
        state[e.currentTarget.name] = e.currentTarget.value;
        this.setState(state);
    }

    render() { 
        return (
            <React.Fragment>
                <h1>Login</h1>
                <hr/>
                <form onSubmit={this.handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input 
                        name='username'
                        onChange={this.handleChange}
                        value={this.state.username}
                        autoFocus 
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1" />
                        {this.state.errors.username && <div className="alert alert-danger">{this.state.errors.username}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                        name='password'
                        onChange={this.handleChange}
                        value={this.state.password} 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" />
                        {this.state.errors.password && <div className="alert alert-danger">{this.state.errors.password}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}
 
export default Login;