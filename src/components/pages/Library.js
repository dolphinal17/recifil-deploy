import React, {useState, useEffect} from 'react'
import styles from '../../style'
import { RecipeCard, Navbar } from '../organisms/organisms.js'
import { SearchBarWBG } from '../molecules/molecules.js'
import { db } from '../../config/firebase'
import { collection, query, getDocs } from 'firebase/firestore'

const Library = () => {


    const [info , setInfo] = useState([]);

    const RecipeData = async () => {
        const q = query(collection(db, "recipes"));

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
    <div className={`${styles.boxWidth}`}>
        <Navbar />

        <div className={`${styles.container}`}>
            {/* search bar and category list*/}
            <div className='flex flex-col w-full items-center sm:items-start sm:ml-[1rem]'>
                <SearchBarWBG 
                placeHolder="Search recipes"
                bg="primary" 
                />

                {/* category list */}
                <ul className='flex gap-[1rem] my-[2rem]'>
                    <li className='text-sm font-normal tablet:font-medium text-secondary cursor-pointer'>All</li>
                    <li className='text-sm font-normal tablet:font-medium text-fadeBlack cursor-pointer'>Main Dish</li>
                    <li className='text-sm font-normal tablet:font-medium text-fadeBlack cursor-pointer'>Side Dish</li>
                    <li className='text-sm font-normal tablet:font-medium text-fadeBlack cursor-pointer'>Dessert</li>
                    <li className='text-sm font-normal tablet:font-medium text-fadeBlack cursor-pointer'>Appetizer</li>
                </ul>
            </div>
            {/* recipe grid */}
            <div className='w-full grid sm:grid-cols-3 laptop:grid-cols-4 gap-[1rem] laptop:gap-[2rem] justify-items-center'>

            {
                    info.map((val, id) => {
                        return(
                        <RecipeCard 
                            image={val.image}
                            name={val.title}
                        />
                        )
                    })
                }

               
            </div>
        </div>
    </div>
  )
}

export default Library