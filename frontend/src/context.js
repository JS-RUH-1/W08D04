import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';

export const ContextStore = React.createContext({});
const MySwal = withReactContent(Swal)

export default function Context({children}){

    const [token, setToken] = useState(undefined);
    const [author,setAuthor] = useState(undefined);

    useEffect(()=>{
        if(localStorage.auth) 
        setToken(localStorage.auth);
    },[])

    useEffect(()=>{
        if (token === undefined) return;
        if( token === false) {//logout
            setAuthor(undefined);
            setToken(undefined);
            localStorage.removeItem('auth');
            return;

        };

        localStorage.auth = token; //store the token in localstorage
        axios.defaults.headers.common['Authorization'] = token;
        axios.get('/author').then((res)=>{
            setAuthor(res.data);
        })
    },[token]);

    const Toast = MySwal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', MySwal.stopTimer)
          toast.addEventListener('mouseleave', MySwal.resumeTimer)
        }
      });



    return <ContextStore.Provider value={{Toast, token, setToken, author, setAuthor}}>
    {children}
    </ContextStore.Provider>




}