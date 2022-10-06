import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PizzaContext from "../PizzaContext";
import Images from "../images";

export default function Pizza() {

  const pizzaLink = useNavigate(); 

  const { pizzaData, addItem } = useContext(PizzaContext);
  const { pizzaId } = useParams();

  return (
    <div className="container container--flex container--cards-detail">
      {pizzaData.filter(pizza => pizza.id === pizzaId).map(filtered => (
        <div className="card card--detail" key={filtered.id}>
          <img
            src={ filtered.img }
            alt={ filtered.name.charAt(0).toUpperCase() + filtered.name.slice(1).toLowerCase() }
          />
          <div className="card__content">
            <div className="card--detail__wrapper">
              <h2 className="card__name card--detail__wrapper-title capitalize"> {filtered.name} </h2>
              <p className="card__ingredients"><strong>Ingredientes</strong></p>
            </div>
          </div>
          <ul className="list">
            {filtered.ingredients.map((ing, i) => (
              <li className="capitalize list__item" key={i}><img className="ingredient" src={ Images[ing] } alt={ing} />{ing}</li>
            ))}
          </ul>
          <div className="card__final">
            <h2 className="card__price"><span className="card__price-v">valor</span> <span className="card__price-s">$</span>{ filtered.price.toLocaleString('es-CL') }</h2>
            <div className="btn--wrapper">
              <button className="btn btn--info-back" onClick={ () => pizzaLink(`/pizza/`) }>Volver</button>
              <button className="btn btn--info-remove" onClick={ () => addItem(filtered) }>Añadir</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}