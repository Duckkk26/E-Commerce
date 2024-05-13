import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

function ShopContextProvider(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

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
        cartItems.forEach((product, i) => {
            if (product && product.productId === productId && product.color === color) {
                found = true;
                index = i;
            }
        })
        if (found) {
            newCartItems[index].quantity += 1;
        }
        else {
            newCartItems = [
                ...newCartItems,
                {
                    productId: productId,
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
        cartItems.forEach((product, i) => {
            if (product && product.productId === productId && product.color === color) {
                found = true;
                index = i;
            }
        })
        if (found) {
            if (newCartItems[index].quantity > 0) {
                newCartItems[index].quantity -= 1;
            }
            if (newCartItems[index].quantity === 0) {
                newCartItems.splice(index, 1);
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
            totalCost += product.price * product.quantity
        })
        return totalCost;
    }

    const getTotalItems = () => {
        let totalItems = 0;
        cartItems.forEach((product) => {
            totalItems += Number(product.quantity);
        })
        return totalItems;
    }
    console.log(cartItems);
    
    const contextValue = {allProducts, cartItems, addToCart, removeFromCart, getTotalCost, getTotalItems};
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;