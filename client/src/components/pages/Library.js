import React, { useState, useEffect } from "react";
import styles from "../../style";
import { RecipeCard, Navbar, InsideFooter } from "../organisms/organisms.js";
import { SearchBarWBG } from "../molecules/molecules.js";
import { auth, db } from "../../config/firebase";
import { collection, query, getDocs, doc, addDoc, setDoc, getDoc, documentId, deleteDoc, where, orderBy, limit } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { PreLoader } from "../atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faFilter, faMagnifyingGlass, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";







const Library = () => {
  //for recipe filtering
  const [info, setInfo] = useState([]);
  const [favinfo, setfavInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [document, setDocument] = useState("");
  // const { id } = useParams ();
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favDoc, setFavDoc] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [matchingRecipes, setMatchingRecipes] = useState([]);
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
    const recipesRef = query(collection(db, 'recipes'), recipesQuery);
    const querySnapshot = await getDocs(recipesRef);
    const recipeDataWithId = querySnapshot.docs.map(doc => 
      ({ id: doc.id, title: doc.data().title,image: doc.data().image}))
    setInfo(recipeDataWithId);
    setLoading(false)

  }

  // useEffect(() => {
  //   async function fetchSearchResults() {
  //     const q = query(collection(db, 'recipes'), where('title', '>=', searchTerm));
  //     const querySnapshot = await getDocs(q);
  //     const results = [];
  //     querySnapshot.forEach((doc) => {
  //       results.push({ id: doc.id, ...doc.data() });
  //     });
  //     setSearchResults(results);
  //   }

  //   fetchSearchResults();
  // }, [searchTerm]);

  // function handleSearch(e) {
  //   setSearchTerm(e.target.value)
  // }

  useEffect(() => {
    fetchRecipes();
  }, [category])


  const handleAllDishClick = () => {
    setCategory("");
    window.location.reload();
  };

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
    setCategory("vegetable");
  };

  const getfav = async () => {
    const favRef = collection(db, `userinfo/${user.uid}/favorites`);
    const querySnapfav = await getDocs(favRef);
    const favDataWithId = querySnapfav.docs.map(doc => ({ id: doc.id, ...doc.data()}))
    setfavInfo(favDataWithId);

  }
  useEffect(() => {
    getfav();
  }, [category])

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

        window.location.reload()
        setLoading(false)
        toast.success('Removed from Favorites');
      } else {
        setLoading(true)
        await addDoc(favoritesRef, recipeId, { id: recipeId, title: recipeTitle });
        setFavorites([...favorites, recipeTitle, { id: recipeId, title: recipeTitle }]);

        window.location.reload()
        setLoading(false)
        toast.success('Added to Favorites');

      }
    } catch (error) {
      console.log(error);
    }
  };




  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = async () => {
    const recipesRef = collection(db, 'recipes');
    const q = query(
      recipesRef,
      where('tags', 'array-contains', searchQuery),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    const matchingRecipes = querySnapshot.docs.map((doc) => ({id: doc.data().id, title: doc.data().title, image: doc.data().image}) );
    setMatchingRecipes(matchingRecipes);
  };

console.log("fetch",info)
  return (
    <div className={`${styles.boxWidth}`}>
      <Navbar />

      <div className={`${styles.container}`}>
        {/* search bar and category list*/}
        <div className="flex flex-col w-full items-center sm:items-start sm:ml-[1rem]">

          {/* search bar */}
          <div className={`py-[0.5rem] px-[1rem] max-w-[22rem] w-full bg-white rounded-full flex flex-row justify-center items-center`}>

            <input className='bg-transparent focus:outline-none text-sm w-full font-light tablet:font-normal' onChange={handleSearchInputChange} ></input>

            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearchButtonClick} className='text-fadeText text-sm mr-[0.5rem cursor-pointer hover:text-[#84cc16]' />

          </div>

          {/* category list */}
          <ul className="flex gap-[1rem] my-[2rem]">
            <li className={`text-sm font-normal tablet:font-medium ${category === "" ? "text-secondary" : "text-fadeBlack"} cursor-pointer`} onClick={handleAllDishClick}>
              All
            </li>
            <li className={`text-sm font-normal tablet:font-medium ${category === "maindish" ? "text-secondary" : "text-fadeBlack"} cursor-pointer`} onClick={handleMainDishClick}>
              Main Dish
            </li>
            <li className={`text-sm font-normal tablet:font-medium ${category === "sidedish" ? "text-secondary" : "text-fadeBlack"} cursor-pointer`} onClick={handleSideDishClick}>
              Side Dish
            </li>
            <li className={`text-sm font-normal tablet:font-medium ${category === "dessert" ? "text-secondary" : "text-fadeBlack"} cursor-pointer`} onClick={handleDessertClick}>
              Dessert
            </li>
            <li className={`text-sm font-normal tablet:font-medium ${category === "vegetable" ? "text-secondary" : "text-fadeBlack"} cursor-pointer`} onClick={handleAppetizerClick}>
              Vegetable
            </li>
          </ul>
        </div>
        {/* recipe grid */}
        {loading ? (<PreLoader />) :
          (
            <div className="w-full grid sm:grid-cols-3 laptop:grid-cols-4 gap-[1rem] laptop:gap-[2rem] justify-items-center mb-10">

              {matchingRecipes.length > 0 ? <>
                {matchingRecipes.map((val, id) => (
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
                          favinfo.some(favinfo => favinfo.title === val.title) ? (
                            <FontAwesomeIcon icon={solidHeart} className='text-lime-400 text-2xl' />
                          ) : (
                            <FontAwesomeIcon icon={regularHeart} className='text-lime-400 text-2xl' />
                          )
                        }
                      </button>

                    </div>
                  </div>
                ))}
              </> : <>
                {
                  info.map((val, id) => (
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
                            favinfo.some(favinfo => favinfo.title === val.title) ? (
                              <FontAwesomeIcon icon={solidHeart} className='text-lime-400 text-2xl' />
                            ) : (
                              <FontAwesomeIcon icon={regularHeart} className='text-lime-400 text-2xl' />
                            )
                          }
                        </button>

                      </div>
                    </div>
                  )
                  )
                }
              </>
              }



            </div>
          )}
      </div>
      <InsideFooter />
    </div>
  );
};

export default Library;
