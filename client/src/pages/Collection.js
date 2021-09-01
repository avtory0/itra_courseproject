import {React, useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router'
import axios from "axios";
import { useHistory } from "react-router"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import IconButton from '@material-ui/core/IconButton';
import {AuthContext} from '../helpers/AuthContext'


import "../App.css";

export default function Collection() {
    let {id} = useParams();
    const [collectObject, setCollectObject] = useState({});
    const [listOfItems, setListOfItems] = useState([]);

    

    const {authState} = useContext(AuthContext) 

    let history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:3001/collect/check/${id}`).then((response) => {
            console.log(response.data);
            setCollectObject(response.data)
        });


        axios.get(`http://localhost:3001/items/${id}`).then((response) => {
            // console.log(response.data.likedItems)
            setListOfItems(response.data);

        });   
    }, []);

    const likeItem = (itemid) => {
        axios.post("http://localhost:3001/likes", 
        {ItemId: itemid},
        {headers: {token: localStorage.getItem("token"),}}
        ).then((response) => {
            setListOfItems(listOfItems.map((item) => {
                if(item.id === itemid) {
                    if(response.data.liked) {
                        return {...item, Likes: [...item.Likes, 0]}
                    } else {
                        const likesArray = item.Likes;
                        likesArray.pop();
                        return {...item, Likes: likesArray}
                    }
                } else {
                    return item
                }
            }))
        })
    }

    return (
        <>
            <div className="collect-header">
                <h2 className="collect-title  ">{collectObject.name}</h2>
                <div className="collect-theme">{collectObject.theme}</div>
            </div>
            <div className="row">
                {listOfItems.map((value,key) => {
                    return(
                        <div key={key} className="col-md-3">
                        <div className="card text-center collect-card">
                            <div className="name" onClick={() => {
                                history.push(`/item/${value.id}`)
                            }}>{value.name}</div>
                            <div className="tags">{value.tags}</div>
                            <div className="card-footer">
                            {!authState.status ? (
                                <> 
                                <IconButton disabled>
                                    <ThumbUpAltIcon />
                                </IconButton>
                                
                                </>
                            ) : (
                                <> 
                                <ThumbUpAltIcon onClick={() => {likeItem(value.id)}}

                                  />
                                </>
                            )}
                            <label>{value.Likes.length}</label>
                            </div>
                        </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

