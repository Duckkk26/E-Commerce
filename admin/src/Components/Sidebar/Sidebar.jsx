import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import addProductIcon from '../../assets/Product_Cart.svg'
import listProductIcon from '../../assets/Product_list_icon.svg'

function Sidebar() {
  return (
    <div className='sidebar'>
        <Link to={'/addProduct'} style={{ textDecoration: 'none' }}>
            <div className="sidebar-item">
                <img src={addProductIcon} alt="" />
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/listProduct'} style={{ textDecoration: 'none' }}>
            <div className="sidebar-item">
                <img src={listProductIcon} alt="" />
                <p>Product List</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar