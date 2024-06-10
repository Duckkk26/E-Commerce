import React, { useContext, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

import './CSS/Order.css'

import PaymentInfo from '../Components/PaymentInfo/PaymentInfo';
import Payment from '../Components/Payment/Payment';
import ModalViewList from '../Components/ModalViewList/ModalViewList';

function Order() {
  const { orderProducts, formatPrice, getTotalCost } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isViewList, setIsViewList] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [order, setOrder] = useState({
    username: user.username,
    email: user.email,
    customer_name: "",
    phone: "",
    address: "",
    products: orderProducts,
    note: "",
    payment_modal: "",
    payment_status: ""
  })

  const handleChange = (name, value) => {
    setOrder({...order, [name]: value});
  }

  const handleSubmit = () => {
    if (location.pathname === '/order/payment-info') {
      navigate('/order/payment');
    }
  }

  return (
    <div className='order'>
      <div className="order-container">
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
        <Routes>
          <Route path='/' element={<Navigate to='/order/payment-info' />} />
          <Route path='/payment-info' element={<PaymentInfo order={order} handleChange={handleChange} />} />
          <Route path='/payment' element={<Payment order={order} handleChange={handleChange} />} />
        </Routes>
      </div>
      <div>
        <div className="order-bottom-bar">
          <div className="order-total-box">
            <p className="order-title-temp">Tổng tiền tạm tính:</p>
            <div className="order-price">
              <span className="order-total">{formatPrice(getTotalCost())}</span>
            </div>
          </div>
          <div className="btn-submit">
            <button onClick={() => handleSubmit()} className="btn btn-danger">
              {
                location.pathname === '/order/payment-info' ? "Tiếp tục" : "Thanh toán"
              }
            </button>
            {
              (location.pathname === '/order/payment') &&
              <div id='viewListItemInQuote'>
                <button type="button" onClick={() => setIsViewList(true)} className="btn">
                  Kiểm tra danh sách sản phẩm ({order.products.length})
                </button>
              </div>
            }
          </div>
        </div>
        <div style={{paddingTop: `${location.pathname === '/order/payment' ? '168px' : '130px'}`}}></div>
        {isViewList && <ModalViewList products={order.products} closeViewList={() => setIsViewList(false)} />}
      </div>
    </div>
  )
}

export default Order