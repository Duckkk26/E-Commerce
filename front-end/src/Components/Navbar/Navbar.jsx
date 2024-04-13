import React from 'react'
import './Navbar.css'
// import logo from '../Assets/logo.png'
// import cart_icon from '../Assets/cart_icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  return (
    <div className="header">
        <div className="nav-container">
            <div className='navbar'>
                <div className="nav-logo">
                    {/* <img src={logo} alt="" /> */}
                    <a href="/"  aria-current="page" className='nav-brand'>NTD SHOP</a>
                </div>
                <a href="" className="header-item btn-menu">
                    <div className="box-icon">
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <div className="box-content">
                        <p>Danh mục</p>
                    </div>
                </a>
                <div className="box-search">
                    <form>
                        <div className="group-input">
                            <div className="input-btn">
                                <button type="submit">
                                    <div>
                                        <FontAwesomeIcon icon={faSearch} height={15}/>
                                    </div>
                                </button>
                            </div>
                            <input type="text" id="input-search" placeholder='Bạn cần tìm gì?' autoComplete='off' className='input'/>
                            <span id="close-search-btn">×</span>
                        </div>
                    </form>
                </div>
                <a href="" className="header-item about-contact"></a>
                <a href="" className="header-item about-delivery-tracking"></a>
                <a href="" className="header-item about-cart"></a>
                <div className="login-btn"></div>
            </div>
        </div>
    </div>
  )
}

export default Navbar;