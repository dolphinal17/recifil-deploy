import React from 'react';
// importing style
import "./index.css";
import { Route,Routes } from "react-router-dom";


// here to import components like pages
import {Login, Signup, Library, Basket, Socials, Favorites} from './components/pages/pages.js'


function App() {
  return (
    <div>
      <div>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/library" element={<Library/>} />
            <Route path="/basket" element={<Basket/>} />
            <Route path="/socials" element={<Socials/>} />
            <Route path="/favorites" element={<Favorites/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App