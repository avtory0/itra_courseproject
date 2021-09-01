import { useContext } from 'react';
import {Navbar, Container, Dropdown} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext'
import PersonIcon from '@material-ui/icons/Person';
import { AdminContext } from '../helpers/AdminContext';


export default function Header() {
  const {authState, setAuthState} = useContext(AuthContext)
  const {checkUserState} = useContext(AdminContext);

  let history = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      login: "",
      id: 0,
      status: false,
    });
    history.push("/");
  }

    return (
        <Navbar className="header">
        <Container>
          <div className="nav_logo">
          
            <Link to="/" className="nav_title">
               React CourseWork
            </Link>
            <p className="nav_subtitle">save your collections</p>
          </div>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            
            <div>
              {!authState.status ? (
                <>
                  <Link to="/signup"> <button  className="header_btn">Sign Up</button> </Link>
                  <Link to ="/signin"> <button className="header_btn">Sign In</button> </Link>
                </>
              ) : (
                <Dropdown >
                  <Dropdown.Toggle className="header_btn">
                    <PersonIcon className="header_item"/>
                    {authState.login}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick= {() => {
                      // history.push(`/profile/${authState.id})`
                      history.push(`/profile/${authState.id}`)
                      }}>
                        Account
                    </Dropdown.Item>
                    {checkUserState.role ==="admin" && (
                      <Dropdown.Item onClick={() => {
                        history.push("/adminpanel")
                      }}> Admin Panel</Dropdown.Item>
                    )}
                    <Dropdown.Item onClick={logout}> logout</Dropdown.Item>
                   
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>

          </Navbar.Collapse>
        </Container>
       
      </Navbar>  
      
    )
}
