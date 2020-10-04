import React from "react"
import Footer from "../Components/Footer"
import {updateToken} from '../Actions'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        }
    }
    LoginButtonClick() {
        this.backendCall()
    }
    backendCall() {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
            },
            body: JSON.stringify({ email: this.state.email,password:this.state.password }),
        };
        fetch("http://localhost:5000/api/login", requestOptions)
        .then(res => res.json())
        .then((result) => {
            if(result.status==="OK"){
                this.props.history.push("/" + result.token + "/fruits")
                this.props.store.dispatch(updateToken(this.state.email,result.token))
            }
            else
                window.alert("Wrong Password")
          },
          (error) => {
            console.log(error)
          })
    }  
    handleEmailChange(event){
        console.log(this)
        this.setState({email: event.target.value, password: this.state.password})
    }
    handlePasswordChange(event){
        this.setState({email: this.state.email, password: event.target.value})
    }

    render(){
        return (
            <div className="logBox">
                <div > 
                    <div className="imgLogIn">
                        <img src="https://img.huffingtonpost.com/asset/5b7ad435200000420034abec.jpeg?cache=epfSt9odEb&ops=scalefit_720_noupscale" alt="app;e"></img>
                    </div>
                    <h2 >Log to Fruitty</h2>
                    <p style={{lineHeight:"0"}}>Email address</p>
                    <input value={this.state.email} type="text" onChange={this.handleEmailChange.bind(this)}></input>
                    <p style={{lineHeight:"1"}}>password</p>
                    <input value={this.state.password} type="password" onChange={this.handlePasswordChange.bind(this)}></input>
                </div>  
                <button className="Btn" onClick={this.LoginButtonClick.bind(this)}>frutis        </button>
                <Footer></Footer>
            </div>
        )
    }
}

export default withRouter(Login)