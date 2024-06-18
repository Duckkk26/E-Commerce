import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function OrderNav() {
    const navigate = useNavigate();
    const location = useLocation();

  return (
    <div className="order-nav">
        <div 
            onClick={() => navigate('/order/payment-info')} 
            className={`order-nav__item ${location.pathname === '/order/payment-info' ? 'order-nav__item--active' : ''}`}
        >
            <span>1. Thông tin</span>
        </div>
        <div 
            onClick={() => navigate('/order/payment')} 
            className={`order-nav__item ${location.pathname === '/order/payment' ? 'order-nav__item--active' : ''}`}
        >
            <span>2. Thanh toán</span>
        </div>
    </div>
  )
}

export default OrderNav