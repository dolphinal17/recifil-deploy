import React, { useState, useEffect } from "react";
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc
  } from "firebase/firestore"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faTag } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import styles from '../../style'
import { CardPost, RecipeCard, Navbar, CardCreatePost } from '../organisms/organisms.js'
import CreatePost from '../../assets/create-post.png'
import { Link } from 'react-router-dom'
import { db } from "../../config/firebase";
import { useAuth } from "../../context/UserAuthContext";




function Post() {
    const [openModal, setOpenModal] = useState(false)

  const {currentuser} = useAuth()
  const [recipes, setRecipes] = useState([])
  const [form, setForm] = useState({
    uid: "",
    title: "",
    desc: "",
    ingredients: [],
    steps: []
  })
  

  const recipesCollectionRef = collection(db, "createpost")

  useEffect(() => {
    onSnapshot(recipesCollectionRef, snapshot => {
      setRecipes(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          viewing: false,
          ...doc.data()
        }
      }))
    })
  }, [])

  const handleView = id => {
    const recipesClone = [...recipes]

    recipesClone.forEach(recipe => {
      if (recipe.id === id) {
        recipe.viewing = !recipe.viewing
      } else {
        recipe.viewing = false
      }
    })

    setRecipes(recipesClone)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (
      !form.title ||
      !form.desc ||
      !form.ingredients ||
      !form.steps
    ) {
      alert("Please fill out all fields")
      return
    }

    addDoc(recipesCollectionRef, form)

    setForm({
      uid: currentuser.id,
      title: "",
      desc: "",
      ingredients: [],
      steps: []
    })

    setOpenModal(false)
  }

  const handleIngredient = (e, i) => {
    const ingredientsClone = [...form.ingredients]

    ingredientsClone[i] = e.target.value

    setForm({
      ...form,
      ingredients: ingredientsClone
    })
  }

  const handleStep = (e, i) => {
    const stepsClone = [...form.steps]

    stepsClone[i] = e.target.value

    setForm({
      ...form,
      steps: stepsClone
    })
  }

  const handleIngredientCount = () => {
    setForm({
      ...form,
      ingredients: [...form.ingredients, ""]
    })
  }

  const handleStepCount = () => {
    setForm({
      ...form,
      steps: [...form.steps, ""]
    })
  }

  const removeRecipe = id => {
    deleteDoc(doc(db, "createpost", id))
  }

  return (
    <div className={`${styles.boxWidth}`}>
        <Navbar />
        <div className={`${styles.container} relative mb-[2rem]`}>
            <div className='w-full flex justify-between laptop:gap-[1.25rem] desktop:gap-[2rem] relative'>
                {/* post section */}
                <div className='max-w-[47.5rem] w-full'>
                  <div className='w-full flex flex-col items-center laptop:items-start'>
                       <button onClick={() => setOpenModal(true)} className='p-[0.5rem] text-sm font-medium text-mainBlack bg-primary flex gap-[0.5rem] items-center rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-[1rem]'><img src={CreatePost} alt='post' className='w-[0.875rem]'></img>Create New</button>
                    </div>

                    {/* posts */}
                    <div className='grid grid-cols-1 gap-[0.5rem] justify-items-center'>
                        {/* <CardPost 
                            usersName="Sample Name"
                            about="This is my about"
                            recipeName="Adobo"
                            usersImage="https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg"
                            recipeImage="https://i.pinimg.com/236x/90/b7/c9/90b7c95b0112ecbcf8580e6abdffcdbe.jpg"
                        /> */}

                { recipes.map((recipe, i) => (
                  <div className='w-full max-w-[47.5rem] h-[16rem] grid sm:grid-cols-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]' key={recipe.id}>
                      <div className='col-span-1 w-full h-[16rem] bg-textFadeBlack'>
                          <img src="https://i.pinimg.com/236x/90/b7/c9/90b7c95b0112ecbcf8580e6abdffcdbe.jpg" alt='recipeimg' className='w-full h-full object-cover'></img>
                      </div>

                      <div className='col-span-1 sm:col-span-2 w-full p-[1rem]'>
                          <div className='flex flex-col gap-[1rem] relative'>
                              {/* user profile and icon */}
                              <div className='flex justify-between items-center w-full'>
                                  {/* user's profile */}
                                  <div className='flex items-center gap-[0.5rem]'>
                                      <div className='w-[3rem] h-[3rem] rounded-full'>
                                          <img src="https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg" alt='userimg' className='w-full h-full object-cover rounded-full'></img>
                                      </div>

                                      <label className='text-sm font-medium text-textMainBlack'>Sample Name</label>
                                  </div>

                                  {/* icon */}
                                  <FontAwesomeIcon icon={faHeart} className='text-secondary text-[2rem]' />
                              </div>

                              {/* about recipe and recipe name */}
                              <div className='flex flex-col gap-[0.5rem]'>
                                  <label className='text-sm font-normal text-textMainBlack'>{recipe.desc}</label>

                                  <div className='flex gap-[0.5rem] items-center'>
                                      <FontAwesomeIcon icon={faTag} className='text-secondary text-[0.75rem]'/>

                                      <label className='text-sm font-normal text-textMainBlack'>{recipe.title}</label>
                                  </div>
                              </div>

                              {/* Ingredients */}
                              <div className='flex flex-col gap-[0.5rem]'>
                                  <label className='text-sm font-medium text-textFadeBlack'>Ingredients</label>

                                  <ul className='flex flex-col gap-[0.25rem] h-[3rem] flex-wrap'>
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
                </div>
                    



                <div className='hidden laptop:block'>
                    <div className='flex justify-between px-[0.5rem] mb-[0.5rem]'>
                        <label className='text-sm font-medium text-mainBlack'>Recipes from App</label>
                        <Link to='/library'><label className='text-sm font-medium text-secondary cursor-pointer'>All</label></Link>
                    </div>

                    {/* recipes */}
                    <div className='flex flex-col gap-[0.5rem] mb-10'>
                        <RecipeCard 
                            image="https://i.pinimg.com/236x/56/b2/18/56b2183fd66c8a8d9c7eabc92b3a33f7.jpg"
                            name="Ampalaya"
                        />

                        <RecipeCard 
                            image="https://i.pinimg.com/236x/ed/0d/29/ed0d2931c988277eac062f30dfa99443.jpg"
                            name="Adobong Manok"
                        />
                    </div>
                </div>
            </div>
        </div>
    



        { openModal && <div className='min-h-screen w-full flex justify-center items-center fixed z-10 bg-textFadeBlack'>
        <div className='sm:max-w-[450px] max-h-[calc(100vh_-_4rem)] max-w-[340px] border-solid border-[1px] rounded-[5px] px-5 py-4 bg-[#FFFFFF] overflow-auto'>

            <form onSubmit={handleSubmit}>

            <div className='flex justify-between items-center'>
                <h1 className='text-[16px] font-[600] text-[#000000]'>Create new post</h1>
                <FontAwesomeIcon onClick={() => setOpenModal(false)} icon={faXmark} className='text-[16px] font-[500] text-[#949494] cursor-pointer'/>
            </div>

            <div className='pb-2 pt-5 flex justify-between items-center'>
                <input 
                    type="text" 
                    placeholder='Recipe name' 
                    className='placeholder-[#949494] text-[14px] font-[500] border-b border-[#949494] focus:outline-none ' 
                    value={form.title}
                    onChange={e => setForm({...form, title: e.target.value})}
                />

                <img src="https://cdn-icons-png.flaticon.com/512/685/685685.png" alt='recipe' className='w-[57px] h-[57px]' />
            </div>

            <div className='pt-[10px]'>
                <textarea 
                    typeof='text' 
                    placeholder='About recipe' 
                    className='p-[20px] sm:w-[400px] w-[300px] h-[150px] bg-[#F2F1F0] resize-none mb-[12px] focus:outline-none placeholder-[#949494] text-[16px] font-[500]'
                    value={form.desc}
                    onChange={e => setForm({...form, desc: e.target.value})} 
                />
            </div>

            

            <div className='sm:w-[60%] w-[80%] mt-[15px]'>
                <h1 className='text-[14px] font-[500] text-[#000000] mb-[10px]'>Ingredients:</h1>
                {/* <div className='flex flex-row items-center mb-[10px]'>
                    <div className='w-[11px] h-[11px] bg-[#B2D33D] rounded-[50%] mr-[5px]'></div>
                    <h2 className='text-[14px] font-[500] mr-[10px]'>Chicken</h2>
                    <div className='w-[11px] h-[11px] bg-[#B2D33D] rounded-[50%] mr-[5px]'></div>
                    <h2 className='text-[14px] font-[500] mr-[10px]'>Potato</h2>
                    <div className='w-[11px] h-[11px] bg-[#B2D33D] rounded-[50%] mr-[5px]'></div>
                    <h2 className='text-[14px] font-[500] mr-[10px]'>Carrots</h2>
                </div> */}
                <div className='pb-2'>
                    {
                        form.ingredients.map((ingredient, i) => (
                            <input 
                                type="text"
                                placeholder='Add ingredients'
                                className='placeholder-[#949494] text-[14px] font-[500] border-b border-[#949494] focus:outline-none mb-[15px]'
                                key={i}
                                value={ingredient} 
                                onChange={e => handleIngredient(e, i)} 
                            />
                        ))
                    }
                    <button type="button" className="text-[0.8rem] bg-[#B2D33D] text-white p-1.5 rounded-lg mb-5" onClick={handleIngredientCount}>Add ingredient</button>
                </div>
            </div>

            <div className='w-[100%]'>
                <h1 className='text-[14px] font-[500] text-[#000000] mb-[7px]'>Procedure:</h1>
                {/*<h2 className='text-[14px] font-[500] text-[#949494] mb-[10px]'>1. Combine chicken, garlic, peppercorn, vinegar, Oyster Sauce, soy sauce and water in a pot. Simmer for 15 minutes.</h2> */}
                
                <div className='pb-2'>
                {
                    form.steps.map((step, i) => (
                    <textarea 
                        type="text"
                        placeholder='Add procedure'
                        className='p-[10px] sm:w-[400px] w-[300px] h-[80px] bg-[#F2F1F0] resize-none mb-[12px] focus:outline-none placeholder-[#949494] text-[14px] font-[500]'
                        key={i}
                        value={step} 
                        onChange={e => handleStep(e, i)} />
                    ))
                }
                <button type="button" className="text-[0.8rem] bg-[#B2D33D] text-white p-1.5 rounded-lg mb-5" onClick={handleStepCount}>Add procedure</button>
                </div>

                <div className='flex justify-center'>
                    <button type="submit" className='sm:w-[400px] w-[290px] h-[54px] bg-[#B2D33D] rounded-[5px] text-[16px] font-[500] text-[#fff]'>Post</button>
                </div>
                
            </div>

            </form>


        </div>
    </div>
        }





    </div>
  )
}

export default Post


  