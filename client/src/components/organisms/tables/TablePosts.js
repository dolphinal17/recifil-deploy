import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../config/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';



export default function TablePosts() {

    const [posts, setPosts] = useState([])

    const fetchRecipes = async () => {
        const recipesCollectionRef = query(collection(db, "createpost"));
        
        const snapshot = await getDocs(recipesCollectionRef);
        const recipes = snapshot.docs.map((doc) => ({
          id: doc.id,
          viewing: false,
          ...doc.data(),
        }));
        setPosts(recipes);
      };

      useEffect(() => {
        fetchRecipes();
      }, []);
    

  return (
    <div className='flex flex-col'>
        <h1 className='text-black text-[2rem] ml-9 mt-10 font-[500]'>Posts</h1>
        { posts.map((recipe, i) => (
              <div className='w-full max-w-[47.5rem] h-auto sm:h-[17rem] grid sm:grid-cols-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-10 ml-9' key={i}>
                  <div className='col-span-1 w-full h-[17rem] bg-textFadeBlack'>
                      <img src={recipe.imgUrls} alt='recipeimg' className='w-full h-full object-cover'></img>
                  </div>

                  <div className='col-span-1 sm:col-span-2 w-full p-[1rem] overflow-y-scroll'>
                      <div className='flex flex-col gap-[1rem] relative'>
                          {/* user profile and icon */}
                          <div className='flex justify-between items-center w-full'>
                              {/* user's profile */}
                              <div className='flex items-center gap-[0.5rem]'>
                                  <div className='w-[3rem] h-[3rem] rounded-full'>
                                      <img src={recipe.userPhoto} alt='userimg' className='w-full h-full object-cover rounded-full'></img>
                                  </div>

                                  <label className='text-sm font-medium text-textMainBlack'>{recipe.userName}</label>
                              </div>

                              {/* icon */}
                              <FontAwesomeIcon icon={faHeart} className='text-secondary text-[2rem]' />
                          </div>

                          {/* about recipe and recipe name */}
                          <div className='flex flex-col gap-[0.5rem]'>
                            <div className='flex gap-[0.5rem] items-center'>
                                <FontAwesomeIcon icon={faTag} className='text-secondary text-[0.75rem]'/>

                                <label className='text-md font-[700] text-textMainBlack'>{recipe.title}</label>
                            </div>

                              <label className='text-sm font-normal text-textMainBlack'>{recipe.desc}</label>
                          </div>

                          {/* Ingredients */}
                          <div className='flex flex-col gap-[0.5rem]'>
                              <label className='text-sm font-medium text-textFadeBlack'>Ingredients</label>

                              <ul className='flex flex-col gap-[0.25rem] h-auto sm:h-[3rem] flex-wrap'>
                              { recipe.ingredients.map((ingredient, i) => (
                                  <li className='text-sm font-normal text-textMainBlack' key={i}>{ingredient}</li>
                              ))}
                              </ul>
                          </div>  

                          {/* comments */}
                          {/* <button className='p-[0.375rem] flex items-center text-sm font-normal text-textFadeBlack absolute bottom-0 right-0 border-solid border-2 border-[#EDEDED] rounded-md'><FontAwesomeIcon icon={faComment} className='text-secondary text-sm mr-[0.25rem]'/>3 comments</button>     */}
                      </div>
                  </div>
              </div>
              ))}
    </div>
  )
}
