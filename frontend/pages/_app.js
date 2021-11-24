import '../styles/globals.css';
import Header from '../components/header';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';


function MyApp({ Component, pageProps }) {
  return <>
    <Header />
    <Component {...pageProps} />

  </>
}

export default MyApp
