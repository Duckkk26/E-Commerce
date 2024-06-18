import React, { useContext, useState } from 'react'
import axios from 'axios';
import { ShopContext } from '../../Context/ShopContext'
import { useLocation, useNavigate } from 'react-router-dom';
import ModalViewList from '../ModalViewList/ModalViewList';

function OrderBottomBar({ order, handleChange, getTotalCost, getTotalOrderItems, saveOrderTolocalStorage }) {
  const { formatPrice } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isViewList, setIsViewList] = useState(false);

  const handleCheckout = async () => {
    try {
      let resData;

      await axios.post('http://localhost:4000/order/add', {
        ...order,
        address: `${order.address.street}, ${order.address.ward}, ${order.address.district}, ${order.address.province}`
      }, {
        headers: {
          "auth-token": `${localStorage.getItem('auth-token')}`,
        }
      })
        .then(res => {
          resData = res.data
        })


      if (resData.success) {
        let orderId = resData.data.orderId
        handleChange('id', orderId);

        if (order.payment_modal === 'VNPAY') {
          const response = await axios.post('http://localhost:4000/pay/vnpay/create_payment_url', {
            orderId: orderId,
            amount: getTotalCost(),
            orderType: 110000
          })
          
          if (response.data && response.data.redirectUrl) {
            // Chuyển hướng người dùng đến URL thanh toán
            window.open(response.data.redirectUrl, '_blank');
          }
        }

        // Chuyển đến trang Checkout thông báo đặt hàng thành công
        saveOrderTolocalStorage({...order, id: orderId});
        navigate('/order/checkout')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="order-bottom-bar">
        <div className="order-total-box">
          <p className="order-title-temp">Tổng tiền tạm tính:</p>
          <div className="order-price">
              <span className="order-total">{formatPrice(getTotalCost())}</span>
          </div>
        </div>
        <div className="btn-submit">
          {
              (location.pathname === '/order/payment-info') ?
              <button onClick={() => navigate('/order/payment')} className="btn btn-danger">
                  Tiếp tục
              </button> :
              <button onClick={() => handleCheckout()} className="btn btn-danger">
                  Thanh toán
              </button>
          }
          {
              (location.pathname === '/order/payment') &&
              <div id='viewListItemInQuote'>
                  <button type="button" onClick={() => setIsViewList(true)} className="btn">
                      Kiểm tra danh sách sản phẩm ({getTotalOrderItems()})
                  </button>
              </div>
          }
        </div>
      </div>
      <div style={{paddingTop: `${location.pathname === '/order/payment' ? '168px' : '130px'}`}}></div>
      {isViewList && <ModalViewList products={order.products} closeViewList={() => setIsViewList(false)} />}
    </div>
  )
}

export default OrderBottomBar