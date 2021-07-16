import React,{useState} from 'react'
import {gql,useQuery,useMutation} from "@apollo/client";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function BookList() {
    const [show,setshow] = useState(false)
    const [formData,setformData] = useState({})
    const [authorid,setauthorid] = useState()
    const [change,setchange] = useState(false)
    const [current,setcurrent] = useState()
    const getbooks = gql`
    {
           books{
              name
              id
            }
        
    }
    `
    const get_authors = gql`
       {
           authors{
           name
           id
       }
    }
    `

    const add_book = gql`
        mutation($name: String!,$genre: String!,$authorid: ID!){
            add_book(name: $name,genre: $genre,authorid: $authorid){
                name
            }
        } 
    `
    const get_book = gql`
        query Book($id: ID!){
            book(id: $id){
                name
                genre
                author{
                    name
                }
            }
        }
    ` 
    
    const { loading,error,data } = useQuery(getbooks);
    //console.log(data)
    const authors = useQuery(get_authors).data

    const formHandler = (e) => {
        setformData({...formData,[e.target.name] : e.target.value})
    }

    console.log(authors)
    const [addBook,{ book_data }] = useMutation(add_book)
    const current_book = useQuery(get_book,{variables: { id: current }})

    const submit = (e) => {
        e.preventDefault()
        console.log(formData)
        authors?.authors?.forEach(author => {
            if(author.name == formData.author)
            {
                console.log(author.id)
                addBook({ variables: { name: formData.name,genre: formData.genre,authorid: author.id },refetchQueries: [{query: getbooks}] })
                setshow(false)
                window.location.reload()
            }
        });
    }

    function bookDetails(e){
        const name = e.target.textContent;
        data?.books.forEach(element => {
            if(element.name == name)
            {
                setcurrent(element.id)
            }
        });
    }
    console.log(current_book)
 
    return (
        <div style={{ margin: "20px 5px 0 10%",display: "flex",justifyContent: "center",alignItems: "center" }}>
            <div style={{ flex: "0.5",textAlign: "center",height: "100vh" }}>
            <h1 style={{ fontWeight: "bolder",marginBottom: "20px",marginRight: "10%" }}>Book List</h1>
            {loading?<h2>Loading.....</h2>:
            
                (<div className="bookList">
                    {
                        data?.books?.map((book,i) => 
                    (<p key={book.id} className="book" onClick={bookDetails}>{book?.name}</p>)
                        )
                    }
                    
                </div>)
                
             
            }
        <Button variant="primary" onClick={() => setshow(!show)} style={{ marginRight: "10%" }}>Add Book</Button>
            <Modal show={show} onHide={() => setshow(false)} animation={true}>
                <Modal.Body>
                    <label for="name" style={{ marginRight: "10px",fontWeight: "bolder" }}>Name</label>
                    <input type="text" required placeholder="Entar book name" 
                    id="name" name="name" onChange={formHandler}
                    style={{ padding: "10px" }} />
                    <div style={{ display: "flex",marginTop: "10px" }}>
                    <label for="genre" style={{ marginRight: "10px",marginTop: "10px",fontWeight: "bolder",display: "block" }}>Genre</label>
                    <input type="text" required placeholder="Entar book genre" 
                    id="genre" name="genre" onChange={formHandler}
                    style={{ padding: "10px" }} />
                    </div>
                   
                    <label for="author" style={{ margin: "10px",fontWeight: "bolder",display: "block" }}>Select Author</label>
                    <select name="author" id="author" style={{ marginLeft: "10px" }} onChange={formHandler}>
                        {authors?.authors?.map((author) => (
                            <option>{author?.name}</option>
                        ))}
                    </select>
                    <Button variant="success" onClick={submit} type="submit" style={{ display: "block",marginLeft: "40%",marginTop: "10px" }}>Submit</Button>
                </Modal.Body>
                    
            </Modal>
            </div>
            <div style={{ flex: "0.5",textAlign: "center",backgroundColor: "#7C83FD",height: "100vh",width: "100%" }}>
                    <h1 style={{ fontWeight: "bolder",marginTop: "10px" }}>Book Details</h1>
                    {current && (
                         <div style={{ marginTop: "30%" }}>
                               <p style={{ fontSize: "20px",fontWeight: "bold" }}>{current_book?.data?.book?.name}</p>
                               <p style={{ fontSize: "20px",fontWeight: "bold" }}>Genre:  {current_book?.data?.book?.genre}</p>
                               <p style={{ fontSize: "20px",fontWeight: "bold" }}>Author: {current_book?.data?.book?.author?.name}</p>
                         </div>
                    )}
            </div>
        </div>
    )
}

export default BookList
