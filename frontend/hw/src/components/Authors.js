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

   const [enableEdit,setEnabeEdit] = useState(false)
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
    // function UpdateAuthor(e,_id){
    //     console.log(_id);
    //     setIdUpdate(_id)
    //     setEnabeUpdate(true)
    //   }
    //   function saveEditAuthor(e){
    //         e.preventDefault()
    //         console.log(e.target.form[0].value)
    //         console.log(e.target.form[1].value)
    //         console.log(e.target.form[2].value)
    //         console.log(e.target.form[3].value)
    //         console.log(e.target.form[4].value)
    //       axios.put(`http://localhost:3001/api/author/update/${idUpdate}`,
    //          { data :
    //             {
    //             name:e.target.form[0].value ,
    //             age:e.target.form[1].value,
    //             nationality:e.target.form[2].value,
    //             image: e.target.form[3].value,
    //             gender: e.target.form[4].value
    //             }
    //          })
    //             .then((response) => {
    //             console.log("Updated",response.data);
    //             setAuthor(response.data);
    //         });
    //         setEnabeUpdate(false)
    //   }
      
//     //______________________________________________________ Delete
//     const deleteAuther = (e,_id) => {
//         e.preventDefault()
//         console.log(_id)
//         axios.delete(`http://localhost:3001/api/author/delete/${_id}`).then((response) => {
//         console.log(" deleted: ", response.data)
//         setAuthor(response.data);
//     })
//    }

     return (
          <div className="main">
              {
            author.map((item) =>{
                console.log("hi")
                return (
                    <div className="maindiv">
                        
                       <Link to={`/Details/${item._id}`}> <img src={item.image} className="photo"/>  </Link>
                        <h1>{item.name}</h1>
                        
                             
                    </div> 
                )

            })
        }
        

     </div> );
 }
 
 export default Authors ;