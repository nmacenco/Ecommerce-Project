/**
 * error: any --> Is an input errors object
 * input: JSX.Element --> Elemento Input
 * 
 */

export const validateForms=(errores:any,inputs:any):string=>{

    let result:string='';

    for(let index in errores){

        if(errores[index]){
            result='Existen errores';
        }
    }

    for (let index in inputs){

        if(!inputs[index]){
            result='Existen campos vacios';

        }
    }
    return result;
}


const validator=(errorState:any,input:HTMLInputElement)=>{

    const name:string=input.name;
    const type:string=input.type;
    const value:string=input.value;

    let newErrors={}

    switch(type){

        case 'text':
            const errorText=textError(name,value);
            newErrors={
                ...errorState,
                [name]:errorText
            }
            break;

        case 'email':
            const errorEmail=emailError(name,value);
            newErrors={
                ...errorState,
                [name]:errorEmail
            }
            break;

        case 'password':
            const errorPass = passError(name,value);
            newErrors={
                ...errorState,
                [name]:errorPass
            };
            break;

        case 'number':
            const errorNumber = numberError(name,value);
            newErrors={
                ...errorState,
                [name]:errorNumber
            }
            break;
        default:
            newErrors={...errorState}

    }    

    if(value===''){
        newErrors={
            ...errorState,
            [name]:'The field cannot be empty'
        }
    }

    return newErrors;
}


const textError=(name:string,value:string)=>{

    let message='';   

    if(name==='name' || name==='lastname' || name==='username'){

        if (/[^a-zA-Z\x20]/.test(value)) {
          //Si es true es poque tiene signos extraños
          message = "The field cannot have signs";
        
        } 
        // else {
        //     message='';
        // }

    }else if(false){
        /**
         * Aca vendrian otras validaciones dependiendo del name del input 
         */
    }

    return message;

}


const emailError=(name:string,value:string):string=>{

    let message='';

    if (!/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+/gm.test(value)) {
      //
      message="It is not a valid email";
    }

    return message;
}

const passError=(name:string,value:string):string=>{

    // let newErrors={};

    if(name==='passUser'){
        if (value.length < 5 || value.length > 15) {
          return "Must be between 5 and 15 characters";
          
        }
        if (!/[0-9]/.test(value)) {
          //Si no hay un numero:

          return "The password must have at least one number";
        }

        return "";

    }else if(false){
        /**
         * Aca habria otras validacion dependiendo del name del input
         * 
         */
        return ''
    }
    return ''

}

const numberError=(name:string,value:string):string=>{
    let message='';

    /**
     * Validaciones de acuerdo al name del input ---> sobre todo para los precios
     * 
     */

    return message;
}


export default validator;