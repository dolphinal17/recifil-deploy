import React, { useState, useEffect } from "react";
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc,
    getDocs
  } from "firebase/firestore"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faTag, faTrash, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import styles from '../../style'
import { CardPost, RecipeCard, Navbar, CardCreatePost, InsideFooter } from '../organisms/organisms.js'
import CreatePost from '../../assets/create-post.png'
import { Link } from 'react-router-dom'
import { auth, db } from "../../config/firebase";
import { useAuth } from "../../context/UserAuthContext";
import { PreLoader } from "../atoms/atoms";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {toast} from 'react-toastify'






function OtherPost() {

    const [openModal, setOpenModal] = useState(false)

  const [loading, setLoading] = useState(false)
  const {currentuser} = useAuth()
  const [recipes, setRecipes] = useState([])
  const [form, setForm] = useState({
    title: "",
    image: {},
    desc: "",
    ingredients: [],
    steps: []
  })

  const {
    title,
    image, 
    desc,
    ingredients,
    steps,
  } = form;
  
  

  function onChange(e) {
    if(e.target.files) {
      setForm((prevState) => ({
        ...prevState,
        image: e.target.files,
      }))
    }
    if (!e.target.files) {
        setForm((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
      }
  }

  const fetchPost = async () => {

    const postref = collection(db, "approvepost")
    const snapshot = await getDocs(postref)
    const recipes = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }))
    console.log(recipes)
    setRecipes(recipes)
}

useEffect(() => {
  fetchPost()
}, [])

 

//   const handleSubmit = e => {
//     e.preventDefault()

//     if (
//       !form.title ||
//       !form.desc ||
//       !form.ingredients ||
//       !form.steps
//     ) {
//       alert("Please fill out all fields")
//       return
//     }

//     addDoc(recipesCollectionRef, form)

//     setForm({
//       title: "",
//       image: {},
//       desc: "",
//       ingredients: [],
//       steps: []
//     })
    
//     setLoading(true)
//     setOpenModal(false)
//   }

