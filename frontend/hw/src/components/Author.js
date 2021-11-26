import { useState, useEffect } from "react";
import axios from "axios";

 function Author() {
    const [author , setAuthor]=useState([]);
    const [addName, setAddName] = useState ('')
    const [addAge, setAddAge] = useState ('')
    const [addNat, setAddNat] = useState ('')
    const [addImg, setAddImg] = useState ('')
    const [addGender, setAddGender] = useState ('')
    const [addBook, setAddBook] = useState ([])
    
    useEffect (() =>{
        axios.get('http://localhost:3001/api/author/home')
        .then((res)=>{
            console.log(res);
            setAuthor(res.data);
        })
        },[]);

        function handlPost(){
            axios.post('http://localhost:3001/api/author/post' , {img:addImg , name: addName })
            .then((res) => {
                console.log(res.data);
                setAuthor(res.data);
            })
        }
     return (
          <div>
              {
            author.map((item) =>{
                console.log("hhhiiii")
                return (
                    <div>
                        {/* <img>{item.date}</img> */}
                        <h1>{item.title}</h1>
                    </div>
                )

            })
        }

     </div> );
 }
 
 export default Author ;