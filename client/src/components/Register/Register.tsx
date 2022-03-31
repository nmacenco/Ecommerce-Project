import React, { useState } from 'react';
import validator from '../../helpers/validateForm';
import Form from '../Form/Form';

interface Inputs{
    name:string,
    lastname:string,
    email:string,
    passUser:string

}

const Register=():JSX.Element=>{

    const [inputs,setInputs] =useState<Inputs>({
        email:'',
        lastname:'',
        name:'',
        passUser:''
    })
    const [error, setError] = useState<Inputs>({
        email: '',
        lastname: '',
        name: '',
        passUser: ''
    })

    const FormChange=(event:any)=>{
        event.preventDefault();
        const errores=validator(error,event.target);
        console.log('errores: ',errores);
        setError(errores as Inputs);

    }


    return(
       <Form title='Register'  >
            <div className='div-inputs'>
                <input type='text' placeholder='Name...'  name='name' onChange={FormChange}/>
                <input type='text' placeholder='LastName...'  name='lastname' onChange={FormChange}/>
            </div>
            <input type='email' placeholder='Email...' name='email' onChange={FormChange}/>
            <input type='password' placeholder='Password...'  name='passUser' onChange={FormChange}/>
       </Form> 
    )

}

export default Register;