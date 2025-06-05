import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getInstrumentoXIdFecth } from '../Services/funcionesService';
import Instrumento from '../models/Instrumento';
import "./estilos/DetalleInstrumento.css"
export default function DetalleInstrumento(){
    const {idinstrumento} = useParams();
    const [instrumento, setInstrumento] = useState<Instrumento>();
    
    const getPlatoResto = async () => {
        const instruSelect:Instrumento = await getInstrumentoXIdFecth(Number(idinstrumento));
        setInstrumento(instruSelect);
    }
    useEffect(() => {
        getPlatoResto();
    }, []);


    return(<>

    <div className="card mb-3">
  <img src={`/img/${instrumento?.imagen}`}className="card-img-top" alt="..." />
  <div className="card-body">
    <h2 className="card-title">{instrumento?.instrumento}</h2>
    <p className="card-text">{instrumento?.descripcion}</p>
    <h4>Marca: {instrumento?.marca}</h4>
    <h4>Modelo: {instrumento?.modelo}</h4>
    <h5 className="card-text">Precio: ${instrumento?.precio}</h5>
    </div>
  <div className='botonera'>
     <a href={`/menu`}><button type="button" className="btn btn-warning">Volver</button></a>
     </div>
</div>

    
    
    
    </>

    )
}