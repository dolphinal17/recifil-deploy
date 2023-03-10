import React, {useState, useEffect} from 'react'
import { BtnLS } from '../../atoms/atoms.js'
import { InputBox } from '../../molecules/molecules.js'
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../../context/UserAuthContext.js'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginForm() {

    const { UserLogin, currentuser } = useAuth()
    const [err, setError] = useState("")
    const [user, setUser] = useState({
      email: "",
      password: "",
    })
    const navigate = useNavigate()
  
    const UserHandler = (e) => {
      const { name, value } = e.target;
      setUser((pre) => {
        return {
          ...pre,
          [name]: value
        }
      })
    }

    useEffect(() => {
      if (currentuser) {
        navigate('/discover');
      }
    }, [currentuser, navigate]);
  
    const SubmitHandler = async (e) => {
      e.preventDefault()
      const { email, password } = user
      if (email == "" || password == "") {
        setInterval(() => {
          setError("")
        }, 5000)
        return setError("Fill All the Field")
      }
      try {
        await UserLogin(email, password)
        navigate("/discover")
      } catch (error) {
  
        if (error.code == "auth/user-not-found") {
          setInterval(() => {
            setError("")
          }, 5000)
          return setError("User Not Found")
        }
        else if (error.code == "auth/wrong-password") {
          setInterval(() => {
            setError("")
          }, 5000)
          return setError("Wrong Password")
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
        {

        err && <p className='error w-[24rem] rounded-lg text-center bg-red-600 ml-[-1rem] p-2 text-white mb-[1rem]'>{err}</p>

        }

        <h1 className='text-secondary text-base font-medium text-center mb-[2rem]'>LOGIN TO CONTINUE</h1>

        {/* inputs */}
        <div className='flex flex-col gap-[1rem]'>
            {/* email */}
            <InputBox 
                type="email"
                icon={faAt}
                placeHolder="Enter your email or username"
                value={user.email}
                name='email'
                onChange={UserHandler}
            />

            {/* password */}
            <InputBox
                type="password" 
                icon={faLock}
                placeHolder="Password"
                value={user.password}
                name='password'
                onChange={UserHandler}
            />
        </div>

        {/* remember me and forgot password line */}
        <div className='flex flex-row justify-between items-center w-full mt-[1rem] mb-[2rem]'>
            <div className='flex'>
                <input type="checkbox" className=''/>
                <h5 className='text-secondary text-xs font-light tablet:font-normal ml-1'>Remember me</h5>
            </div>

            <h5 className='text-secondary text-xs cursor-pointer font-light tablet:font-normal'>forgot your password?</h5>
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
