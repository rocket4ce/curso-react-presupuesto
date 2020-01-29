import React, {useState} from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';


const Formulario = ({guardarGasto, guardarCrearGasto}) => {
  const [nombreGasto, guardarNombre] = useState("");
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  const agregarGasto = e =>{
    e.preventDefault();
    //validar
    if (cantidad < 1 || isNaN(cantidad) || nombreGasto.trim() === '' ) {
      guardarError(true);
      return
    }
    //agregar formulario principal
    guardarError(false);
    // construis un gast
    const gasto = {
      nombreGasto,
      cantidad,
      id: shortid.generate()
    }
    guardarGasto(gasto)
    guardarCrearGasto(true)
    //reset form
    guardarNombre("");
    guardarCantidad(0);


  }

  return (
    <form
      onSubmit={agregarGasto}
    >
      <h2>Agrega tus gastos acá</h2>
      {error ? <Error mensaje="ambos campos son obligatorios nombre o presupuesto"/ > : null}

      <div className="campo">
        <label>Nombre del Gasto</label>
        <input 
        type="text" 
        className="u-full-width" 
        placeholder="Ej. Transporte"
        value={nombreGasto}
        onChange={e => guardarNombre(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Cantidad</label>
        <input 
        type="number" 
        className="u-full-width" 
        placeholder="Ej. 300"
        value={cantidad || 0}
        onChange={e => guardarCantidad(parseInt(e.target.value, 10))}
        />
      </div>

      <input type="submit" className="button-primary u-full-width" value="Agregar gasto"/>

    </form>
  );
};

Formulario.propTypes = {
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired,
}


export default Formulario;