import React from 'react'
import {gql,useQuery} from "@apollo/client";

function AuthorList() {

    const get_authors = gql`
       authors{
           name
       }
    `
       const {loading,error,data} = useQuery(get_authors)
    return (
        <div>
            {loading?
            (
                <h2>Loading.....</h2>
            ):(
                <ul>
                    {data?.authors?.map((author) => 
                        <l1>{author.name}</l1>
                    )}
                </ul>
            )}
        </div>
    )
}

export default AuthorList
