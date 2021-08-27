import React from 'react';
import {useParams} from 'react-router-dom';

export default function UserPage() {
    let {id} = useParams();
    return (
        <div>
            <h1>User Page {id}</h1>

        </div>
    )
}
