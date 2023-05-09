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