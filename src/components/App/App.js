import { Route, Routes } from 'react-router-dom';
import './App.css';
import {Product} from '../Product/Product';
import {ProductDetail} from '../Product/ProductDetail';

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Product/>}/>
        <Route path='/:id' element={<ProductDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
