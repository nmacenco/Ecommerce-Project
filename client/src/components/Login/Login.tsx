import React, { useState } from 'react';
import Form from '../Form/Form';

interface Inputs{
    email:string,
    password:string
}

const Login=():JSX.Element=>{

    const [inputs,setInputs]=useState<Inputs>({
        email:'',
        password:''
    });
    const [error,setErrores]=useState<Inputs>({
        email:'',
        password:''
    });

    return(
        <Form title='Login'>
            <input type='email' placeholder='Email' name='email' className=''/>
            <input type='password' placeholder='Password' name='passUser'/>
        </Form>
    )
}


/**
 * danger input-->form-control is-invalid
 * input good -->form-control is-valid
 * 
 * 
 */

export default Login;