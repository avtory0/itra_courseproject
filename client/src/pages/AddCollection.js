import {React, useState, useContext, useEffect} from 'react'
import { useHistory } from "react-router";
import {useParams} from 'react-router-dom';
import { AdminContext } from '../helpers/AdminContext';
import ReactHtmlParser from 'react-html-parser';

import Dropzone from 'react-dropzone'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {AuthContext} from '../helpers/AuthContext'
// import Description from '../components/Description';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import axios from "axios";
import "../App.css";

export default function AddCollection() {
    let {id} = useParams();

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [theme, setTheme] = useState('');
    const [value, setValue] = useState("")

    let history = useHistory();
    const {authState} = useContext(AuthContext) 
    const {checkUserState} = useContext(AdminContext);
    const [profile, setProfile] =useState({});

    // if(!authState.status) {
    //     history.push("/");
    // }

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/profile/${id}`).then((response) => {
            console.log(response.data)
            setProfile(response.data)
        })
    }, [])

    const onSubmit =(e) => {
        e.preventDefault();

        console.log(image)
        if(image ==="") {
            alert("image is empty")
        } 
        image.forEach(async(image) => {

        
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'c9n9vizm');

        axios.post("https://api.cloudinary.com/v1_1/doduvxcmi/image/upload",
        data).then((response) => {
            console.log(response.data.secure_url)
        
        
        axios.post("http://localhost:3001/collect/add/:id", {
            name: name,
            image: response.data.secure_url,
            description: description, 
            theme: theme,
            UserId: id
        }).then((response) => {
            console.log(response.data)
            history.push(`/profile/${response.data.UserId}`)
            // const collectToAdd = (response.data);
            // setListOfCollect([...listOfCollect, collectToAdd])
            
        });
    })
})
    }

    const handleChange = (event) => {
        setTheme(event.target.value);
      };
      
    const handleOnChange = (e, editor) => {
        const data = editor.getData();
        console.log(data)
        setValue(data)
        // setDescription(data)
    }
    return (
        <>
             
            <form className="form">
                <div className="form_inner">
                    {checkUserState.role ==="admin"  ? (
                        <h3>Add Collection by <strong>{profile.login}</strong>  </h3>    
                    ) : (  
                        <h3>Add New Collection</h3>
                    )}

                <input type="text" name="name" placeholder="Name"  value={name}
                    onChange={(event) => {
                        setName(event.target.value)
                    }}/>

                    <textarea type="text"  name="description" maxLength="250" placeholder="Description" 
                    onChange={(event) => {
                        setDescription(event.target.value)
                    }}/>
                    
                    {/* <div className="mb-3">
                        <CKEditor editor={ClassicEditor} onChange={handleOnChange} />
                    </div>
                    <div>{value}</div> */}

                    {/* <Description onChange={(event) => {
                        setDescription(event.target.value)
                    }}/> */}

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
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>

                        <Dropzone accept='image/jpeg, image/png' multiple={false} onDrop={acceptedFiles => setImage(acceptedFiles)}>
                            {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()} className="dropzone">
                                  <input {...getInputProps()} />
                                  <span className="fake-btn">Choose files</span>
                                  <span className="file-msg">or drag and drop files</span>

                                </div>
                            </section>
                            )} 
                        </Dropzone>

                    <input type="submit" onClick={onSubmit} value="Отправить"/>
                </div>
            </form>
        </>
    )
}
