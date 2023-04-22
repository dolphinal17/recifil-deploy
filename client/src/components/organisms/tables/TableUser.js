import React, { useEffect, useState } from 'react'
import { SearchBarWBG } from '../../molecules/molecules.js'
import { auth, db } from '../../../config/firebase.js'
import { collection, getDoc, getDocs } from 'firebase/firestore'


export default function TableUser() {

    const [userList, setUserList] = useState([])

    const fetchUsers = async () => {
        
        const userref = collection(db, 'userinfo')
        const snapshot = await getDocs(userref)
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setUserList(users);
    };

    useEffect(() => {
        fetchUsers()
    }, []);

  return (
    <div className='w-full flex justify-center bg-bgColor'>
        <div className='max-w-[80rem] w-full bg-primary rounded-xl overflow-auto pb-[2rem]'>
            {/* name and search bar */}
            <div className='flex justify-between items-center px-[1rem] tablet:px-[2rem] my-[0.5rem] tablet:my-[1rem]'>
                <span className='text-base tablet:text-xl font-normal tablet:font-medium text-mainBlack'>Users</span>

                <SearchBarWBG 
                    placeHolder="Search user"
                    bg="bgColor"
                />
            </div>

            <table className='border-collapse table-fixed w-full text-sm'>
                <thead>
                    <tr className='bg-bgColorTwo text-primary'>
                        <th className='font-normal tablet:font-medium p-4 pl-8 text-center'>ID</th>
                        <th className='font-normal tablet:font-medium p-4 text-center'>Image</th>
                        <th className='font-normal tablet:font-medium p-4 text-center'>First Name</th>
                        <th className='font-normal tablet:font-medium p-4 text-center'>Last Name</th>
                        <th className='font-normal tablet:font-medium p-4 text-center'>Email</th>
                    </tr>
                </thead>
                
                {userList.map((user, index) => (
                    
                

                <tbody className='bg-primary'>
                    <tr>
                        <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 pl-8 text-center'>{index + 1}</td>
                        <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 text-center text-ellipsis overflow-hidden'><img src={user.photoURL} /></td>
                        <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 text-center'>{user.firstname}</td>
                        <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 text-center'>{user.lastname}</td>
                        <td className='border-b border-zinc-300 font-light tablet:font-normal p-4 text-center'>{user.email}</td>
                    </tr>
                </tbody>

                ))}
                
            </table>
        </div>
    </div>
  )
}