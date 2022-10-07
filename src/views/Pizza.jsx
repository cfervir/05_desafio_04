import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PizzaContext from "../PizzaContext";
import Images from "../images";
import { locale, capitalize } from "../helpers";

export default function Pizza() {

  const pizzaLink = useNavigate(); 

  const { pizzaData, addItem } = useContext(PizzaContext);
  const { pizzaId } = useParams();

  return (
    <div className="container container--flex container--cards-detail">
      {pizzaData.filter(pizza => pizza.id === pizzaId).map(filtered => (
        <div className="card card--detail container--flex" key={filtered.id}>
          <div className="card--detail__wrapper-head">
            <img
              src={ filtered.img }
              alt={ capitalize(filtered.name) }
              className="card--detail__img"
            />
            <div className="card--detail__wrapper">
              <h2 className="card__name card--detail__wrapper-title capitalize"> {filtered.name} </h2>
            </div>
          </div>
          <div className="card--detail__info-w">
            <div className="card--detail__desc">
              <p> {filtered.desc} </p>
            </div>
            <div className="card--detail__list">
              <ul className="list--detail">
                <li className="card--detail__list-ing"><strong>Ingredientes</strong></li>
                { filtered.ingredients.map((ing, i) => (
                  <li className="capitalize list__item" key={i}><img className="ingredient" src={ Images[ing] } alt={ing} />{ing}</li>
                ))}
              </ul>
            </div>
            <div className="card__final--detail">
              <h2 className="card__price card__price--detail">
                <span className="card__price-v card__price-v-d">valor</span>
                <span className="card__price-s card__price-s-d">$</span>
                { locale(filtered.price) }
              </h2>
              <div className="btn--wrapper__detail">
                <button className="btn btn--info-back btn--detail" onClick={ () => pizzaLink(`/pizza/`) }>Volver</button>
                <button className="btn btn--info-add btn--detail" onClick={ () => addItem(filtered) }>Añadir</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}