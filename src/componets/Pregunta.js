import React, {Fragment, useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

    const definiPresupuesto = e =>{
      guardarCantidad (parseInt(e.target.value, 10));
    }

    const agregarPresupuesto = e =>{
      e.preventDefault();
      // validar
      if (cantidad < 1 || isNaN(cantidad)) {
        guardarError(true);
        return;
      }
      // enviar
      guardarError(false);
      guardarPresupuesto(cantidad);
      guardarRestante(cantidad);
      actualizarPregunta(false)
    }
    return (
      <div>
        <Fragment>
          <h2>Coloca tu presupuesto</h2>
          {error ? <Error mensaje="El presupuesto es incorrecto"/> : null }
          <form
            onSubmit={agregarPresupuesto}
          >
            <input 
              className="u-full-width"
              placeholder="Coloca tu presupuesto"
              type="number"
              value={cantidad || 0}
              onChange={definiPresupuesto}
            />

            <input 
              type="submit"
              className="button-primary u-full-width"
              value="Definir Presupuesto"
            />
          </form>
        </Fragment>
      </div>
    );

}

Pregunta.propTypes = {
  guardarPresupuesto: PropTypes.func.isRequired,
  guardarRestante: PropTypes.func.isRequired,
  actualizarPregunta: PropTypes.func.isRequired,
}

export default Pregunta;