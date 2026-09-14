import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductView from './pages/ProductView'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='product/:id' element={<ProductView />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
