// Logic Imports
import React, { useState, useEffect } from "react";
import { BtnLS } from '../../atoms/atoms.js'
import { useNavigate, Link } from "react-router-dom";
import { isFilled, isLengthInRange, isAlphabet, isEmail, isPasswordMatch } from "../../../utils/validations.js";
// import { trimExtraSpaces, wordCasing } from "../../../utils/sanitations";
import { validationLoop, sanitationLoop } from "../../../utils/helpers.js";
import styles from '../../../style'
import {InputGroup} from "../../molecules/molecules.js";

export default function NewSignUpForm() {
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
    <div className={`min-h-screen bg-zinc-700 ${styles.flexCenter} py-[1rem]`}>
        <form className='w-full max-w-[28rem] px-[1rem] py-[2rem] sm:px-[3rem] sm:py-[2rem] bg-primary rounded-3xl'  onSubmit={onSubmitFn}>

            <h1 className='text-mainBlack text-base tablet:text-xl font-normal tablet:font-medium text-center mb-[2rem]'>Sign Up</h1>

            <div className="input-row">
                <InputGroup
                    name='firstname'
                    placeholder={"Firstname"}
                    hasIcon={true}
                    value={formData.firstname}
                    error={formErrors.firstname}
                    onChange={onChangeFn}
                    onBlur={onBlurFn}
                />
            </div>

            <div className="input-row">
                <InputGroup
                    name='lastname'
                    placeholder={"Lastname"}
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
                    placeholder={"Email"}
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
                    placeholder={"Password"}
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
                    placeholder={"Confirm Password"}
                    hasIcon={true}
                    value={formData.password_confirm}
                    error={formErrors.password_confirm}
                    onChange={onChangeFn}
                    onBlur={onBlurFn}
                />
            </div>

            <p className='text-xs font-thin tablet:font-light text-fadeBlack text-center  mt-[1rem]'>By clicking Sign Up, you agree to our <span className='text-lime-500 hover:underline cursor-pointer'>Terms</span> and <span className='text-lime-500 hover:underline cursor-pointer'>Privacy Policy</span></p>

            {/* button Create and Login link*/}
            <div className='flex items-center flex-col gap-[1rem] mt-[0.25rem] tablet:mt-[0.5rem]'>
                <BtnLS 
                    val="Sign Up"
                    type="submit"
                />

                <h3 className='text-xs font-light tablet:font-normal text-mainBlack'>Already have an account?<Link to='/login'><span className='ml-1 text-lime-500 font-light tablet:font-normal cursor-pointer hover:text-lime-600'>Login here</span></Link></h3>
            </div>
        </form>
    </div>
  )
}