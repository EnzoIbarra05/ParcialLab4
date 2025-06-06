import MenuOptions from "./MenuOptions";
import Instrumento from "../models/Instrumento"
import { useState, useEffect } from "react";
import { getInstrumentoJSONFetch } from "../Services/funcionesService";
import ItemInstrumento from "./ItemInstrumento"
import Carrito from "./Carrito";
import "./estilos/Menu.css"
import { CarritoContextProvider } from "../context/CarritoContext";


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
    <CarritoContextProvider>
    <MenuOptions></MenuOptions>
    <div className="instrumentos">
    <div className="ItemInstrumento">
   {instrumentos.map((instru:Instrumento, index) => {
                return(
                        <ItemInstrumento instruObjet={instru} key={index} id={instru.id} instrumento={instru.instrumento} cantidadVendida={instru.cantidadVendida} costoEnvio={instru.costoEnvio} descripcion={instru.descripcion} imagen={instru.imagen} marca={instru.marca} modelo={instru.modelo} precio={instru.precio} initialHayStock={true}/>
                    )})}
    
    </div>
    <div className="cart">
      <div className="carrito-title"><h1>Carrito de compras</h1> 
      <img src="../../public/img/cart.png" alt=""/></div>
    <Carrito></Carrito>
    </div>
    </div>
    </CarritoContextProvider>
    </>

    )
}