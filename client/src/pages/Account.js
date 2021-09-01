import {React, useContext, useState, useEffect} from 'react'
import axios from "axios";

import {AuthContext} from '../helpers/AuthContext'
import { useHistory } from "react-router";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// import useDropzone from 'react-dropzone'
// import Dropzone from 'react-dropzone'

import "../App.css";


export default function Account() {
    // const [name, setName] = useState("");
    // const [image, setImage] = useState("");
    
    // const [description, setDescription] = useState("");
    // const [theme, setTheme] = useState('');

    const [listOfCollect, setListOfCollect] = useState([]);
    // const [editItem, setEditItem] = useState([]);
    
    const {authState} = useContext(AuthContext) 

    let history = useHistory();
    

    useEffect(() => {
        if(!localStorage.getItem("token")) {
            history.push("/");
        } else {
        axios.get("http://localhost:3001/collect", {
            headers: {
                token: localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response.data)
            setListOfCollect(response.data);
        });
    }
    }, []);
    

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
        <> 
            <button onClick= {() => {
                      history.push('/addcollection')
                      }}>add collect</button>
            

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
                            <img src={value.image} alt="collectimage" className="card-img-top " 
                            onClick={() => {
                                history.push(`/chgcoll/${value.id}`);
                              }}></img>
                        </div>
                        <div className="card-body">
                        <div className="collect-card_title"> {value.name}</div>
                        <div className="collect-card_description">{value.description}</div>
                        <div >{value.theme}</div>
                        
                        <DeleteIcon className="collect_icon"
                            onClick={() => {
                            deletePost(value.id);
                            }}
                        />
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
        </>
    )
}
