import React, { useState } from 'react'
import { BtnLS } from '../../atoms/atoms.js'
import { InputBox, InputBoxPassword } from '../../molecules/molecules.js'
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../../context/UserAuthContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { sendEmailVerification } from 'firebase/auth'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




export default function LoginForm() {

  const { UserLogin, currentuser } = useAuth()
  const [err, setError] = useState("")
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [formError, setFormError] = useState({
    email: "",
    password: ""
  })
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isIconHidden, setIsIconHidden] = useState(true)
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate()


  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

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
  //   if (currentuser) {
  //     navigate('/discover');
  //   }
  // }, [currentuser, navigate]);

  const SubmitHandler = async (e) => {
    e.preventDefault()

    const { email, password } = user

    setFormError({
      email: "",
      password: ""
    });

    let isValid = true;

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

    if (!isValid) {
      return;
    }

    try {
      await UserLogin(email, password).then(() => {

        if (currentuser?.email === "admin@panel.com") {
          navigate('/admin')
        }
        else if (!currentuser?.emailVerified) {
          sendEmailVerification(currentuser)
            .then(() => {
              navigate('/emailverification')
            })
          // .catch(err => alert(err.message))
        }
        else {
          navigate('/discover')
        }
      })

    } catch (error) {

      if (error.code === "auth/user-not-found") {
        setFormError((prevState) => ({
          ...prevState,
          email: "User not found"
        }))
        isValid = false;
      }
      else if (error.code === "auth/invalid-email") {
        setFormError((prevState) => ({
          ...prevState,
          email: "Email is invalid"
        }))
        isValid = false;
      }
      else if (error.code === "auth/wrong-password") {
        setFormError((prevState) => ({
          ...prevState,
          password: "Wrong password"
        }))
        isValid = false;
      }
      else {
        setInterval(() => {
          setError("")
        }, 5000)
        return setError(`${error.message}`)
      }
    }

  }

  return (
    <form className='w-full max-w-[28rem] px-[1rem] py-[2rem] tablet:px-[3rem] tablet:py-[4rem] bg-primary rounded-3xl' onSubmit={SubmitHandler}>
      {/* {

        err && <p className='error w-[24rem] rounded-lg text-center bg-red-600 ml-[-1rem] p-2 text-white mb-[1rem]'>{err}</p>

      } */}

      <h1 className='text-secondary text-base font-medium text-center mb-[2rem]'>LOGIN TO CONTINUE</h1>

      {/* inputs */}
      <div className='flex flex-col gap-[1rem]'>
        {/* email */}
        {/* <InputBox 
                type="text"
                icon={faAt}
                placeHolder="Enter your email or username"
                value={user.email}
                name='email'
                onChange={UserHandler}
            /> */}
        <div className='flex flex-col gap-[0.5rem]'>
          <label className='ml-1'>Email:</label>
          <div className={`w-full h-14 flex justify-between items-center bg-[#EDF1F2] rounded-md ${formError.email ? "border-2 border-red-600" : "border-2 border-green-500"}`}>
            <input
              type='text'
              placeholder='Enter your email'
              name='email' value={user.email}
              onChange={UserHandler}
              className='bg-transparent border-none mx-[1rem] outline-none w-full text-sm font-light tablet:font-normal text-mainBlack' />
          </div>
          {formError.email && <p className='w-[11rem] rounded-lg text-center text-red-600 mb-[1rem]'>{formError.email}</p>}
        </div>
        {/* password */}
        {/* <InputBoxPassword
          type="password"
          icon={faLock}
          placeHolder="Password"
          value={user.password}
          name='password'
          onChange={UserHandler}
          onPaste={(e) => {
            e.preventDefault()
            return false;
          }} onCopy={(e) => {
            e.preventDefault()
            return false;
          }}
        /> */}
        <div className='flex flex-col gap-[0.5rem]'>
          <label className='ml-1'>Password:</label>
          <div className={`w-full h-14 flex justify-between items-center bg-[#EDF1F2] rounded-md ${formError.password ? "border-2 border-red-600" : "border-2 border-green-500"}`}>
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
          {formError.password && <p className='w-[13rem] rounded-lg text-center text-red-600 mb-[1rem]'>{formError.password}</p>}
        </div>
        
      </div>

      {/* remember me and forgot password line */}
      <div className='flex flex-row justify-between items-center w-full mt-[1rem] mb-[2rem]'>
        <div className='flex'>
          {/* <input type="checkbox" className='' />
          <h5 className='text-secondary text-xs font-light tablet:font-normal ml-1'>Remember me</h5> */}
        </div>

        <Link to='/forgotpassword'><h5 className='text-secondary text-xs cursor-pointer font-light tablet:font-normal'>forgot your password?</h5></Link>
      </div>

      {/* button login and sign-up link*/}
      <div className='flex items-center flex-col gap-[1rem]'>
        <BtnLS
          val="Login"
          type="submit"
        />

        <h3 className='text-xs font-light tablet:font-normal text-mainBlack'>Don't have an account?<Link to='/signup'><span className='ml-1 text-secondary cursor-pointer font-light tablet:font-normal'>Signup here</span></Link></h3>
      </div>
    </form>
  )
}
