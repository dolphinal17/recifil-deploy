import React, { useEffect, useState } from 'react'
import SearchBarWBG from '../../molecules/SearchBarWBG'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'



export default function TableRecipes() {

    const [userRecipes, setUserRecipes] = useState([])

    const fetchRecipes = async () => {

        const reciperef = collection(db, 'recipes')
        const snapshot = await getDocs(reciperef)
        const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setUserRecipes(recipes)
    }

    const handleDeleteRecipe = async (recipeId) => {
        try {
          const docRef = doc(db, 'recipes', recipeId);
          await deleteDoc(docRef);
          toast.success('Recipe Deleted');
          fetchRecipes()
        } catch (error) {
          console.error('Error deleting recipe: ', error);
        }
      };

      

    useEffect(() => {
        fetchRecipes()
    }, [])

    return (
        <div className='w-full flex justify-center bg-bgColor'>
            <div className='max-w-[80rem] w-full bg-primary rounded-xl overflow-auto pb-[2rem]'>
                {/* name and search bar */}
                <div className='flex justify-between items-center px-[1rem] tablet:px-[2rem] my-[0.5rem] tablet:my-[1rem]'>
                    <span className='text-base tablet:text-xl font-normal tablet:font-medium text-mainBlack'>Recipes</span>

                    <Link to='/addrecipes'><button className='w-[9rem] bg-[#84cc16] text-white p-2 rounded-lg'>Add a New Recipe</button></Link>

                    <SearchBarWBG
                        placeHolder="Search recipes"
                        bg="bgColor"
                    />
                </div>

                <div className='w-full h-[34.4rem] overflow-y-scroll'>
                    <table className='border-collapse table-fixed w-full text-sm'>
                        <thead>
                            <tr className='bg-bgColorTwo text-primary'>
                                <th className='font-normal tablet:font-medium p-4 pl-8 text-center'>ID</th>
                                <th className='font-normal tablet:font-medium p-4 text-center'>Image</th>
                                <th className='font-normal tablet:font-medium p-4 text-center'>Name</th>
                                <th className='font-normal tablet:font-medium p-4 text-center'>Desc</th>
                                <th className='font-normal tablet:font-medium p-4 text-center'>Ingredients</th>
                                <th className='font-normal tablet:font-medium p-4 text-center'>Steps</th>
                                <th className='font-normal tablet:font-medium p-4 text-center'>Action</th>
                            </tr>
                        </thead>

                        {userRecipes.map((recipe, index) => (



                            <tbody className='bg-primary'>
                                <tr>
                                    <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 pl-8 text-center'>{index + 1}</td>
                                    <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 text-center text-ellipsis overflow-hidden'><img src={recipe.image} /></td>
                                    <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 text-center'>{recipe.title}</td>
                                    <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 text-center' style={{maxWidth: "140px", maxHeight: "3em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{recipe.desc}</td>
                                    <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 text-center' >{recipe.ingredients.map((ingredient, index) => (
                                        <div key={index}>{ingredient}</div>
                                    ))}</td>
                                    <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 text-center' style={{maxWidth: "140px", maxHeight: "3em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{recipe.steps.map((step, index) => (
                                        <div key={index}>{step}</div>
                                    ))}</td>
                                    <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 pl-8 text-center'>
                                        <Link to={'/editrecipes/' + recipe.id}><FontAwesomeIcon icon={faPencil} className='w-[1.2rem] h-[1.2rem] mr-2 p-3 text-white rounded-md bg-[#84cc16] cursor-pointer'/></Link>
                                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteRecipe(recipe.id)} className='w-[1.2rem] h-[1.2rem] p-3 text-white rounded-md bg-red-600 cursor-pointer'/>
                                    </td>
                                </tr>
                            </tbody>

                        ))}

                    </table>
                </div>
            </div>
        </div>
    )
}
