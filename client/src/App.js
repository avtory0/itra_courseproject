import {React, useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import axios from 'axios'


import Header from './components/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import Account from './pages/Account'
import Profile from './pages/Profile';
import ChangeCollect from './pages/ChangeCollect';
import {AuthContext} from './helpers/AuthContext'
import Collection from './pages/Collection';
import Item from './pages/Item';


function App() {
  
  const [authState, setAuthState] = useState({
    login: "",
    id: 0,
    status: false,

  })
  useEffect(() => {
    // if(localStorage.getItem('token')) {
    //   setAuthState(true)
    // } 
    axios.get("http://localhost:3001/auth/check", {
      headers: {
        token: localStorage.getItem("token"),
        
      },
    }).then((response) => {
      if(response.data.error) {
        setAuthState({status: false });
      } else {
        setAuthState({
          login: response.data.login,
          id: response.data.id,
          status: true
        })
      }
    });

  }, [])

  return (
   <>
   <AuthContext.Provider value={{authState, setAuthState}}>
    <Router>
      <div className="wrapper">
        <Header/>
        <div className="content">
          <Container>

            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/account" component={Account}/>
                <Route exact path="/clctn/:id" component={Collection}/>
                <Route exact path="/chgcoll/:id" component={ChangeCollect}/>
                <Route exact path="/item/:id" component={Item}/>
                <Route exact path="/profile/:id" component={Profile}/>

            </Switch>
         </Container>
        </div>
      </div>

    </Router>
    </AuthContext.Provider>
   </>
  )
}

export default App;
