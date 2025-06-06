import Instrumento from "../models/Instrumento";
import { useCarrito } from "../hooks/useCarrito";
import "./estilos/ItemInstrumento.css"
type instrumentoParam = {
  id: number;
  cantidadVendida: number;
  costoEnvio: string;
  descripcion: string;
  imagen: string;
  instrumento: string;
  marca: string;
  modelo: string;
  initialHayStock: boolean;
  precio: number;
  instruObjet: Instrumento;
};

export default function ItemInstrumento(args: instrumentoParam) {
  
  const { addCarrito, removeCarrito, cart, removeItemCarrito } = useCarrito();


  const verificaPlatoEnCarrito = (product: Instrumento) => {
    return cart.some(item => item.id === product.id);
  };

  const isInstrumentoInCarrito = verificaPlatoEnCarrito(args.instruObjet);

  const costoEnvio = () => {
    return args.costoEnvio === "G"
      ? <span style={{ color: "green" }}>Envío Gratis</span>
      : <span style={{ color: "orange" }}>$ {args.costoEnvio}</span>;
  };

  return (
    <div className="item-instrumento">
      <div className="card">
        <img src={`/img/${args.imagen}`} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{args.instrumento}</h5>
          <p className="card-text">Precio: ${args.precio}</p>
          <p className="card-text">
            <small className="text-body-secondary">{costoEnvio()}</small><br />
          </p>
        </div>

        <div><a href={`/detalle/${args.id}`}><button type="button" className="btn btn-info">Info</button></a></div>
        <hr />
        <p>
          <a className='iconoMasMenos' onClick={() => removeItemCarrito(args.instruObjet)}> - </a>
          <button className='colorFondoBlanco'
            onClick={() => {
                      if (isInstrumentoInCarrito) {
                        removeCarrito(args.instruObjet);
                      } else {
                        addCarrito(args.instruObjet);
                      }
                    }}>
            {
              isInstrumentoInCarrito
                ? <img src={`/img/deleteCart.png`} title='Quitar' />
                : <img src={`/img/addCart.png`} title='Comprar' />
            }
          </button>
          <a className='iconoMasMenos' onClick={() => addCarrito(args.instruObjet)}> + </a>
        </p>
      </div>
    </div>
  );
}
