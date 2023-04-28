import React, { useState, useEffect } from 'react'
import { FavoriteCard } from '../organisms'
import { collection, query, getDocs, limit, doc } from 'firebase/firestore'
import { db, auth } from '../../../config/firebase';
import { Link } from 'react-router-dom';

export default function CarouselFavorite() {

    const user = auth.currentUser;
    const [info , setInfo] = useState([]);

    const RecipeData = async () => {
        const q  = query(collection(doc(collection(db, 'userinfo'), user.uid), 'favorites'),limit(4));

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

    if (info.length == 0){
        return null;
    }

  return (
    <div>
        <div className='w-full flex justify-between items-center px-[1rem] mb-[0.5rem] tablet:mb-[1rem] laptop:px-0'>
                <span className='text-base laptop:text-2xl font-normal laptop:font-[600] text-mainBlack'>Recently Favorite Recipes</span>

                <Link to='/favorites'><span className='text-sm laptop:text-base font-normal laptop:font-medium text-secondary'>Explore More</span></Link>
        </div>
            <div className='max-w-[64rem] w-full flex items-center gap-[1rem] laptop:justify-start  desktop:gap-[2rem] overflow-x-auto px-[1rem] laptop:px-0 pb-[1rem] scrollbar-hide scroll-smooth'>

                {
                    info.map((val, id) => {
                        return(
                        <Link to={"/favorites/"+val.id}>    
                        <FavoriteCard
                            key={val.id}
                            image={val.image}
                            name={val.title}
                        />
                        </Link>
                        )
                    })
                }

            </div>
    </div>
  )
}