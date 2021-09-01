import {React, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import { useHistory } from "react-router"
import MultiplySelect from '../components/MultiplySelect';
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import "../App.css";


export default function ChangeCollect() {
    let {id} = useParams();
    const [form, setForm] = useState({ name: '', tags: '', CollectionId: id});
    const [listOfItems, setListOfItems] = useState([]);

    let history = useHistory();

    
    useEffect(() => {
        axios.get(`http://localhost:3001/items/${id}`).then((response) => {
            console.log(response.data)
            setListOfItems(response.data);
        });   
    }, []);


    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      };

    const onSubmit = () => {
        axios.post("http://localhost:3001/items/add", form).then((response) =>{
            console.log(response.data);
            const itemsToAdd = (response.data);
            setListOfItems([...listOfItems, itemsToAdd])
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setForm({ name: '', tags: '' })
    }

    const deleteItem = (id) => {
        axios.delete(`http://localhost:3001/items/delete/${id}`, {})
          .then(() => {
            setListOfItems(
                listOfItems.filter((val) => {
                    return val.id !== id;
                })
            )
            
          });
    };

    const editItem =(id) => {
        const selectedItem = listOfItems.find(item => item.id === id)
        console.log(selectedItem)
        setForm( selectedItem)
    }



    return (
        <>
            <h1>Collect page {id}</h1>
            <div className="collect-items">

            <form className="form" onSubmit={handleSubmit}>
                <div className="form_inner">
                    <h3>Add items</h3>

                <input type="text" name="name" placeholder="Name"  value={form.name}
                    // onChange={(event) => {
                    //     setName(event.target.value)
                    // }}/>
                onChange={handleChange}/>
                
                {/* <MultiplySelect value ={form.tags} onChange={handleChange}/> */}
                <input type="text" name="tags" placeholder="tags" value={form.tags} onChange={handleChange}/>
                <input type="submit" onClick={onSubmit} value="Отправить"/>
                </div>
            </form>
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
                            <DeleteIcon className="collect_icon"
                            onClick={() => {
                            deleteItem(value.id);
                            }}
                            />
                            <EditIcon onClick={() =>{
                                editItem(value.id)
                            }}/>
                            </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>

        
    )
}
