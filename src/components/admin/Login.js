import React from 'react'
import {Link, Outlet } from 'react-router-dom'
import "../../styles/admin/login.css"
import logo from "../../img/logo.png"

const Login = () => {
    return(
        <div className='loginContainer'>
            <div class="split left">
                <div class="centered">
                <img src={logo} alt="logo" width="100%"/>
                <h1>Let's Park!</h1>
                </div>
            </div>

            <div class="split right">
                <div class="">
                    <div class="logincard">
                        <div class="cardbody">
                        <img src={logo} alt="logo" width="100%"/>
                        <div class="form-group">
                            <label>	User Name</label>
                                <input class="form-control mt-0" placeholder="Enter your user name" name="user_name" type="text" defaultValue=""/>
                                <span class="text-danger d-block mt-1">

                                </span>
                                
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                                <input class="form-control mt-0" placeholder="Enter your password" name="password" type="password" defaultValue=""/>
                                <span class="text-danger">
                                            
                                </span>
                        </div>
                        </div>
                        <div class="card-footer justify-content-center">
                                    <button type="submit" class="btn delirush-admin-btn-primary btn-lg btn-block">Login</button>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login