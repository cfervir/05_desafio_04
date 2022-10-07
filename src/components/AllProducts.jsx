import { useContext } from "react";
import { useNavigate  } from "react-router-dom";

import PizzaContext from "../PizzaContext";
import Images from "../images";
import { locale, capitalize } from "../helpers";

export default function AllProducts() {

  const { pizzaData, addItem } = useContext(PizzaContext);
  const pizzaLink = useNavigate();

  return (
    <main className="container container--flex container--cards">
      { pizzaData.map(pizza => (
        <div className="card card--home" key={ pizza.id }>
          <img
            src={ pizza.img }
            alt={ capitalize(pizza.name) }
          />
          <div className="card__content">
            <div className="card--home__wrapper">
              <h2 className="card__name card--home__wrapper-title capitalize"> { pizza.name } </h2>
              <p className="card__ingredients"><strong>Ingredientes</strong></p>
            </div>
          </div>
          <ul className="list">
            { pizza.ingredients.map((ing, i) => (
              <li className="capitalize list__item" key={i}><img className="ingredient" src={ Images[ing] } alt={ing} />{ing}</li>
            ))}
          </ul>
          <div className="card__final">
            <h2 className="card__price"><span className="card__price-v">valor</span> <span className="card__price-s">$</span>{ locale(pizza.price) }</h2>
            <div className="btn--wrapper">
              <button className="btn btn--info" onClick={ () => pizzaLink(`/pizzas/${ pizza.id }`) }>Ver más</button>
              <button className="btn btn--info-add" onClick={ () => addItem(pizza) }>Añadir</button>
            </div>
          </div>
        </div>
      ))}
    </main>
  )
};