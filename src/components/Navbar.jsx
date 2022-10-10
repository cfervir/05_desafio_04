import { useContext } from "react";
import { NavLink } from "react-router-dom";
import PizzaContext from "../PizzaContext";
import Images from "../images";
import { locale, sumPizzas, sumQty } from "../helpers";

export default function Navbar() {

  const { total } = useContext(PizzaContext);

  const setActiveClass = ({ isActive }) => `link container--flex ${( isActive ? 'link--active' : '')}`;
  
  return (
    <nav className="nav">
      <div className="container container--nav container--flex">
        <div>
          <NavLink end className={ setActiveClass } to="/">
            <div className="container--flex container--logo">
              <img className="logo" src={ Images.logo } alt="¡Pizzería Mamma Mía!" />
              <p className="logo--text link--decor">¡Pizzería Mamma Mía!</p>
            </div>
          </NavLink>
        </div>
        <div className="nav--cart">
          <NavLink className={ setActiveClass } to="/carrito">
            <div className="link--decor">Carrito</div>
            <div className={`badge ${ sumPizzas(total) ? '' : 'badge--hidden'}`}>
              { sumQty(total) }
              <div className="badge--tooltip">
                { `Sub-total $${locale(sumPizzas(total))}` }
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}