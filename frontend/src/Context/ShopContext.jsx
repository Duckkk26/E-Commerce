import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300 + 1; i++) {
        cart[i] = 0;
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
            fetch('http://localhost:4000/user/getCart', {
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
    
    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/user/addToCart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"itemId":  itemId})
            })
                .then((res) => res.json())
                .then((data) => console.log(data));
        }
    }
    
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/user/removeFromCart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"itemId":  itemId})
            })
                .then((res) => res.json())
                .then((data) => console.log(data));
        }
    }

    const getTotalCost = () => {
        let totalCost = 0;
        for(const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = allProducts.find((product) => product.id === Number(item))
                totalCost += itemInfo.new_price * cartItems[item];
            }
        }
        return totalCost;
    }

    const getTotalItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
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