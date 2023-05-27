import React, { useEffect, useState } from 'react'
import styles from '../../style'
import { DropdownIngredients } from '../molecules/molecules.js'
import { CardIngSugg, RecipeCard, Navbar, InsideFooter } from '../organisms/organisms.js'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

const Basket = () => {

  const [ingMeat, setIngMeat] = useState([])
  const [ingVeg, setIngVeg] = useState([])
  const [ingSon, setIngSon] = useState([])
  const [ingSea, setIngSea] = useState([])
  const [ingMisc, setIngMisc] = useState([])
  const [inTemp, setInTemp] = useState([])
  const [outTemp, setOutTemp] = useState([])
  const [inResult, setInResult] = useState([])
  const [outResult, setOutResult] = useState([])
  const [toggleState, setToggleState] = useState(1)

  // selection for suggested ingredients
  const [selected, setSelected] = useState("Meats")

  useEffect(() => {
    const fetchMeat = async () => {
      const q = query(collection(db, 'ingdata'), where('ingcat', '==', 'Meat'));
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setIngMeat(items);
    }
    fetchMeat();
  }, []);

  useEffect(() => {
    const fetchVeg = async () => {
      // const q = query(collection(db, 'ingdata'), where('ingcat', '==', 'Vegetables'));
      // const querySnapshot = await getDocs(q);
      const qVeg = query(collection(db, 'ingdata'), where('ingcat', '==', 'Vegetables'));
    const qFruits = query(collection(db, 'ingdata'), where('ingcat', '==', 'Fruits'));
    const [querySnapshotVeg, querySnapshotFruits] = await Promise.all([getDocs(qVeg), getDocs(qFruits)]);
      const items = [];
      querySnapshotVeg.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      querySnapshotFruits.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setIngVeg(items);
    }
    fetchVeg();
  }, []);


  useEffect(() => {
    const fetchSon = async () => {
      const q = query(collection(db, 'ingdata'), where('ingcat', '==', 'Seasonings'));
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setIngSon(items);
    }
    fetchSon();
  }, []);


  useEffect(() => {
    const fetchSea = async () => {
      const q = query(collection(db, 'ingdata'), where('ingcat', '==', 'Seafood'));
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setIngSea(items);
    }
    fetchSea();
  }, []);


  useEffect(() => {
    const fetchMisc = async () => {
      const q = query(collection(db, 'ingdata'), where('ingcat', '==', 'Miscellaneous'));
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setIngMisc(items);
    }
    fetchMisc();
  }, []);





  function handleIngTemp(inName) {
    if (inTemp.includes(inName)) {
      toast.error(`${inName} already exists in the Filter In List.`);
      return;
    }

    if (outTemp.includes(inName)) {
      toast.error(`${inName} already exists in the Filter Out List.`);
      return;
    }

    setInTemp([...inTemp, inName]);
  }

  function handleOutTemp(inName) {
    if (outTemp.includes(inName)) {
      toast.error(`${inName} already exists in the Filter Out List.`);
      return;
    }

    if (inTemp.includes(inName)) {
      toast.error(`${inName} already exists in the Filter In List.`);
      return;
    }

    setOutTemp([...outTemp, inName]);
  }

  const removeIngredient = (inName) => {
    setInTemp((prevInTemp) => {
      const updatedTemp = prevInTemp.filter((ing) => ing !== inName);
      setInResult([]); // Clear the results while waiting for state update
      return updatedTemp;
    });
  };

  const removeOutgredient = (inName) => {
    setOutTemp((prevOutTemp) => {
      const updatedTemp = prevOutTemp.filter((ing) => ing !== inName);
      setOutResult([]); // Clear the results while waiting for state update
      return updatedTemp;
    });
  };

  const findRecipes = async () => {
    if (inTemp.length === 0) {
      console.log('no ingredients');
      return [];
    }


    // construct the query to find recipes with similar ingredients
    const q = query(collection(db, 'recipes'), where("ingredients", "array-contains-any", inTemp));

    // execute the query and get the results
    const querySnapshot = await getDocs(q);
    const recipesResult = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const filteredResult = recipesResult.filter((item) => {
      const itemIngredients = item.ingredients;
      return inTemp.every((ingredient) => itemIngredients.includes(ingredient));
    });

    setInResult(filteredResult);
  }

  const findOutRecipes = async () => {
    if (outTemp.length === 0) {
      console.log('no out ingredients');
      return [];
    }

    // construct the query to find recipes with similar ingredients
    const q = query(collection(db, 'recipes'), where("ingredients", "not-in", outTemp));

    // execute the query and get the results
    const querySnapshot = await getDocs(q);
    const recipesResult = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const filteredResult = recipesResult.filter((item) => {
      const itemIngredients = item.ingredients;
      return !itemIngredients.some((ingredient) => outTemp.includes(ingredient));
    });

    setOutResult(filteredResult);
  }

  useEffect(() => {
    findOutRecipes();
  }, [outTemp])


  useEffect(() => {
    findRecipes();
  }, [inTemp])

  // toggle filter in and out
  const toggleTab = (index) => {
    setToggleState(index);
  }

  return (
    <div className={`${styles.boxWidth}`}>
      <Navbar />

      <div className={`${styles.container}`}>
        <div className='w-full grid sm:grid-cols-2 rounded-md mb-[2rem]'>
          {/* building section */}
          <div className='col-gap-1 max-h-[64rem] overflow-y-auto scrollbar-hide flex flex-col items-center bg-bgColorTwo py-[1rem] sm:py-[2rem]  rounded-t-md sm:rounded-l-md'>
            {/* search bar */}
            {/* <SearchBarWBG
              placeHolder="Search ingredients"
              bg="primary"
            /> */}

            {/* -----------------------new edit---------------- */}
            <h1 className='text-sm tablet:text-base font-normal tablet:font-medium text-secondary'>Filtering Ingredients</h1>

            <div className='w-full flex px-[1rem] my-[1rem] gap-1 justify-center items-center'>
              <button 
              className={`${toggleState === 1 ? "bg-secondary text-primary" : "bg-transparent text-zinc-400 border border-zinc-400"} w-full py-1 rounded-md`}
              onClick={() => toggleTab(1)}
              >Filtered In</button>

              <button 
              className={`${toggleState === 2 ? "bg-red-600 text-primary" : "bg-transparent text-zinc-400 border border-zinc-400"} w-full py-1 rounded-md`}
              onClick={() => toggleTab(2)}
              >Filtered Out</button>
            </div>

            <div className='w-full px-[1rem]'>
              <div className={`content-1 ${toggleState === 1 ? "block" : "hidden"}`}>
                {inTemp.length === 0 ? (
                      <p className="text-fadeBlack text-sm font-light text-center">
                        No ingredients selected.
                      </p>
                    ) : (
                      <div className="w-full flex flex-wrap justify-center items-center">
                        {inTemp.map((intem, ind) => (
                          <div
                            className={`px-[0.75rem] py-[0.5rem] bg-secondary rounded-md ${styles.flexCenter} mb-[10px] mr-[4px]`}
                            key={ind}
                          >
                            <p className="text-primary text-sm font-light tablet:font-normal mr-[0.5rem]">{intem}</p>
                            <button onClick={() => removeIngredient(intem)}>
                              <FontAwesomeIcon icon={faXmark} className="text-primary text-sm" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
              </div>

              <div className={`content-2 ${toggleState === 2 ? "block" : "hidden"}`}>
                {outTemp.length === 0 ? (
                    <p className="text-fadeBlack text-sm font-light text-center">
                      No ingredients selected.
                    </p>
                  ) : (
                    <div className='flex flex-wrap justify-center'>
                      {outTemp.map((outtem, outd) => (
                        <div className={`px-[0.75rem] py-[0.5rem] bg-[#FF2511] rounded-md ${styles.flexCenter} mb-[10px] mr-[4px]`} key={outd}>
                          <p className='text-primary text-sm font-light tablet:font-normal mr-[0.5rem]'>{outtem}</p>
                          <button onClick={() => removeOutgredient(outtem)}><FontAwesomeIcon icon={faXmark} className='text-primary text-sm' /></button>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
            {/* ----------------------- end of new edit---------------- */}

            {/* suggested ingredients */}
            <div className='mt-[2rem] w-full px-[1rem]'>
              <div className='flex flex-col tablet:flex-row justify-between items-center mb-2'>
                <h1 className='text-sm tablet:text-base font-normal tablet:font-medium text-secondary mb-[0.5rem] text-center'>Ingredients Suggestions</h1>
                
                <DropdownIngredients selected={selected} setSelected={setSelected}/>
              </div>
              
              {/* Meats tags */}
              <div className={`${selected === "Meats" ? "block" : "hidden"} w-full bg-primary rounded-md px-[1rem] py-[0.5rem] overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full`}>
                <div className='w-full flex flex-wrap justify-start gap-[0.5rem]'>
                  {ingMeat.map((val, id) => (
                    <div className={`p-[5px] rounded-md ${styles.flexCenter} shadow-md border-solid border-[1px] border-[#EDEDED]`} key={id}>
                      <p className='text-sm font-light tablet:font-normal mr-[10px]'>{val.ingname}</p>

                      <div className='flex gap-[5px]'>

                        <button
                          className={`${toggleState === 1 ? "block" : "hidden"} w-[36px] h-[19px] ${styles.flexCenter} text-sm font-thin tablet:font-light border-solid border-[1px] border-[#EDEDED] rounded-sm hover:bg-secondary hover:text-primary`}
                          onClick={() => handleIngTemp(val.ingname)}
                        >IN</button>


                        <button
                          className={`${toggleState === 2 ? "block" : "hidden"} w-[36px] h-[19px] ${styles.flexCenter} text-sm font-thin tablet:font-light border-solid border-[1px] border-[#EDEDED] rounded-sm hover:bg-red-600 hover:text-primary`}
                          onClick={() => handleOutTemp(val.ingname)}
                        >OUT</button>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Vg and Fruits tags */}
              <div className={`${selected === "Vegetables and Fruits" ? "block" : "hidden"} w-full bg-primary rounded-md px-[1rem] py-[0.5rem] overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full max-h-[400px] tablet:max-h-none`}>
                <div className='w-full flex flex-wrap justify-start gap-[0.5rem]'>
                  {ingVeg.map((val, id) => (
                    <div className={`p-[5px] rounded-md ${styles.flexCenter} shadow-md border-solid border-[1px] border-[#EDEDED]`} key={id}>
                      <p className='text-sm font-light tablet:font-normal mr-[10px]'>{val.ingname}</p>

                      <div className='flex gap-[5px]'>

                        <button
                          className={`${toggleState === 1 ? "block" : "hidden"} w-[36px] h-[19px] ${styles.flexCenter} text-sm font-thin tablet:font-light border-solid border-[1px] border-[#EDEDED] rounded-sm hover:bg-secondary hover:text-primary`}
                          onClick={() => handleIngTemp(val.ingname)}
                        >IN</button>


                        <button
                          className={`${toggleState === 2 ? "block" : "hidden"} w-[36px] h-[19px] ${styles.flexCenter} text-sm font-thin tablet:font-light border-solid border-[1px] border-[#EDEDED] rounded-sm hover:bg-red-600 hover:text-primary`}
                          onClick={() => handleOutTemp(val.ingname)}
                        >OUT</button>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* seasonings tags */}
              <div className={`${selected === "Seasonings" ? "block" : "hidden"} w-full bg-primary rounded-md px-[1rem] py-[0.5rem] overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full`}>
                <div className='w-full flex flex-wrap justify-start gap-[0.5rem]'>
                  {ingSon.map((val, id) => (
                    <div className={`p-[5px] rounded-md ${styles.flexCenter} shadow-md border-solid border-[1px] border-[#EDEDED]`} key={id}>
                      <p className='text-sm font-light tablet:font-normal mr-[10px]'>{val.ingname}</p>

                      <div className='flex gap-[5px]'>

                        <button
                          className={`${toggleState === 1 ? "block" : "hidden"} w-[36px] h-[19px] ${styles.flexCenter} text-sm font-thin tablet:font-light border-solid border-[1px] border-[#EDEDED] rounded-sm hover:bg-secondary hover:text-primary`}
                          onClick={() => handleIngTemp(val.ingname)}
                        >IN</button>


                        <button
                          className={`${toggleState === 2 ? "block" : "hidden"} w-[36px] h-[19px] ${styles.flexCenter} text-sm font-thin tablet:font-light border-solid border-[1px] border-[#EDEDED] rounded-sm hover:bg-red-600 hover:text-primary`}
                          onClick={() => handleOutTemp(val.ingname)}
                        >OUT</button>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* seafoods tags */}
              <div className={`${selected === "Seafoods" ? "block" : "hidden"} w-full bg-primary rounded-md px-[1rem] py-[0.5rem] overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full`}>
                <div className='w-full flex flex-wrap justify-start gap-[0.5rem]'>
                  {ingSea.map((val, id) => (
                    <div className={`p-[5px] rounded-md ${styles.flexCenter} shadow-md border-solid border-[1px] border-[#EDEDED]`} key={id}>
                      <p className='text-sm font-light tablet:font-normal mr-[10px]'>{val.ingname}</p>

                      <div className='flex gap-[5px]'>

                        <button
                          className={`${toggleState === 1 ? "block" : "hidden"} w-[36px] h-[19px] ${styles.flexCenter} text-sm font-thin tablet:font-light border-solid border-[1px] border-[#EDEDED] rounded-sm hover:bg-secondary hover:text-primary`}
                          onClick={() => handleIngTemp(val.ingname)}
                        >IN</button>


                        <button
                          className={`${toggleState === 2 ? "block" : "hidden"} w-[36px] h-[19px] ${styles.flexCenter} text-sm font-thin tablet:font-light border-solid border-[1px] border-[#EDEDED] rounded-sm hover:bg-red-600 hover:text-primary`}
                          onClick={() => handleOutTemp(val.ingname)}
                        >OUT</button>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* miscellaneous tags */}
              <div className={`${selected === "Miscellaneous" ? "block" : "hidden"} w-full bg-primary rounded-md px-[1rem] py-[0.5rem] overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full`}>
                <div className='w-full flex flex-wrap justify-start gap-[0.5rem]'>
                  {ingMisc.map((val, id) => (
                    <div className={`p-[5px] rounded-md ${styles.flexCenter} shadow-md border-solid border-[1px] border-[#EDEDED]`} key={id}>
                      <p className='text-sm font-light tablet:font-normal mr-[10px]'>{val.ingname}</p>

                      <div className='flex gap-[5px]'>

                        <button
                          className={`${toggleState === 1 ? "block" : "hidden"} w-[36px] h-[19px] ${styles.flexCenter} text-sm font-thin tablet:font-light border-solid border-[1px] border-[#EDEDED] rounded-sm hover:bg-secondary hover:text-primary`}
                          onClick={() => handleIngTemp(val.ingname)}
                        >IN</button>


                        <button
                          className={`${toggleState === 2 ? "block" : "hidden"} w-[36px] h-[19px] ${styles.flexCenter} text-sm font-thin tablet:font-light border-solid border-[1px] border-[#EDEDED] rounded-sm hover:bg-red-600 hover:text-primary`}
                          onClick={() => handleOutTemp(val.ingname)}
                        >OUT</button>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* suggestions section */}
          <div className='col-gap-1 py-[1rem] max-h-[64rem] sm:py-[2rem] px-[1rem] laptop:px-[0.5rem] bg-primary rounded-b-md sm:rounded-r-md  overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full '>
            <div className='flex flex-col items-center gap-[1rem]'>   
              <h1 className='text-sm tablet:text-base font-normal tablet:font-medium text-secondary'>Recipe Suggestions</h1>
              
              <div className='grid laptop:grid-cols-2 gap-[1rem] laptop:gap-[0.5rem] desktop:gap-[1rem]'>

                {inResult.length === 0 && outResult.length === 0 ?

                ( <h1 className= 'text-center text-gray-500 w-full col-span-2'>No results</h1>) : (
                  
                <>
                {inResult.map((res, id) => (
                  <Link to={'/recipeview/' + res.id}>
                  <div className='w-[14.5rem] h-[18.5rem] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <div className='w-[14.5rem] h-[14.5rem] rounded-t-md bg-fadeBlack flex items-center'>
                      <img src={res.image} alt='recipeimg' className='w-full h-full rounded-t-md object-cover'></img>
                    </div>

                    <div className={`w-full h-[4rem] rounded-b-md p-[0.75rem] drop-shadow-md flex justify-between items-center`}>
                      <div className='flex flex-col'>
                        <label className='text-base font-normal tablet:font-medium text-mainBlack mb-[0.125rem]'>{res.title}</label>

                        <label className='text-sm font-light tablet:font-normal text-fadeBlack'>From App</label>
                      </div>

                      
                    </div>
                  </div>
                  </Link>
                ))}
                
                  
                {outResult.map((res, id) => (
                  <Link to={'/recipeview/' + res.id}>
                  <div className='w-[14.5rem] h-[18.5rem] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <div className='w-[14.5rem] h-[14.5rem] rounded-t-md bg-fadeBlack flex items-center'>
                      <img src={res.image} alt='recipeimg' className='w-full h-full rounded-t-md object-cover'></img>
                    </div>

                    <div className={`w-full h-[4rem] rounded-b-md p-[0.75rem] drop-shadow-md flex justify-between items-center`}>
                      <div className='flex flex-col'>
                        <label className='text-base font-normal tablet:font-medium text-mainBlack mb-[0.125rem]'>{res.title}</label>

                        <label className='text-sm font-light tablet:font-normal text-fadeBlack'>From App</label>
                      </div>

                      <FontAwesomeIcon icon={faHeart} className='text-secondary text-2xl' />
                    </div>
                  </div>
                  </Link>
                ))}
                </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <InsideFooter />
    </div>
  )
}

export default Basket