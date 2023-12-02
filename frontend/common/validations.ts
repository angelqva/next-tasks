export const validateEmail = (value:string, required=false)=>{
    if(required && value.length === 0){
        return "required"
    }
    if(value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i) === null){
        return "regExp"
    }
    return "ok"
}

export const validateText = (value:string, required=false, regExpresion:RegExp | null = null)=>{
    if(required && value.length === 0){
        return "required"
    }
    if(regExpresion && value.match(regExpresion) === null){
        return "regExp"
    }
    return "ok"
}

export const validateSame = (value:string, sameValue:string, required=false)=>{
    if(required && value.length === 0){
        return "required"
    }
    if(value !== sameValue){
        return "not-same"
    }
    return "ok"
}

export const validatePassword = (value:string, required=false, regExpresion:RegExp | null = null)=>{
    if(required && value.length === 0){
        return "required"
    }
    if(regExpresion && value.match(regExpresion) === null){
        return "regExp"
    }
    return "ok"
}

export const validateReg = (value:any, regExpresion:RegExp | null = null) =>{
    if(value && regExpresion && value.match(regExpresion) === null){
        return "regExp"
    }
    return "ok"
}