import React, { useContext } from 'react'
import './CartItems.css'
import remove_icon from '../Assets/cart_cross_icon.png'
import { ShopContext } from '../../Context/ShopContext'

function CartItems() {
    const {allProducts, cartItems, addToCart, removeFromCart, deleteFromCart, getTotalCost} = useContext(ShopContext)

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
                return (
                    <div key={index}>
                        <div className="cartitems-format-main cartitem-format">
                            <img src={product.image} alt="" className='cartitem-product-icon' />
                            <p>{allProducts[product.productId - 1].name} - {product.color}</p>
                            <div><p>{formatPrice(product.price)}</p></div>
                            <div className='cartitem-quantity-action'>
                                <span 
                                    className="minus"
                                    onClick={() => removeFromCart(product.productId, product.color)}
                                >
                                    -
                                </span>
                                <input type="text"  className='cartitem-quantity' readOnly value={product.quantity} />
                                <span 
                                    className="plus"
                                    onClick={() => addToCart(product.productId, product.color, product.image, product.price)}
                                >
                                    +
                                </span>
                            </div>
                            <div><p>{formatPrice(product.price * product.quantity)}</p></div>
                            <img className='cartitem-delete-icon' src={remove_icon} onClick={() => deleteFromCart(product.productId, product.color)} alt="" />
                        </div>
                        <hr />
                    </div>
                )
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