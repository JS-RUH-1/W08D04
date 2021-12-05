import axios, { Axios } from "axios";
import {useState , useEffect} from "react"
import {useParams}from 'react-router'


function AutherDetails(){
    const[authordetails , setAuthorDetails] = useState({})
    const{id} = useParams()
    const [abooks,setAbooks] = useState([])

    useEffect(()=>{
        axios
        .get(`/api/auther/getAuther/${id}`)
        .then((res)=>{
            setAuthorDetails(res.data)
            setAbooks(res.data.books)
            console.log(res.data);
        })
    } , [])



    console.log(authordetails.name);
    console.log(abooks);

    return(
        <div>
        
        <img src={authordetails.autherImage}/>
        <h1>{authordetails.name}</h1>
        <h2>{authordetails.age}</h2>
        <h3>{authordetails.nationality}</h3>
        <h3>{authordetails.gender}</h3>
        {abooks.map((e)=>{
            return(
            <img src = {e.bookImage}/>
            )
        })}
        
    
      

        </div>

    );

}export default AutherDetails