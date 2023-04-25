import React, { useState, useEffect } from 'react'
import { SocialCard } from '../organisms'
import { collection, query, getDocs, limit, doc } from 'firebase/firestore'
import { db, auth } from '../../../config/firebase';
import { Link } from 'react-router-dom';

export default function CarouselSocial() {

    const user = auth.currentUser;
    const [info , setInfo] = useState([]);

    const RecipeData = async () => {
        const q  = query(collection(db, "approvepost"), limit(4));

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

    if (info.length < 4){
        return null;
    }

  return (
    <div>
        <div className='w-full flex justify-between items-center px-[1rem] laptop:px-0'>
                <span className='text-base laptop:text-2xl font-normal laptop:font-medium text-mainBlack'>Post Your Own Recipes</span>

                <Link to='/socials'><span className='text-sm laptop:text-base font-normal laptop:font-medium text-secondary'>View More</span></Link>
        </div>
            <div className='max-w-[64rem] w-full flex items-center gap-[1rem] laptop:justify-center desktop:gap-[2rem] overflow-x-auto px-[1rem] laptop:px-0 pb-[1rem] scrollbar-hide scroll-smooth'>

                {
                    info.map((val, id) => {
                        return(
                        <Link to={"/postview/"+val.id}>    
                        <SocialCard 
                            key={val.id}
                            image={val.imgUrls}
                            name={val.title}
                            author= {val.userName}
                        />
                        </Link>
                        )
                    })
                }

            </div>
    </div>
  )
}