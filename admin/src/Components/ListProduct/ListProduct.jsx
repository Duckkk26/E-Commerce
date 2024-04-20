import React, { useEffect, useState } from 'react'
import './ListProduct.css'

import crossIcon from '../../assets/cross_icon.png'

function ListProduct() {
    const [allProducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allProducts')
            .then((res) => res.json())
            .then((data) => {
                setAllProducts(data);
            });
    };
    
    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        await fetch('http://localhost:4000/removeProduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        });
        await fetchInfo();
    }

  return (
    <div className='listproduct'>
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
            <p>Products</p>
            <p>Titles</p>
            <div><p>Old Price</p></div>  
            <div><p>New Price</p></div>
            <div><p>Category</p></div>
            <div><p>Remove</p></div>
        </div>
        <div className="listproduct-allproducts">
            <hr />
            {allProducts.map((product, index) => {
                return (
                    <div key={index}>
                        <div className="listproduct-format-main listproduct-format">
                            <img src={product.image} alt="" className="listproduct-product-icon" />
                            <p>{product.name}</p>
                            <div><p>${product.old_price}</p></div>
                            <div><p>${product.new_price}</p></div>
                            <div><p>{product.category}</p></div>
                            <div><img onClick={() => removeProduct(product.id)} src={crossIcon} alt="" className="listproduct-remove-icon" /></div>
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ListProduct