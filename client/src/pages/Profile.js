import axios from 'axios';
import React, {useContext, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext'
import { AdminContext } from '../helpers/AdminContext';
import { useHistory } from "react-router";
import DeleteIcon from '@material-ui/icons/Delete';


export default function UserPage() {
    let {id} = useParams();
    const {authState} = useContext(AuthContext) 
    const {checkUserState} = useContext(AdminContext);
    const [profile, setProfile] =useState({});
    const [listOfCollect, setListOfCollect] = useState([]);

    let history = useHistory();
    
    useEffect(() => {
        axios.get(`http://localhost:3001/auth/profile/${id}`).then((response) => {
            console.log(response.data)
            setProfile(response.data)
        })

        axios.get(`http://localhost:3001/collect/getprofile/${id}`).then((response) => {
            console.log(response.data)
            setListOfCollect(response.data);
        });
    }, [])

    const deletePost = (id) => {
        axios.delete(`http://localhost:3001/collect/${id}`, {})
          .then(() => {
            setListOfCollect(
                listOfCollect.filter((val) => {
                    return val.id !== id;
                })
            )
          });
      };


    return (
        <div>
            <div>
                <h2>{profile.login}</h2>
                {authState.id === profile.id || checkUserState.role ==="admin"  ? (
                     <button className="btn btn-primary mt-4" onClick= {() => {
                        history.push(`/addcollection/${id}`)
                        }}>New Collection</button>
                ) : (
                    <div></div>
                )}
            </div>

            <div className="content">
            <div className="container">
                <h2 className="collect-title">Your collections</h2>
                <div className="d-flex justify-content-center">
                    <div className="row">
                
                {listOfCollect.map((value,key) => {
                    return(
                    <div key={key} className="col-md-4" >
                    <div className="card text-center collect-card">
                        <div className="overflow">
                        {authState.id === profile.id || checkUserState.role ==="admin"  ? (
                            <img src={value.image} alt="collectimage" className="card-img-top " 
                            onClick={() => {
                                history.push(`/chgcoll/${value.id}`);
                              }}></img>
                        ) : (
                            <img src={value.image} alt="collectimage" className="card-img-top"
                            onClick={() => {
                                history.push(`/clctn/${value.id}`);
                            }}/>
                        )}
                        </div>
                        <div className="card-body">
                        <div className="collect-card_title"> {value.name}</div>
                        <div className="collect-card_description">{value.description}</div>
                        <div className="collect-card_theme">{value.theme}</div>
                        {authState.id === profile.id || checkUserState.role ==="admin"  ? (
                        <DeleteIcon className="collect_icon"
                            onClick={() => {
                            deletePost(value.id);
                            }}
                        />
                        ): (
                            <> 
                            </>
                        )}
                        {/* <EditIcon onClick={() => {
                            editPost(value.id)
                        }}/> */}
                    </div>
                    </div>
                    </div>
                    )
                })}
                </div>
                </div>
                
            </div>
        </div>
        </div>
    )
}
