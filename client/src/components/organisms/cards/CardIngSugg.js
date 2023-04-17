import React, { useState } from 'react'
import { SuggestedIngBasket, FiltInIngBasket } from '../../molecules/molecules.js'


export default function CardIngSugg( { nameCateg, nameIng1, nameIng2, nameIng3, nameIng4 } ) {
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const handleAddIngredient = (name) => {
        setSelectedIngredients([...selectedIngredients, name]);
    }

    const handleRemoveIngredient = (name) => {
        setSelectedIngredients(selectedIngredients.filter(ing => ing !== name));
    }
  return (
    <div className='laptop:max-w-[14.75rem] w-full min-h-[14rem] bg-primary rounded-md px-[1rem] py-[0.5rem]'>
        <h1 className='text-sm font-normal tablet:font-medium text-mainBlack text-center mb-[0.5rem]'>{nameCateg}</h1>

        {/* ingredients */}
        <div className='flex flex-wrap gap-[0.5rem]'>
            <SuggestedIngBasket
                name={nameIng1}
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
                selectedIngredients={selectedIngredients}
            />

            <SuggestedIngBasket
                name={nameIng2}
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
                selectedIngredients={selectedIngredients}
            />

            <SuggestedIngBasket
                name={nameIng3}
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
                selectedIngredients={selectedIngredients}
            />

            <SuggestedIngBasket
                name={nameIng4}
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
                selectedIngredients={selectedIngredients}
            />
        </div>
         {/* selected ingredients */}
         {selectedIngredients.length > 0 &&
          <div className='flex flex-wrap gap-[0.5rem] mt-[0.5rem]'>
            {selectedIngredients.map((ing, index) => (
              <FiltInIngBasket
                key={index}
                name={ing}
                onDelete={() => handleRemoveIngredient(ing)}
              />
            ))}
          </div>
        }
    </div>
  )
}

