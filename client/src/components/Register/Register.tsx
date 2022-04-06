import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator, { validateForms } from '../../helpers/validateForm';
import { CreateUser, IdentGoogle } from '../../redux/actions/user';
import { State } from '../../redux/reducers';
import Form from '../form/Form';
import  {useNavigate} from 'react-router';


interface Inputs{
    name:string,
    lastname:string,
    email:string,
    passUser:string,
    billing_address:string,
    default_shipping_address:string,
    countryId:string

}

const Register=():JSX.Element=>{

    const dispatch=useDispatch();
    const user= useSelector((state:State)=>state.user);
    const navigate=useNavigate();

    const [inputs,setInputs] =useState<Inputs>({
        email:'',
        lastname:'',
        name:'',
        passUser:'',
        billing_address:'',
        default_shipping_address:'',
        countryId:''
    })
    const [error, setError] = useState<Inputs>({
        email: '',
        lastname: '',
        name: '',
        passUser: '',
        billing_address:'',
        default_shipping_address:'',
        countryId:''
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
        console.log(inputs);
        const newUser={
            name:inputs.name,
            surname:inputs.lastname,
            email:inputs.email,
            password:inputs.passUser,
            billing_address:inputs.billing_address,
            default_shipping_address:inputs.default_shipping_address,
            CountryId:Number(inputs.countryId),
            // role:'user',
            // isActive:true
        }
        console.log('USUARIO: ',user);
        if(!user){
            dispatch(CreateUser(newUser,()=>{
                navigate('/products')
            }));
        }
        /**
         * Request
         */

    }

    const SinUpGoogle = () => {
        console.log('Login with Google');
        dispatch(IdentGoogle('/signInWithGoogle'));

    }


    return(
       <Form title='Register' >
            <div className='div-data'>
                <div>
                    <input type='text' placeholder='Name...' name='name' onChange={FormChange} className={checkError(error.name)}/>
                    {error.name && <b className='invalid-feedback'>{error.name}</b>}
                </div>
                {/* <br/> */}
                <div>
                    <input type='text' placeholder='LastName...' name='lastname' onChange={FormChange} className={checkError(error.lastname)}/>
                    {error.lastname && <b className='invalid-feedback'>{error.lastname}</b>}

                </div>
                <div>
                    <input type='text' placeholder='Country id' name='countryId' onChange={FormChange} className={checkError(error.countryId)} />
                    {error.countryId && <b className='invalid-feedback'>{error.countryId}</b>}

                </div>
            </div>
            <div className='div-inputs'>
                <div>
                    <input type='email' placeholder='Email...' name='email' onChange={FormChange} className={checkError(error.email)} />
                    {error.email && <b className='invalid-feedback'>{error.email}</b>}
                </div>
                {/* <br /> */}
                <div>
                    <input type='password' placeholder='Password...' name='passUser' onChange={FormChange} className={checkError(error.passUser)} />
                    {error.passUser && <b className='invalid-feedback'>{error.passUser}</b>}
                </div>
            </div>
            
            <div>
                <input type='text' placeholder='Shipping Address...' name='billing_address' onChange={FormChange} className={checkError(error.billing_address)} />
                {error.billing_address && <b className='invalid-feedback'>{error.billing_address}</b>}
            </div>
            <div>
                <input type='text' placeholder='Default shipping address...' name='default_shipping_address' onChange={FormChange} className={checkError(error.default_shipping_address)} />
                {error.default_shipping_address && <b className='invalid-feedback'>{error.default_shipping_address}</b>}
            </div>
            <div className='google form-log' onClick={SinUpGoogle}>
                <div>
                    <img src='https://freesvg.org/img/1534129544.png' />
                </div>
                <span>
                    Continue with Google
                </span>
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
                <Link to='/login' className='btn btn-secondary link-Router button-links'>
                    Login
                </Link>
            </article>
       </Form> 
    )

}

export default Register;