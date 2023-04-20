// Logic Imports
import React, { useState, useEffect } from "react";
import { BtnLS } from '../../atoms/atoms.js'
import { useNavigate, Link } from "react-router-dom";
import { isFilled, isLengthInRange, isEmail} from "../../../utils/validations.js";
// import { trimExtraSpaces, wordCasing } from "../../../utils/sanitations";
import { validationLoop} from "../../../utils/helpers.js";
import styles from '../../../style'
import {InputGroup} from "../../molecules/molecules.js";

export default function NewLoginForm() {

    // State Variables
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    // onChange Event
    const onChangeFn = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // onBlur Event
    const onBlurFn = (e) => {
        switch (e.target.name) {
            case 'email':
                validationLoop({ name: e.target.name, value: formData.email, onSubmit: false }, [isFilled, isEmail], formErrors, setFormErrors);
                break;
            case 'password':
                validationLoop({ name: e.target.name, value: formData.password, onSubmit: false }, [isFilled], formErrors, setFormErrors);
                break;
            default:
        }
    };

    // onSubmit Event
    const onSubmitFn = (e) => {
        e.preventDefault();

        setFormErrors(validateForm(formData));
        setIsSubmit(true);
    };

    // State Change Effect
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const data = { ...formData};

            // registerFn({ ...data }).then((result) => {
            //     if (result.error) {
            //         setFormErrors({ ...result.error });
            //     }

            //     // verify e-mail (since user did not registered from a provider)
            //     return navigate("/verify", { state: { fromRegister: true } });
            // });
        }

        setIsSubmit(false);
    }, [formErrors, setFormErrors, formData, isSubmit, navigate]);

  return (
    <div>NewLoginForm</div>
  )
}