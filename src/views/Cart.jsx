import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import PizzaContext from "../PizzaContext";
import Images from "../images";
import { locale } from "../helpers";

export default function Cart() {

  const { total, pizzaData, addItem, removeItem } = useContext(PizzaContext);
  const goBack = useNavigate();

  if (total.length === 0) {
    return (
      <div className="container container--cart">
        <h1>El carrito está vacio</h1>
        <p>¡No olvides agregar tu pizza favorita!</p>
        <img src={ Images.logo } alt="¡Pizzería Mamma Mía!" className="logo--big" />
        <button className="btn btn--info-back btn--detail" onClick={ () => goBack(`/pizzas/`) }>Volver</button>
      </div>
    );
  };

  return (
    <div className="container container--cart">
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