import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './components/pages/Home'
import BlockPage from './components/pages/BlockPage';
import TxHash from './components/pages/TxHash';
import Address from './components/pages/Address';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/block/:block" element={<BlockPage />} />
          <Route exact path="/txhash/:hash" element={<TxHash />} />
          <Route exact path="/addr/:address" element={<Address />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
