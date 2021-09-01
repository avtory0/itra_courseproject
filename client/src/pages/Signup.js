import {React, useContext} from 'react'
import axios from "axios";
import { useHistory } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {AuthContext} from '../helpers/AuthContext'


export default function Signup() {
    const {setAuthState} = useContext(AuthContext)  

    let history = useHistory();

    const initialValues = {
        login: "",
        email: "",
        password: "",
    }
    const validationSchema = Yup.object().shape({
        login: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      });
    const onSubmit =(data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
            localStorage.setItem('token', response.data.token);
            setAuthState({
                login: response.data.login,
                id: response.data.id,
                status: true,
            });
            console.log(data);
            // history.push(`/profile/${response.data.id}`);
      
        });
    }
    return (
    <> 
           
        <Formik initialValues={initialValues}
         onSubmit={onSubmit}
         validationSchema = {validationSchema}>
            <Form className="form" >
                <div className="form_inner">
                    <h3>Sign up</h3>
                    
                    <Field type="text" name="login" placeholder="Username"/>
                    <ErrorMessage className ="error" name="login" component="span" />
                    
                    <Field type="email" name="email" placeholder="Email"/>
                    <ErrorMessage className ="error" name="email" component="span" />
                    
                    <Field type="password" name="password" placeholder="Password"/>
                    <ErrorMessage className ="error" name="password" component="span" />
                    
                    <input type="submit" value="Sign Up"/>
                </div>
            </Form>
        </Formik>
    </>
    )
}
