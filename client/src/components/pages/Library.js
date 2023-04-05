import React, { useState, useEffect } from "react";
import styles from "../../style";
import { RecipeCard, Navbar } from "../organisms/organisms.js";
import { SearchBarWBG } from "../molecules/molecules.js";
import { db } from "../../config/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import axios from "axios";
import { PreLoader } from "../atoms/atoms";



const Library = () => {
  //for recipe filtering
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    setLoading(true)
    axios
      .get(`/library/alldish/${category}`)
      .then((response) => {
        setInfo(response.data); // This will log the recipes array to the console
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  }, [category]);

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
        {loading ? ( <PreLoader/> ) :
        (
        <div className="w-full grid sm:grid-cols-3 laptop:grid-cols-4 gap-[1rem] laptop:gap-[2rem] justify-items-center mb-10">
           {info.map((val, id) => {
            return (
              
              <Link to={"/recipeview/" + val.id} key={id}>
                <RecipeCard image={val.image} name={val.title} />
              </Link>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
};

export default Library;
