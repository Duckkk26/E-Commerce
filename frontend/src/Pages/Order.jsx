import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

import './CSS/Order.css'

import PaymentInfo from '../Components/PaymentInfo/PaymentInfo';
import Payment from '../Components/Payment/Payment';
import Checkout from '../Components/Checkout/Checkout';
import OrderNav from '../Components/OrderNav/OrderNav';
import OrderBottomBar from '../Components/OrderBottomBar/OrderBottomBar';

function Order() {
  const { orderProducts } = useContext(ShopContext);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Hàm để lưu order vào localStorage
  const saveOrderTolocalStorage = (order) => {
    if (orderProducts.length) {
      localStorage.setItem('order', JSON.stringify(order));
    }
  };

  // Hàm để tải order từ localStorage
  const loadOrderFromlocalStorage = () => {
    const savedOrder = localStorage.getItem('order');
    if (savedOrder && !orderProducts.length) {
      return JSON.parse(savedOrder);
    }
    return null;
  };

  const [order, setOrder] = useState(() => {
    const savedOrder = loadOrderFromlocalStorage();
    return savedOrder || {
      username: user.username,
      email: user.email,
      customer_name: "",
      phone: "",
      address: {
        street: "",
        ward: "",
        district: "",
        province: ""
      },
      products: orderProducts,
      note: "",
      payment_modal: ""
    }
  })

  useEffect(() => {
    saveOrderTolocalStorage(order)
  }, [order.products])

  const getTotalOrderItems = () => {
    let totalItems = 0;
    order.products.forEach((product) => {
        totalItems += Number(product.quantity);
    })
    return totalItems;
  }

  const getTotalCost = () => {
    let totalCost = 0;
    order.products.forEach((product) => {
        totalCost += product.new_price * product.quantity
    })
    return totalCost;
  }

  const handleChange = (name, value) => {
    setOrder({...order, [name]: value});
  }

  return (
    <div className='order'>
      <div className="order-container">
        {location.pathname !== '/order/checkout' ? <OrderNav /> : <></>}
        <Routes>
          <Route path='/' element={<Navigate to='/order/payment-info' />} />
          <Route path='/payment-info' element={<PaymentInfo order={order} handleChange={handleChange} />} />
          <Route path='/payment' element={
              <Payment 
                order={order} 
                getTotalOrderItems={getTotalOrderItems}
                getTotalCost={getTotalCost}
                handleChange={handleChange} 
              />
            } 
          />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </div>
      {
        location.pathname !== '/order/checkout' ?
        <OrderBottomBar 
          order={order}
          getTotalCost={getTotalCost}
          getTotalOrderItems={getTotalOrderItems}
        /> :
        <></>
      }
    </div>
  )
}

export default Order