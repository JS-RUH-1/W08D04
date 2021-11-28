import React from 'react'
import './App.css';
import Book from './components/Book'
import Authors from './components/Authors'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App() {


  return (
    <BrowserRouter>
    <div className="App App-header">
      <header></header>
      <ul>
        <li>
          <Link to="/">Book</Link>
        </li>
        <li>
          <Link to={
            {
              pathname: "/Authors",
              state: {from:'here'}
            }
          }>Authors</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Book />} />
        <Route path="/Authors" element={<Authors />} />
      </Routes>
    </div>
  </BrowserRouter>
  )
}
