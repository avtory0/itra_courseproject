import React, {useState,useContext, useEffect} from 'react'
import axios from 'axios';
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import {AdminContext} from '../helpers/AdminContext'
import { useHistory } from "react-router";
import { Table } from '@material-ui/core';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


export default function AdminPanel() {
    const [listOfUsers, setListOfUsers] = useState([]);
    const {checkUserState} = useContext(AdminContext);


    let history = useHistory();
    if(checkUserState.role !=="admin") {
        history.push("/")
    }

    useEffect(() => {
        // const getAllUsers = () => {
        axios.get("http://localhost:3001/auth/getall").then((response) =>{
            setListOfUsers(response.data)
        })
    
    // getAllUsers();

    }, [])
    const getAll =() => {
        axios.get("http://localhost:3001/auth/getall").then((response) =>{
            setListOfUsers(response.data)
        })
    }

    const blockUser =(id) => {
        axios.put(`http://localhost:3001/auth/blockuser/${id}`).then((response) => {
            // setListOfUsers(listOfUsers.map((val) => {
            //     return val.id === id ? {id: val.id, login: val.login, email: val.email, status: val.status, role: val.role} : val 
            // }))

            // getAllUsers();
            getAll()
        })
    }
    const roleUser = (id) => {
        axios.post(`http://localhost:3001/auth/roleuser/${id}`).then((response) => {
            console.log(response.data)
            getAll()
        })
    }

    

    return (
        <>
            <Table className="table table-hover">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Login</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {listOfUsers.map((value, key) => {
                        return(
                            <tr key={key}>
                                <td>{value.id}</td>
                                <td  onClick={() => {history.push(`/addcollection/${value.id}`)}}> <a href="##"> {value.login} </a></td>
                                <td>{value.email}</td>
                                <td>{value.status}</td>
                                <td>{value.role}</td>
                                <td>
                                    
                                    {value.status === "normal" ? (
                                    <OverlayTrigger 
                                        overlay={
                                        <Tooltip id="tooltip-top">
                                          <strong>Block</strong> user
                                        </Tooltip>
                                      }>
                                         <BlockIcon className="me-2" onClick={() => {
                                             blockUser(value.id);
                                         }} />
                                    </OverlayTrigger>     
                                     ): (
                                    <OverlayTrigger 
                                        overlay={
                                        <Tooltip id="tooltip-top">
                                         <strong>Unblock</strong> user
                                        </Tooltip>
                                      }>
                                         <CheckIcon className="me-2" onClick={() => {
                                             blockUser(value.id);
                                         }}/>
                                    </OverlayTrigger>     
                                    )} 

                                    {value.role === "user" ? (
                                    <OverlayTrigger 
                                        overlay={
                                        <Tooltip id="tooltip-top">
                                          Upgrade to <strong>admin</strong> 
                                        </Tooltip>
                                      }>
                                          <ArrowUpwardIcon onClick={() => {
                                             roleUser(value.id);
                                         }}/>
                                    </OverlayTrigger>
                                    ): (
                                    <OverlayTrigger 
                                        overlay={
                                        <Tooltip id="tooltip-top">
                                          Downgrade to <strong>user</strong> 
                                        </Tooltip>
                                      }>
                                          <ArrowDownwardIcon onClick={() => {
                                             roleUser(value.id);
                                         }}/>
                                    </OverlayTrigger>
                                    )}
                                    
                                     
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}
