import Instrumento from "../models/Instrumento"

type instrumentoParam={

 id:number,
 cantidadVendida: number;
 costoEnvio:string;
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
    if (args.costoEnvio === "G") {
      return <span style={{ color: "green" }}>Envío Gratis</span>;
    } else {
      return <span style={{ color: "orange" }}>$ {args.costoEnvio}</span>;
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
          <p className="card-text">Precio:{args.precio}</p>
          <p className="card-text">
            <small className="text-body-secondary">{costoEnvio()}</small><br />
          </p>

        </div>
        <div><a href={`/detalle/${args.id}`}><button type="button" className="btn btn-info">Info</button></a></div>
      </div>
    </div>
  );
}