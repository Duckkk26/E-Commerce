import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'

function Popular() {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/popularInWomen')
      .then((res) => res.json())
      .then((data) => setPopularProducts(data));
  }, []);

  return (
    <div className='popular'>
        <h1>THE MOST POPULAR MOBILES</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.map((item, index) => {
                return <Item 
                            key={index} 
                            id={item.id}
                            name={item.name} 
                            image={item.image} 
                            new_price={item.new_price} 
                            old_price={item.old_price} 
                        />
            })}
        </div>
    </div>
  )
}

export default Popular;