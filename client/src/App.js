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
import {AdminContext} from './helpers/AdminContext'
import Collection from './pages/Collection';
import Item from './pages/Item';
import AddCollection from './pages/AddCollection';
import AdminPanel from './pages/AdminPanel';
import EditItem from './pages/EditItem';



function App() {
  
  const [authState, setAuthState] = useState({
    login: "",
    id: 0,
    status: false,
  })

  const [checkUserState, setCheckUserState] = useState({role: ""})
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
        setCheckUserState({ role: response.data.check.role})
        setAuthState({
          login: response.data.validate.login,
          id: response.data.validate.id,
          status: true
        })
      }
    });
    // axios.get()
  }, [])

  return (
   <>
   <AuthContext.Provider value={{authState, setAuthState}}>
     <AdminContext.Provider value={{checkUserState, setCheckUserState}}>
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
                  <Route exact path="/addcollection/:id" component={AddCollection}/>
                  <Route exact path="/adminpanel" component={AdminPanel}/>
                  <Route exact path="/edititem/:id" component={EditItem}/>
                  

              </Switch>
           </Container>
          </div>
        </div>

      </Router>
    </AdminContext.Provider>
    </AuthContext.Provider>
   </>
  )
}

export default App;
