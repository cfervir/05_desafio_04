import { useContext } from "react";
import PizzaContext from "../PizzaContext";

export default function Cart() {

  const { total, pizzaData, addItem, removeItem } = useContext(PizzaContext);

  if (total.length === 0) {
    return (
      <div className="container">
        <p>Cart is empty!</p>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Pagaaaa</h1>
      { total.map((items, i) => (
        <div key={i}>
          <p>{items.name}</p>
          <p>${(items.price).toLocaleString('es-CL')}</p>
          <p>${(items.price / items.qty).toLocaleString('es-CL')}</p>
          { pizzaData.filter((x => x.id === items.id)).map((buttons) => (
              <button key={buttons.id} className="btn btn--add" onClick={ () => addItem(buttons) }>+</button>))
          } <span className="btn--between"> {items.qty} </span>
          { pizzaData.filter((x => x.id === items.id)).map((buttons) => (
              <button key={buttons.id} className="btn btn--remove" onClick={ () => removeItem(buttons) }>-</button>))
          }
        </div>
      ))}
      ${total.reduce((a, b)=> a + b.price,0).toLocaleString('es-CL')}
    </div>
  );
}