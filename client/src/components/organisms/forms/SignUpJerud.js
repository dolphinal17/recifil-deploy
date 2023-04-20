// Logic Imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isFilled, isLengthInRange, isAlphabet, isEmail, isPasswordMatch } from "../../../utils/validations.js";
// import { trimExtraSpaces, wordCasing } from "../../../utils/sanitations";
import { validationLoop, sanitationLoop } from "../../../utils/helpers.js";

//Translation Imports
// import { useTranslation } from "react-i18next";

// Component Imports
import {InputGroup} from "../../molecules/molecules.js";
// import FormButtonPrimary from "../Atoms/Form/Form.Button.Primary";
// import SeparatorWithText from "../Atoms/SeparatorWithText";
// import TextGeneral from "../Atoms/Text/Text.General";
// import TextLink from "../Atoms/Text/Text.Link";

export default function SignUpJerud() {
    const navigate = useNavigate();
    // const { t } = useTranslation(['signup', 'form', 'common']);
    // State Variables
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirm: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    // Validation Methods
    const validateForm = (values) => {
        const errors = {
            ...validationLoop({ name: 'firstname', value: values.firstname, whitelistedSpecialCharacters: ['\'', '-'], onSubmit: true }, [isFilled, isLengthInRange, isAlphabet], formErrors, setFormErrors),
            ...validationLoop({ name: 'lastname', value: values.lastname, whitelistedSpecialCharacters: ['\'', '-'], onSubmit: true }, [isFilled, isLengthInRange, isAlphabet], formErrors, setFormErrors),
            ...validationLoop({ name: 'email', value: values.email, onSubmit: true }, [isFilled, isEmail], formErrors, setFormErrors),
            ...validationLoop({ name: 'firstname', value: values.firstname, onSubmit: true }, [isFilled, isLengthInRange], formErrors, setFormErrors),
            ...validationLoop({ name: 'password', value: values.password, min: 8, max: 16, onSubmit: true }, [isFilled, isLengthInRange], formErrors, setFormErrors),
            ...validationLoop({ name: 'password_confirm', value: values.password_confirm, name_confirm: 'Password', value_confirm: values.password, onSubmit: true }, [isFilled, isPasswordMatch], formErrors, setFormErrors)
        };

        return errors;
    };

    // Sanitation Methods
    // const sanitizeForm = (values) => {
    //     const data = {
    //         ...sanitationLoop({ name: 'firstname', value: values.firstname }, [trimExtraSpaces, wordCasing]),
    //         ...sanitationLoop({ name: 'lastname', value: values.lastname }, [trimExtraSpaces, wordCasing]),
    //         ...sanitationLoop({ name: 'email', value: values.email }, [trimExtraSpaces])
    //     };

    //     return data;
    // };

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
            case 'firstname':
                validationLoop({ name: e.target.name, value: formData.firstname, whitelistedSpecialCharacters: ['\'', '-'], onSubmit: false }, [isFilled, isLengthInRange, isAlphabet], formErrors, setFormErrors);
                break;
            case 'lastname':
                validationLoop({ name: e.target.name, value: formData.lastname, whitelistedSpecialCharacters: ['\'', '-'], onSubmit: false }, [isFilled, isLengthInRange, isAlphabet], formErrors, setFormErrors);
                break;
            case 'email':
                validationLoop({ name: e.target.name, value: formData.email, onSubmit: false }, [isFilled, isEmail], formErrors, setFormErrors);
                break;
            case 'password':
                validationLoop({ name: e.target.name, value: formData.password, min: 8, max: 16, onSubmit: false }, [isFilled, isLengthInRange], formErrors, setFormErrors);
                break;
            case 'password_confirm':
                validationLoop({ name: e.target.name, value: formData.password_confirm, name_confirm: 'Password', value_confirm: formData.password, onSubmit: false }, [isFilled, isPasswordMatch], formErrors, setFormErrors);
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
        <form
            className="w-full px-4 py-4 my-auto"
            onSubmit={onSubmitFn}
        >
            <div className="input-row flex flex-row gap-4">
                <InputGroup
                    name='firstname'
                    placeholder={('firstname-placeholder', { ns: 'form' })}
                    className={"w-1/2"}
                    hasIcon={true}
                    value={formData.firstname}
                    error={formErrors.firstname}
                    onChange={onChangeFn}
                    onBlur={onBlurFn}
                />
                <InputGroup
                    name='lastname'
                    placeholder={('lastname-placeholder', { ns: 'form' })}
                    className={"w-1/2"}
                    hasIcon={true}
                    value={formData.lastname}
                    error={formErrors.lastname}
                    onChange={onChangeFn}
                    onBlur={onBlurFn}
                />
            </div>
            <div className="input-row">
                <InputGroup
                    name='email'
                    placeholder={"email"}
                    hasIcon={true}
                    value={formData.email}
                    error={formErrors.email}
                    onChange={onChangeFn}
                    onBlur={onBlurFn}
                />
            </div>
            <div className="input-row">
                <InputGroup
                    name='password'
                    type='password'
                    placeholder={('password-placeholder', { ns: 'form' })}
                    hasIcon={true}
                    value={formData.password}
                    error={formErrors.password}
                    onChange={onChangeFn}
                    onBlur={onBlurFn}
                />
            </div>
            <div className="input-row">
                <InputGroup
                    name='password_confirm'
                    type='password'
                    placeholder={('password_confirm-placeholder', { ns: 'form' })}
                    hasIcon={true}
                    value={formData.password_confirm}
                    error={formErrors.password_confirm}
                    onChange={onChangeFn}
                    onBlur={onBlurFn}
                />
            </div>
            <div className="button-row">
                <button type='submit'
                    value='sign-up'>Sign up</button>
            </div>
        </form>
    );
}