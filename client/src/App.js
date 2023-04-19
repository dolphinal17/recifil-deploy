import React, { useState, useEffect } from 'react';
// importing style
import "./index.css";
import { Route,Routes, Navigate} from "react-router-dom";
import { auth } from './config/firebase';



// here to import components like pages
import {Login, Signup, Library, Basket, Socials, Favorites, Landing, Discover, RecipeProcess, Profile, Verify, UploadImg, ForgotPassword, EmailVerification} from './components/pages/pages.js'
import { CardCreatePost, CardEditInfo, CardRecipesView, NavbarAdmin, SidebarAdmin, TableUser, UploadImage} from './components/organisms/organisms.js'
import WithPrivateRoute from './utils/WithPrivateRoute';
import { PreLoader } from './components/atoms/atoms';
import { ModalAccountSuccess } from './components/molecules/molecules';
import Post from './components/postdemos/Post';
import OtherPost from './components/postdemos/OtherPost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPanel from './components/pages/AdminPanel';
import AdminUser from './components/pages/AdminUser';
import AdminRecipes from './components/pages/AdminRecipes';
import EditRecipes from './components/pages/EditRecipes';
import AddRecipeForm from './components/organisms/forms/AddRecipeForm';
import AddRecipes from './components/pages/AddRecipes';
import AdminPosts from './components/pages/AdminPosts';




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

            {/* <Route path="/verify" element={
              !currentuser?.emailVerified 
              ? <Verify />
              : <Navigate to='/discover' replace/>
            } />   */}

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
              ? <ForgotPassword />
              : <Navigate to='/discover' replace/>
            } />

            <Route path="/emailverification" element={
              !currentuser?.emailVerified 
              ? <EmailVerification />
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
                  <OtherPost />
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

            {/* <Route
              exact
              path="/upload"
              element={
                <WithPrivateRoute>
                  <UploadImg /> 
                </WithPrivateRoute>
              }
            /> */}

            <Route
              exact
              path="/upload"
              element={
                <WithPrivateRoute>
                  <UploadImage />
                </WithPrivateRoute>
              }
            />

            {/* <Route path='/postlmao' element={<Post/>} /> */}

            <Route path='/success' element={<ModalAccountSuccess/>} />
            <Route path="/loadings" element={<PreLoader />} />
            <Route path="/adminsidebar" element={<SidebarAdmin />} />
            <Route path="/adminnav" element={<NavbarAdmin />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/table" element={<TableUser />} />
            <Route path="/adminuser" element={<AdminUser/>} />
            <Route path='/adminrecipes' element={<AdminRecipes />} />
            <Route path="/editrecipes" element={<EditRecipes />} />
            <Route path='/editrecipes/:id' element={<EditRecipes />} />
            <Route path='/addrecipesform' element={<AddRecipeForm />} />
            <Route path='/addrecipes' element={<AddRecipes />} />
            <Route path='/adminposts' element={<AdminPosts />} />
            
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div> : <PreLoader />
  )
}

export default App