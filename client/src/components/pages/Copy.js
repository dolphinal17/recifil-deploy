{/* filtering */}
<div className='w-full grid laptop:grid-cols-2 px-[1rem] divide-y laptop:divide-x laptop:divide-y-0 my-[1rem]'>
{/* filtered in */}
<div className={`col-span-1 flex flex-col items-center justify-start px-[1rem]`}>
  <h3 className='text-sm font-normal tablet:font-medium text-primary mb-[10px]'>WITH</h3>
  {/* 
  <div className='flex flex-wrap'>

    {inTemp.map((intem, ind) => (


      <div className={`px-[0.75rem] py-[0.5rem] bg-secondary rounded-md ${styles.flexCenter} mb-[10px] mr-[4px]`} key={ind}>
        <p className='text-primary text-sm font-light tablet:font-normal mr-[0.5rem]'>{intem}</p>
        <button onClick={() => removeIngredient(intem)}><FontAwesomeIcon icon={faXmark} className='text-primary text-sm' /></button>
      </div>

    ))}


  </div> */}
  {inTemp.length === 0 ? (
    <p className="text-primary text-sm font-light">
      No ingredients selected.
    </p>
  ) : (
    <div className="flex flex-wrap">
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

{/* filtered out */}
<div className={`col-span-1 flex flex-col items-center justify-start px-[1rem]`}>
  <h3 className='text-sm font-normal tablet:font-medium text-primary mb-[10px] mt-[0.5rem] laptop:mt-0'>WITHOUT</h3>

  {outTemp.length === 0 ? (
    <p className="text-primary text-sm font-light">
      No ingredients selected.
    </p>
  ) : (
    <div className='flex flex-wrap'>
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

// =========================> basket suggested ingredients section 05/11/2023 start 
{/* ingredients */}
<div className='w-full flex flex-wrap gap-[0.5rem]'>
{/* meats */}
<details className='w-full p-2 bg-primary rounded-md group flex-none'>
  <summary className='list-none flex justify-between items-center cursor-pointer'>
    <h1 className='text-sm font-normal tablet:font-medium text-mainBlack text-center'>Meats</h1>

    <FontAwesomeIcon icon={faChevronDown} className='text-sm text-mainBlack group-open:rotate-180 transition-transform duration-300'/>
  </summary>

  <div className='w-full max-h-[16rem] bg-primary rounded-md px-[1rem] py-[0.5rem] overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full'>
    <div className='w-full flex flex-wrap justify-center pt-4 gap-[0.5rem]'>
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
</details>

{/* vegetables and fruits */}
<details className='w-full p-2 bg-primary rounded-md group flex-none'>
  <summary className='list-none flex justify-between items-center cursor-pointer'>
    <h1 className='text-sm font-normal tablet:font-medium text-mainBlack text-center'>Vegetables and Fruits</h1>

    <FontAwesomeIcon icon={faChevronDown} className='text-sm text-mainBlack group-open:rotate-180 transition-transform duration-300'/>
  </summary>

  <div className='w-full max-h-[16rem] bg-primary rounded-md px-[1rem] py-[0.5rem] overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full'>
    <div className='w-full flex flex-wrap justify-center pt-4 gap-[0.5rem]'>
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
</details>

{/* seasonings */}
<details className='w-full p-2 bg-primary rounded-md group flex-none'>
  <summary className='list-none flex justify-between items-center cursor-pointer'>
    <h1 className='text-sm font-normal tablet:font-medium text-mainBlack text-center'>Seasonings</h1>

    <FontAwesomeIcon icon={faChevronDown} className='text-sm text-mainBlack group-open:rotate-180 transition-transform duration-300'/>
  </summary>

  <div className='w-full max-h-[16rem] bg-primary rounded-md px-[1rem] py-[0.5rem] overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full'>
    <div className='w-full flex flex-wrap justify-center pt-4 gap-[0.5rem]'>
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
</details>

{/* seafoods */}
<details className='w-full p-2 bg-primary rounded-md group flex-none'>
  <summary className='list-none flex justify-between items-center cursor-pointer'>
    <h1 className='text-sm font-normal tablet:font-medium text-mainBlack text-center'>Seafoods</h1>

    <FontAwesomeIcon icon={faChevronDown} className='text-sm text-mainBlack group-open:rotate-180 transition-transform duration-300'/>
  </summary>

  <div className='w-full max-h-[16rem] bg-primary rounded-md px-[1rem] py-[0.5rem] overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full'>
    <div className='w-full flex flex-wrap justify-center pt-4 gap-[0.5rem]'>
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
</details>

{/* miscellaneous */}
<details className='w-full p-2 bg-primary rounded-md group flex-none'>
  <summary className='list-none flex justify-between items-center cursor-pointer'>
    <h1 className='text-sm font-normal tablet:font-medium text-mainBlack text-center'>Miscellaneous</h1>

    <FontAwesomeIcon icon={faChevronDown} className='text-sm text-mainBlack group-open:rotate-180 transition-transform duration-300'/>
  </summary>

  <div className='w-full max-h-[16rem] bg-primary rounded-md px-[1rem] py-[0.5rem] overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full'>
    <div className='w-full flex flex-wrap justify-center pt-4 gap-[0.5rem]'>
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
</details>



{/* vegetables and fruits */}
{/* <div className='laptop:max-w-[14.75rem] w-full max-h-[16rem] bg-primary rounded-md px-[1rem] py-[0.5rem] overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full'>
  <h1 className='text-sm font-normal tablet:font-medium text-mainBlack text-center mb-[0.5rem]'>Vegetables and Fruits</h1>

  {ingVeg.map((val, id) => (
    <div className='flex flex-wrap gap-[0.5rem]' key={id}>

      <div className='flex flex-wrap items-start justify-start pt-4 min-w-[20rem] max-w-[22rem]'>
        <div className={`p-[5px] rounded-md ${styles.flexCenter} shadow-md border-solid border-[1px] border-[#EDEDED`}>
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
      </div>

    </div>
  ))}
</div> */}



{/* seasonings */}
{/* <div className='laptop:max-w-[14.75rem] w-full max-h-[16rem] bg-primary rounded-md px-[1rem] py-[0.5rem] overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full'>
  <h1 className='text-sm font-normal tablet:font-medium text-mainBlack text-center mb-[0.5rem]'>Seasonings</h1>

  {ingSon.map((val, id) => (
    <div className='flex flex-wrap gap-[0.5rem]' key={id}>

      <div className='flex flex-wrap items-start justify-start pt-4 min-w-[20rem] max-w-[22rem]'>
        <div className={`p-[5px] rounded-md ${styles.flexCenter} shadow-md border-solid border-[1px] border-[#EDEDED`}>
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
      </div>

    </div>
  ))}
</div> */}

{/* seafoods */}
{/* <div className='laptop:max-w-[14.75rem] w-full max-h-[16rem] bg-primary rounded-md px-[1rem] py-[0.5rem] overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full'>
  <h1 className='text-sm font-normal tablet:font-medium text-mainBlack text-center mb-[0.5rem]'>Seafood</h1>

  {ingSea.map((val, id) => (
    <div className='flex flex-wrap gap-[0.5rem]' key={id}>

      <div className='flex flex-wrap items-start justify-start pt-4 min-w-[20rem] max-w-[22rem]'>
        <div className={`p-[5px] rounded-md ${styles.flexCenter} shadow-md border-solid border-[1px] border-[#EDEDED`}>
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
      </div>

    </div>
  ))}
</div> */}



{/* miscellaneous */}
{/* <div className='laptop:max-w-[14.75rem] w-full max-h-[16rem] bg-primary rounded-md px-[1rem] py-[0.5rem]  overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full'>
  <h1 className='text-sm font-normal tablet:font-medium text-mainBlack text-center mb-[0.5rem]'>Miscellaneous</h1>

  {ingMisc.map((val, id) => (
    <div className='flex flex-wrap gap-[0.5rem]' key={id}>

      <div className='flex flex-wrap items-start justify-start pt-4 min-w-[20rem] max-w-[22rem]'>
        <div className={`p-[5px] rounded-md ${styles.flexCenter} shadow-md border-solid border-[1px] border-[#EDEDED`}>
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
      </div>

    </div>
  ))}
</div> */}



</div>
// =========================> basket suggested ingredients section 05/11/2023 end