import React from 'react'

export default function Pagination({collectionsPerPage, totalCollections, paginate}) {
    const pageNumbers =[];

    for(let i = 1; i <= Math.ceil(totalCollections/collectionsPerPage); i++) {
        pageNumbers.push(i);
        console.log(i)
    }
    
    return (
        <div className="d-flex justify-content-center">
            <ul className="pagination">
                {
                    pageNumbers.map(number => (
                        <li className="page-item" key={number}>
                            <a href="##" className="page-link" onClick={() => paginate(number)}>
                                {number}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
