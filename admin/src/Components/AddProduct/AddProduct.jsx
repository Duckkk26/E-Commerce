import React, { useState } from 'react'
import './AddProduct.css'

import uploadArea from '../../assets/upload_area.svg'

function AddProduct() {
    const [images, setImages] = useState([]);
    const [productDetails, setProductDetails] = useState({
        name: "",
        images: [],
        category: "Mobile",
        brand: "apple",
        new_price: "",
        old_price: "",
        description: "",
        label: "new",
        quantity: "0"
    });

    const handleImages = (e) => {
        setImages([...images, e.target.files[0]]);
    };

    const handleChange = (e) => {
        setProductDetails({...productDetails, [e.target.name]: e.target.value})
    }

    const addProduct = async () => {
        let resData;
        let product = productDetails;

        let formData = new FormData();
        images.forEach(image => {
            formData.append('product', image);
        });

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {
                resData = data;
            });

        if (resData.success) {
            product.images = resData.image_urls;
            await fetch('http://localhost:4000/addProduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
                .then((res) => res.json())
                .then((data) => {
                    data.success?alert("Product Added"):alert("Failed")
                });
        }

        setProductDetails({
            name: "",
            images: [],
            category: "Mobile",
            brand: "apple",
            new_price: "",
            old_price: "",
            description: "",
            label: "new",
            quantity: "0"
        });
        setImages([]);
    }

  return (
    <div className='addproduct'>
        <div className="addproduct-itemfield">
            <p>Tên sản phẩm</p>
            <input value={productDetails.name} onChange={(e) => handleChange(e)} type="text" name="name" placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Danh mục</p>
            <select value={productDetails.category} onChange={(e) => handleChange(e)} name="category" className='addproduct-selector' placeholder='Chọn danh mục'>
                <option value="Mobile">Mobile</option>
                <option value="Tablet">Tablet</option>
                <option value="Laptop">Laptop</option>
                <option value="PersonalComputer">PC</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <p>Thương hiệu</p>
            <select value={productDetails.brand} onChange={(e) => handleChange(e)} name="brand" className='addproduct-selector' placeholder='Chọn thương hiệu'>
                <option value="apple">Apple</option>
                <option value="samsung">Samsung</option>
                <option value="xiaomi">Xiaomi</option>
                <option value="oppo">OPPO</option>
            </select>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Giá bán</p>
                <input value={productDetails.old_price} onChange={(e) => handleChange(e)} type="text" name='old_price' placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <p>Giá khuyến mãi</p>
                <input value={productDetails.new_price} onChange={(e) => handleChange(e)} type="text" name='new_price' placeholder='Type here' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Hình ảnh</p>
            <div className="addproduct-item-images">
                {images.length > 0 ? 
                    images.map((image, i) => {
                        return (
                            <img key={i} src={URL.createObjectURL(image)} className='addproduct-thumbnail-img' alt="" />
                        )
                    })
                : <></>
                }
                <label htmlFor="file-input">
                    <img src={uploadArea} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={(e) => handleImages(e)} type="file" name="image" id="file-input" hidden />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Nhãn sản phẩm</p>
            <select value={productDetails.label} onChange={(e) => handleChange(e)} name="label" className='addproduct-selector'>
                <option value="new">Mới</option>
                <option value="popular">Nổi bật</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <p>Số lượng</p>
            <input value={productDetails.quantity} onChange={(e) => handleChange(e)} type="text" name="quantity" placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Mô tả</p>
            <textarea 
                name="description" 
                id="description" 
                cols="30" 
                rows="10"
                value={productDetails.description}
                onChange={(e) => handleChange(e)}
                placeholder='Type here'
            />
        </div>
        <button onClick={() => addProduct()} className="addproduct-btn">ADD</button>
    </div>
  )
}

export default AddProduct