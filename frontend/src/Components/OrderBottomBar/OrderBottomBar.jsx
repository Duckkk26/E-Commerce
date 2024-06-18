import React, { useContext, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { useLocation, useNavigate } from 'react-router-dom';
import ModalViewList from '../ModalViewList/ModalViewList';

function OrderBottomBar({ order, getTotalCost, getTotalOrderItems }) {
  const { formatPrice } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isViewList, setIsViewList] = useState(false);

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
              <button className="btn btn-danger">
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