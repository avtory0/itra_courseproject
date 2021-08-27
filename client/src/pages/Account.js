import {React, useContext, useState, useEffect} from 'react'
import axios from "axios";

import {AuthContext} from '../helpers/AuthContext'
import { useHistory } from "react-router";
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import EditIcon from '@material-ui/icons/Edit';

import "../App.css";


export default function Account() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [img, setImg] = useState("");
    const [description, setDescription] = useState("");
    const [theme, setTheme] = useState('');

    const [listOfCollect, setListOfCollect] = useState([]);
    // const [editItem, setEditItem] = useState([]);
    
    const {authState} = useContext(AuthContext) 

    let history = useHistory();
    

    useEffect(() => {
        if(!localStorage.getItem("token")) {
            history.push("/");
        }else {
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
    
    
    const onSubmit =(e) => {
        e.preventDefault();
        console.log(authState.id)

        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'c9n9vizm');

        axios.post("https://api.cloudinary.com/v1_1/doduvxcmi/image/upload",
        data).then((response) => {
            console.log(response.data.secure_url)
            setImg(response.data.secure_url)
        

        axios.post("http://localhost:3001/collect/add/:id", {
            name: name,
            image: response.data.secure_url,
            description: description, 
            theme: theme
        }, {    
            headers: {
                token: localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response.data)
            const collectToAdd = (response.data);
            setListOfCollect([...listOfCollect, collectToAdd])
            
        });
    })
    }
    
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
      
    // const editPost =(id) =>{
    //   axios.get(`http://localhost:3001/collect/check/${id}`, {
    //       headers: {
    //           token: localStorage.getItem("token")
    //       }
    //       }).then((response) => {
    //       console.log(response.data)
    //       setEditItem(response.data);
        
    //   });
    // }
    
    const handleChange = (event) => {
      setTheme(event.target.value);
    };
    
    const handleSubmit = () => {

    }
    return (
        <> 
            
            <form className="form" onSubmit = {handleSubmit}>
                <div className="form_inner">
                    <h3>Add New Collection</h3>

                <input type="text" name="name" placeholder="Name"  value={name}
                    onChange={(event) => {
                        setName(event.target.value)
                    }}/>
                    <input type="file" name="image"
                     onChange={(event) => {
                        setImage(event.target.files[0])
                    }}/>

                    <textarea type="text"  name="description" maxLength="250" placeholder="Description" 
                    onChange={(event) => {
                        setDescription(event.target.value)
                    }}/>

                    <InputLabel id="demo-simple-select-label">Theme</InputLabel>
                        <Select className = "form-select_menu"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="select"
                          value={theme}
                          onChange={handleChange}
                        >
                          <MenuItem value="Cars">Cars</MenuItem>
                          <MenuItem value="Gadgets">Gadgets</MenuItem>
                          <MenuItem value="Food&amp;Drinks">Food&amp;Drinks</MenuItem>
                          <MenuItem value="Alcohol">Alcohol</MenuItem>
                          <MenuItem value="Literature">Literature</MenuItem>
                        </Select>
        
                    <input type="submit" onClick={onSubmit} value="Отправить"/>
                </div>
            </form>
        
        {/* {authState.role == "admin"(
            
            <div>
                admin panel
            </div>
            
        )
        } */}
        <div>{authState.iat}</div>

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
