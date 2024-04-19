import React from 'react'
import './MenuTree.css'
import { Link } from 'react-router-dom'

function MenuTree({ onMenuItemClick }) {

  return (
    <div className='menu' >
        <ul className='menu-tree'>
            <li onClick={() => onMenuItemClick()} ><Link to='/mobile'>Mobile</Link></li>
            <li onClick={() => onMenuItemClick()} ><Link to='/tablet'>Tablet</Link></li>
            <li onClick={() => onMenuItemClick()} ><Link to='/laptop'>Laptop</Link></li>
            <li onClick={() => onMenuItemClick()} ><Link to='/personal-computer'>PC</Link></li>
        </ul>
    </div>
  )
}

export default MenuTree