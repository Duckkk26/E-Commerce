import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../Components/Breadcrumbs/Breadcrumbs';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

import './CSS/Product.css'

function Product() {
  const {allProducts} = useContext(ShopContext);
  const {productId} = useParams();
  const product = allProducts.find((item) => item.id === Number(productId));

  return (
    <div className='product'>
      {
        product  
        ? <>
            <Breadcrumbs product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox />
            <RelatedProducts />
        </>
        : <></>
      }
    </div>
  )
}

export default Product