import React, { useState } from 'react'
import shortid from 'shortid'


function App() {
  const [tarea,setTarea] = useState('')
  const [tareas,setTareas] = useState([])

  const agregarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Elemento vacio');
      setError('El campo no puede estar Vacío')
      return
    }
    setError(null)
    setTareas([
      ...tareas,
      {id: shortid.generate(), nombreTarea: tarea}
    ])
    setTarea('')
  }

  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }
  /* seccion de editar tarea  */
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('') 

  const editar = item => {
    console.log(item);
    setModoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
  }

  const editarTarea = e => {
    console.log('editar');
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Campo vacio')
      setError('El campo no puede estar Vacío')
      return
    }
    setError(null)

    const arrayEditado = tareas.map(item => item.id === id ? { id: id, nombreTarea: tarea } : item)
    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
  }

  /*Seccion de errores  */
  const [error, setError] = React.useState(null)

  return (
    <div className="container">
      <h1 className='text-center'>Crud Simple</h1>
      <hr/>
        <div className='row'>
          <div className='col-8'>
            <h4 className="text-center">Lista de tareas</h4>
            <ul className='list-group'>
                {
                  tareas.length === 0 ? (
                    <li className="list-group-item">Sin Tareas</li>
                  ) : ( 
                      tareas.map(item => (
                        <li className="list-group-item" key={item.id}>
                          <span className="lead">{ item.nombreTarea }</span>
                          <span style={{float: "right"}}>
                            <button onClick={() => eliminarTarea(item.id)} className="btn btn-sm btn-danger mx-2">Eliminar</button>
                            <button onClick={() => editar(item)} className="btn btn-sm btn-warning">Editar</button>
                          </span>
                        </li>
                      ))
                  )
                }
            </ul>
          </div>
          <div className='col-4'>
            <h4 className="text-center">
              {
                modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
            </h4>
            <form onSubmit= {modoEdicion ? editarTarea : agregarTarea}>
            {
             error ? <span className="text-danger">{error}</span> : null
            }
              <input type="text" onChange={ e => setTarea(e.target.value) } value={tarea} className="form-control mb-2" placeholder="Ingrese Tarea"/>
              {
                modoEdicion ? (
                  <button className="btn btn-warning btn-block" type="submit">Editar</button>
                ) : (
                  <button className="btn btn-dark btn-block" type="submit">Agregar</button>
                )
              }
            </form>
          </div>
        </div>
    </div>
  );
}

export default App;
