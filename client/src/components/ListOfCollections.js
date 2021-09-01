import React from 'react'
import { useHistory } from "react-router"

export default function ListOfCollections({listOfCollection}) {
    let history = useHistory();
    
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
                        <div onClick={() => {
                            history.push(`/profile/${value.UserId}`)
                        }}>{value.User.login}</div>
                    </div>
                    </div>
                    </div>
            )
        })
        }
    </div>
    )
}
