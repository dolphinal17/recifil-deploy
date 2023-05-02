import React, { useEffect, useState } from 'react'
import styles from '../../style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faBasketShopping, faGear, faTag, faTrash, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import CreatePost from '../../assets/create-post.png'
import { CardCreatePost, CardPost, InsideFooter, Navbar } from '../organisms/organisms.js'
import { ModalDeletePost } from '../molecules/molecules.js'
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/UserAuthContext';
import { auth, db } from '../../config/firebase';
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';






const Profile = () => {

    const { currentuser } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    const [posts, setPosts] = useState([])
    const [openModalDelete, setOpenModalDelete] = useState(false)


    const fetchRecipes = async () => {
        const recipesCollectionRef = query(collection(db, "approvepost"), where("userRef", "==", auth.currentUser.uid));

        const snapshot = await getDocs(recipesCollectionRef);
        const recipes = snapshot.docs.map((doc) => ({
            uid: doc.id,
            viewing: false,
            ...doc.data(),
        }));
        setPosts(recipes);
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    async function handleDeletePost(uid) {
        try {
          const postRef = doc(db, "approvepost", uid);
          await deleteDoc(postRef);
          setOpenModalDelete(false)
          toast.success("Post deleted successfully.");
          fetchRecipes()
        } catch (error) {
          console.error("Error deleting post: ", error);
        }
    }

    return (
        <div>
            <div className={`${styles.boxWidth}`}>
                <Navbar />
                <CardCreatePost open={openModal} onClose={() => setOpenModal(false)} />
                
                <div className={`${styles.container}`}>
                    <div className='w-full flex flex-col laptop:flex-row gap-[1rem] laptop:gap-[2rem]'>
                        {/* user's profile */}
                        <div className='flex flex-col sm:flex-row laptop:flex-col p-[1rem] w-full laptop:max-w-[14.5rem] gap-[0.5rem] sm:gap-[1rem] laptop:gap-[0.5rem] bg-bgColorTwo rounded-t-md'>
                            {/* picture */}
                            <div className='max-w-[12.5rem] w-full h-[12.5rem]'>
                                <img src={currentuser?.photoURL || "https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2Fdefault.jpg?alt=media&token=86cea402-148b-4303-bcec-3fba92f3a7b5"} alt='profileimg' className='w-full h-full object-cover border-2 border-secondary'></img>
                            </div>

                            {/* name, total posts, and option list */}
                            <div className='flex flex-col gap-[2rem] sm:gap-[1rem] laptop:gap-[2rem] w-full'>
                                {/* name, and total posts */}
                                <div className='flex flex-col gap-[0.125rem] tablet:gap-[0.25rem]'>
                                    {/* name */}
                                    <div className='flex justify-between items-start'>
                                        <span className='text-base font-normal tablet:font-medium text-primary'>{currentuser?.displayName}</span>

                                        <Link to='/editprofile'><FontAwesomeIcon icon={faPenToSquare} className='text-primary text-xs' /></Link>
                                    </div>

                                    {/* total posts */}

                                    <span className='text-sm font-light tablet:font-normal text-fadeBlack'>{posts.length} total posts</span>

                                </div>

                                {/* option list */}
                                <ul className='flex flex-col gap-[0.5rem] laptop:gap-[1rem]'>
                                    <Link to='/editprofile'><li className='flex items-center gap-[0.25rem] tablet:gap-[0.5rem] text-sm font-normal tablet:font-medium text-primary cursor-pointer hover:text-secondary duration-200'><FontAwesomeIcon icon={faPenToSquare} className='text-secondary text-sm' />Edit Profile</li></Link>
                                    <Link to='/favorites'><li className='flex items-center gap-[0.25rem] tablet:gap-[0.5rem] text-sm font-normal tablet:font-medium text-primary cursor-pointer hover:text-secondary duration-200'><FontAwesomeIcon icon={faHeart} className='text-secondary text-sm' />Favorites</li></Link>
                                    <Link to='/basket'><li className='flex items-center gap-[0.25rem] tablet:gap-[0.5rem] text-sm font-normal tablet:font-medium text-primary cursor-pointer hover:text-secondary duration-200'><FontAwesomeIcon icon={faBasketShopping} className='text-secondary text-sm' />Basket</li></Link>
                                    <li className='flex items-center gap-[0.25rem] tablet:gap-[0.5rem] text-sm font-normal tablet:font-medium text-primary cursor-pointer hover:text-secondary duration-200'><FontAwesomeIcon icon={faGear} className='text-secondary text-sm' />Settings</li>
                                </ul>
                            </div>
                        </div>

                        {/* post section */}
                        <div className='w-full'>
                            {/* heading text*/}
                            <div className='flex justify-between items-center px-[1rem] laptop:px-0'>
                                <span className='text-sm font-normal tablet:font-medium text-mainBlack'>All Post</span>


                                {/* <button onClick={() => setOpenModal(true)} className='p-[0.5rem] text-sm font-medium text-mainBlack bg-primary flex gap-[0.5rem] items-center rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-[1rem]'><img src={CreatePost} alt='post' className='w-[0.875rem]'></img>Create New</button> */}
                            </div>

                            {/* posts */}
                            <div className='w-full laptop:max-w-[47.5] mt-[1rem] flex flex-col gap-[0.5rem] tablet:gap-[1rem]'>
                                {/* <CardPost
                            usersImage="https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg"
                            usersName="Sample Name"
                            about="This is caption about recipe"
                            recipeImage="https://i.pinimg.com/564x/50/c0/aa/50c0aab58bbef19df1c3efd11f38d694.jpg"
                            recipeName="Kare-Kare"
                        /> */}

                            {posts.length === 0 ? 
                                <><h1 className='text-gray-600 mx-auto mt-4'>You have not posted yet.</h1> </>
                            : <>
                                {posts.map((recipe, i) => (
                                    <div className='w-full max-w-[47.5rem] h-auto sm:h-[17rem] grid sm:grid-cols-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]' key={recipe.id}>
                                        <ModalDeletePost onOpen={openModalDelete} onClose={() => setOpenModalDelete(false)} onClick={() => handleDeletePost(recipe.uid)}/>
                                        <div className='col-span-1 w-full h-[17rem] bg-textFadeBlack'>
                                            <img src={recipe.imgUrls} alt='recipeimg' className='w-full h-full object-cover'></img>
                                        </div>

                                        <div className='col-span-1 sm:col-span-2 w-full pt-[1rem] px-[1rem] bg-primary h-auto sm:h-[17rem] relative'>
                                            <div className='flex flex-col gap-[1rem] relative'>
                                                {/* user profile and icon */}
                                                <div className='flex justify-between items-center w-full'>
                                                    {/* user's profile */}
                                                    <div className='flex items-center gap-[0.5rem]'>
                                                        <div className='w-[3rem] h-[3rem] rounded-full'>
                                                            <img src={recipe.userPhoto} alt='userimg' className='w-full h-full object-cover rounded-full'></img>
                                                        </div>

                                                        <label className='text-base tablet:text-lg font-medium text-textMainBlack'>{recipe.userName}</label>
                                                    </div>

                                                    <FontAwesomeIcon 
                                                        type='button' 
                                                        onClick={() => setOpenModalDelete(true)} 
                                                        icon={faTrash} 
                                                        className='text-base tablet:text-lg text-fadeBlack hover:text-red-600' 
                                                    />
                                                    {/* <div className='flex flex-col'>
                                                        <Link to={'/postview/' + recipe.uid} key={i}>
                                                            <button className='bg-[#84cc16] text-white p-2 rounded-md mb-2'>View More</button>
                                                        </Link>

                                                        <button
                                                        className='bg-red-600 text-white p-2 rounded-md mb-2'
                                                        key={i}
                                                        onClick={() => handleDeletePost(recipe.uid)}
                                                        >Delete</button>
                                                    </div> */}
                                                </div>
                                                
                                                {/* about and ingredients */}
                                                <div className="w-full h-[10rem] tablet:h-[9rem] flex flex-col gap-[0.5rem] overflow-y-auto scroll-smooth scrollbar-hide pb-0 tablet:pb-[1rem]">
                                                    {/* about recipe and recipe name */}
                                                    <div className='flex flex-col gap-[0.5rem]'>
                                                        <div className='flex gap-[0.5rem] items-center'>
                                                            {/* <FontAwesomeIcon icon={faTag} className='text-secondary text-[0.75rem]' /> */}

                                                            <label className='text-md font-semibold tablet:font-bold text-textMainBlack'>{recipe.title}</label>
                                                        </div>

                                                        <label className='text-sm font-ligth tablet:font-normal'>{recipe.desc}</label>
                                                    </div>

                                                    {/* Ingredients */}
                                                    <div className='flex flex-col gap-[0.5rem]'>
                                                        <label className='text-sm tablet:text-base font-medium text-textFadeBlack'>Ingredients</label>

                                                        <ul className='flex flex-wrap items-center gap-[0.25rem] overflow-x-auto laptop:px-0 pb-[1rem]'>
                                                            {recipe.ingredients.map((ingredient, i) => (
                                                                <li className='flex-none text-xs font-normal text-primary py-[0.25rem] px-[0.5rem] bg-bgColorTwo rounded-md' key={i}>{ingredient}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* comments */}
                                                {/* <button className='p-[0.375rem] flex items-center text-sm font-normal text-textFadeBlack absolute bottom-0 right-0 border-solid border-2 border-[#EDEDED] rounded-md'><FontAwesomeIcon icon={faComment} className='text-secondary text-sm mr-[0.25rem]'/>3 comments</button>     */}
                                            </div>

                                            <div className="w-full border-t border-zinc-300 tablet:absolute tablet:bottom-0 tablet:right-0 z-2 bg-primary mt-[1rem] tablet:mt-0">
                                                <div className="flex justify-between items-center px-[4rem] my-[0.5rem]">
                                                    <Link to={'/postview/' + recipe.uid} key={i}>
                                                    <h5 className="flex items-center text-sm text-mainBlack cursor-pointer"><FontAwesomeIcon icon={faComment} className="text-sm text-fadeBlack mr-[0.5rem]" />Comments</h5>
                                                    </Link>

                                                    <Link to={'/postview/' + recipe.uid} key={i}>
                                                    <h5 className="flex items-center text-sm text-mainBlack cursor-pointer"><FontAwesomeIcon icon={faAngleRight} className="text-sm text-fadeBlack mr-[0.5rem]" />See More</h5>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <InsideFooter />
        </div>
    )
}

export default Profile
