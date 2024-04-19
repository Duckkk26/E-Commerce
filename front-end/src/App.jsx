import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';

import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup'
import Footer from './Components/Footer/Footer'
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mobile' element={<ShopCategory category="men" banner={men_banner} />} />
          <Route path='/tablet' element={<ShopCategory category="women" banner={women_banner} />} />
          <Route path='/laptop' element={<ShopCategory category="kid" banner={kid_banner} />} />
          <Route path='/personal-computer' element={<ShopCategory category="PC" /> } />
          <Route path='product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
