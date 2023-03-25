import React, {useState} from "react";
import style from './Form.module.css'


//creamos funcion validate fuera del componente, que nos recibe un formulario y la funcion de guardar en el estado y cuando lo recibe y valide
// que el email este bien, y si  o esta bien , que guarde en un estado cual es el error
const validate = (form, setErrors, errors)=>{

     //validamos si el email esta vacio , asignale a la propiedad email de errors mensaje
    if(!form.email) setErrors({...errors, email:'Email vacio'});
    else{
     //para validar que este en formtato email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = form.email;
    if (emailRegex.test(email)) {
     setErrors({...errors,email:''}) //en email no hay errores
     console.log('no hay errores');
    } else {
     setErrors({...errors, email:'Email vacio'}); // prop email nos muestra el mensaje como valor
     console.log('No esta en formato email');
    }
    }  

   
};


function Form () {

    // el estado donde guardaremos el error, lo inicializamos como un objeto con email y password tambien
    const [errors, setErrors] = useState({
    email: '',
    password:'',
    });


    //vamos a crear un estado para todo el formulario
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
       const property = event.target.name; //identificamos que input cargo el evento si 'userName' o 'password'
       const value = event.target.value;

       setForm({...form, [property]: value}); //traemos todo lo que tenga form y modificamos la propiedad donde se cargo el evento
       validate(form, setErrors, errors); // me valida que los datos esten bien. el mismo paquete del estado se lo mandamos al validador.
    };

    const submitHandler = (event)=>{
        event.preventDefault(); // con esto estoy diciendo q no me recargue la pagina cuando toco el boton de submit, para que no se reinicie el estado
        alert('login exitoso!'); //solo se hace con el evento submit que nos refresca la pagina apenas se toca el boton
    };

    


    return(
        <form onSubmit={submitHandler}>
            <div>
            <label htmlFor="email">email:</label>
            {/* este input toma como valor el estado de userName y a su vez tiene una funcion onChange q cambia su estado */}
            <input 
            type="text" 
            name="email" 
            value={form.email} 
            onChange= {handleChange} 
            className={errors.email ? style.error : style.sucess}
            /> 
            <span>{errors.email}</span>
            </div>
           <div>
           <label htmlFor="password"> Password: </label>
           <input 
           type="text" 
           name="password" 
           value={form.password} 
           onChange= {handleChange}/>
           </div>
            
            <button type="submit">Login</button>
            
        </form>
    )
}

export default Form;