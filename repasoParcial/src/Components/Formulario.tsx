import { useState, useEffect } from 'react'
import Instrumento from '../models/Instrumento';
import MenuOptions from './MenuOptions';
import { useNavigate, useParams } from 'react-router-dom';
import { getInstrumentoXIdFecth, saveInstrumento } from '../Services/funcionesService';
import Categoria from '../models/Categoria';
import "./estilos/Formulario.css"

export default function Formulario() {
    const navigate = useNavigate();
    const { idinstrumento } = useParams();
    const [instrumento, setInstrumento] = useState<Instrumento>(new Instrumento());
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [imagenFile, setImagenFile] = useState<File | null>(null);
    const [txtValidacion, setTxtValidacion] = useState<string>("");

    const getInstrumento = async () => {
        if (Number(idinstrumento) !== 0) {
            const insSelect:Instrumento = await getInstrumentoXIdFecth(Number(idinstrumento));
            setInstrumento(insSelect);
        } else {
            setInstrumento(new Instrumento());
        }
    }

    useEffect(() => {
        getInstrumento();
        fetch('http://localhost:8080/api/categorias')
            .then(res => res.json())
            .then(data => setCategorias(data))
            .catch(err => console.error(err));
    }, []);

    const save = async () => {
        if (!imagenFile) {
            alert("Debe seleccionar una imagen");
            return;
        }
        if (!instrumento.instrumento) {
            setTxtValidacion("Ingrese el nombre del instrumento");
            return;
        }
        if (!instrumento.precio || instrumento.precio === 0) {
            setTxtValidacion("El precio debe ser distinto de cero");
            return;
        }
        if (!instrumento.descripcion) {
            setTxtValidacion("Ingrese la descripción del instrumento");
            return;
        }
        if (!instrumento.marca) {
            setTxtValidacion("Ingrese la marca del instrumento");
            return;
        }
        if (!instrumento.modelo) {
            setTxtValidacion("Ingrese el modelo del instrumento");
            return;
        }
        if (!instrumento.costoEnvio) {
            setTxtValidacion("Ingrese el costo de envío");
            return;
        }

        const formData = new FormData();
        const instrumentoParaEnviar = {
             instrumento:instrumento.instrumento,
             marca:instrumento.marca,
             modelo:instrumento.modelo,
             precio:instrumento.precio,
             costoEnvio:instrumento.costoEnvio,
             cantidadVendida:instrumento.cantidadVendida,
             activo: true,
             descripcion:instrumento.descripcion,
            categoria: { id: instrumento.categoriaId }
        };
        formData.append("instrumento", JSON.stringify(instrumentoParaEnviar));
        formData.append("imagenFile", imagenFile);

        await saveInstrumento(instrumento, formData);
        navigate('/grilla');
    }

    return (
        <>
            <MenuOptions />
            <div className='formulario'>
            <div className="center">
                <div className="mb-3">
                    <label htmlFor="txtNombre" className="form-label">Nombre Instrumento:</label>
                    <input type="text" id='txtNombre' className="form-control"
                        placeholder="Ingrese nombre de Instrumento"
                        defaultValue={instrumento.instrumento}
                        onChange={e => instrumento.instrumento = e.target.value} />
                </div>
                 <div className="mb-3">
                <label htmlFor="txtPrecio" className="form-label">Precio</label>
                <input type="text" id='txtPrecio' className="form-control" placeholder="Ingrese el precio" defaultValue={instrumento.precio || ""} onChange={e => instrumento.precio = Number(e.target.value)}/>
            </div>
                <div className="mb-3">
                    <label htmlFor="txtEnvio" className="form-label">Costo de envío</label>
                    <input type="text" id='txtEnvio' className="form-control"
                        placeholder="Ingrese el costo de envío"
                        defaultValue={instrumento.costoEnvio}
                        onChange={e => instrumento.costoEnvio = e.target.value} />
                </div>
                <div className="mb-3">
                    <label htmlFor="txtVendido" className="form-label">Cantidad Vendida</label>
                    <input type="number" id='txtVendido' className="form-control"
                        placeholder="Ingrese cantidad vendida"
                        defaultValue={instrumento.cantidadVendida}
                        onChange={e => instrumento.cantidadVendida = Number(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="txtDescripcion" className="form-label">Descripción</label>
                    <textarea id='txtDescripcion' className="form-control"
                        placeholder="Ingrese la descripción"
                        defaultValue={instrumento.descripcion}
                        onChange={e => instrumento.descripcion = e.target.value}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="txtMarca" className="form-label">Marca</label>
                    <input type="text" id='txtMarca' className="form-control"
                        placeholder="Ingrese la marca"
                        defaultValue={instrumento.marca}
                        onChange={e => instrumento.marca = e.target.value} />
                </div>
                <div className="mb-3">
                    <label htmlFor="txtModelo" className="form-label">Modelo</label>
                    <input type="text" id='txtModelo' className="form-control"
                        placeholder="Ingrese el modelo"
                        defaultValue={instrumento.modelo}
                        onChange={e => instrumento.modelo = e.target.value} />
                </div>
               <div className="mb-3">
  <label className="form-label">Categoría</label>
  <select
    className="form-select"
    value={instrumento.categoriaId || ''} 
    onChange={e => setInstrumento({ ...instrumento, categoriaId: Number(e.target.value) })}
  >
    <option value="">Seleccione una categoría</option>
    {categorias.map((cate) => (
      <option key={cate.id} value={cate.id}>
        {cate.denominacion}
      </option>
    ))}
  </select>
</div>


      <div className="mb-3">
       <label className="form-label">Imagen</label>
     
     {instrumento.id > 0 ? (
  <>
    <p>Vista de imagen actual:</p>
    <img src={`/img/${instrumento.imagen}`} alt="Imagen actual" style={{ maxWidth: '200px' }} />
    <input
      className="form-control"
      type="file"
      accept="image/*"
      onChange={(e) => setImagenFile(e.target.files?.[0] ?? null)}
    />
  </>
) : (
  <input
    className="form-control"
    type="file"
    accept="image/*"
    onChange={(e) => setImagenFile(e.target.files?.[0] ?? null)}
  />
)}

    </div>
                <div>
                    <p style={{ color: 'red', lineHeight: 5, padding: 5 }}>{txtValidacion}</p>
                </div>

                <div className="col">
                    <button onClick={save} className="btn btn-success" type="button">
                        Guardar
                    </button>
                </div>
            </div>
            </div>
        </>
    );
}
