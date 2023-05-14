import React, { useEffect, useState } from 'react'
import styles from '../../style'
import { PreLoader } from '../atoms/atoms'
import { RecipeCard, Navbar, InsideFooter } from '../organisms/organisms.js'
import { SearchBarWBG } from '../molecules/molecules.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { auth, db } from '../../config/firebase'
import { collection, doc, getDocs, where, query, deleteDoc } from 'firebase/firestore'
import { faFilter, faMagnifyingGlass, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import { toast  } from 'react-toastify'





const Favorites = () => {

    const [favs, setFavs] = useState([{ map: {} }]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const user = auth.currentUser;
    //for favorite
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [favDoc, setFavDoc] = useState([]);
    //for social favorites
    const [socfav, setSocfav] = useState([]);
    const [socfavorites, setsocFavorites] = useState([]);

    //favorite for alldish,maindish,sidedish,dessert
        const fetchData = async () => {
            setLoading(true)
            let recipesQuery;

            if (category === "maindish") {
                recipesQuery = where("dishcategory", "array-contains", "maindish");
            } else if (category === "sidedish") {
                recipesQuery = where("dishcategory", "array-contains", "sidedish");
            } else if (category === "dessert") {
                recipesQuery = where("dishcategory", "array-contains", "dessert");
            } else if (category === "vegetable") {
                recipesQuery = where("dishcategory", "array-contains", "vegetable");
            } else {
                recipesQuery = "";
            }

            const favoritesRef = query(collection(doc(collection(db, 'userinfo'), user.uid), 'favorites'), recipesQuery);
            const snapshot = await getDocs(favoritesRef);
            const favoritesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFavs(favoritesList);
            setLoading(false)

        };
    //get favorite for social only
    const GetSocialFavorite = async () => {
        
        const favRef = collection(db, `userinfo/${user.uid}/socialfavorite`);
        const querySnapfav = await getDocs(favRef);
        const favDataWithId = querySnapfav.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setSocfav(favDataWithId);
      }



    useEffect(() => {
        fetchData();
        GetSocialFavorite()
    }, [db, user.uid, category]);

    const handleMainDishClick = () => {
        setCategory("maindish");
        setSocfav([])
    };
    const handleSideDishClick = () => {
        setCategory("sidedish");
    };
    const handleDessertClick = () => {
        setCategory("dessert");
    };
    const handleAppetizerClick = () => {
        setCategory("vegetable");
    };
    const handleSocialClick = () => {
        setFavs([]);
    };



  

    const handleFavoriteClick = async (event,recipeId, recipeTitle) => {
        
          const favoritesRef = collection(db, `userinfo/${user.uid}/favorites`);
    
          const querySnapshot = await getDocs(favoritesRef);
          const favoriteDoc = querySnapshot.docs.find(doc => doc.data().title === recipeTitle);
          setFavDoc(favoriteDoc);
    
          
            // Recipe already exists in favorites, remove it
            
            await deleteDoc(doc(favoritesRef, favoriteDoc.id));
            setFavorites(favorites.filter(favorite => favorite.title !== recipeTitle));
            toast.success('Removed from Favorites');

            setTimeout(() => {
                window.location.reload();
              }, 3000);
    
        }
    
    //social favorite recipe remove to favorite page
    const HandleSocialFav = async (event,SocialId,Socialtitle) => {
        
        const favoritesRef = collection(db, `userinfo/${user.uid}/socialfavorite`);
  
        const querySnapshot = await getDocs(favoritesRef);
        const favoriteDoc = querySnapshot.docs.find(doc => doc.data().title === Socialtitle);
        setFavDoc(favoriteDoc);
  
        
          // Recipe already exists in favorites, remove it
          
          await deleteDoc(doc(favoritesRef, favoriteDoc.id));
          setsocFavorites(socfavorites.filter(Social => Social.title !== Socialtitle));
          toast.success('Removed from Favorites');

          setTimeout(() => {
              window.location.reload();
            }, 3000);
  
      }
      
        console.log('social',socfav)
    return (
        <div>
            <div className={`${styles.boxWidth}`}>
                <Navbar />

                <div className={`${styles.container} mb-[2rem]`}>
                    {/* search bar and category list*/}
                    <div className='flex flex-col w-full items-center sm:items-start sm:pl-[1rem]'>
                        <div className='w-full flex justify-between items-center px-[0.5rem]'>
                            <SearchBarWBG
                                placeHolder="Search favorites"
                                bg="primary"
                            />

                            <FontAwesomeIcon icon={faHeart} className='text-secondary text-2xl' />
                        </div>

                        {/* category list */}
                        <ul className="flex gap-[1rem] my-[2rem]">
                            <li className={`text-sm font-normal tablet:font-medium ${category === "All" ? "text-secondary" : "text-fadeBlack"} cursor-pointer`} onClick={() => setCategory("All")}>
                                All
                            </li>
                            <li className={`text-sm font-normal tablet:font-medium ${category === "Main Dish" ? "text-secondary" : "text-fadeBlack"} cursor-pointer`} onClick={handleMainDishClick}>
                                Main Dish
                            </li>
                            <li className={`text-sm font-normal tablet:font-medium ${category === "Side Dish" ? "text-secondary" : "text-fadeBlack"} cursor-pointer`} onClick={handleSideDishClick}>
                                Side Dish
                            </li>
                            <li className={`text-sm font-normal tablet:font-medium ${category === "Dessert" ? "text-secondary" : "text-fadeBlack"} cursor-pointer`} onClick={handleDessertClick}>
                                Dessert
                            </li>
                            <li className={`text-sm font-normal tablet:font-medium ${category === "Vegetable" ? "text-secondary" : "text-fadeBlack"} cursor-pointer`} onClick={handleAppetizerClick}>
                                Vegetable
                            </li>
                            <li className={`text-sm font-normal tablet:font-medium   cursor-pointer text-fadeBlack`} onClick={handleSocialClick}>
                                Social
                            </li>
                        </ul>
                    </div>
                    {/* recipe grid */}
                {/* {loading ? (<PreLoader />) :
                    ( */}

                    <div className='w-full grid sm:grid-cols-3 laptop:grid-cols-4 gap-[1rem] laptop:gap-[2rem] justify-items-center mb-8'>
                        { favs.length && socfav.leght === 0 ? 

                        <><h1 className='col-span-4 text-center text-lg text-fadeBlack'>You have no favorites yet.</h1></> : <>
                        {favs.map((val, id) => (
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

                                    <button onClick={(event) => handleFavoriteClick(event,val, val.title)}>
                                            <FontAwesomeIcon icon={solidHeart} className='text-lime-400 text-2xl' />
                                        
                                    </button>
                                </div>
                            </div>
                        )
                        )}
                        {/* for social favorites display */}
                        {socfav.map((val, id) => (
                            <div className='w-[14.5rem] h-[18.5rem] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]' key={id}>
                                <Link to={'/postview/' + val.uid} key={id}>
                                    <div className='w-[14.5rem] h-[14.5rem] rounded-t-md bg-fadeBlack flex items-center'>
                                        <img src={val.imgUrls} alt='recipeimg' className='w-full h-full rounded-t-md object-cover'></img>
                                    </div>
                                </Link>

                                <div className={`w-full h-[4rem] rounded-b-md p-[0.75rem] drop-shadow-md flex justify-between items-center bg-primary`}>
                                    <div className="flex flex-row items-center gap-2">
                                            <img src={val.userPhoto} className="w-[2.2rem] h-[2.1rem] border-black rounded-full" style={{
                                            border: '1px solid green',
                                            }}></img>


                                            <div className="flex flex-col">
                                            <label className="text-base font-normal tablet:font-[700] text-mainBlack mb-[0.125rem]">
                                                {val.title}
                                            </label>
                                            <label className="w-full text-sm font-light tablet:font-normal text-fadeBlack">
                                                {val.userName}
                                            </label>
                                            </div>

                                        </div>

                                    <button onClick={(event) => HandleSocialFav(event,val, val.title)}>
                                            <FontAwesomeIcon icon={solidHeart} className='text-lime-400 text-2xl' />
                                        
                                    </button>
                                </div>
                            </div>
                        )
                        )}
                        </>}

                        
                    </div>
                   {/* )
            } */}
                </div>
                
                <InsideFooter />
            </div>
        </div>
    )
}

export default Favorites