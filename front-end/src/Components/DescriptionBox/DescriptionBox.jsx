import React from 'react'
import './DescriptionBox.css'

function DescriptionBox() {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-nav">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Review (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>
                An e-commerce website is an online platform where businesses can sell their products 
                or services. It provides customers with the convenience of browsing and purchasing 
                items from anywhere with an internet connection. These websites offer a wide range 
                of products, easy navigation, and secure payment options to enhance the shopping 
                experience.
            </p>
            <p>
                E-commerce websites showcase a vast assortment of products, ranging from electronics and 
                fashion to home goods and beauty products. Customers can browse through diverse categories, 
                explore niche items, and easily make purchases from the comfort of their homes.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox