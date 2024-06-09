import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Header and Footer Components
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer'

// Import Pages
import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Order from './Pages/Order';
import LoginSignup from './Pages/LoginSignup'

// Import CSS
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="clear"></div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mobile' element={<ShopCategory category="Mobile" />}>
            <Route path=':brandName' element={<ShopCategory category="Mobile" />} />
          </Route>
          <Route path='/tablet' element={<ShopCategory category="Tablet" />} />
          <Route path='/laptop' element={<ShopCategory category="Laptop" />} />
          <Route path='/personalcomputer' element={<ShopCategory category="PersonalComputer" /> } />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/order/*' element={<Order />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;