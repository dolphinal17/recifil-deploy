import React, { useState, useEffect } from 'react'
import { RecipeCard } from '../organisms'
import { collection, query, getDocs, limit } from 'firebase/firestore'
import { db } from '../../../config/firebase';
import { Link } from 'react-router-dom';

export default function CarouselRecipe() {

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

  return (
    <div className='max-w-[64rem] w-full flex items-center gap-[1rem] laptop:justify-center desktop:gap-[2rem] overflow-x-auto px-[1rem] laptop:px-0 pb-[2rem] scrollbar-hide scroll-smooth'>

        {
            info.map((val, id) => {
                return(
                <Link to={"/recipeview/"+val.id}>    
                <RecipeCard
                    key={val.id}
                    image={val.image}
                    name={val.title}
                />
                </Link>
                )
            })
        }

    </div>
  )
}