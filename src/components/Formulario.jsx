import { useState, useEffect } from 'react';
import Error from './Error';
import Paciente from './Paciente';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

    const [ nombre, setNombre ] = useState('');
    const [ propetario, setPropetario ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ fecha, setFecha ] = useState('');
    const [ sintomas, setSintomas ] = useState('');

    const [ error, setError ] = useState(false);

    useEffect(() => {
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setPropetario(paciente.propetario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        } 
    }, [paciente])

    const generarID = () => {

        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);

        return fecha+random;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación del Formulario
        if ([ nombre, propetario, email, fecha, sintomas ].includes('') ) {           

            setError(true);
            return;

        } 

        setError(false);

        // Objeto de Paciente
        const objetoPaciente = {
            nombre, 
            propetario, 
            email, 
            fecha, 
            sintomas           
        }

        if (paciente.id) {
            
            // Editando un registro
            objetoPaciente.id = paciente.id;

            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);

            setPacientes(pacientesActualizados);
            setPaciente({});

        } else {

            // Nuevo registro
            objetoPaciente.id = generarID();
            setPacientes([...pacientes, objetoPaciente]);

        }        

        // Reiniciar Formulario
        setNombre('')
        setPropetario('')
        setEmail('')
        setFecha('')
        setSintomas('')

    }

    return (  

        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>    

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Adminístralos</span>
            </p>

            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            >
                { error && 
                    <Error>
                        <p>Todos los campos son obligatorios</p>
                    </Error> 
                }

                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre mascota
                    </label>
                    <input 
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={ (e) => setNombre(e.target.value) }
                     />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                        Nombre propietario
                    </label>
                    <input 
                        id="propietario"
                        type="text"
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propetario}
                        onChange={ (e) => setPropetario(e.target.value) }
                     />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input 
                        id="email"
                        type="email"
                        placeholder="Email contacto propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }
                     />
                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Alta
                    </label>
                    <input 
                        id="alta"
                        type="date"                        
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={ (e) => setFecha(e.target.value) }
                     />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea 
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los síntomas"
                        value={sintomas}
                        onChange={ (e) => setSintomas(e.target.value) }
                    />
                </div>
                <input 
                    type="submit" 
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
                />
                
            </form>

        </div>
  )
}

export default Formulario
