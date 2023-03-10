import React, { useState, useEffect } from 'react';
// importing style
import "./index.css";
import { Route,Routes } from "react-router-dom";
import { auth } from './config/firebase';



// here to import components like pages
import {Login, Signup, Library, Basket, Socials, Favorites, Landing, Discover, RecipeProcess} from './components/pages/pages.js'
import { CardCreatePost, CardEditInfo, CardRecipesView, CardRecipeView } from './components/organisms/organisms.js'
import WithPrivateRoute from './utils/WithPrivateRoute';
import { PreLoader } from './components/atoms/atoms';

function App() {


  const [loading, setLoading] = useState(true)
  const [currentuser, setuser] = useState(null)
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setuser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  
  return ( !loading ?
    <div>
      <div>
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />

            <Route
              exact
              path="/library"
              element={
                <WithPrivateRoute>
                  <Library />
                </WithPrivateRoute>
              }
            />

            <Route
              exact
              path="/basket"
              element={
                <WithPrivateRoute>
                  <Basket />
                </WithPrivateRoute>
              }
            />

            <Route
              exact
              path="/socials"
              element={
                <WithPrivateRoute>
                  <Socials />
                </WithPrivateRoute>
              }
            />

            <Route
              exact
              path="/favorites"
              element={
                <WithPrivateRoute>
                  <Favorites />
                </WithPrivateRoute>
              }
            />

            <Route
              exact
              path="/createpost"
              element={
                <WithPrivateRoute>
                  <CardCreatePost />
                </WithPrivateRoute>
              }
            />

            <Route
              exact
              path="/editinfo"
              element={
                <WithPrivateRoute>
                  <CardEditInfo />
                </WithPrivateRoute>
              }
            />
            
            <Route
              exact
              path="/discover"
              element={
                <WithPrivateRoute>
                  <Discover />
                </WithPrivateRoute>
              }
            />

            <Route
              exact
              path="/recipeprocess"
              element={
                <WithPrivateRoute>
                  <RecipeProcess />
                </WithPrivateRoute>
              }
            />
            
            <Route path="/recipeview" element={<CardRecipesView/>} />
            <Route path="/recipeviewws" element={<CardRecipeView/>} />
            <Route path="loadings" element={<PreLoader />} />
        </Routes>
      </div>
    </div> : <PreLoader />
  )
}

export default App