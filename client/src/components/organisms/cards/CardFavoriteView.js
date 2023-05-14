import React, {useState, useEffect} from 'react'
import styles from '../../../style'
import { Navbar } from '../organisms.js'
import { BtnServing, PreLoader } from '../../atoms/atoms.js'
import { SearchBarWBG } from '../../molecules/molecules.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faClock } from '@fortawesome/free-regular-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { db, auth } from '../../../config/firebase'
//for favorite button
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faFilter, faMagnifyingGlass, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { collection, query, getDocs, doc, addDoc, setDoc, getDoc, documentId, deleteDoc, where } from "firebase/firestore";



const CardFavoriteView = () => {

    const {id} = useParams();
    const [info, setInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchRecipe() {
            const docRef =  doc(collection(db, `userinfo/${user.uid}/favorites`), id);
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()){
                setInfo(docSnap.data())
                setLoading(false)
            } 
        }
        fetchRecipe();
    }, [id]);
//for favorites button
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
    
    if (loading) {
        return <PreLoader/>;
    }
    
  return (
    <div className={`${styles.boxWidth}`}>
        <Navbar />
        <div className={`${styles.container}`}>
            <div className='w-full flex flex-col laptop:flex-row min-h-[32rem] px-[0.5rem] mb-[1rem] laptop:px-0 laptop:mb-[2rem]'>
                <div className='flex flex-col justify-center bg-bgColorTwo p-[1rem] desktop:p-[2rem] gap-[1rem] rounded-t-md laptop:max-w-[48rem] laptop:justify-start laptop:rounded-tr-none laptop:rounded-l-md laptop:w-full'>
                    {/* <SearchBarWBG 
                        placeHolder="Search other recipes"
                        bg="primary"
                    /> */}

                    {/* recipe image, author, name, ratings, heart, about */}
                    <div className='flex flex-col gap-[0.5rem] sm:flex-row sm:gap-[1rem]'>
                        {/* recipe image */}
                        <img src={info.image} alt='recipeimg' className='flex-none w-[14rem] h-[14rem] object-cover border-4 border-secondary rounded-md'></img>
                    

                        {/* recipe author, name, ratings and about */}
                        <div className='flex flex-col gap-[0.5rem]'>
                            {/* recipe author, name and ratings */}
                            <div className='flex flex-col gap-[0.5rem]'>
                                {/* recipe name and author*/}
                                <div className='flex justify-between items-center'>
                                    <div className='flex flex-col gap-[0.25rem]'>
                                        <span className='text-sm font-normal laptop:font-medium text-secondary'>From App</span>
                                        <span className='text-2xl font-medium text-primary'>{info.title}</span>
                                    </div>

                                    <button onClick={() => handleFavoriteClick(info, info.title)}>

                                            {
                                                favorites.some(favorite => favorite.title === info.title) ? (
                                                <FontAwesomeIcon icon={solidHeart} className='text-lime-400 text-2xl' />
                                                ) : (
                                                <FontAwesomeIcon icon={regularHeart} className='text-lime-400 text-2xl' />
                                                )
                                            }
                                    </button>
                                </div>

                                {/* ratings */}
                                <div className='flex gap-[0.25rem] items-center'>
                                    {/* stars */}
                                    {/* <div className='flex gap-[0.125rem]'>
                                        <FontAwesomeIcon icon={faStar} className='text-secondary text-sm' />
                                        <FontAwesomeIcon icon={faStar} className='text-secondary text-sm' />
                                        <FontAwesomeIcon icon={faStar} className='text-secondary text-sm' />
                                        <FontAwesomeIcon icon={faStar} className='text-secondary text-sm' />
                                        <FontAwesomeIcon icon={faStar} className='text-secondary text-sm' />
                                    </div> */}

                                    {/* numbers */}
                                    {/* <div className='flex gap-[0.25rem]'>
                                        <span className='text-sm font-normal laptop:font-medium text-primary'>3.8</span>
                                        <span className='text-sm font-normal laptop:font-medium text-primary'>|</span>
                                        <span className='text-sm font-normal laptop:font-medium text-primary'>10</span>
                                    </div> */}
                                </div>
                            </div>

                            {/* about */}
                            <div className='flex flex-col gap-[0.25rem]'>
                                <span className='text-sm font-normal laptop:font-medium text-primary'>About</span>

                                <div className='flex-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full pr-[1rem]'>
                                <p className='text-sm font-thin laptop:font-light text-primary max-h-[6rem]'>{info.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* procedures */}
                    <div className='flex flex-col gap-[0.25rem]'>
                        <span className='text-sm font-normal laptop:font-medium text-primary'>Procedures</span>

                        {/* steps list */}
                        <div className='flex scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full pr-[1rem]'>
                            <ul className='flex flex-col gap-[0.25rem] max-h-[8.5rem]'>
                                {
                                    info.steps.map((steps, i) => (
                                        <li className='text-sm font-thin laptop:font-light text-primary flex flex-col gap-[0.125rem]' key={i}>{steps}</li>
                                    ))
                                }
                            </ul>
                        </div>                        
                    </div>
                </div>
                
                {/* side ingredients and others */}
                <div className='flex flex-col justify-center bg-primary py-[1rem] px-[1rem] laptop:max-w-[16rem] laptop:justify-start rounded-b-md laptop:rounded-bl-none laptop:rounded-r-md laptop:w-full'>
                    <div className='flex flex-col justify-between laptop:h-full'>
                        {/* estimated time and ingredients */}
                        <div className='flex flex-col gap-[0.25rem] laptop:gap-[0.5rem] '>
                            {/* estimated time */}
                            <div className='flex justify-center items-center gap-[0.25rem] laptop:gap-[0.25rem] laptop:flex-col desktop:flex-row desktop:gap-[0.5rem]'>
                                <div className='flex gap-[0.125rem] laptop:gap-[0.25rem] items-center'>
                                    <FontAwesomeIcon icon={faClock} className='text-fadeBlack text-sm' />

                                    <span className='text-sm font-light laptop:font-normal text-fadeBlack'>Estimated Time</span>
                                </div>

                                {/* time */}
                                <span className='text-sm font-light laptop:font-normal text-mainBlack'>40 minutes</span>
                            </div>

                            {/* ingredients, servings, integral and not integral */}
                            <div className='flex flex-col gap-[0.25rem] laptop:gap-[0.5rem]'>
                                <span className='text-sm font-normal laptop:font-medium text-mainBlack'>Ingredients</span>

                                <div className='flex flex-col gap-[0.5rem] laptop:gap-[1rem]'>
                                    {/* servings */}
                                    {/* <div className='flex gap-[0.25rem] desktop:gap-[0.5rem]'>
                                        <BtnServing
                                            val="1 serving" 
                                        />

                                        <BtnServing
                                            val="3 servings" 
                                        />

                                        <BtnServing
                                            val="5 servings" 
                                        />
                                    </div> */}

                                    {/* integral ingredients */}
                                    <div className='flex flex-col gap-[0.25rem] laptop:gap-[0.5rem]'>
                                        {/* title */}
                                        {/* <div className='flex justify-start gap-[0.25rem]'>
                                            <span className='text-sm font-light laptop:font-normal text-mainBlack'>Integral Ingredients</span>

                                            <FontAwesomeIcon icon={faCircleInfo} className='text-secondary/60 text-[0.5rem]' />
                                        </div> */}

                                        {/* ingredients */}
                                        <ul className='flex flex-col gap-[0.125rem] laptop:gap-[0.25rem]'>
                                            {
                                                info.ingredients.map((ingredients, i) => (
                                                    <li className='text-sm font-thin laptop:font-light text-mainBlack' key={i}>{ingredients}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                    {/* not integral ingredients */}
                                    {/* <div className='flex flex-col gap-[0.25rem] laptop:gap-[0.5rem]'> */}
                                        {/* title */}
                                        {/* <div className='flex justify-start gap-[0.25rem]'>
                                            <span className='text-sm font-light laptop:font-normal text-mainBlack'>Not Integral Ingredients</span>

                                            <FontAwesomeIcon icon={faCircleInfo} className='text-secondary/60 text-[0.5rem]' />
                                        </div> */}

                                        {/* ingredients */}
                                        {/* <ul className='flex flex-col gap-[0.125rem] laptop:gap-[0.25rem]'>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Red Onion</li>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Petchay</li>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Corn</li>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Riped Banana</li>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Sitaw</li>
                                        </ul> */}
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>

                        <Link to={ '/recipepro/' + id } key={id}><button className='w-full p-3 flex justify-center items-center mt-[1rem] bg-gradient-to-r from-[#B2D33D] to-[#59981A] text-primary text-sm font-normal laptop:font-medium py-[0.5rem] rounded-sm laptop:rounded-md laptop:mt-auto'>Try Now</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardFavoriteView;

