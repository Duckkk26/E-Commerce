import React, { useContext } from 'react'
import './CartItems.css'
import remove_icon from '../Assets/cart_cross_icon.png'
import { ShopContext } from '../../Context/ShopContext'

function CartItems() {
    const {all_product, cartItems, removeFromCart, getTotalCost} = useContext(ShopContext)

  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <div><p>Price</p></div>
            <div><p>Quantity</p></div>
            <div><p>Total</p></div>
            <div><p>Remove</p></div>
        </div>
        <hr />
        {all_product.map((item, index) => {
            if (cartItems[item.id] > 0) {
                return (
                    <div key={index}>
                        <div className="cartitems-format-main cartitem-format">
                            <img src={item.image} alt="" className='cartitem-product-icon' />
                            <p>{item.name}</p>
                            <div><p>${item.new_price}</p></div>
                            <div><button className='cartitem-quantity'>{cartItems[item.id]}</button></div>
                            <div><p>${item.new_price * cartItems[item.id]}</p></div>
                            <img className='cartitem-remove-icon' src={remove_icon} onClick={() => removeFromCart(item.id)} alt="" />
                        </div>
                        <hr />
                    </div>
                )
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCost()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCost()}</h3>
                    </div>
                </div>
                <button>PROCEED TO CHECKOUT</button>
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