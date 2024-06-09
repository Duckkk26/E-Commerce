import React from 'react'

import './PaymentModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import vnpayIcon from '../Assets/vnpay.png'
import shipperPayment from '../Assets/shipper-payment.jpg'
import tickIcon from '../Assets/download.svg'

function PaymentModal({ handlePopup }) {
  return (
    <>
        <div className="payment-overlay"></div>
        <div className="payment-modal">
            <div className="payment-modal__head">
                <p>Chọn phương thức thanh toán</p>
                <em onClick={() => handlePopup()}>
                    <FontAwesomeIcon icon={faXmark} />
                </em>
            </div>
            <div className="payment-modal__body">
                <div className="payment-modal__body-main">
                    <div className="list-payment">
                        <p>Khả dụng</p>
                        <div className="list-payment__item">
                            <div className="payment-item__img">
                                <img src={shipperPayment} alt="" />
                            </div>
                            <div className="payment-item__title">
                                <p>Thanh toán khi nhận hàng</p>
                            </div>
                            <div className="payment-item__tick"></div>
                        </div>
                        <div className="list-payment__item list-payment__item--active">
                            <div className="payment-item__img">
                                <img src={vnpayIcon} alt="" />
                            </div>
                            <div className="payment-item__title">
                                <p>VNPAY</p>
                            </div>
                            <div className="payment-item__tick">
                                <img src={tickIcon} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="payment-modal__bottom">
                <button disabled="disabled" className="btn btn-danger">
                    Xác nhận
                </button>
            </div>
        </div>
    </>
  )
}

export default PaymentModal