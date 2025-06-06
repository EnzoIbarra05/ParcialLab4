import Instrumento from "../models/Instrumento";
import { useCarrito } from "../hooks/useCarrito";
import "./estilos/Carrito.css"

function CartItem(item: Instrumento) {
  return (
    <li key={item.id} className="cart-item">
      <img
        width={50}
        height={50}
        src={`/img/${item.imagen}`}
        alt={item.instrumento}
      />
      <div className="cart-item-info">
        <strong>{item.instrumento}</strong> - ${item.precio}
        <div>
          <b>
            {item.cantidad} {item.cantidad === 1 ? "unidad" : "unidades"}
          </b>
        </div>
      </div>
    </li>
  );
}

export default function Carrito() {
  const { cart, limpiarCarrito } = useCarrito();

  const mostrarCarritoJSON = () => {
    console.log(cart);
  };

  function totalCart(){

    let total:number=0;

    cart.forEach(item=>{
 
      total+=item.cantidad* item.precio

    })


    return total;
  }

  return (
    <>
      <label className="cart-button">
        <i>Items del Pedido</i>
        <hr />
      </label>
      <aside className="cartita">
        <ul className="item">
          {cart.map((ins: Instrumento, index) => (
            <CartItem 
              key={index}
              id={ins.id}
              cantidadVendida={ins.cantidadVendida}
              costoEnvio={ins.costoEnvio}
              descripcion={ins.descripcion}
              imagen={ins.imagen}
              instrumento={ins.instrumento}
              marca={ins.marca}
              modelo={ins.modelo}
              precio={ins.precio}
              categoriaId={ins.categoriaId}
              cantidad={ins.cantidad}
            />
          ))}
        </ul>
        <p className="precio"><b>Precio total acumulado: $ {totalCart()}</b></p>
        <button onClick={limpiarCarrito} title="Limpiar Todo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 17a2 2 0 1 0 2 2" />
            <path d="M17 17h-11v-11" />
            <path d="M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7" />
            <path d="M3 3l18 18" />
          </svg>
        </button>

        <button onClick={mostrarCarritoJSON} className="boton-json">MOSTRAR CART JSON</button>
      </aside>
    </>
  );
}
