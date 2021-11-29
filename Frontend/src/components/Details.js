import { useParams} from "react-router"
import { useEffect, useState } from "react";
import axios  from 'axios';

export default function Details (){
    const {more} = useParams()
    const [detail,setDetail] = useState()
    const [loading,setLoading] = useState(true)

    
   // More Details


    useEffect (()=> {

        // e.preventDefault()
        console.log(more)
        axios.get(`http://localhost:3001/author/getAuthor/${more}`
     )
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
    return(
        <div>

         <br/><br/><h5>Showing more details </h5><br/><br/>

            <div class="card text-center col-5 mx-auto m-3">
                 <div class="card-header">
                    <img className = "auth" src= {detail.image} height = {200} width = {200}></img><br/>
                </div>
             <div class="card-body">
                <br/><p class="card-text">Name : {detail.name}</p>
                <p class="card-text">Nationality : {detail.nationality}</p>
                <p class="card-text">Age : {detail.age}</p>
                <p class="card-text">Gender : {detail.gender}</p>
             </div>
             
             
             </div>
         
        </div>
    )
}