async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (
        !title ||
        !desc ||
        !ingredients ||
        !steps ||
        !image
      ) {
        toast.error("Please fill out all the fields!");
        setLoading(false)
        return
        
      }
    
    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, 'postimages/'+ filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...image].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      alert("Images not uploaded");
      return;
    });

    const formCopy = {
      ...form,
      imgUrls,
      userRef: auth.currentUser.uid,
      userPhoto: auth.currentUser.photoURL,
      userName: auth.currentUser.displayName,
    };
    delete formCopy.image;
    const docRef = await addDoc(collection(db, "createpost"), formCopy);
    setLoading(false);
    toast.success("Post Created")
    setOpenModal(false)
  }

  

  if(loading) {
    return <PreLoader/>
  }

  const handleIngredient = (e, i) => {
    const ingredientsClone = [...form.ingredients]

    ingredientsClone[i] = e.target.value

    setForm({
      ...form,
      ingredients: ingredientsClone
    })
  }

  const onRemoveIng = (i) => {
    const newIng = [...form.ingredients]
    newIng.splice(i, 1)
    setForm({
      ...form,
      ingredients: newIng
    })
  }

  const handleStep = (e, i) => {
    const stepsClone = [...form.steps]

    stepsClone[i] = e.target.value

    setForm({
      ...form,
      steps: stepsClone
    })
  }

  const onRemoveStep = (i) => {
    const newSteps = [...form.steps]
    newSteps.splice(i, 1)
    setForm({
      ...form,
      steps: newSteps
    })
  }

  // const handleIngredientCount = () => {
  //   setForm({
  //     ...form,
  //     ingredients: [...ingredients, ""]
  //   })
  // }

  const handleIngredientCount = () => {
    const lastIngredient = form.ingredients[form.ingredients.length - 1];
    if (lastIngredient === "") {
      toast.error('Empty ingredient field detected. Please input an ingredient first.')
      return;
    }
  
    setForm({
      ...form,
      ingredients: [...form.ingredients, ""]
    });
  }

  // const handleStepCount = () => {
  //   setForm({
  //     ...form,
  //     steps: [...steps, ""]
  //   })
  // }

  const handleStepCount = () => {
    const lastStep = form.steps[form.steps.length - 1];
    if (lastStep === "") {
      toast.error('Empty procedures field detected. Please input a procedure first.')
      return;
    }
  
    setForm({
      ...form,
      steps: [...form.steps, ""]
    });
  }

  const removeRecipe = id => {
    deleteDoc(doc(db, "createpost", id))
  }


  return (
    <div className={`${styles.boxWidth}`}>
    <Navbar />
    <div className={`${styles.container} relative mb-[2rem]`}>
        <div className='w-full flex justify-between laptop:gap-[1.25rem] desktop:gap-[2rem] relative'>
            {/* post section */}
            <div className='max-w-[47.5rem] w-full'>
              <div className='w-full flex flex-col items-center laptop:items-start'>
                   <button onClick={() => setOpenModal(true)} className='p-[0.5rem] text-sm font-medium text-mainBlack bg-primary flex gap-[0.5rem] items-center rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-[1rem]'><img src={CreatePost} alt='post' className='w-[0.875rem]'></img>Create New</button>
                </div>

                {/* posts */}
                <div className='grid grid-cols-1 gap-[0.5rem] justify-items-center'>
                    {/* <CardPost 
                        usersName="Sample Name"
                        about="This is my about"
                        recipeName="Adobo"
                        usersImage="https://i.pinimg.com/564x/25/65/46/25654639ef43d6cd59e062bc2cec1a2c.jpg"
                        recipeImage="https://i.pinimg.com/236x/90/b7/c9/90b7c95b0112ecbcf8580e6abdffcdbe.jpg"
                    /> */}

            { recipes.map((recipe, i) => (
              <div className='w-full max-w-[47.5rem] h-auto sm:h-[17rem] grid sm:grid-cols-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]' key={recipe.id}>
                  <div className='col-span-1 w-full h-[17rem] bg-textFadeBlack'>
                      <img src={recipe.imgUrls} alt='recipeimg' className='w-full h-full object-cover'></img>
                  </div>

                  <div className='col-span-1 sm:col-span-2 w-full pt-[1rem] px-[1rem] bg-primary h-auto sm:h-[17rem] relative'>
                    <div className="flex flex-col gap-[1rem]">
                      {/* user profile and icon */}
                      <div className='flex justify-between items-center w-full'>
                        {/* user's profile */}
                        <div className='flex items-center gap-[0.5rem]'>
                            <div className='w-[3rem] h-[3rem] rounded-full'>
                                <img src={recipe.userPhoto} alt='userimg' className='w-full h-full object-cover rounded-full'></img>
                            </div>

                            <label className='text-sm tablet:text-lg font-medium text-textMainBlack'>{recipe.userName}</label>
                        </div>

                          {/* <Link to={'/postview/' + recipe.uid} key={i}>
                            <button className='bg-[#84cc16] text-white p-2 rounded-md mb-2'>View More</button>
                          </Link> */}
                      </div>

                      <div className="h-[10rem] tablet:h-[9rem] flex flex-col gap-[0.5rem] overflow-y-auto scroll-smooth scrollbar-hide pb-0 tablet:pb-[1rem]">
                        {/* about recipe and recipe name */}
                        <div className='flex flex-col gap-[0.5rem]'>
                            <div className='flex gap-[0.5rem] items-center'>
                                {/* <FontAwesomeIcon icon={faTag} className='text-secondary text-[0.75rem]'/> */}

                                <label className='text-md font-semibold tablet:font-bold text-textMainBlack'>{recipe.title}</label>
                            </div>

                            <label className='text-sm font-ligt tablet:font-normal text-textMainBlack'>{recipe.desc}</label>
                        </div>

                        {/* Ingredients */}
                        <div className='flex flex-col gap-[0.5rem]'>
                            <label className='text-sm tablet:text-base font-medium text-textFadeBlack'>Ingredients</label>

                            <ul className='flex items-center gap-[0.25rem] overflow-x-auto laptop:px-0 pb-[1rem] tablet:scroll-smooth tablet:scrollbar-thin tablet:scrollbar-thumb-secondary tablet:scrollbar-thumb-rounded-full tablet:scrollbar-track-[#B1B1B1] tablet:scrollbar-track-rounded-full'>
                            { recipe.ingredients.map((ingredient, i) => (
                                <li className='flex-none text-xs font-normal text-primary py-[0.25rem] px-[0.5rem] bg-bgColorTwo rounded-md' key={i}>{ingredient}</li>
                            ))}
                            </ul>
                        </div>
                      </div>
                    </div>
                          

                    <div className="w-full border-t border-zinc-300 tablet:absolute tablet:bottom-0 tablet:right-0 z-2 bg-primary mt-[1rem] tablet:mt-0">
                        <div className="flex justify-between items-center px-[4rem] my-[0.5rem]">
                          <Link to={'/postview/' + recipe.uid} key={i}>
                            <h5 className="flex items-center text-sm text-mainBlack cursor-pointer"><FontAwesomeIcon icon={faComment} className="text-sm text-fadeBlack mr-[0.5rem]"/>Comments</h5>
                          </Link>
                          
                          <Link to={'/postview/' + recipe.uid} key={i}>
                            <h5 className="flex items-center text-sm text-mainBlack cursor-pointer"><FontAwesomeIcon icon={faAngleRight} className="text-sm text-fadeBlack mr-[0.5rem]"/>See More</h5>
                          </Link>
                        </div>
                    </div>  

                    {/* comments */}
                    {/* <button className='p-[0.375rem] flex items-center text-sm font-normal text-textFadeBlack absolute bottom-0 right-0 border-solid border-2 border-[#EDEDED] rounded-md'><FontAwesomeIcon icon={faComment} className='text-secondary text-sm mr-[0.25rem]'/>3 comments</button>     */}
                  </div>
              </div>
              ))}

                </div>
            </div>
                



            <div className='hidden laptop:block'>
                <div className='flex justify-between px-[0.5rem] mb-[0.5rem]'>
                    <label className='text-sm font-medium text-mainBlack'>Recipes from App</label>
                    <Link to='/library'><label className='text-sm font-medium text-secondary cursor-pointer'>All</label></Link>
                </div>

                {/* recipes */}
                <div className='flex flex-col gap-[0.5rem] mb-10'>
                    <RecipeCard 
                        image="https://i.pinimg.com/236x/56/b2/18/56b2183fd66c8a8d9c7eabc92b3a33f7.jpg"
                        name="Ampalaya"
                    />

                    <RecipeCard 
                        image="https://i.pinimg.com/236x/ed/0d/29/ed0d2931c988277eac062f30dfa99443.jpg"
                        name="Adobong Manok"
                    />
                </div>
            </div>
        </div>
    </div>


    { openModal && <div className='min-h-screen w-full flex justify-center items-center fixed z-20 bg-textFadeBlack'>
        <div className='w-full sm:max-w-[450px] max-h-[calc(100vh_-_4rem)] max-w-[340px] border-solid border-[1px] rounded-lg px-5 py-4 bg-[#FFFFFF] overflow-auto scrollbar-hide'>

            <form onSubmit={handleSubmit}>

            <div className='w-full flex justify-between items-center mb-[0.5rem] tablet:mb-[1rem]'>
                <h1 className='text-base tablet:text-lg font-medium text-mainBlack'>Create new post</h1>

                <FontAwesomeIcon onClick={() => setOpenModal(false)} icon={faXmark} className='text-base tablet:text-lg text-fadeBlack cursor-pointer'/>
            </div>

            <div className='flex flex-col gap-[0.25rem] mb-[0.5rem] tablet:mb-[0.55rem]'>
              <h1 className='text-sm tablet:text-base font-normal text-mainBlack ml-[0.25rem]'>Name:</h1>
                  <input 
                      type="text"
                      id="title" 
                      placeholder='Recipe name' 
                      className='px-[0.75rem] py-[0.5rem] w-full text-mainBlack text-sm tablet:text-base border border-zinc-300 rounded-md focus:border-secondary focus:outline-none'
                      value={title}
                      onChange={onChange}
                  />
                {/* <img src="https://cdn-icons-png.flaticon.com/512/685/685685.png" alt='recipe' className='w-[57px] h-[57px]' /> */}      
            </div>

            <div className="flex flex-col gap-[0.25rem] mb-[0.5rem] tablet:mb-[0.75rem]">
              <h1 className='text-sm tablet:text-base font-normal text-mainBlack ml-[0.25rem]'>Image:</h1>
              {/* <input
                      type='file'
                      id="images"
                      onChange={onChange}
                      required
                      
              /> */}
              <input 
                type="file"
                id="images" 
                required
                onChange={onChange}
                className='
                    flex
                    file:bg-gradient-to-b file:from-lime-500 file:to-lime-600
                    file:px-4 file:py-1 file:m-1
                    file:border-none
                    file:rounded-sm
                    file:text-primary
                    file:cursor-pointer
                    font-thin
                    tablet:font-light
                    mx-auto
                    
                    border 
                    border-zinc-300
                    text-mainBlack
                    rounded-md
                    cursor-pointer
                    text-sm
                    w-full
                    focus:border-secondary
                '
              ></input>
            </div>

            <div className='flex flex-col gap-[0.25rem] mb-[0.5rem] tablet:mb-[0.75rem]'>
              <h1 className='text-sm tablet:text-base font-normal text-mainBlack ml-[0.25rem]'>Description:</h1>

              <textarea 
                  typeof='text'
                  id="desc" 
                  placeholder='About recipe' 
                  className='w-full resize-none px-[0.75rem] py-[0.5rem] text-mainBlack text-sm tablet:text-base border border-zinc-300 rounded-md focus:border-secondary focus:outline-none scrollbar-hide'
                  value={desc}
                  onChange={onChange} 
              />
            </div>

            <div className='flex flex-col px-[0.75rem] py-[0.5rem] w-full border border-zinc-300 rounded-md mb-[0.5rem] tablet:mb-[0.75rem] max-h-[200px] overflow-y-auto scrollbar-hide'>
              <span className='text-sm tablet:text-base font-normal text-mainBlack mb-[0.5rem]'>Ingredients:</span>

                {
                    form.ingredients.map((ingredient, i) => (
                      <div className="px-[0.75rem] py-[0.5rem] border border-zinc-300 rounded-sm mb-[0.25rem] flex items-center gap-[0.5rem]">
                        <input 
                            type="text"
                            placeholder='Add ingredient'
                            className='w-full text-mainBlack text-sm focus:outline-none'
                            key={i}
                            value={ingredient} 
                            onChange={e => handleIngredient(e, i)} 
                        ></input>
                        { i === 0 ? "" : <button onClick={() => onRemoveIng(i)}><FontAwesomeIcon icon={faTrash} className="text-fadeBlack hover:text-secondary text-sm"/></button> }
                        </div>
                    ))
                }

                <button type="button" className="text-sm bg-secondary text-white p-1.5 rounded-sm" onClick={handleIngredientCount}>Add new</button>
                
            </div>

            <div className='flex flex-col px-[0.75rem] py-[0.5rem] w-full border border-zinc-300 rounded-md mb-[0.5rem] tablet:mb-[1rem] max-h-[200px] overflow-y-auto scrollbar-hide'>
              <span className='text-sm tablet:text-base font-normal text-mainBlack mb-[0.5rem]'>Procedures:</span>
          
              {
                  form.steps.map((step, i) => (
                  <div className="px-[0.75rem] py-[0.5rem] border border-zinc-300 rounded-sm mb-[0.25rem] flex gap-[0.5rem]">
                  <textarea 
                      type="text"
                      placeholder='Add procedure'
                      className='w-full text-mainBlack text-sm focus:outline-none resize-none scrollbar-hide'
                      key={i}
                      value={step} 
                      onChange={e => handleStep(e, i)} />
                      { i ===  0 ? "" :<button onClick={() => onRemoveStep(i)}><FontAwesomeIcon icon={faTrash} className="text-fadeBlack hover:text-secondary text-sm"/></button> }
                  </div> 
                  ))
              }
              <button type="button" className="text-sm bg-secondary text-white p-1.5 rounded-sm hover:bg-lime-700" onClick={handleStepCount}>Add new</button> 
            </div>

        
            <button type="submit" className='py-[0.5rem] tablet:py-[1rem] w-full bg-secondary hover:bg-lime-700 rounded-md text-base font-normal text-[#fff]'>Post</button>
             
            </form>


        </div>
    </div>
        }


        <InsideFooter/>
    </div>
  )
}

export default OtherPost