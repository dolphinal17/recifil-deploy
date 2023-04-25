import React from 'react';
import styles from '../../style';
import { Navbar, DiscImgWText, CarouselRecipe, InsideFooter, CarouselFavorite,CarouselSocial } from '../organisms/organisms.js'
import { Link } from 'react-router-dom';




const Discover = () => {

  // const [info , setInfo] = useState([]);

  //   const RecipeData = async () => {
  //       const q = query(collection(db, "recipes"), limit(4));

  //       const querySnapshot = await getDocs(q);
  //       const data = querySnapshot.docs.map((doc) => ({
  //           ...doc.data(),
  //           id:doc.id,
  //       }));
  //       setInfo(data);
  //   };

  //   useEffect(() => {
  //       RecipeData();
  //   }, []);

  return (
    <div>
      <div className={`${styles.boxWidth}`}>
        <Navbar/>

        <div className={`${styles.container}`}>
          <DiscImgWText/>

          <div className='w-full flex flex-col gap-[0.5rem] my-10'>
            {/* header */}
            <div className='w-full flex justify-between items-center px-[1rem] laptop:px-0'>
              <span className='text-base laptop:text-2xl font-normal laptop:font-medium text-mainBlack'>Famous Filipino Recipes</span>

              <Link to='/library'><span className='text-sm laptop:text-base font-normal laptop:font-medium text-secondary'>Explore More</span></Link>
            </div>

            {/* recipes */}
            {/* <div className='w-full flex flex-wrap gap-[0.5rem] tablet:gap-[2rem] justify-center'>
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
            </div> */}
            <CarouselRecipe />
            
            <CarouselFavorite />
            
            <CarouselSocial />
          </div>
          
          {/* <div className='w-full tablet:px-[0.5rem] laptop:px-0 grid sm:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-[1rem] laptop:gap-[2rem] justify-items-center'> 
            
          </div>   */}
          <InsideFooter />
        </div>
      </div>
    </div>
  )
}

export default Discover;