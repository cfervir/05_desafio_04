import { useNavigate } from "react-router-dom";

export default function NotFound() {

  const goBack = useNavigate();
 
  return (
    <div className="container container--not-found">
      <h1>¡No hay nada acá!</h1>
      <p className="not-found">Volvamos para ver tus pizzas favoritas</p>
      <button className="btn btn--info-back btn--detail" onClick={ () => goBack(`/`) }>Volver</button>
    </div>
  );
}