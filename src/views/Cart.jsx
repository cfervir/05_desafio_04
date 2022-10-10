import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import PizzaContext from "../PizzaContext";
import Images from "../images";
import { locale, capitalize, sumPizzas, sumQty, deliveryFee } from "../helpers";

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

  const salePrice = (total) => sumQty(total) >= 3 ? sumPizzas(total) * 0.1 : 0;

  if (total.length === 0) {
    return (
      <div className="container container--cart">
        <h1>El carrito está vacio</h1>
        <p>¡No olvides agregar tus pizzas favoritas!</p>
        <img src={ Images.logo } alt="¡Pizzería Mamma Mía!" className="logo--big" />
        <button className="btn btn--info-back btn--detail" onClick={ () => goBack(`/pizza/`) }>Volver</button>
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
      <div className="cart__final container--flex">
        { <div className="cart__final--subt"> Sub-total: <strong>${locale(sumPizzas(total))}</strong> </div> }
        { <div className="cart__final--delivery"> 
          { deliveryFee(total) > 0 ? <span className="cart__final--delivery">Despacho: ${locale(deliveryFee(total))}</span> : <span className="cart__final--delivery">Despacho: <strong>¡Grátis!</strong></span> }
          { <div className="cart__final--t-delivery">¡Por compras arriba de <strong>$11.990</strong> ten <strong>despacho gratis!</strong></div> }
        </div> }
        { <div className="cart__final--sale">
          { salePrice(total) >= 3 ? <span className="cart__final--sale">Descuento: <strong>${locale(salePrice(total))}</strong></span> : '' } 
          { <div className="cart__final--t-sale">Si llevas <strong>3 pizzas o más</strong>, ¡ten un <strong>10% de descuento!</strong></div> }
        </div> }
        { <div className="cart__final--pay"> <strong>Total: ${sumQty(total) >= 3 ? locale(sumPizzas(total) + deliveryFee(total) - salePrice(total)) : locale(sumPizzas(total) + deliveryFee(total))} </strong></div> }
        <div className="cart__final--btns">
          <button className="btn btn--info-back" onClick={ () => goBack(`/pizza/`) }>Volver</button>
          <button className="btn btn--info-add" onClick={ () => alert('Acá te llevaría al portal de pagos') }>Pagar</button>
        </div>
      </div>
    </div>
  );
}