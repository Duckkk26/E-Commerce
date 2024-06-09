import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import './PaymentInfo.css'

function PaymentInfo() {
  const { orderProducts, formatPrice } = useContext(ShopContext);

  return (
    <>
      <div className="view-list">
        <div className="view-list__wrapper">
          {
            orderProducts.map((product, index) => {
              return (
                <div key={index} className="order-item order-item--show">
                  <img src={product.image} alt={product.name} loading='lazy' className='item__img' />
                  <div className="item__info">
                    <p className="item__name">{product.name} - {product.color}</p>
                    <div className="item__price">
                      <div>
                        <div className="block-box-price">
                          <div className="box-info__box-price">
                            <p className="product__price--show">{formatPrice(product.new_price)}</p>
                            <p className="product__price--through">{formatPrice(product.old_price)}</p>
                          </div>
                        </div>
                      </div>
                      <p>
                        Số lượng:&nbsp;
                        <span className="text-danger">{product.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="view-list__title">
          <button>
            thu gọn
            <FontAwesomeIcon icon={faAngleUp} />
          </button>
        </div>
      </div>
      <div className="block-customer"></div>
      <div className="block-payment">
        <p>Thông tin nhận hàng</p>
        <div className="block-payment__wrapper">
          <div className="block-payment__main">
            <div className="payment-main__shipping payment-main__item">
              <div className="customer-reciever">
                <div className="box-input">
                  <input type="text" placeholder='Họ tên người nhận' maxLength={1000} autoComplete='off' className="box-input__main" />
                  <label>TÊN NGƯỜI NHẬN</label>
                  <div className="box-input__line"></div>
                </div>
                <div className="box-input">
                  <input type="text" placeholder='Số điện thoại người nhận' maxLength={10} autoComplete='off' className="box-input__main" />
                  <label>SĐT NGƯỜI NHẬN</label>
                  <div className="box-input__line"></div>
                </div>
              </div>
              <div className="box-wrapper">
                <div className="box-select">
                  <div className="box-input">
                    <input type="search" name="" id="" placeholder='Chọn tỉnh/thành phố' autoComplete='off' className="box-input__main" />
                    <label>TỈNH / THÀNH PHỐ</label>
                    <div className="box-input__line"></div>
                    <div className="box-input__arrow">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div className="box-input__dropdown">
                      <div className="dropdown">
                        <div className="dropdown__item">
                          <span>Hà Nội</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-input">
                    <input type="search" name="" id="" placeholder='Chọn quận/huyện' autoComplete='off' className="box-input__main" />
                    <label>QUẬN / HUYỆN</label>
                    <div className="box-input__line"></div>
                    <div className="box-input__arrow">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div className="box-input__dropdown">
                      <div className="dropdown">
                        <div className="dropdown__item">
                          <span>Hà Nội</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box-select">
                  <div className="box-input">
                    <input type="search" name="" id="" placeholder='Chọn phường/xã' autoComplete='off' className="box-input__main" />
                    <label>PHƯỜNG / XÃ</label>
                    <div className="box-input__line"></div>
                    <div className="box-input__arrow">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div className="box-input__dropdown">
                      <div className="dropdown">
                        <div className="dropdown__item">
                          <span>Hà Nội</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-input">
                    <input type="text" placeholder='Số nhà, tên đường' maxLength={1000} autoComplete='off' className="box-input__main" />
                    <label>Địa chỉ</label>
                    <div className="box-input__line"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-note">
              <div className="box-input">
                <input type="text" placeholder='Ghi chú khác (nếu có)' maxLength={255} autoComplete='off' className="box-input__main" />
                <label>GHI CHÚ</label>
                <div className="box-input__line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentInfo