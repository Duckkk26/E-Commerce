import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

function ShopContextProvider(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);

    const fetchData = async () => {
        await fetch('http://localhost:4000/product/all')
            .then((res) => res.json())
            .then((data) => setAllProducts(data));

        if (sessionStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/cart/get', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${sessionStorage.getItem('auth-token')}`,
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
            if (isProductInOrder({productId, color})) {
                let quantity = newCartItems[index].quantity;
                addToOrder({productId, color, quantity});
            }
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

        if (sessionStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/cart/addToCart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${sessionStorage.getItem('auth-token')}`,
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
                if (isProductInOrder({productId, color})) {
                    let quantity = newCartItems[index].quantity;
                    addToOrder({productId, color, quantity});
                }
            }
            if (newCartItems[index].quantity === 0) {
                removeFromOrder({productId, color});
                newCartItems.splice(index, 1);
            }
        }
        setCartItems(newCartItems);

        if (sessionStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/cart/removeFromCart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${sessionStorage.getItem('auth-token')}`,
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

    const deleteFromCart = (productId, color) => {
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
            removeFromOrder({productId, color});
            newCartItems.splice(index, 1);
        }
        setCartItems(newCartItems);

        if (sessionStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/cart/deleteFromCart', {
                method: 'DELETE',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${sessionStorage.getItem('auth-token')}`,
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
    
    const getTotalItems = () => {
        let totalItems = 0;
        cartItems.forEach((product) => {
            totalItems += Number(product.quantity);
        })
        return totalItems;
    }

    const addToOrder = (product) => {
        if (product instanceof Array) {
            setOrderProducts([...product]);
        } else {
            const foundProduct = isProductInOrder(product);
            if (foundProduct) {
                foundProduct.quantity = product.quantity;
            } else {
                setOrderProducts(prev => [...prev, product]);
            }
        }
    }

    const removeFromOrder = (product) => {
        if (product instanceof Array) {
            setOrderProducts([]);
        } else {
            const index = orderProducts.findIndex(item => item.productId === product.productId && item.color === product.color)
            if (index !== -1) {
                setOrderProducts(prev => {
                    prev.splice(index, 1);
                    return [...prev];
                });
            }
        }
    }

    const isProductInOrder = (product) => {
        return orderProducts.find(item => item.productId === product.productId && item.color === product.color);
    }

    const getTotalCost = () => {
        let totalCost = 0;
        orderProducts.forEach((product) => {
            totalCost += product.price * product.quantity
        })
        return totalCost;
    }
    
    const contextValue = {allProducts, cartItems, orderProducts,
        addToCart, removeFromCart, deleteFromCart, getTotalItems, 
        addToOrder, removeFromOrder, isProductInOrder, getTotalCost
    };
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;