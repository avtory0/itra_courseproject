import {React, useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router'
import axios from "axios";
import {AuthContext} from '../helpers/AuthContext'
import DeleteIcon from '@material-ui/icons/Delete';

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
            console.log(response.data)
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
            const newComment = (response.data);
            setListOfComments([...listOfComments, newComment]);
            setBody("");
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
            <div className="col-md-3">
                <div className="card text-center collect-card">
                  <div className="name">{itemObject.name}</div>
                  <div className="tags">{itemObject.tags}</div>
                </div>
            </div>

            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Comment" 
              aria-label="Recipient's username" aria-describedby="basic-addon2"
              onChange={(event) => {
                setBody(event.target.value);
            }}/>
             {!authState.status ? (
              <button disabled onClick={addComment}>addComment</button>
             ) :(
                <button className="btn btn-primary" onClick={addComment}>addComment</button>
             )}
            </div>

            

            {listOfComments.map((value,key) => {
                return(
                    <div key={key} className="d-flex">
                        <div className="mx-2">{value.body}</div>
                        {/* <div>{value.User.login}</div> */}
                        {authState.id === value.UserId && (
                        <DeleteIcon onClick={() => {
                            deleteComment(value.id)
                        }}/>
                        )}
                    </div>
                )
            })}
        </>
    )
}
