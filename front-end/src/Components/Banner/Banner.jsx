import React from 'react'
import './Banner.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import banner_img from '../Assets/hero_image.png'

function Banner() {
  return (
    <div className='banner'>
      <div className="banner-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="banner-hand-icon">
            <p>New</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>Collections</p>
          <p>For Everyone</p>
        </div>
        <div className="banner-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="banner-right">
        <img src={banner_img} alt="" />
      </div>
    </div>
  )
}

export default Banner;