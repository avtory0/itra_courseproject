import React, {useState, useContext} from 'react'
import { useHistory } from 'react-router'
import {AuthContext} from '../helpers/AuthContext'
import { AdminContext } from '../helpers/AdminContext';
import GoogleAuth from '../components/GoogleAuth';

import "../App.css";

const axios = require('axios');

export default function SignIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext)  
  const {setCheckUserState} = useContext(AdminContext);

    let history = useHistory();

    const signin = (event) => {
      event.preventDefault()
        const data = { login: login, password: password };
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
          if(response.data.error){
            alert(response.data.error);
          } else{
            setCheckUserState({role: response.data.role})
            localStorage.setItem("token", response.data.token);
            setAuthState({
              login: response.data.login,
              id: response.data.id,
              status: true
            });
            history.push(`/profile/${response.data.id}`);
            // history.push(`/profile/${response.data.id}`);
          }
        });
    };

    
   
    
    return (
        <>
        <GoogleAuth/>
        <form className="form" >
                <div className="form_inner">
                    <h3>Sign In</h3>
                    <input type="text" name="login" placeholder="Username"
                     onChange ={(event)=>{
                        setLogin(event.target.value);
                      }}/>
                    <input type="password" name="password" placeholder="Password"
                     onChange ={(event)=>{
                        setPassword(event.target.value);
                      }}/>
                      <input type="submit" onClick={signin} value="Sign in "/>

                </div>
        </form>
        </>
    )
}
