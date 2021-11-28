import axios from 'axios';
import {useState, useEffect} from 'react';

function Library(){
    const[data, setData] = useState([""]);
    useEffect(() => {
        axios.get('http://localhost:4000/getBooks')
        .then(data => setData(data.data))
        .catch((err) => console.log(err));
    },[])
    return (
        <div className="container mt-5">
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {
                    data.map((i, index) => {
                        return (
                            <div key={index} className="col">
                                <div className="card h-100">
                                    <img src={i.image} alt={i.title} className="card-img-top mx-auto" style={{height: "200px"}} />
                                    <div className="card-body">
                                        <h5 className="card-title">{i.title}</h5>
                                        <p className="card-text">{`Pages: ${i.pages}`}</p>
                                        <p className="card-text">{`Price: ${i.price}`}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export {Library};