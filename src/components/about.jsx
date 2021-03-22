import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Redirect, Route} from 'react-router-dom';
import company from './company';
import team from './team';

class About extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <h3>About</h3>
                <div className="row">
                    <div className="col-3">
                        <ul>
                            <li>
                                <Link to='/about/team'>Our Team</Link>
                            </li>
                            <li>
                                <Link to='/about/company'>Our Company</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <Route path='/about/team' exact component={team} />
                        <Route path='/about/company' component={company} />
                    </div>
                </div>
            </React.Fragment> 
            
        );
    }
}
 
export default About;