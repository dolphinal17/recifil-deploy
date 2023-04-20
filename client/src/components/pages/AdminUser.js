import React from 'react'
import { NavbarAdmin, SidebarAdmin, TableUser } from '../organisms/organisms'

export default function AdminUser() {
  return (  
    <div>
        <NavbarAdmin/>
        <div className='flex flex-row'>
            <SidebarAdmin />
            
            <TableUser />
        </div>
    </div>
  ) 
}
