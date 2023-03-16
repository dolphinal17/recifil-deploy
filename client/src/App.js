import React, { useState, useEffect } from 'react';
// importing style
import "./index.css";
import { Route,Routes, Navigate} from "react-router-dom";
import { auth } from './config/firebase';



// here to import components like pages
import {Login, Signup, Library, Basket, Socials, Favorites, Landing, Discover, RecipeProcess, Profile, Verify, UploadImg} from './components/pages/pages.js'
import { CardCreatePost, CardEditInfo, CardRecipesView, ForgotPassword} from './components/organisms/organisms.js'
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

            <Route path="/" element={
              !currentuser?.emailVerified 
              ? <Landing/>
              : <Navigate to='/discover' replace/>
            } />

            <Route path="/verify" element={
              !currentuser?.emailVerified 
              ? <Verify />
              : <Navigate to='/discover' replace/>
            } />  

            <Route path="/login" element={
              !currentuser?.emailVerified 
              ? <Login/>
              : <Navigate to='/discover' replace/>
            } />

            <Route path="/signup" element={
            !currentuser?.emailVerified 
            ? <Signup/>
            : <Navigate to='/discover' replace/>
            } />

            <Route path="/forgotpassword" element={
              !currentuser?.emailVerified 
              ? <ForgotPassword/>
              : <Navigate to='/discover' replace/>
            } />

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

            <Route
              exact
              path="/recipeview/:id"
              element={
                <WithPrivateRoute>
                  <CardRecipesView />
                </WithPrivateRoute>
              }
            />
            
            <Route
              exact
              path="/profile"
              element={
                <WithPrivateRoute>
                  <Profile />
                </WithPrivateRoute>
              }
            />

            <Route
              exact
              path="/upload"
              element={
                <WithPrivateRoute>
                  <UploadImg /> 
                </WithPrivateRoute>
              }
            />

            
            <Route path="loadings" element={<PreLoader />} />
        </Routes>
      </div>
    </div> : <PreLoader />
  )
}

export default App