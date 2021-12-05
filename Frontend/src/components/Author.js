import axios  from 'axios';
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Details from './Details';


export default function Author (){

    
    const [author,setAuthor] = useState([]);
    const [enableEdit,setEnabeEdit] = useState(false)
    const [idEdit,setIdEdit] = useState()
    
    useEffect (()=> {
        axios.get('http://localhost:3001/author/getAuthor')
        .then((response) => {
         console.log(response.data);
         setAuthor(response.data);
        });
    }, []);

    // Add Author

    const addAuthor = (e) => {
        e.preventDefault()
     // console.log(e.target.form[0].value)
          axios.post("http://localhost:3001/author/createAuthor", {
               data: {
                   name: e.target.form[0].value,
                   age: e.target.form[1].value,
                   nationality:e.target.form[2].value,
                   image: e.target.form[3].value,
                    gender: e.target.form[4].value,
                //    books:  e.target.form[5].value
                }} 
          ).then(
            (response) => {
              console.log("Add Author: ", response.data);
              setAuthor(response.data);
            })
    }

    // Update

    
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
      axios.put(`http://localhost:3001/author/updateAuther/${idEdit}`,
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
            setAuthor(response.data);
        });
        setEnabeEdit(false)

  }
    // Delete 

    const deleteAuther = (e,_id) => {
        e.preventDefault()
        console.log(_id)
        axios.delete(`http://localhost:3001/author/deleteAuther/${_id}`).then((response) => {
        console.log(" deleted: ", response.data)
        setAuthor(response.data);

    })
   }


    return (
       <div>

          <br/><br/><h4>Welcome To Author Page </h4><br/><br/>



            {/* <br/><br/> <h5>Add Author:</h5> <br/><br/>
                <input  placeholder="Author Name:"></input><br/>
                <input  placeholder="Age :"></input><br/>
                <input  placeholder="Nationality :"></input><br/>
                <input  placeholder="Image :"></input><br/>
                <input  placeholder="Gender :"></input><br/>
                <input  placeholder="Books :"></input><br/>
                <br/><br/><button style = {{backgroundColor: "black" ,color: "White"}} type="submit" 
                onClick= {(e)=>addAuthor(e)}>Add</button><br/><br/>

      */}
                {/* {( function(){
            if (enableEdit == true){
                return (
                    <div>
                      <form>
                            <input placeholder="Name :"></input><br/>
                            <input placeholder="Age :"></input><br/>
                            <input placeholder="Nationality :"></input><br/>
                            <input placeholder="image :"></input><br/>
                            <input placeholder="Gender :"></input><br/>
                            <br/><br/><button style = {{backgroundColor: "black" ,color: "White"}} 
                            onClick={(e)=>{saveEditAuthor(e)}} >save</button><br/><br/>
                      </form>
                </div>
                ) }})()} */}
 
         {author.map ( (element) => {
                return (

                    <div className= "author">
                        <div class="card text-center col-5 mx-auto m-3">
                            <div class="card-header">
                            <Link on to={{
                                    pathname: `/Details/${element._id}`,
                                   data: {
                                       element,
                                    }
                                    }}>
                             <img className = "auth" src={element.image} height = {200} width = {200}></img></Link>
                            </div>
                            
                            
                            <div class="card-body">
                                <p class="card-text">Name : {element.name}</p> 
                            </div>
                        </div><br/><br/>
                        {/* <br/><button style = {{backgroundColor: "purple" ,color: "White"}} onClick={(e) => 
                            {deleteAuther(e,element._id)}}>Delete</button>    
                             <button style = {{backgroundColor: "gray" ,color: "White"}} onClick={(e) => 
                             {editAuthor(e,element._id)}}>Edit</button>
                             <hr/><br/><br/> */}
                    </div>
               )
            })
         }
           {console.log(author)}

             
        </div>
    )
}