import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { collection, query, getDocs, doc, addDoc, deleteDoc, limit } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CarouselRecipe( val ) {

    const [info , setInfo] = useState([]);

    const RecipeData = async () => {
        const q = query(collection(db, "recipes"), limit(4));

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id:doc.id,
        }));
        setInfo(data);
    };

    useEffect(() => {
        RecipeData();
    }, []);
//for favorite
const [loading, setLoading] = useState(false);
const [favorites, setFavorites] = useState([]);
const [favDoc, setFavDoc] = useState([]);
const user = auth.currentUser;

    const handleFavoriteClick = async (recipeId, recipeTitle) => {

        try {
          const favoritesRef = collection(db, `userinfo/${user.uid}/favorites`);
    
          const querySnapshot = await getDocs(favoritesRef);
          const favoriteDoc = querySnapshot.docs.find(doc => doc.data().title === recipeTitle);
          setFavDoc(favoriteDoc);
          
          if (favoriteDoc) {
            // Recipe already exists in favorites, remove it
            setLoading(true)
            await deleteDoc(doc(favoritesRef, favoriteDoc.id));
            setFavorites(favorites.filter(favorite => favorite.title !== recipeTitle));
            setLoading(false)
            toast.success('Removed from Favorites');
          } else {
            setLoading(true)
            await addDoc(favoritesRef, recipeId);
            setFavorites([...favorites, recipeTitle]);
            setLoading(false)
            toast.success('Added to Favorites');
          }
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className='max-w-[64rem] w-full flex items-center gap-[1rem] laptop:justify-center desktop:gap-[2rem] overflow-x-auto px-[1rem] laptop:px-0 pb-[1rem] scrollbar-hide scroll-smooth'>

        {
            info.map((val, id) => {
                return(
                    <div className='w-[14.5rem] h-[18.5rem] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]' key={id}>
                    <Link to={"/recipeview/" + val.id} key={id}>
                      <div className='w-[14.5rem] h-[14.5rem] rounded-t-md bg-fadeBlack flex items-center'>
                        <img src={val.image} alt='recipeimg' className='w-full h-full rounded-t-md object-cover'></img>
                      </div>
                    </Link>
  
                    <div className={`w-full h-[4rem] rounded-b-md p-[0.75rem] drop-shadow-md flex justify-between items-center bg-primary`}>
                      <div className='flex flex-col'>
                        <Link to={"/recipeview/" + val.id} key={id}>
                          <label className='text-base font-normal tablet:font-medium text-mainBlack mb-[0.125rem]'>{val.title}</label>
                        </Link>
                        <label className='text-sm font-light tablet:font-normal text-fadeBlack'>From App</label>
                      </div>
  
                      <button onClick={() => handleFavoriteClick(val, val.title)}>
                        
                        {
                          favorites.some(favorite => favorite.title === val.title) ? (
                            <FontAwesomeIcon icon={solidHeart} className='text-lime-400 text-2xl' />
                          ) : (
                            <FontAwesomeIcon icon={regularHeart} className='text-lime-400 text-2xl' />
                          )
                        }
                      </button>
  
                    </div>
                  </div>
                )
            })
        }

    </div>
  )
}