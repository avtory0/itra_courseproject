import {React, useState,useEffect} from 'react'
import axios from "axios";


import "../App.css";
import Pagination from '../components/Pagination';
import ListOfCollections from '../components/ListOfCollections';


export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [listOfCollection, setListOfCollection] = useState([]);
    const [collectionsPerPage] = useState(6);

    

    useEffect(() => {
        axios.get("http://localhost:3001/collect/getall").then((response) => {
            setListOfCollection(response.data)
        });
    },[])

    const lastPage = currentPage * collectionsPerPage;
    const firstPage = lastPage - collectionsPerPage;
    const currentCollection = listOfCollection.slice(firstPage, lastPage);

    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <> 
        <ListOfCollections 
        listOfCollection={currentCollection}
        />
        <Pagination 
        collectionsPerPage= {collectionsPerPage}
        totalCollections ={listOfCollection.length}
        paginate={paginate}
        />
        </>
    )
}
