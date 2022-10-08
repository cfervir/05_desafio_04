import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import PizzaContext from "../PizzaContext";
import Images from "../images";
import { locale, capitalize } from "../helpers";

export default function Cart() {

  const { total, pizzaData, addItem, removeItem } = useContext(PizzaContext);
  const goBack = useNavigate();

  const listIngredients = (ing) => {
    const list = ing.ingredients.map((data, i, {length} ) => {
      if (length - 1 !== i ) {
        return `${capitalize(data)}, `
      } else {
        return `${capitalize(data)}.`;
      }
    });
    return list;
  };

  if (total.length === 0) {
    return (
      <div className="container container--cart">
        <h1>El carrito está vacio</h1>
        <p>¡No olvides agregar tus pizzas favoritas!</p>
        <img src={ Images.logo } alt="¡Pizzería Mamma Mía!" className="logo--big" />
        <button className="btn btn--info-back btn--detail" onClick={ () => goBack(`/pizzas/`) }>Volver</button>
      </div>
    );
  };

  return (
    <div className="container container--cart">
      <h1>Detalle de tu compra</h1>
      <div className="cart card">
        { total.map((items, i) => (
          <div className="cart__items container--flex" key={i}>
            <div className="cart__info container--flex">
              <img src={ items.img } alt={ capitalize(items.name) } className="cart__info--img" />
              <div className="cart__info--details">
                <h2 className="capitalize"> { items.name } </h2>
                <div className="cart__info--list">
                  <strong>Ingredientes:</strong> { listIngredients(items) }
                </div>
                <p className="cart__info--single"> <strong>Precio:</strong> { `$${ locale(items.price / items.qty) }` } </p>
              </div>
            </div>
            <div className="cart__qty container--flex">
              <div className="cart__qty--total">
                <h2><span className="cart__qty--total-s">$</span>{ locale(items.price) }</h2>
              </div>
              <div className="cart__qty--buttons container--flex">
                { pizzaData.filter((x => x.id === items.id)).map((buttons) => (
                    <button key={ buttons.id } className="btn btn--remove" onClick={ () => removeItem(buttons) }> - </button>))
                }
                  <span className="btn--between"> {items.qty} </span>
                { pizzaData.filter((x => x.id === items.id)).map((buttons) => (
                    <button key={ buttons.id } className="btn btn--add" onClick={ () => addItem(buttons) }> + </button>))
                }
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart__total">
        { `El total es: $${locale(total.reduce((a, b)=> a + b.price,0))}` }
      </div>
    </div>
  );
}