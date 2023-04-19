import React, { useEffect, useState } from 'react'
import styles from '../../style'
import { RecipeCard, Navbar, InsideFooter } from '../organisms/organisms.js'
import { SearchBarWBG } from '../molecules/molecules.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { auth, db } from '../../config/firebase'
import { collection, doc, getDocs, where, query } from 'firebase/firestore'
import { Link } from 'react-router-dom'






const Favorites = () => {

    const [favs, setFavs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const user = auth.currentUser;


    
        const fetchData = async () => {
            let recipesQuery;
 
            if (category === "maindish") {
            recipesQuery = where("dishcategory", "array-contains", "maindish");
            } else if (category === "sidedish") {
            recipesQuery = where("dishcategory", "array-contains", "sidedish");
            } else if (category === "dessert") {
            recipesQuery = where("dishcategory", "array-contains", "dessert");
            } else if (category === "appetizer") {
            recipesQuery = where("dishcategory", "array-contains", "appetizer");
            } else {
            recipesQuery = "";
            }

            const favoritesRef = query(collection(doc(collection(db, 'userinfo'), user.uid), 'favorites'),recipesQuery);
            setLoading(true)
            
            const snapshot = await getDocs(favoritesRef);
            const favoritesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setFavs(favoritesList);
            setLoading(false)
        };
    useEffect(() => {
        fetchData();
    }, [db, user.uid,category]);

    const handleMainDishClick = () => {
        setCategory("maindish");
      };
      const handleSideDishClick = () => {
        setCategory("sidedish");
      };
      const handleDessertClick = () => {
        setCategory("dessert");
      };
      const handleAppetizerClick = () => {
        setCategory("appetizer");
      };
      
    return (
        <div>
        <div className={`${styles.boxWidth}`}>
            <Navbar />

            <div className={`${styles.container}`}>
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
            <li className={`text-sm font-normal tablet:font-medium ${category === "Appetizer" ? "text-secondary" : "text-fadeBlack"} cursor-pointer`} onClick={handleAppetizerClick}>
              Appetizer
            </li>
          </ul>
                </div>
                {/* recipe grid */}
                <div className='w-full grid sm:grid-cols-3 laptop:grid-cols-4 gap-[1rem] laptop:gap-[2rem] justify-items-center mb-8'>
                    {favs.map((val, id) => (


                        <div className='w-[14.5rem] h-[18.5rem] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]' key={id}>
                            <Link to={"/recipeview/" + val.id} key={id}>
                                <div className='w-[14.5rem] h-[14.5rem] rounded-t-md bg-fadeBlack flex items-center'>
                                    <img src={val.image} alt='recipeimg' className='w-full h-full rounded-t-md object-cover'></img>
                                </div>
                            </Link>

                            <div className={`w-full h-[4rem] rounded-b-md p-[0.75rem] drop-shadow-md flex justify-between items-center`}>
                                <div className='flex flex-col'>
                                    <Link to={"/recipeview/" + val.id} key={id}>
                                        <label className='text-base font-normal tablet:font-medium text-mainBlack mb-[0.125rem]'>{val.title}</label>
                                    </Link>
                                    <label className='text-sm font-light tablet:font-normal text-fadeBlack'>From App</label>
                                </div>

                                <button>
                                    <FontAwesomeIcon icon={faHeart} className='text-secondary text-2xl' />
                                </button>

                            </div>
                        </div>
                    )
                    )}

                    {/* <RecipeCard 
                    image="https://i.pinimg.com/236x/ed/0d/29/ed0d2931c988277eac062f30dfa99443.jpg"
                    name="Adobong Manok"
                />

                <RecipeCard 
                    image="https://i.pinimg.com/236x/6e/fd/bf/6efdbf7d16f7dc058b83b51448149e67.jpg"
                    name="Bulalo"
                />
                
                <RecipeCard 
                    image="https://i.pinimg.com/236x/ec/95/8f/ec958f900835a42319e14de1a8c46984.jpg"
                    name="Sisig"
                />

                <RecipeCard 
                    image="https://i.pinimg.com/236x/97/89/48/978948078e5a96fac679d96948d1f289.jpg"
                    name="Pinakbet"
                />

                <RecipeCard 
                    image="https://i.pinimg.com/236x/06/a7/5e/06a75e6a8a9db3a1a81df30a29f3c4c8.jpg"
                    name="Chopsuey"
                /> */}
                </div>
            </div>
            
        </div>
        <InsideFooter />
        </div>
    )
}

export default Favorites