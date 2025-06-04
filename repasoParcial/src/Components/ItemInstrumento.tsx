import Instrumento from "../models/Instrumento"

type instrumentoParam={

 id:number,
 cantidad_vendida: number;
 costo_envio:string;
 descripcion:string;
 imagen:string;
 instrumento:string;
 marca:string;
 modelo:string;
 precio:string;
 instruObjet:Instrumento;
}





export default function ItemInstrumento(args:instrumentoParam){

const costoEnvio = () => {
    if (args.costo_envio === "G") {
      return <span style={{ color: "green" }}>Envío Gratis</span>;
    } else {
      return <span style={{ color: "orange" }}>$ {args.costo_envio}</span>;
    }
  };


  return (
    <div className="item-instrumento">
      <div className="card">
        <img
          src={`/img/${args.imagen}`}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{args.instrumento}</h5>
          <p className="card-text">Precio: ${args.precio}</p>
          <p className="card-text">
            <small className="text-body-secondary">{costoEnvio()}</small>
          </p>
        </div>
      </div>
    </div>
  );
}