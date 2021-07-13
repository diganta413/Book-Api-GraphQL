import React from 'react'
import {gql,useQuery} from "@apollo/client";

function BookList() {
    const getbooks = gql`
    {
           books{
              name
              id
            }
        
    }
    `
    const { loading,error,data } = useQuery(getbooks);
    console.log(data)

    return (
        <div style={{ marginLeft: "20%" }}>
            {loading?<h2>Loading.....</h2>:
            (
                <ul>
                {data?.books?.map((book) => 
                    (<li key={book.id}>{book?.name}</li>)
                )}
            </ul> 
            )}
           
        </div>
    )
}

export default BookList
