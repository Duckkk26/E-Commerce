import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = [];
    for (let i = 0; i < 300 + 1; i++) {
        cart[i] = [];
    }
    return cart;
}

function ShopContextProvider(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const fetchData = async () => {
        await fetch('http://localhost:4000/product/all')
            .then((res) => res.json())
            .then((data) => setAllProducts(data));

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/cart/get', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: "",
            }).then((res) => res.json())
            .then((data) => setCartItems(data));
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    const addToCart = (productId, color, image, price) => {
        let found = false;
        let index = 0;
        let newCartItems = [...cartItems]
        cartItems[productId].forEach((variant, i) => {
            if (variant && variant.color === color) {
                found = true;
                index = i;
            }
        })
        if (found) {
            newCartItems[productId][index].quantity += 1;
        }
        else {
            newCartItems[productId] = [
                ...newCartItems[productId],
                {
                    color: color,
                    image: image,
                    price: price,
                    quantity: 1
                }
            ]
        }
        setCartItems(newCartItems)

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/cart/addToCart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "productId": productId,
                    "color": color,
                    "image": image,
                    "price": price
                })
            })
            .then((res) => res.json())
            .then((data) => console.log(data));
        }
    }
    
    const removeFromCart = (productId, color) => {
        let found = false;
        let index = 0;
        let newCartItems = [...cartItems]
        cartItems[productId].forEach((variant, i) => {
            if (variant && variant.color === color) {
                found = true;
                index = i;
            }
        })
        if (found) {
            if (newCartItems[productId][index].quantity > 0) {
                newCartItems[productId][index].quantity -= 1;
            }
            if (newCartItems[productId][index].quantity === 0) {
                newCartItems[productId].splice(index, 1);
            }
        }
        setCartItems(newCartItems);

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/cart/removeFromCart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "productId": productId,
                    "color": color
                })
            })
            .then((res) => res.json())
            .then((data) => console.log(data));
        }
    }

    const getTotalCost = () => {
        let totalCost = 0;
        cartItems.forEach((product) => {
            if (product.length > 0) {
                product.forEach((color) => {
                    totalCost += color.price * color.quantity;
                })
            }
        })
        return totalCost;
    }

    const getTotalItems = () => {
        let totalItems = 0;
        cartItems.forEach((product) => {
            if (product.length > 0) {
                product.forEach((color) => {
                    totalItems += color.quantity;
                })
            }
        })
        return totalItems;
    }
    
    const contextValue = {allProducts, cartItems, addToCart, removeFromCart, getTotalCost, getTotalItems};
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;