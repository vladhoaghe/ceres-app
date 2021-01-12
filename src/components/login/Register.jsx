import React from "react";
import axios from 'axios';

export class Register extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    handleSubmit = event => {
        event.preventDefault();
        
        const user = {
            "email": this.state.email,
            "password": this.state.password,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName
        };

        axios.post('http://localhost:9090/register', user)
        .then(res => {
            console.log(res.data);
        })
    }

    render() {
        return <div className="base-container" ref={this.props.containerRef}>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="firstname">First name</label>
                        <input type="text" name="firstName" placeholder="Ceres" value={this.state.firstName} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last name</label>
                        <input type="text" name="lastName" placeholder="Team" value={this.state.lastName} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" placeholder="ceres.team15@gmail.com" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="******" value={this.state.password} onChange={this.handleChange} />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn" onClick={this.handleSubmit}>Register</button>
            </div>
        </div>
    }
}