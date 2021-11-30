import '../styles/globals.css';
import Header from '../components/header';

import axios from 'axios';
import { useEffect, useState } from 'react';
axios.defaults.baseURL = 'http://localhost:8080';


function MyApp({ Component, pageProps }) {
  const [user,setUser] = useState(undefined);
  if(typeof localStorage !== "undefined") {
    useEffect(() => {
      if(localStorage.auth) {
        axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.auth;
        axios.get("/authors/me").then(res => {
          setUser(res.data);
        })
      } else {
        setUser(undefined);
      }
    },[localStorage.auth])
  }
 
  return <>
    <Header  user={user} setUser={setUser} />
    <Component {...pageProps} user={user} setUser={setUser} />

  </>
}

export default MyApp
