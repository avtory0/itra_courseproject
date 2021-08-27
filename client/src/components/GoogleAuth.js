import React, {useContext} from 'react'
import {GoogleLogin} from 'react-google-login'
import {AuthContext} from '../helpers/AuthContext'
import { useHistory } from 'react-router'

const axios = require('axios');

export default function GoogleAuth() {
    const {setAuthState} = useContext(AuthContext)  
    let history = useHistory();

    const onSuccess = (response) => {
        console.log('login succes currentUser:', response.profileObj)
        axios.post("http://localhost:3001/auth/googleauth", {
          login: response.profileObj.givenName,
          email: response.profileObj.email
        }).then((response) => {
          localStorage.setItem("token", response.data.token);
              setAuthState({
                login: response.data.login,
                id: response.data.id,
                status: true,
              });
          history.push("/account"); 
        })
       
      }
      const onFailure = (res) => {
        console.log('login failed:', res)
      }
    return (
        <>
            <GoogleLogin 
                clientId="216196863052-3prm4fq5m35niuibt3p926n55r3vkgr2.apps.googleusercontent.com"
                buttonText="login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
            />
        </>
    )
}
