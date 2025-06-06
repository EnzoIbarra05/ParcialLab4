import { useState, useEffect } from "react";
import Instrumento from "../models/Instrumento";
import { getInstrumentoJSONFetch, getCategoriasJSONFetch, deleteInstrumentoXId } from "../Services/funcionesService";
import MenuOptions from "./MenuOptions";
import "./estilos/GrillaInstrumentos.css";
import Categoria from "../models/Categoria";

export default function GrillaInstrumentos() {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number>(0);
  const [precioMaximo, setPrecioMaximo] = useState<number>(0);

  useEffect(() => {
    const cargarDatos = async () => {
      const instrumentosData = await getInstrumentoJSONFetch();
      const categoriasData = await getCategoriasJSONFetch();
      setInstrumentos(instrumentosData);
      setCategorias(categoriasData);
    };
    cargarDatos();
  }, []);

  const deleteInstrumento = async (idIns: number) => {
    await deleteInstrumentoXId(idIns);
    const actualizados = instrumentos.filter(i => i.id !== idIns);
    setInstrumentos(actualizados);
  };

  // Filtrar por categoría y precio máximo
  const instrumentosFiltrados = instrumentos.filter((ins) => {
    const coincideCategoria =
      categoriaSeleccionada === 0 || Number(ins.categoria?.id) === Number(categoriaSeleccionada);
    const coincidePrecio =
      precioMaximo === 0 || Number(ins.precio) <= precioMaximo;

    return coincideCategoria && coincidePrecio;
  });

  return (
    <>
      <div className="title"><h1>Grilla Instrumentos</h1></div>
      <div className="navbar"><MenuOptions /></div>

      <div className="cabecera">
        <div className="button-add">
          <a className="btn btn-success" href={`/formulario/0`}>Nuevo Instrumento +</a>
        </div>

        <div className="select-categorias">
          <select
            className="form-select"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(Number(e.target.value))}
          >
            <option value={0}>Todas las Categorías</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.denominacion}</option>
            ))}
          </select>
        </div>

        <div className="filtro-precio">
          <input
            type="number"
            className="form-control"
            placeholder="Precio máximo"
            value={precioMaximo === 0 ? "" : precioMaximo}
            onChange={(e) => setPrecioMaximo(Number(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="tipo-contain">
        <table className="tablax">
          <thead className="table-light">
            <tr>
              <td><b>Instrumento</b></td>
              <td><b>Marca</b></td>
              <td><b>Modelo</b></td>
              <td><b>Costo de Envío</b></td>
              <td><b>Precio</b></td>
              <td><b>Acciones</b></td>
              <td><b>Categoría</b></td>
            </tr>
          </thead>
          <tbody>
            {instrumentosFiltrados.map((ins) => (
              <tr
                key={ins.id}
                style={{
                  backgroundColor: ins.costoEnvio?.trim() === "G" ? "lightgreen" : "white",
                }}
              >
                <td>{ins.instrumento}</td>
                <td>{ins.marca}</td>
                <td>{ins.modelo}</td>
                <td>{ins.costoEnvio}</td>
                <td>{ins.precio}</td>
                <td>
                  <a href={`/formulario/${ins.id}`}>
                    <button type="button" className="btn btn-info edit">Editar</button>
                  </a>
                  <button type="button" className="btn btn-danger" onClick={() => deleteInstrumento(ins.id)}>Eliminar</button>
                </td>
                <td>{ins.categoria?.denominacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
