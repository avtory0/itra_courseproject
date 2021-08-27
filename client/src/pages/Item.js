import {React, useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router'
import axios from "axios";
import {AuthContext} from '../helpers/AuthContext'

export default function Item() {
    const {id} = useParams();
    const [itemObject, setItemObject] = useState({});
    const [listOfComments, setListOfComments] = useState([]);
    const [body, setBody] = useState("");

    const {authState} = useContext(AuthContext) 


    useEffect(() => {
        axios.get(`http://localhost:3001/items/byitem/${id}`).then((response)=> {
            setItemObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setListOfComments(response.data)
        })
    }, [])

    const addComment =() => {
        axios.post("http://localhost:3001/comments/add", {
            body: body,
            ItemId: id
        },
        {
            headers: {
                token: localStorage.getItem("token"),
            }
        }
        ).then((response) => {
            console.log(response.data);
        })
    }

    const deleteComment =(id) => {
        axios.delete(`http://localhost:3001/comments/delete/${id}`, {
            headers: {
                token: localStorage.getItem("token"),
            }
        }).then(() => {
            setListOfComments(listOfComments.filter((val) => {
                return val.id !== id;
            }))
        })
    } 

    return (
        <> 
            <div>
                <h1>{itemObject.name}</h1>
                <h2>{itemObject.tags}</h2>
            </div>

            <input type="text" onChange={(event) => {
                setBody(event.target.value);
            }} />
            <button onClick={addComment}>addComment</button>

            {listOfComments.map((value,key) => {
                return(
                    <div key={key}>
                        <div>{value.body}</div>
                        {authState.id === value.UserId && (
                        <button onClick={() => {
                            deleteComment(value.id)
                        }}>x</button>
                        )}
                    </div>
                )
            })}
        </>
    )
}
