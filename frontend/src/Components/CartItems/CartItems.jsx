import React, { useContext } from 'react'
import './CartItems.css'
import remove_icon from '../Assets/cart_cross_icon.png'
import { ShopContext } from '../../Context/ShopContext'

function CartItems() {
    const {allProducts, cartItems, removeFromCart, getTotalCost} = useContext(ShopContext)

    const formatPrice = (price) => {
        let priceString = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        return priceString.replace(/\s/g, '');
    }

  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Sản phẩm</p>
            <p>Tên sản phẩm</p>
            <div><p>Giá</p></div>
            <div><p>Số lượng</p></div>
            <div><p>Tổng tiền</p></div>
            <div><p>Xoá</p></div>
        </div>
        <hr />
        {
            cartItems.map((product, index) => {
                let key = 0;
                if (product.length > 0) {
                    return product.map((item) => {
                        return (
                            <div key={key++}>
                                <div className="cartitems-format-main cartitem-format">
                                    <img src={item.image} alt="" className='cartitem-product-icon' />
                                    <p>{allProducts[index - 1].name}; {item.color}</p>
                                    <div><p>{formatPrice(item.price)}</p></div>
                                    <div><button className='cartitem-quantity'>{item.quantity}</button></div>
                                    <div><p>{formatPrice(item.price * item.quantity)}</p></div>
                                    <img className='cartitem-remove-icon' src={remove_icon} onClick={() => removeFromCart(index, item.color)} alt="" />
                                </div>
                                <hr />
                            </div>
                        )
                    })
                }
                return null;
            })
        }
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Tổng tiền</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Tổng tiền hàng</p>
                        <p>{formatPrice(getTotalCost())}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Tổng tiền phí vận chuyển</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Tổng thanh toán</h3>
                        <h3>{formatPrice(getTotalCost())}</h3>
                    </div>
                </div>
                <button>ĐẶT HÀNG</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='Promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems