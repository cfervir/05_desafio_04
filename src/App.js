import './sass/main.scss'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import PizzaContext from './PizzaContext';

import Navbar from './components/Navbar';
import Home from './views/Home';
import Cart from './views/Cart';
import Inside from './views/Inside';
import Pizza from './views/Pizza';
import NotFound from './views/NotFound';
import Images from './images';

function App() {

  const [pizzaData, setPizzaData] = useState([]);
  const [total, setTotal] = useState([]);

  const endPoint = "/pizzas.json";
  const obtainData = async (url) => {
    try {
      const response = await fetch(url)
      if (response.ok) {
        if (response.status > 400) {
          throw Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        const fixedImg = data.map(u => u.id !== "P006" ? u : u = { ...u, img: `${ Images.missing }`});
        setPizzaData(fixedImg);
      }
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    obtainData(endPoint);
  }, []);

  const addItem = (item) => {
    const isRepeated = total.find(add => add.id === item.id); 
    if (isRepeated) {
      setTotal(
        total.map(addNow =>
          addNow.id === item.id ? { ...isRepeated, qty: isRepeated.qty + 1, price: isRepeated.price + item.price } : addNow 
        )
      );
    } else {
      setTotal([...total, {...item, qty: 1 }])
    }
  };

  const removeItem = (item) => {
    const isThere = total.find(remove => remove.id === item.id);
    if (isThere.qty === 1) {
      setTotal(total.filter(removeChk => removeChk.id !== item.id));
    } else {
      setTotal(
        total.map(removeNow =>
          removeNow.id === item.id ? { ...isThere, qty: isThere.qty - 1, price: isThere.price - item.price } : removeNow
        )
      );
    }
  };

  return (
    <>
      <PizzaContext.Provider value={{ pizzaData, setPizzaData, total, setTotal, addItem, removeItem }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrito/" element={<Cart />} />
            <Route path="/pizza/" element={<Inside />} />
            <Route path="/pizza/:pizzaId" element={<Pizza />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PizzaContext.Provider>
    </>
  );
}

export default App;
