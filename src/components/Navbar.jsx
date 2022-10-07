import { useContext } from "react";
import { NavLink } from "react-router-dom";
import PizzaContext from "../PizzaContext";
import Images from "../images";

export default function Navbar() {

  const { total } = useContext(PizzaContext);
  const totalSum = total.reduce((a, b)=> a + b.qty, 0);

  const setActiveClass = ({ isActive }) => `link ${( isActive ? 'link--active' : '')}`;
  
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
            <span className="link--decor">Carrito</span> <span className={`badge ${ totalSum ? '' : 'badge--hidden'}`}>{ totalSum }</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}