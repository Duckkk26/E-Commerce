import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext';

import './ProductDisplay.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function ProductDisplay(props) {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);

    const formatPrice = (price) => {
        let priceString = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        return priceString.replace(/\s/g, '');
    }

  return (
    <div className='productdisplay'>
        <div className="box-product-detail">
            <div className="box-product-detail__left">
                <div className="box-gallery">
                    <div className="gallery-slide swiper-container">
                        <div 
                            className="swiper-wrapper"
                            style={{
                                transform: `translateX(0)`,
                                transitionDuration: '300ms'
                            }}
                        >
                            {product.images.map((image, index) => {
                                return (
                                    <div key={index} className="swiper-slide gallery-img">
                                        <img src={image} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                        <div className="swiper-button-prev">
                            <div className="icon">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </div>
                        </div>
                        <div className="swiper-button-next">
                            <div className="icon">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        </div>
                    </div>
                    <div className="thumbnail-slide swiper-container">
                        <div className="swiper-wrapper">
                            {product.images.map((image, index) => {
                                return (
                                    <div key={index} className="swiper-slide thumb-img">
                                        <img src={image} width={'58'} height={'58'} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="box-product-detail__right">
                <div className="box-header">
                    <div className="box-product-name">
                        <h1>{product.name}</h1>
                    </div>
                    <div className="box-rating">
                        <div className="star-icon">
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="star-icon">
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="star-icon">
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="star-icon">
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="star-icon">
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        &nbsp;100 đánh giá
                    </div>
                </div>
                <hr />
                <div className="box-product-variants">
                    <div className="box-title">
                        <p>Chọn màu để xem giá chi tiết</p>
                    </div>
                    <div className="box-content">
                        <ul className="list-variants">
                            <li className="item-variant">
                                <a title='Titan Tự Nhiên' className="change-color-btn">
                                    <img src={product.images[0]} alt="iPhone 15 Pro Max 256GB | Chính hãng VN/A" />
                                    <div>
                                        <strong className="item-variant-name">Titan Tự Nhiên</strong>
                                        <span>{formatPrice(product.new_price)}</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="box-price">
                    <div className="item-price-detail">
                        <p className="item-new-price">{formatPrice(product.new_price)}</p>
                    </div>
                    <div className="item-price-detail">
                        <p className="item-old-price">{formatPrice(product.old_price)}</p>
                    </div>
                </div>
                <div className="box-order-btn">
                    <button onClick={() => addToCart(product.id)} className="order-btn">
                        <Link to='/cart'>
                            <strong>MUA NGAY</strong>
                            <span>(Thanh toán khi nhận hàng hoặc nhận tại cửa hàng)</span>
                        </Link>
                    </button>
                    <button onClick={() => addToCart(product.id)} className="add-to-cart-btn">
                        <FontAwesomeIcon icon={faCartPlus} />
                        <span>Thêm vào giỏ</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDisplay