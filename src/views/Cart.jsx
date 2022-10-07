import { useContext } from "react";
import PizzaContext from "../PizzaContext";
import { locale } from "../helpers";

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
            <p className="capitalize"> { items.name } </p>
            <p> ${ locale(items.price) } </p>
            <p> ${ locale(items.price / items.qty) } </p>
            { pizzaData.filter((x => x.id === items.id)).map((buttons) => (
                <button key={ buttons.id } className="btn btn--add" onClick={ () => addItem(buttons) }> + </button>))
            } <span className="btn--between"> {items.qty} </span>
            { pizzaData.filter((x => x.id === items.id)).map((buttons) => (
                <button key={ buttons.id } className="btn btn--remove" onClick={ () => removeItem(buttons) }> - </button>))
            }
          </div>
        ))}
      ${ locale(total.reduce((a, b)=> a + b.price,0)) }
    </div>
  );
}