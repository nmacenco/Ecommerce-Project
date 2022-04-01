import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator, { validateForms } from '../../helpers/validateForm';
import { CreateUser } from '../../redux/actions/user';
import { State } from '../../redux/reducers';
import Form from '../Form/Form';

interface Inputs{
    name:string,
    lastname:string,
    email:string,
    passUser:string

}

const Register=():JSX.Element=>{

    const dispatch=useDispatch();
    const user= useSelector((state:State)=>state.user);

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
        // console.log('errores: ',errores);
        setInputs({
            ...inputs,
            [event.target.name]:event.target.value
        })
        setError(errores as Inputs);
    }

    const checkError=(prop:string):string=>{
        return prop ? 'form-control is-invalid' : 'form-control'
    }

    const RegisterFetch=(event:any)=>{
        event.preventDefault();

        const res= validateForms(error,inputs);

        if(res){
            return alert(res);
        }

        if(!user){
            dispatch(CreateUser(inputs));
        }
        /**
         * Request
         */

    }


    return(
       <Form title='Register' >
            <div className='div-inputs'>
                {console.log('Register renderizado!')}
                <div>
                    <input type='text' placeholder='Name...' name='name' onChange={FormChange} className={checkError(error.name)}/>
                    {error.name && <b className='invalid-feedback'>{error.name}</b>}
                </div>
                <br/>
                <div>
                    <input type='text' placeholder='LastName...' name='lastname' onChange={FormChange} className={checkError(error.lastname)}/>
                    {error.lastname && <b className='invalid-feedback'>{error.lastname}</b>}

                </div>
            </div>
            <div>
                <input type='email' placeholder='Email...' name='email' onChange={FormChange} className={checkError(error.email)}/>
                {error.email && <b className='invalid-feedback'>{error.email}</b>}
            </div>
            <div>
                <input type='password' placeholder='Password...' name='passUser' onChange={FormChange} className={checkError(error.passUser)}/>
                {error.passUser && <b className='invalid-feedback'>{error.passUser}</b>}
            </div>
            <article>
                {
                    validateForms(error,inputs).length ?
                        <button className='btn btn-success button-links link-Router' disabled>
                            Submit
                        </button>
                        :
                        <button className='btn btn-success button-links link-Router' onClick={RegisterFetch}>
                            Submit
                        </button>
                }
                <Link to='/' className='btn btn-secondary link-Router button-links'>
                    Volver
                </Link>
            </article>
       </Form> 
    )

}

export default Register;