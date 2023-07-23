import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../../context/UserAuthContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { sendEmailVerification, updateProfile, AuthErrorCodes } from 'firebase/auth'
import { auth, db } from '../../../config/firebase.js'
import { doc, setDoc } from 'firebase/firestore'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { ModalTermsAndCondition } from '../../molecules/molecules.js'



export default function SignUpForm() {
    const navigate = useNavigate()
    const { error, SignUp, currentuser } = useAuth()
    const [err, setError] = useState("")
    const [backError, setBackError] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        photoURL: "",
        uid: "",
        password: "",
        confirmPassword: ""
    })
    const [formError, setFormError] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [isPasswordHidden, setIsPasswordHidden] = useState(true)
    const [isIconHidden, setIsIconHidden] = useState(true)
    const [passwordType, setPasswordType] = useState("password");
    const passwordRegex = /^(?=.*[!@#$%^&*()\-_=+{};:,<.>])^(?=.*\d)^(?=.*[a-zA-Z]).{8,15}$/;
    const [isChecked, setIsChecked] = useState(false);
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }


    const handleClick = () => {
        setOpenModal(true);
    };


    const regex = /[^a-zA-Z\s]/g;


    useEffect(() => {
        console.log("i am in")
        if (error) {
            setInterval(() => {
                setBackError("")
            }, 5000)
            setBackError(error)
        }
    }, [error, currentuser])
    const UserHandler = (e) => {
        const { name, value } = e.target;
        setUser((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    // useEffect(() => {
    //     if (currentuser) {
    //       navigate('/discover');
    //     }
    //   }, [currentuser, navigate]);


    const SubmitHandler = async (e) => {

        e.preventDefault()

        const { email, password, confirmPassword, firstname, lastname, photoURL, uid } = user

        setFormError({
            email: "",
            password: ""
        });

        let isValid = true;

        if (firstname === "") {
            setFormError((prevState) => ({
                ...prevState,
                firstname: "Please enter your firstname"
            }));
            isValid = false;
        }

        if (lastname === "") {
            setFormError((prevState) => ({
                ...prevState,
                lastname: "Please enter your lastname"
            }));
            isValid = false;
        }

        if (email === "") {
            setFormError((prevState) => ({
                ...prevState,
                email: "Please enter your email"
            }));
            isValid = false;
        }

        if (password === "") {
            setFormError((prevState) => ({
                ...prevState,
                password: "Please enter your password"
            }));
            isValid = false;
        }

        if (confirmPassword === "") {
            setFormError((prevState) => ({
                ...prevState,
                confirmPassword: "Please re-enter your password"
            }));
            isValid = false;
        }


        else if (password !== confirmPassword) {
            setFormError((prevState) => ({
                ...prevState,
                password: "Passwords do not match",
                confirmPassword: "Passwords do not match"
            }));
            isValid = false;
        }
        else if (regex.test(firstname)) {
            setFormError((prevState) => ({
                ...prevState,
                firstname: "Firstname cannot contain special characters",
            }));
            isValid = false;
        }
        else if (regex.test(lastname)) {
            setFormError((prevState) => ({
                ...prevState,
                lastname: "Firstname cannot contain special characters",
            }));
            isValid = false;
        }
        else if (firstname.length === 1) {
            setFormError((prevState) => ({
                ...prevState,
                firstname: "Firstname must be more than 1 character",
            }));
            isValid = false;
        }
        else if (lastname.length === 1) {
            setFormError((prevState) => ({
                ...prevState,
                lastname: "Lastname must be more than 1 character",
            }));
            isValid = false;
        }
        else if (!passwordRegex.test(password)) {
            setFormError((prevState) => ({
                ...prevState,
                password: "Password must contain atleast 1 special character, 1 number, and 1 letter. Length should be between 8 and 15 characters.",
            }));
            isValid = false;
        }
        else {

            try {

                await SignUp(email, password).then(async (result) => {
                    console.log(result)
                    const ref = doc(db, "userinfo", auth.currentUser.uid)
                    const docRef = await setDoc(ref, { firstname, lastname, photoURL, email, uid: auth.currentUser.uid })
                    // console.log("Document written with ID: ", docRef.uid);
                    updateProfile(auth.currentUser, {
                        displayName: firstname + ' ' + lastname,
                        photoURL: '',
                    }).then(() => {
                        sendEmailVerification(auth.currentUser)
                        navigate('/emailverification')
                    })
                })

            } catch (err) {
                if (err.code === "auth/email-already-in-use") {
                    setFormError((prevState) => ({
                        ...prevState,
                        email: "Email already exists",
                    }));
                    isValid = false;
                }
                else if (err.code === "auth/invalid-email") {
                    setFormError((prevState) => ({
                        ...prevState,
                        email: "Invalid email",
                    }));
                    isValid = false;
                }
                else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
                    setFormError((prevState) => ({
                        ...prevState,
                        password: "Password must be 6 characters or more",
                    }));
                    isValid = false;
                }

                else {
                    setError(err.message)
                }
            }


        }
    }


    return (
        <>
        <div className='w-full flex flex-col justify-center items-center'>
            <ModalTermsAndCondition onOpen={openModal} onClose={() => setOpenModal(false)}/>

            <form className='w-full tablet:max-w-[28rem] px-[1rem] py-[2rem] sm:px-[3rem] sm:py-[2rem] bg-primary rounded-none tablet:rounded-3xl' onSubmit={SubmitHandler}>

                {/* {
                    err ? (
                        err && <p className='error w-[24rem] rounded-lg text-center bg-red-600 ml-[-1rem] p-2 text-white mb-[1rem]'>{err}</p>
                    ) : (
                        backError && <p className='error w-[24rem] rounded-lg text-center bg-red-600 ml-[-1rem] p-2 text-white mb-[1rem]'>{backError}</p>
                    )
                } */}


                <h1 className='text-mainBlack text-base tablet:text-xl font-normal tablet:font-medium text-center mb-[1rem]'>Sign Up</h1>

                {/* inputs */}
                <div className='flex flex-col gap-[1rem]'>
                    {/* firstname */}
                    {/* <InputBox
                        type="text"
                        icon={faUser}
                        placeHolder="Enter your firstname"
                        name="firstname"
                        value={user.firstname}
                        onChange={UserHandler}
                    /> */}
                    <div className='flex flex-col gap-0.5'>
                        <label className='ml-1 text-base text-mainBlack font-medium'>Firstname</label>
                        <div className={`w-full h-14 flex justify-between items-center bg-primary rounded-md ${formError.firstname ? "border-2 border-red-700" : "border-2 border-zinc-200"}`}>
                            <input
                                type='text'
                                placeholder='Enter your firstname'
                                name='firstname'
                                value={user.firstname}
                                onChange={UserHandler}
                                className='bg-transparent border-none mx-[1rem] outline-none w-full text-sm font-light tablet:font-normal text-mainBlack' />
                        </div>
                        {formError.firstname && <p className='text-red-700 text-sm'>{formError.firstname}</p>}
                    </div>

                    {/* lastname */}
                    {/* <InputBox
                        type="text"
                        icon={faUser}
                        placeHolder="Enter your lastname"
                        name="lastname"
                        value={user.lastname}
                        onChange={UserHandler}
                    /> */}

                    <div className='flex flex-col gap-0.5'>
                        <label className='ml-1 text-base text-mainBlack font-medium'>Lastname</label>
                        <div className={`w-full h-14 flex justify-between items-center bg-primary rounded-md ${formError.lastname ? "border-2 border-red-700" : "border-2 border-zinc-200"}`}>
                            <input
                                type='text'
                                placeholder='Enter your lastname'
                                name='lastname'
                                value={user.lastname}
                                onChange={UserHandler}
                                className='bg-transparent border-none mx-[1rem] outline-none w-full text-sm font-light tablet:font-normal text-mainBlack' />
                        </div>
                        {formError.lastname && <p className='text-red-700 text-sm'>{formError.lastname}</p>}
                    </div>

                    {/* email */}
                    {/* <InputBox
                        type="text"
                        icon={faAt}
                        placeHolder="Enter your email"
                        name="email"
                        value={user.email}
                        onChange={UserHandler}
                    /> */}

                    <div className='flex flex-col gap-0.5'>
                        <label className='ml-1 text-base text-mainBlack font-medium'>Email</label>
                        <div className={`w-full h-14 flex justify-between items-center bg-primary rounded-md ${formError.email ? "border-2 border-red-700" : "border-2 border-zinc-200"}`}>
                            <input
                                type='text'
                                placeholder='Enter your email'
                                name='email'
                                value={user.email}
                                onChange={UserHandler}
                                className='bg-transparent border-none mx-[1rem] outline-none w-full text-sm font-light tablet:font-normal text-mainBlack' />
                        </div>
                        {formError.email && <p className='text-red-700 text-sm'>{formError.email}</p>}
                    </div>

                    {/* password */}
                    {/* <InputBoxPassword
                        type="password"
                        icon={faLock}
                        placeHolder="Enter your password"
                        name="password"
                        value={user.password}
                        onChange={UserHandler}
                        onPaste={(e) => {
                            e.preventDefault()
                            return false;
                        }} onCopy={(e) => {
                            e.preventDefault()
                            return false;
                        }}
                    /> */}
                    <div className='flex flex-col gap-0.5'>
                        <div className="flex items-start justify-start">
                            <label className="ml-1 text-base text-mainBlack font-medium">Password</label>
                            <div className="relative ml-2">
                                <span
                                    className="tooltip-trigger"
                                    onMouseEnter={() => setTooltipVisible(true)}
                                    onMouseLeave={() => setTooltipVisible(false)}
                                >
                                    {/* <svg
                                        className="w-4 h-4 text-gray-500"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg> */}
                                    <FontAwesomeIcon icon={faCircleInfo} className='text-xs text-zinc-400'/>
                                    {isTooltipVisible && (
                                        <div className="tooltip absolute w-[15rem] mt-2 bg-bgColorTwo text-white py-1 px-2 rounded opacity-100 transition-opacity duration-300 text-base font-normal">
                                            Password must contain atleast 1 special character, 1 number and 1 letter. The password must be 8-15 characters.
                                        </div>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className={`w-full h-14 flex justify-between items-center bg-primary rounded-md ${formError.password ? "border-2 border-red-700" : "border-2 border-zinc-200"}`}>
                            <input
                                type={passwordType}
                                placeholder='Enter your password'
                                name='password'
                                value={user.password}
                                onChange={UserHandler}
                                onPaste={(e) => {
                                    e.preventDefault()
                                    return false;
                                }} onCopy={(e) => {
                                    e.preventDefault()
                                    return false;
                                }}
                                className='bg-transparent border-none mx-[1rem] outline-none w-full text-sm font-light tablet:font-normal text-mainBlack' />
                            <FontAwesomeIcon onClick={() => {
                                setIsPasswordHidden(!isPasswordHidden);
                                togglePassword();
                            }} icon={isPasswordHidden ? faEye : faEyeSlash} className='text-sm text-fadeBlack pr-[1rem] cursor-pointer' />
                        </div>
                        {formError.password && <p className='text-red-600 text-sm'>{formError.password}</p>}
                    </div>

                    <div className='flex flex-col gap-0.5'>
                        <label className='ml-1 text-base text-mainBlack font-medium'>Confirm Password</label>
                        <div className={`w-full h-14 flex justify-between items-center bg-primary rounded-md ${formError.confirmPassword ? "border-2 border-red-700" : "border-2 border-zinc-200"}`}>
                            <input
                                type={passwordType}
                                placeholder='Confirm your password'
                                name='confirmPassword'
                                value={user.confirmPassword}
                                onChange={UserHandler}
                                onPaste={(e) => {
                                    e.preventDefault()
                                    return false;
                                }} onCopy={(e) => {
                                    e.preventDefault()
                                    return false;
                                }}
                                className='bg-transparent border-none mx-[1rem] outline-none w-full text-sm font-light tablet:font-normal text-mainBlack' />
                            <FontAwesomeIcon onClick={() => {
                                setIsPasswordHidden(!isPasswordHidden);
                                togglePassword();
                            }} icon={isPasswordHidden ? faEye : faEyeSlash} className='text-sm text-fadeBlack pr-[1rem] cursor-pointer' />
                        </div>
                        {formError.confirmPassword && <p className='text-red-700 text-sm'>{formError.confirmPassword}</p>}
                    </div>


                </div>

                <div className='flex flex-row  mt-[2rem] gap-2'>
                    <input type='checkbox' onChange={handleCheckboxChange} />
                    <p className='text-xs font-thin tablet:font-light text-fadeBlack text-center'>By clicking the box, you agree to our <span onClick={() => setOpenModal(true)} className='text-lime-500 hover:underline cursor-pointer'>Terms and Privacy Policy</span></p>
                </div>

                <div className='flex items-center flex-col gap-[1rem] mt-[0.25rem] tablet:mt-[0.5rem]'></div>

                {/* button Create and Login link*/}
                <div className='flex items-center flex-col gap-[1rem] mt-[2rem]'>

                    <button className={`text-primary bg-lime-500 px-[4rem] py-[0.75rem] text-base font-normal tablet:font-medium rounded-md ${!isChecked ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer hover:bg-lime-600'
                        }`} disabled={!isChecked}>Sign Up</button>

                    <h3 className='text-xs font-light tablet:font-normal text-mainBlack'>Already have an account?<Link to='/login'><span className='ml-1 text-lime-500 hover:text-lime-600 font-light tablet:font-normal cursor-pointer'>Login here</span></Link></h3>
                </div>
            </form>

            <div className='flex items-center gap-2 mt-6'>
                <img src="https://firebasestorage.googleapis.com/v0/b/recifil.appspot.com/o/webimages%2FLogoMainG.png?alt=media&token=c25b6fd5-4217-4b56-af19-4aa6208abcc8" alt='ReciFil' className='w-[1rem]' />

                <span className='text-sm font-normal text-mainBlack'>ReciFil2023 All rights reserved</span>
            </div>
        </div>
    </>
        
    )
}