import { useContext } from "react";
import { useNavigate  } from "react-router-dom";
import PizzaContext from "../PizzaContext";

import Images from "../images";

export default function Render() {

  const { pizzaData, addItem } = useContext(PizzaContext);
  const pizzaLink = useNavigate();

  return (
    <main className="container container--flex container--cards">
      { pizzaData.map(pizza => (
        <div className="card card--home" key={pizza.id}>
          <img
            src={ pizza.img }
            alt={ pizza.name.charAt(0).toUpperCase() + pizza.name.slice(1).toLowerCase() }
          />
          <div className="card__content">
            <div className="card--home__wrapper">
              <h2 className="card__name card--home__wrapper-title capitalize"> {pizza.name} </h2>
              <p className="card__ingredients"><strong>Ingredientes</strong></p>
            </div>
          </div>
          <ul className="list">
            {pizza.ingredients.map((ing, i) => (
              <li className="capitalize list__item" key={i}><img className="ingredient" src={ Images[ing] } alt={ing} />{ing}</li>
            ))}
          </ul>
          <div className="card__final">
            <h2 className="card__price"><span className="card__price-v">valor</span> <span className="card__price-s">$</span>{ pizza.price.toLocaleString('es-CL') }</h2>
            <div className="btn--wrapper">
              <button className="btn btn--info" onClick={ () => pizzaLink(`/pizza/${pizza.id}`) }>Ver más</button>
              <button className="btn btn--info-remove" onClick={ () => addItem(pizza) }>Añadir</button>
            </div>
          </div>
        </div>
      ))}
    </main>
  )
};