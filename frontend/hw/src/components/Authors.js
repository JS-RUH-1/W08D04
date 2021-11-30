import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import {  Link  } from "react-router-dom";

 function Authors() {
    const [author , setAuthor]=useState([]);
    const [addName, setAddName] = useState ('')
    const [addAge, setAddAge] = useState ('')
    const [addNat, setAddNat] = useState ('')
    const [addImg, setAddImg] = useState (null)
    const [addGender, setAddGender] = useState ('')
    // const [addBook, setAddBook] = useState ([])

    const [enableUpdate,setEnabeUpdate] = useState(false)
    const [idUpdate,setIdUpdate] = useState()
   
    useEffect (() =>{
        axios.get('http://localhost:3001/api/author/home')
        .then((res)=>{
            console.log(res);
            setAuthor(res.data);
        })
        },[]);

        function handlPost(e){
            e.preventDefault()
            axios.post('http://localhost:3001/api/author/post' , {
                image:addImg ,
                name: addName ,
                age:addAge ,
                nationality:addNat ,
                gender:addGender ,

            })
            .then((res) => {
                console.log(res.data);
                setAuthor(res.data);
            })
        }
        // __________________________________________ Update
    function UpdateAuthor(e,_id){
        console.log(_id);
        setIdUpdate(_id)
        setEnabeUpdate(true)
      }
      function saveEditAuthor(e){
            e.preventDefault()
            console.log(e.target.form[0].value)
            console.log(e.target.form[1].value)
            console.log(e.target.form[2].value)
            console.log(e.target.form[3].value)
            console.log(e.target.form[4].value)
          axios.put(`http://localhost:3001/api/author/update/${idUpdate}`,
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
            setEnabeUpdate(false)
      }
      
    //______________________________________________________ Delete
    const deleteAuther = (e,_id) => {
        e.preventDefault()
        console.log(_id)
        axios.delete(`http://localhost:3001/api/author/delete/${_id}`).then((response) => {
        console.log(" deleted: ", response.data)
        setAuthor(response.data);
    })
   }

     return (
          <div className="main">
              {
            author.map((item) =>{
                console.log("hi")
                return (
                    <div className="maindiv">
                        
                       <Link to={`/Details/${item._id}`}> <img src={item.image} className="photo"/>  </Link>
                        <h1>{item.name}</h1>
                        <button style = {{backgroundColor: "black" ,color: "White"}} onClick={(e) =>
                            {deleteAuther(e,item._id)}}>Delete</button>    
                             <button style = {{backgroundColor: "black" ,color: "White"}} onClick={(e) =>
                             {UpdateAuthor(e,item._id)}}>Update</button>
                    </div> 
                )

            })
        }
        <div className="form1">
            <label>Add your Formation </label>
            <br/>
        <input placeholder="Your Name" onChange ={(e)=> setAddName(e.target.value)}type="text" name="title"></input><br/>
        <br/>
        <input placeholder="Your Age" onChange ={(e)=> setAddAge(e.target.value)}type="text" name="title"></input><br/>
        <br/>
        <input placeholder="Your nationality" onChange ={(e)=> setAddNat(e.target.value)}type="text" name="title"></input><br/>
        <br/>
        
             <input
        placeholder="Your Imge"
        onChange={(e) => setAddImg(e.target.value)}
        type="text"
        name="title"
      />
        <br/><br/>
      <input placeholder="Your gender" onChange ={(e)=> setAddGender(e.target.value)}type="text" name="title"></input><br/>
      <br/>
      
<br/>
<div>
    
</div>
      <button onClick={(e)=>handlPost(e)} style = {{backgroundColor: "black" ,color: "White"}}>Add </button>
        </div>

     </div> );
 }
 
 export default Authors ;