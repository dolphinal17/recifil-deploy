const removeKeyValueError = ({ key, formErrors, setFormErrors }) => {

    const objCopy = { ...formErrors };

    delete objCopy[key];

    setFormErrors({ ...objCopy });

}




const validationLoop = (obj, arrayFn = [], formErrors, setFormErrors) => {

    let result;




    for (let i = 0; i < arrayFn.length; i++) {

        result = arrayFn[i](obj);




        if (Object.keys(result).length !== 0) {

            if (obj.onSubmit) return result;

            return setFormErrors({ ...formErrors, ...result });

        }

    }




    removeKeyValueError({ key: obj.name, formErrors: formErrors, setFormErrors: setFormErrors });

}




const sanitationLoop = (obj, arrayFn = []) => {

    let result;




    for (let i = 0; i < arrayFn.length; i++) {

        result = (i === 0) ? arrayFn[i](obj) : arrayFn[i]({ name: obj.name, value: result[obj.name] });

    }




    return result;

}




export { removeKeyValueError, validationLoop, sanitationLoop };