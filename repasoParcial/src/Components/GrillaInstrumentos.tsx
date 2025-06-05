import {useState,useEffect} from "react"
import Instrumento from "../models/Instrumento";
import { getInstrumentoJSONFetch } from "../Services/funcionesService";
import MenuOptions from "./MenuOptions";
import "./estilos/GrillaInstrumentos.css"


export default function GrillaInstrumentos(){

        const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    
          const getInstrumentos =  async () => {
          const datos:Instrumento[] = await getInstrumentoJSONFetch();
          setInstrumentos(datos);
        }
    
        useEffect(() => {
          getInstrumentos();
        }, []);

    return(<>

 <div className="title"><h1>Grilla Instrumentos</h1></div>   
 <div className="navbar"><MenuOptions/></div>
<div className="container">
<table className="table table-striped-columns">
<thead className="table-light">
    <tr>
    <td><b>Instrumento</b></td>
    <td><b>Marca</b></td>
    <td><b>Modelo</b></td>
    <td><b>Costo de Envio</b></td>
    <td><b>Precio</b></td>
    <td><b>Acciones</b></td>
    </tr>
</thead>
<tbody>
    {instrumentos.map((ins:Instrumento)=> 
    <tr>
        <td>{ins.instrumento}</td>
        <td>{ins.marca}</td>
        <td>{ins.modelo}</td>
        <td>{ins.costoEnvio}</td>
        <td>{ins.precio} </td>
    </tr>
    
    )}
</tbody>
</table>
</div>

    
    
    
    </>

    )
}