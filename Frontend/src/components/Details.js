import { useParams} from "react-router"
import { useEffect, useState } from "react";
import axios  from 'axios';
import jwt_decode from "jwt-decode";

export default function Details (){
    
    const {more} = useParams()
    const [detail,setDetail] = useState()
    const [loading,setLoading] = useState(true)
    const [author,setAuthor] = useState([]);
    const [enableEdit,setEnabeEdit] = useState(false)
    const [idEdit,setIdEdit] = useState()


    let decodedData ;
    const storedToken = localStorage.getItem("token");
    if (storedToken){
        decodedData = jwt_decode(storedToken, { payload: true });
        console.log(decodedData);
        let expirationDate = decodedData.exp;
        var current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
            localStorage.removeItem("token");
        }
   }



    // Add Books

    const addBook = (e) => {
        e.preventDefault()
     // console.log(e.target.form[0].value)
          axios.post(`http://localhost:3001/author/createBook/${more}`, {
               data: {
                   title: e.target.form[0].value,
                   pages: e.target.form[1].value,
                   price:e.target.form[2].value,
                   image: e.target.form[3].value,
                }} 
          ).then(
            (response) => {
              console.log("Add Book", response.data);
              setDetail(response.data);
            })
    }

       // Delete Book

       const deleteBook = (e,_id) => {
        e.preventDefault()
        console.log(_id)
        axios.delete(`http://localhost:3001/author/deleteBook/${more}/${_id}`).then((response) => {
        console.log(" deleted: ", response)
        setDetail(response.data);

    })
   }

       // Update Author

    
       function editAuthor(e,_id){
        console.log(_id);
        setIdEdit(_id)
        setEnabeEdit(true)
    
      }
    
      function saveEditAuthor(e){
            e.preventDefault()
            console.log(e.target.form[0].value)
            console.log(e.target.form[1].value)
            console.log(e.target.form[2].value)
            console.log(e.target.form[3].value)
            console.log(e.target.form[4].value)
          axios.put(`http://localhost:3001/author/updateAuther/${more}`,
             { data :
                {
                name:e.target.form[0].value ,
                age:e.target.form[1].value,
                nationality:e.target.form[2].value,
                image: e.target.form[3].value,
                gender: e.target.form[4].value
                }
             })
                .then((response) => {
                console.log("Updated",response.data);
                setDetail(response.data);
            });
            setEnabeEdit(false)
    
      }

    
   // More Details


    useEffect (()=> {

        // e.preventDefault()
        console.log(more)
        axios.get(`http://localhost:3001/author/getAuthor/${more}`)
        .then((response) => {
        console.log(response.data);
        setDetail(response.data);
            setLoading(false)

    })
    }, []);

        if (loading){
                return (
                    <p>loading...</p>
                )
            }

    const decode = (id) => {
        if (decodedData != undefined){
            if (decodedData.id == more){
                return (
                    <div>
                    <button style = {{backgroundColor: "purple" ,color: "White"}} 
                        onClick={(e) =>{deleteBook(e,id)}}>Delete</button>

                    </div>

                )
            }
        }
        
    }
    
    const decode1 = () => {
        if (decodedData != undefined){
            if (decodedData.id == more){
                return (
                    <div>

                    <button style = {{backgroundColor: "black" ,color: "White"}} type="submit"
                        onClick= {(e)=>addBook(e)}>Add</button><br/><br/>


                    </div>

                )
            }
        }
        
    }

        
    const decode2 = () => {
        if (decodedData != undefined){
            if (decodedData.id == more){
                return (
                    <div>
                      <button style = {{backgroundColor: "gray" ,color: "White"}} onClick={(e) => 
                                    {editAuthor(e,more)}}>Edit</button>

                    </div>

                )
            }
        }
        
    }


    return(
        
        <div>

         <br/><br/><h5> More Details </h5><br/><br/>

            <div class="card text-center col-5 mx-auto m-3">
                 <div class="card-header">
                    <img className = "auth" src= {detail.image} height = {200} width = {200}></img><br/>
                </div>
             <div class="card-body">
                <br/><p class="card-text">Name : {detail.name}</p>
                <p class="card-text">Nationality : {detail.nationality}</p>
                <p class="card-text">Age : {detail.age}</p>
                <p class="card-text">Gender : {detail.gender}</p>
                {decode2()}
                
             </div>
             
             
             </div>
             <br/><h5> Author Books </h5><br/>
             {detail.books?.map((book)=>{
                 return (
                     <div>
                    <div class="card text-center col-5 mx-auto m-3">
                    <div class="card-header">
                      <img className = "auth" src= {book.image} height = {200} width = {200}></img><br/>
                    </div>
                    <div class="card-body">
                        <br/><p class="card-text">Title : {book.title}</p>
                        <p class="card-text">Pages: {book.pages}</p>
                        <p class="card-text">Price : {book.price}</p>
                        <br/>
                        {decode(book._id)}     
                    </div>
                    </div>
                    </div>
                 )
             })}

             <br/><br/> <h5>Add Book:</h5> <br/><br/>

            <form>

                    <input  placeholder="Book Name :"></input><br/>
                    <input  placeholder="Pages :"></input><br/>
                    <input  placeholder="Price :"></input><br/>
                    <input  placeholder="Image :"></input><br/>
                    <br/><br/>
                    {decode1()} 

            </form> 


                   {( function(){
            if (enableEdit == true){
                return (
                    <div>
                      <form>
                            <input placeholder="Name :"></input><br/>
                            <input placeholder="Age :"></input><br/>
                            <input placeholder="Nationality :"></input><br/>
                            <input placeholder="image :"></input><br/>
                            <input placeholder="Gender :"></input><br/>
                            <br/><br/>
                            <button style = {{backgroundColor: "black" ,color: "White"}} 
                        onClick={(e)=>{saveEditAuthor(e)}} >save</button><br/><br/> 
                      </form>
                </div>
                ) }})()} 
         
        </div>
    )
}