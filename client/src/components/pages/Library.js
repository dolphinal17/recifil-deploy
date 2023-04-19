import React, { useState, useEffect } from "react";
import styles from "../../style";
import { RecipeCard, Navbar, InsideFooter } from "../organisms/organisms.js";
import { SearchBarWBG } from "../molecules/molecules.js";
import { auth, db } from "../../config/firebase";
import { collection, query, getDocs, doc, addDoc, setDoc, getDoc, documentId, deleteDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { PreLoader } from "../atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";





const Library = () => {
  //for recipe filtering
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [document, setDocument] = useState("");
  // const { id } = useParams ();
  const [favorites, setFavorites] = useState([]);
  const [favDoc, setFavDoc] = useState([]);
  const user = auth.currentUser;



  // useEffect(() => {
  //   setLoading(true)
  //   axios
  //     .get(`/library/alldish/${category}`)
  //     .then((response) => {
  //       // setInfo(response.data); // This will log the recipes array to the console
  //       const recipes = response.data;
  //       const recipeDataWithId = recipes.map((recipe) => {
  //         return { ...recipe, document: recipe.id };
  //       });
  //       setInfo(recipeDataWithId);
        
  //       setLoading(false)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false)
  //     });
  // }, [category]);

  const fetchRecipes = async () => {
    setLoading(true)

    const recipesRef = query(collection(db, 'recipes'));

    const querySnapshot = await getDocs(recipesRef);
    const recipeDataWithId = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    setInfo(recipeDataWithId);
    setLoading(false)
    
  }

  useEffect(() => {
    fetchRecipes();
  }, [category])

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
    <div className={`${styles.boxWidth}`}>
      <Navbar />

      <div className={`${styles.container}`}>
        {/* search bar and category list*/}
        <div className="flex flex-col w-full items-center sm:items-start sm:ml-[1rem]">
          <SearchBarWBG placeHolder="Search recipes" bg="primary" />

          {/* category list */}
          <ul className="flex gap-[1rem] my-[2rem]">
            <li className={`text-sm font-normal tablet:font-medium ${category === "All" ? "text-secondary" : "text-fadeBlack"} cursor-pointer`} onClick={() => setCategory("")}>
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
        {loading ? (<PreLoader />) :
          (
            <div className="w-full grid sm:grid-cols-3 laptop:grid-cols-4 gap-[1rem] laptop:gap-[2rem] justify-items-center mb-10">
              {info.map((val, id) => (


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
              )}
            </div>
          )}
      </div>
      <InsideFooter />
    </div>
  );
};

export default Library;
