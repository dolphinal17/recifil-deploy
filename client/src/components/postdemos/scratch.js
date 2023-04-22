<div className="flex flex-col overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full">
    {/* about recipe and recipe name */}
    <div className='flex flex-col gap-[0.5rem]'>
        <div className='flex gap-[0.5rem] items-center'>
            <FontAwesomeIcon icon={faTag} className='text-secondary text-[0.75rem]'/>

            <label className='text-md font-semibold tablet:font-bold text-textMainBlack'>{recipe.title}</label>
        </div>

        <label className='text-sm font-ligt tablet:font-normal text-textMainBlack'>{recipe.desc}</label>
    </div>

    {/* Ingredients */}
    <div className='flex flex-col gap-[0.5rem] mt-[0.5rem]'>
        <label className='text-sm tablet:text-base font-medium text-textFadeBlack'>Ingredients</label>

        <ul className='flex items-center gap-[0.25rem] overflow-x-auto px-[1rem] laptop:px-0 pb-[1rem] scroll-smooth scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full scrollbar-track-[#B1B1B1] scrollbar-track-rounded-full'>
        { recipe.ingredients.map((ingredient, i) => (
            <li className='flex-none text-xs font-normal text-primary py-[0.25rem] px-[0.5rem] bg-bgColorTwo rounded-md' key={i}>{ingredient}</li>
        ))}
        </ul>
    </div>
</div>