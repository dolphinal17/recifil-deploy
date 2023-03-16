import React, {useState, useEffect} from 'react'
import { faAt, faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { BtnLS } from '../../atoms/atoms.js'
import { InputBox } from '../../molecules/molecules.js'
import { useAuth } from '../../../context/UserAuthContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { sendEmailVerification, updateProfile, AuthErrorCodes } from 'firebase/auth'
import { auth } from '../../../config/firebase.js'

export default function SignUpForm() {
    const navigate = useNavigate()
    const { error, SignUp, currentuser } = useAuth()
    const [err, setError] = useState("")
    const [backError, setBackError] = useState("")
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })


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
        console.log(name +"::::::::::"+value)
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
        const { email, password, confirmPassword, firstname, lastname} = user
        if (password === "" || confirmPassword === "" || email === "" || firstname === "" || lastname === "") {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Please fill all the fields! ")
        }
        else if (password !== confirmPassword) {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Password does not match!")
        }
        else if (regex.test(firstname) || regex.test(lastname)) {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Firstname and Lastname should not include special characters and numbers!")
        }
        else if (firstname.length === 1 || lastname.length === 1) {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Firstname and Lastname must be more than 1 character!")
        }
        else {

        try {
            
            await SignUp(email,password).then( async (result) => {
                console.log(result)
                updateProfile(auth.currentUser, {
                    displayName: firstname+ ' '+lastname,
                    photoURL:''
                }).then(() => {
                    sendEmailVerification(auth.currentUser)
                    navigate('/verify')
                })
            })

        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setInterval(() => {
                    setError("")
                }, 5000)
                setError("Email is already used. Please try another email.")
            }
            else if (err.code === "auth/invalid-email") {

                setInterval(() => {
                    setError("")
                }, 5000)
                setError("Email is not valid. Please try a valid email.")
            }
            else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {

                setInterval(() => {
                    setError("")
                }, 5000)
                setError("Password must be 6 characters or more!")
            }

            else {
                setError(err.message)
            }
        } 
           

        }
    }


  return (
    <form className='w-full max-w-[28rem] px-[1rem] py-[2rem] sm:px-[3rem] sm:py-[2rem] bg-primary rounded-3xl' onSubmit={SubmitHandler}>

            {
                err ? (
                    err && <p className='error w-[24rem] rounded-lg text-center bg-red-600 ml-[-1rem] p-2 text-white mb-[1rem]'>{err}</p>
                ) : (
                    backError && <p className='error w-[24rem] rounded-lg text-center bg-red-600 ml-[-1rem] p-2 text-white mb-[1rem]'>{backError}</p>
                ) 
            }   


        <h1 className='text-secondary text-base font-normal tablet:font-medium text-center mb-[2rem]'>CREATE ACCOUNT</h1>

        {/* inputs */}
        <div className='flex flex-col gap-[1rem]'>
            {/* firstname */}
            <InputBox
                type="text" 
                icon={faUser}
                placeHolder="Enter your firstname"
                name="firstname"
                value={user.firstname}
                onChange={UserHandler}
            />

            {/* lastname */}
            <InputBox
                type="text" 
                icon={faUser}
                placeHolder="Enter your lastname"
                name="lastname"
                value={user.lastname}
                onChange={UserHandler}
            />

            {/* username */}
            {/* <InputBox
                type="text" 
                icon={faUser}
                placeHolder="Enter your username"
                name="username"
                value={user.username}
                onChange={UserHandler}
            /> */}

            {/* email */}
            <InputBox
                type="text" 
                icon={faAt}
                placeHolder="Enter your email"
                name="email"
                value={user.email}
                onChange={UserHandler}
            />

            {/* password */}
            <InputBox
                type="password" 
                icon={faLock}
                placeHolder="Enter your password"
                name="password"
                value={user.password}
                onChange={UserHandler}
                onPaste={(e)=>{
                    e.preventDefault()
                    return false;
                }} onCopy={(e)=>{
                e.preventDefault()
                return false;
                }}
            />

            {/* confirm password */}
            <InputBox
                type="password" 
                icon={faLock}
                placeHolder="Confirm your password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={UserHandler}
                onPaste={(e)=>{
                    e.preventDefault()
                    return false;
                }} onCopy={(e)=>{
                e.preventDefault()
                return false;
                }}
            />
        </div>

        {/* button Create and Login link*/}
        <div className='flex items-center flex-col gap-[1rem] mt-[2rem]'>
            <BtnLS 
                val="Create"
                type="submit"
            />

            <h3 className='text-xs font-light tablet:font-normal text-mainBlack'>Already have an account?<Link to='/login'><span className='ml-1 text-secondary font-light tablet:font-normal cursor-pointer'>Login here</span></Link></h3>
        </div>
    </form>
  )
}