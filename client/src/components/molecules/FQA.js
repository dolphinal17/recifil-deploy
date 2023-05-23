import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function FQA(props) {
    const [item, setItem] = useState(props.datas)

    const handletoggleActive = () => {
        let newActive = item.active === 1 ? 0 : 1;
        setItem({...item, active: newActive});
    }
  return (
    <div className={`${item.active === 1 ? 'is-active bg-white' : ''} w-full group p-5 rounded-md border border-zinc-600 group duration-500`}>
        <div className='flex items-center justify-between'>
            <p className='text-base tablet:text-lg font-normal text-zinc-200 mt-1 tablet:mt-2 group-[.is-active]:font-medium group-[.is-active]:text-mainBlack duration-500'>{item.question}</p>
            
            <FontAwesomeIcon onClick={handletoggleActive} icon={faChevronDown} className='text-base text-secondary cursor-pointer group-[.is-active]:rotate-[180deg] duration-500'/>
        </div>

        <div className='overflow-hidden max-h-0 group-[.is-active]:max-h-[200px] duration-500'>
            <p className='text-base tablet:text-lg font-normal text-fadeBlack mt-1 tablet:mt-2'>{item.answer}</p>
        </div>
    </div>
  )
}
