import React, {useState, useEffect} from 'react';
import Pregunta from './componets/Pregunta';
import Formulario from './componets/Formulario';
import Listado from './componets/Listado';
import ControlPresupuesto from './componets/ControlPresupuesto';

function App() {

  //definir los estados
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [mostrarPregunta, actualizarPregunta ] = useState(true);
  const [gastos, guardarGastos] = useState([]);
  const [gasto, guardarGasto] = useState({});
  const [crearGasto, guardarCrearGasto] = useState(false);
  // useEffect que actualiza el restante
  useEffect(()=>{

    if (crearGasto) {
      // agrega el nuevo presupuesto
      guardarGastos([
        ...gastos,
        gasto
      ])  
      // resta del presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      guardarRestante(presupuestoRestante);
    }

    // resetear a false
    guardarCrearGasto(false);
    
  }, [gasto, crearGasto, gastos, restante]);

  return (
    <div className="container">
      <header>
        <h1>Gasto semanal</h1>
        <div className="contenido-principal contenido">
          {mostrarPregunta ? (
            <Pregunta
            guardarPresupuesto={guardarPresupuesto}
            guardarRestante={guardarRestante}
            actualizarPregunta={actualizarPregunta}
          />
          ) : (
            <div className="row">
            <div className="one-half column">
              <Formulario 
                guardarCrearGasto={guardarCrearGasto}
                guardarGasto={guardarGasto}
              />
            </div>
            <div className="one-half column">
              <Listado
                gastos={gastos}
              />
              <ControlPresupuesto
                presupuesto={presupuesto}
                restante={restante}
              />
            </div>
          </div>
          )}
          
          
        </div>
        
      </header>
    </div>
  );
}

export default App;
