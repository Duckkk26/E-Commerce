import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import './AddAndEditProduct.css'

import uploadArea from '../../assets/upload_area.svg'

function AddAndEditProduct({ mode }) {
    const {productId} = useParams();
    const [images, setImages] = useState([]);
    const [productDetails, setProductDetails] = useState({
        name: "",
        images: [],
        category: "",
        brand: "",
        new_price: "",
        old_price: "",
        description: "",
        label: "new",
        quantity: "0"
    });

    const fetchProduct = async (req, res) => {
        let resData;
        
        if (productId) {
            await fetch(`http://localhost:4000/product/get/${productId}`)
                .then(res => res.json())
                .then(data => resData = data)

            setProductDetails(resData)
        }
    }

    console.log(productDetails);

    useEffect(() => {
        if (mode === 'edit') {
            fetchProduct();
        }
        else if (mode === 'add') {
            setProductDetails({
                name: "",
                images: [],
                category: "",
                brand: "",
                new_price: "",
                old_price: "",
                description: "",
                label: "new",
                quantity: "0"
            });
            setImages([]);
        }
    }, [])

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
            await fetch('http://localhost:4000/product/add', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
                .then((res) => res.json())
                .then((data) => {
                    data.success ? alert("Product Added") : alert("Failed")
                });
        }

        setProductDetails({
            name: "",
            images: [],
            category: "",
            brand: "",
            new_price: "",
            old_price: "",
            description: "",
            label: "new",
            quantity: "0"
        });
        setImages([]);
    }

    const editProduct = async () => {
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
            product.images = [...product.images, ...resData.image_urls];
            await fetch('http://localhost:4000/product/update', {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
                .then((res) => res.json())
                .then((data) => {
                    data.success ? alert("Product Detail Changed") : alert("Failed")
                });
        }
    }

  return (
    <div className='add-and-edit-product'>
        <div className="product-itemfield">
            <p>Tên sản phẩm</p>
            <input value={productDetails.name} onChange={(e) => handleChange(e)} type="text" name="name" placeholder='Type here' />
        </div>
        <div className="product-itemfield">
            <p>Danh mục</p>
            <select value={productDetails.category} onChange={(e) => handleChange(e)} name="category" className='product-selector' placeholder='Chọn danh mục'>
                <option value="" disabled>Chọn danh mục</option>
                <option value="Mobile">Mobile</option>
                <option value="Tablet">Tablet</option>
                <option value="Laptop">Laptop</option>
                <option value="PersonalComputer">PC</option>
            </select>
        </div>
        <div className="product-itemfield">
            <p>Thương hiệu</p>
            <select value={productDetails.brand} onChange={(e) => handleChange(e)} name="brand" className='product-selector' placeholder='Chọn thương hiệu'>
                <option value="" disabled>Chọn thương hiệu</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="OPPO">OPPO</option>
            </select>
        </div>
        <div className="product-price">
            <div className="product-itemfield">
                <p>Giá bán</p>
                <input value={productDetails.old_price} onChange={(e) => handleChange(e)} type="text" name='old_price' placeholder='Type here' />
            </div>
            <div className="product-itemfield">
                <p>Giá khuyến mãi</p>
                <input value={productDetails.new_price} onChange={(e) => handleChange(e)} type="text" name='new_price' placeholder='Type here' />
            </div>
        </div>
        <div className="product-itemfield">
            <p>Hình ảnh</p>
            <div className="product-item-images">
                {productDetails.images.length > 0 ? 
                    productDetails.images.map((image, i) => {
                        return (
                            <img key={i} src={image} className='product-thumbnail-img' alt="" />
                        )
                    })
                : <></>
                }
                {images.length > 0 ? 
                    images.map((image, i) => {
                        return (
                            <img key={i} src={URL.createObjectURL(image)} className='product-thumbnail-img' alt="" />
                        )
                    })
                : <></>
                }
                <label htmlFor="file-input">
                    <img src={uploadArea} className='product-thumbnail-img' alt="" />
                </label>
                <input onChange={(e) => handleImages(e)} type="file" name="image" id="file-input" hidden />
            </div>
        </div>
        <div className="product-itemfield">
            <p>Nhãn sản phẩm</p>
            <select value={productDetails.label} onChange={(e) => handleChange(e)} name="label" className='product-selector'>
                <option value="new">Mới</option>
                <option value="popular">Nổi bật</option>
            </select>
        </div>
        <div className="product-itemfield">
            <p>Số lượng</p>
            <input value={productDetails.quantity} onChange={(e) => handleChange(e)} type="text" name="quantity" placeholder='Type here' />
        </div>
        <div className="product-itemfield">
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
        {mode === 'add' && <button onClick={() => addProduct()} className="addproduct-btn">ADD</button>}
        {mode === 'edit' &&<button onClick={() => editProduct()} className='editproduct-btn'>SAVE CHANGES</button>}
    </div>
  )
}

export default AddAndEditProduct;