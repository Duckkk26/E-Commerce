import React, { useContext, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import PaymentModal from '../PaymentModal/PaymentModal';

import './Payment.css'
import paymentIcon from '../Assets/payment.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

function Payment({ reciever }) {
  const { orderProducts, formatPrice, getTotalCost } = useContext(ShopContext);
  const [isModal, setIsModal] = useState(false);

  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
    <>
      <div className="info-payment">
        <div className="block-promotion">
          <div className="block-promotion-input">
            <div className="box-input">
              <input type="text" placeholder='Nhập mã giảm giá (chỉ áp dụng 1 lần)' maxLength={255} autoComplete='off' className="box-input__main" />
              <label>MÃ GIẢM GIÁ</label>
              <div className="box-input__line"></div>
            </div>
            <button disabled="disabled" className='btn btn-danger btn__voucher'>Áp dụng</button>
          </div>
        </div>
        <div className="info-quote">
          <div className="info-quote__block">
            <div className="quote-block__item">
              <p className="quote-block__title">Số lượng sản phẩm</p>
              <p className="quote-block__value">{orderProducts.length}</p>
            </div>
            <div className="quote-block__item">
              <p className="quote-block__title">Tiền hàng (tạm tính)</p>
              <p className="quote-block__value">{formatPrice(getTotalCost())}</p>
            </div>
            <div className="quote-block__item">
              <p className="quote-block__title">Phí vận chuyển</p>
              <p className="quote-block__value">Miễn phí</p>
            </div>
          </div>
          <div className="info-quote__bottom">
            <div className="quote-bottom__title">
              <p>Tổng tiền</p>
              <span>(đã gồm VAT)</span>
            </div>
            <p className="quote-bottom__value">{formatPrice(getTotalCost())}</p>
          </div>
        </div>
      </div>
      <div className="payment-quote">
        <p>Thông tin thanh toán</p>
        <div onClick={() => setIsModal(!isModal)} className="payment-quote__main">
          <div className="payment-main__img">
            <img src={paymentIcon} alt="" />
          </div>
          <div className="payment-main__title">
            <p>Chọn phương thức thanh toán</p>
            <span>Nhận thêm nhiều ưu đãi tại cổng</span>
          </div>
          <div className="payment-main__arrow">
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
        <div className="payment-quote__modal">
          {isModal && <PaymentModal handlePopup={() => setIsModal(!isModal)} />}
        </div>
      </div>
      <div className="address-quote">
        <p>Thông tin nhận hàng</p>
        <div className="address-quote__main">
          <div className="address-quote__block">
            <div className="address-quote__item">
              <p className="address-quote__title">Khách hàng</p>
              <p className="address-quote__value">{user.username}</p>
            </div>
            <div className="address-quote__item">
              <p className="address-quote__title">Email</p>
              <p className="address-quote__value">{user.email}</p>
            </div>
            <div className="address-quote__item">
              <p className="address-quote__title">Nhận hàng tại</p>
              <p className="address-quote__value"></p>
            </div>
            <div className="address-quote__item">
              <p className="address-quote__title">Người nhận</p>
              <p className="address-quote__value"></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment