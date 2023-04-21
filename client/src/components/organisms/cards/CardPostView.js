import React, { useState, useEffect } from 'react'
import styles from '../../../style'
import { Navbar } from '../organisms.js'
import { BtnServing, PreLoader } from '../../atoms/atoms.js'
import { SearchBarWBG } from '../../molecules/molecules.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faClock } from '@fortawesome/free-regular-svg-icons'
import { useParams } from 'react-router-dom'
import { auth, db } from '../../../config/firebase'
import { doc, getDoc, addDoc, collection, serverTimestamp, query, getDocs } from '@firebase/firestore'
import { toast } from 'react-toastify'







const CardPostView = () => {

    const { id } = useParams();
    const [info, setInfo] = useState(null)
    const [commentInfo, setCommentInfo] = useState([])
    const [loading, setLoading] = useState(true)
    const [comment, setComment] = useState('')

    useEffect(() => {
        async function fetchRecipe() {
            const docRef = doc(db, "approvepost", id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setInfo(docSnap.data())
                setLoading(false)
            }
        }
        fetchRecipe();
    }, [id]);


    const fetchComments = async () => {
        const commentsRef = collection(db, `approvepost/${id}/comments`);
        const q = query(commentsRef);
        const querySnapshot = await getDocs(q);
        const commentsData = querySnapshot.docs.map((doc) => doc.data());
        setCommentInfo(commentsData);
    }


    useEffect(() => {
        fetchComments()
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const commentsRef = collection(db, `approvepost/${id}/comments`);
            await addDoc(commentsRef, {
                text: comment,
                user: {
                    name: auth.currentUser.displayName,
                    photoURL: auth.currentUser.photoURL,
                },
                createdAt: serverTimestamp(),
            });
            console.log(comment);
            setComment('');
            toast.success('Comment posted!')
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <PreLoader />;
    }

    return (
        <div className="w-full min-h-[65rem] h-auto flex flex-col justify-start items-center bg-bgColor relative">
            <Navbar />
            <div className={`${styles.container} h-auto `}>
                <div className='w-full h-auto flex flex-col laptop:flex-row min-h-[32rem] px-[0.5rem] mb-[1rem] laptop:px-0'>
                    <div className='flex flex-col justify-center bg-bgColorTwo p-[1rem] desktop:p-[2rem] gap-[1rem] rounded-t-md laptop:max-w-[48rem] laptop:justify-start laptop:rounded-tr-none laptop:rounded-l-md laptop:w-full'>
                        

                        {/* recipe image, author, name, ratings, heart, about */}
                        <div className='flex flex-col gap-[0.5rem] sm:flex-row sm:gap-[1rem]'>
                            {/* recipe image */}
                            <img src={info.imgUrls} alt='recipeimg' className='flex-none w-[14rem] h-[14rem] object-cover border-4 border-secondary rounded-md'></img>


                            {/* recipe author, name, ratings and about */}
                            <div className='flex flex-col gap-[0.5rem]'>
                                {/* recipe author, name and ratings */}
                                <div className='flex flex-col gap-[0.5rem]'>
                                    {/* recipe name and author*/}
                                    <div className='flex justify-between items-center'>
                                        <div className='flex flex-col gap-[0.25rem]'>
                                            <span className='text-sm font-normal laptop:font-medium text-secondary'>{info.userName}</span>
                                            <span className='text-2xl font-medium text-primary'>{info.title}</span>
                                        </div>

                                        
                                    </div>

                                    
                                </div>

                                {/* about */}
                                <div className='flex flex-col gap-[0.25rem]'>
                                    <span className='text-sm font-normal laptop:font-medium text-primary'>About</span>

                                    <div className='flex-auto scrollbar-thin scrollbar-thumb-[#B2D33D] scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full pr-[1rem]'>
                                        <p className='text-sm font-thin laptop:font-light text-primary max-h-[6rem]'>{info.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* procedures */}
                        <div className='flex flex-col gap-[0.25rem]'>
                            <span className='text-sm font-normal laptop:font-medium text-primary'>Procedures</span>

                            {/* steps list */}
                            <div className='flex scrollbar-thin scrollbar-thumb-[#B2D33D] scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full pr-[1rem]'>
                                <ul className='flex flex-col gap-[0.25rem] max-h-[8.5rem]'>
                                    {
                                        info.steps.map((steps, i) => (
                                            <li className='text-sm font-thin laptop:font-light text-primary flex flex-col gap-[0.125rem]' key={i}>{i + 1}. {steps}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* side ingredients and others */}
                    <div className='flex flex-col justify-center bg-primary py-[1rem] px-[1rem] laptop:max-w-[16rem] laptop:justify-start rounded-b-md laptop:rounded-bl-none laptop:rounded-r-md laptop:w-full'>
                        <div className='flex flex-col justify-between laptop:h-full'>
                            {/* estimated time and ingredients */}
                            <div className='flex flex-col gap-[0.25rem] laptop:gap-[0.5rem] '>
                                {/* estimated time */}
                                <div className='flex justify-start items-center gap-[0.25rem] laptop:gap-[0.25rem] laptop:flex-col desktop:flex-row desktop:gap-[0.5rem] mb-2'>
                                    <div className='flex gap-[0.125rem] laptop:gap-[0.25rem] items-center'>
                                        <img src={info.userPhoto} className='w-[3rem] h-[3rem] object-cover rounded-full mr-3'></img>
                                        <label className='text-lg font-medium text-textMainBlack'>{info.userName}</label>
                                    </div>



                                </div>

                                {/* ingredients, servings, integral and not integral */}
                                <div className='flex flex-col gap-[0.25rem] laptop:gap-[0.5rem]'>
                                    <span className='text-sm font-normal laptop:font-medium text-mainBlack'>Ingredients</span>

                                    <div className='flex flex-col gap-[0.5rem] laptop:gap-[1rem]'>


                                        {/* integral ingredients */}
                                        <div className='flex flex-col gap-[0.25rem] laptop:gap-[0.5rem]'>
                                            {/* title */}
                                            {/* <div className='flex justify-start gap-[0.25rem]'>
                                            <span className='text-sm font-light laptop:font-normal text-mainBlack'>Integral Ingredients</span>

                                            <FontAwesomeIcon icon={faCircleInfo} className='text-secondary/60 text-[0.5rem]' />
                                        </div> */}

                                            {/* ingredients */}
                                            <ul className='flex flex-col gap-[0.125rem] laptop:gap-[0.25rem]'>
                                                {
                                                    info.ingredients.map((ingredients, i) => (
                                                        <li className='text-sm font-thin laptop:font-light text-mainBlack' key={i}>{ingredients}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>

                                        {/* not integral ingredients */}
                                        {/* <div className='flex flex-col gap-[0.25rem] laptop:gap-[0.5rem]'> */}
                                        {/* title */}
                                        {/* <div className='flex justify-start gap-[0.25rem]'>
                                            <span className='text-sm font-light laptop:font-normal text-mainBlack'>Not Integral Ingredients</span>

                                            <FontAwesomeIcon icon={faCircleInfo} className='text-secondary/60 text-[0.5rem]' />
                                        </div> */}

                                        {/* ingredients */}
                                        {/* <ul className='flex flex-col gap-[0.125rem] laptop:gap-[0.25rem]'>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Red Onion</li>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Petchay</li>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Corn</li>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Riped Banana</li>
                                            <li className='text-sm font-thin laptop:font-light text-mainBlack'>Sitaw</li>
                                        </ul> */}
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>

                            {/* <button className='flex justify-center items-center mt-[1rem] bg-gradient-to-r from-[#B2D33D] to-[#59981A] text-primary text-sm font-normal laptop:font-medium py-[0.5rem] rounded-sm laptop:rounded-md laptop:mt-auto'>Try Now</button> */}
                        </div>
                    </div>
                </div>

                <div className='w-full h-auto bg-white mb-10 pt-[1rem] laptop:pt-[2rem] px-[1rem] tablet:px-[2rem]'>
                    <h1 className='text-lg tablet:text-xl font-medium mb-[1rem]'>Comments:</h1>

                    {/* comments */}
                    <div className='flex flex-col gap-[0.25rem] h-auto'>
                        <div className='flex flex-col gap-[0.5rem] tablet:gap-[1rem] h-[10rem] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full pr-[1rem]'>
                            {commentInfo.map((com, i) => (
                                <div  key={i} className='flex justify-start items-start gap-[0.5rem]'>
                                    {/* <img src={com.user.photoURL} alt='sample img' className='w-[3rem] h-[3rem] rounded-full object-cover'></img> */}
                                    
                                    {/* <h1 className='text-lg font-[500]'>{com.user.name}</h1> */}

                                    <img src={com.user.photoURL} alt='sample img' className='w-[3rem] h-[3rem] rounded-full object-cover flex-none'/>

                                    <div className='w-full flex flex-col p-[0.5rem] rounded-sm bg-zinc-100 gap-[0.25rem]'>
                                        <span className='text-lg font-light laptop:font-normal text-mainBlack'>{com.user.name}</span>

                                        <span className='text-base font-thin laptop:font-light text-mainBlack'>{com.text}</span>
                                    </div>
                                    {/* <h1 className='text-md'>{com.text}</h1> */}
                                </div>
                            ))}
                        </div>

                        <form className='flex items-center justify-between border-t border-zinc-300 py-[0.5rem] tablet:py-[1rem]  mt-[1rem] gap-[1rem] tablet:gap-[2rem]' onSubmit={handleSubmit}>
                            <textarea rows="1"
                                placeholder="Add a comment..."
                                className='resize-none p-2 border-2 border-zinc-200 rounded-lg focus:outline-zinc-400 w-full'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>

                            {/* <input
                                value='Comment'
                                type='submit'
                                className='p-2 bg-[#84cc16] h-[3rem] text-white rounded-md cursor-pointer'
                            ></input> */}
                            <FontAwesomeIcon type='submit' icon={faPaperPlane} className='cursor-pointer text-2xl text-secondary'/>
                        </form>
                    </div>


                </div>


            </div>
        </div>
    )
}

export default CardPostView

