import React, { useState, useEffect } from 'react';
// importing style
import "./index.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth } from './config/firebase';



// here to import components like pages
import { Login, Signup, Library, Basket, Socials, Favorites, Landing, Discover, RecipeProcess, Profile, Verify, UploadImg, ForgotPassword, EmailVerification, AdminTestPage } from './components/pages/pages.js'
import { CardCreatePost, CardEditInfo, CardRecipesView, NavbarAdmin, NewSignUpForm, SidebarAdmin, SignUpJerud, TableUser, UploadImage, Comment, CardRecipeProcess,CardFavoriteView } from './components/organisms/organisms.js'
import WithPrivateRoute from './utils/WithPrivateRoute';
import { PreLoader } from './components/atoms/atoms';
import { DropdownNotif, ModalAccountSuccess, ModalDeletePost } from './components/molecules/molecules';
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
import CardPostView from './components/organisms/cards/CardPostView';
import EditProfile from './components/pages/EditProfile';
import AdminPostsSec from './components/pages/AdminPostsSec';
import AdminPostsThird from './components/pages/AdminPostsThird';
import AdminIng from './components/pages/AdminIng';





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

  return (!loading ?
    <div>
      <div>
        <Routes>

          <Route path="/" element={
            !currentuser?.emailVerified
              ? <Landing />
              : <Navigate to='/discover' replace />
          } />

          {/* <Route path="/verify" element={
              !currentuser?.emailVerified 
              ? <Verify />
              : <Navigate to='/discover' replace/>
            } />   */}

          <Route path="/login" element={
            !currentuser?.emailVerified
              ? <Login />
              : <Navigate to='/discover' replace />
          } />

          <Route path="/signup" element={
            !currentuser?.emailVerified
              ? <Signup />
              : <Navigate to='/discover' replace />
          } />

          <Route path="/forgotpassword" element={
            !currentuser?.emailVerified
              ? <ForgotPassword />
              : <Navigate to='/discover' replace />
          } />

          <Route path="/emailverification" element={
            !currentuser?.emailVerified
              ? <EmailVerification />
              : <Navigate to='/discover' replace />
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
            path="/favorites/:id"
            element={
              <WithPrivateRoute>
                <CardFavoriteView />
              </WithPrivateRoute>
            }
          />

          <Route
            exact
            path="/postview/:id"
            element={
              <WithPrivateRoute>
                <CardPostView />
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
                <UploadImage />
              </WithPrivateRoute>
            }
          />


          <Route
            exact
            path="/editprofile"
            element={
              <WithPrivateRoute>
                <EditProfile />
              </WithPrivateRoute>
            }
          />

          

          <Route path='/success' element={<ModalAccountSuccess />} />
          <Route path="/loadings" element={<PreLoader />} />

          <Route path='/admining' element={<AdminIng />} />
          <Route path='/pendingposts' element={<AdminPosts />} />

          <Route path="/approvedposts" element={<AdminPostsSec />} />
          <Route path='/archivedposts' element={<AdminPostsThird />} />
          <Route path="/adminsidebar" element={<SidebarAdmin />} />
          <Route path="/adminnav" element={<NavbarAdmin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/table" element={<TableUser />} />
          <Route path="/adminuser" element={<AdminUser />} />
          <Route path='/adminrecipes' element={<AdminRecipes />} />
          <Route path="/editrecipes" element={<EditRecipes />} />
          <Route path='/editrecipes/:id' element={<EditRecipes />} />
          <Route path='/addrecipesform' element={<AddRecipeForm />} />
          <Route path='/addrecipes' element={<AddRecipes />} />
          
          <Route path='/admintest' element={<AdminTestPage />} />


          <Route path='/jerud' element={<SignUpJerud />} />
          <Route path='/newsignup' element={<NewSignUpForm />} />
          <Route path='/comms' element={<Comment />} />
          <Route path='/recipepro/:id' element={<CardRecipeProcess />} />
          <Route path='/del' element={<ModalDeletePost />} />
          <Route path='/drop' element={<DropdownNotif />} />
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