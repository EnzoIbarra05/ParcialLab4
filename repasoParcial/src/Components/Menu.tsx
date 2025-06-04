import MenuOptions from "./MenuOptions";
import Instrumento from "../models/Instrumento"
import { useState, useEffect } from "react";
import { getInstrumentoJSONFetch } from "../Services/funcionesService";
import ItemInstrumento from "./ItemInstrumento"
import Carrito from "./Carrito";
import "./estilos/Menu.css"



export default function Componentes(){
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

      const getInstrumentos =  async () => {
      const datos:Instrumento[] = await getInstrumentoJSONFetch();
      setInstrumentos(datos);
    }

    useEffect(() => {
      getInstrumentos();
    }, []);



    return(<>
    <MenuOptions></MenuOptions>
    <div className="instrumentos">
    <div className="ItemInstrumento">
   {instrumentos.map((instru:Instrumento, index) => {
                return(
                        <ItemInstrumento instruObjet={instru} key={index} id={instru.id} instrumento={instru.instrumento} cantidad_vendida={instru.cantidad_vendida} costo_envio={instru.costo_envio} descripcion={instru.descripcion} imagen={instru.imagen} marca={instru.marca} modelo={instru.modelo} precio={instru.precio}  />
                    )})}
    
    </div>
    <Carrito></Carrito>
    </div>
    
    </>

    )
}