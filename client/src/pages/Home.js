import {React, useState,useEffect} from 'react'
import axios from "axios";
import { useHistory } from "react-router"

import "../App.css";


export default function Home() {
    const [listOfCollection, setListOfCollection] = useState([]);
    let history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:3001/collect/getall").then((response) => {
            setListOfCollection(response.data)
        });
    },[])

    return (
        <div className="row">
            {listOfCollection.map((value, key) =>{
                return (
                        <div key={key} className="col-md-4" >
                        <div className="card text-center collect-card animate__animated animate__fadeInUp ">
                            <div className="overflow">
                                <img src={value.image} alt="collectimage" className="card-img-top " 
                                onClick={() => {
                                    history.push(`/clctn/${value.id}`);
                                  }}></img>
                            </div>
                            <div className="card-body">
                            <div className="collect-card_title"> {value.name}</div>
                            <div className="collect-card_description">{value.description}</div>
                            <div >{value.theme}</div>
                            <div>{value.User.login}</div>
                        </div>
                        </div>
                        </div>
                )
            })
            }
        </div>
    )
}
