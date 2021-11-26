 //form of author name
 //add new author 
 //delete author 
 //edit author 
 import { useEffect, useState } from "react";
 import swal from 'sweetalert';

 import axios from 'axios';
 import './author.css'

export default function Book() {

    const [author,setAuthor]=useState([]);
    const [newAuthor,setNewAuthor]= useState({});


  const [Name ,setName]=useState()
  const [Age ,setAge]=useState()
  const [Nationality ,setNationality]=useState()
  const [Image,setImage] =useState()
  const [Gender,setGender]=useState()

    const [Image2 ,setImage2] =useState()
    const [Title,setTitle]=useState()
    const [Pages,setPages]=useState()
    const [Price,setPrice]=useState()

    ///////////////////////
    //add author ****************

    useEffect(()=>{

        axios.get('http://localhost:3030/authors')
        .then((res)=>{
            console.log(res.data)
            setAuthor(res.data)
        })

    },[newAuthor])
    ////////////////////////////////////////////////////////////////////////
    //add new info about  book
    const handelAdd=()=>{ 

        swal({
            title:'Added New Book',
            icon:'success'
          })

        axios.post('http://localhost:3030/authors/create', 
        {image:Image, name:Name, age:Age, nationality:Nationality, gender:Gender,

            //how can i add object of book ??


          imagebook:Image2, title:Title, pages:Pages, price:Price
     })
       
          .then((res)=>{
            console.log(res.data)
            setNewAuthor(res.data)

            // console.log(newBook)
            // setBook(...book, newBook)
        })
    }
////////////////////////////////////////////////////////////////////////////////////////////////
//Delete author ****************

const handelDelete=(id)=>{ 

    swal({
        title:'you deleted a appointment',
        icon:'success'
      })
            console.log(id)

            

            

    axios.delete(`http://localhost:3030/authors/${id}/delete`)
    .then((res)=>{
        
        setNewAuthor(res.data)
    })
        }
       

    return (  
        <>



<from >


<div className="bookForm"> 

 <h2> Add new Author</h2>
    <label>Name:</label>
    <input type="text"
    placeholder="Enter Name of Author .."
    onChange={e=>setName(e.target.value)}/>
    <br>
    </br>

    <label>Image:</label>
    <input type="text"
    placeholder="Enter image of Author .."
    onChange={e=>setImage(e.target.value)}/>
    <br>
    </br>
    <label>Age:</label>
    <input type="text"
    placeholder="Age of Author .."
    onChange={e=>setAge(e.target.value)}/>
    <br>
    </br>

    <label>Nationality:</label>
    <input type="text"
    placeholder="setNationality of author .."
    onChange={e=>setNationality(e.target.value)}/>
    <br>
    </br>

    <label>Gender:</label>
    <input type="text"
    placeholder="Gender of author .."
    onChange={e=>setGender(e.target.value)}/>
    <br>
    </br>
<h2>Add Book</h2>
    <label>Image:</label>
    <input type="text"
    placeholder="Enter Cover of book .."
    onChange={e=>setImage2(e.target.value)}/>
    <br>
    </br>

    <label>Title:</label>
    <input type="text"
    placeholder="Enter name of title .."
    onChange={e=>setTitle(e.target.value)}/>
    <br>
    </br>

    <label>Pages:</label>
    <input type="text"
    placeholder="Enter number of pages .."
    onChange={e=>setPages(e.target.value)}/>
    <br>
    </br>

    <label>Price:</label>
    <input type="text"
    placeholder="Enter the price .."
    onChange={e=>setPrice(e.target.value)}/>
    <br>

    </br>

        <button onClick={handelAdd}> Add</button>

        </div>
        </from>







         <div className="authorBox">

             {author.map((get)=>{

                 return <div className="authorCard">

                    <h3> <span>Name:</span>{get.name}</h3>
                    <h3> <span>Age:</span>{get.age}</h3>
                    <h3> <span>Nationality:</span>{get.nationality}</h3>
                    <img src={get.image} alt='' width={200}/>
                    <h3> <span>Gender:</span>{get.gender}</h3>

                    {get.books.map((item)=>{
           
                     return  <div>
                            <h4><span>title of book:</span>{item.title}</h4>
                            <h4><span>page of book:</span>{item.pages}</h4>
                            <h4><span>price of book:</span>{item.price}</h4>
                            <img src={item.image} alt='' width={200}/>

                        </div>

                    })}
 <div className="BTN">

<button className='btnDE'   onClick={()=>handelDelete(get._id)}>Delete</button> 
{/* <button className='btnEDIT' onClick={()=>handelEdit(get._id)}>Edite</button>  */}
  
</div>

                 </div>
             })}


         </div>
        </>
    );
}

   