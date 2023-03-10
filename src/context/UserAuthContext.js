import { useContext, createContext, useEffect, useState } from "react"

import { AuthErrorCodes, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendEmailVerification } from 'firebase/auth'
import { auth } from "../config/firebase";



const userContext = createContext();
export const useAuth = () => { return useContext(userContext) }


const UserAuthContext = ({ children }) => {
  const [error, setError] = useState("")
  const [currentuser, setuser] = useState()
  const [loading, setLoading] = useState("")
  useEffect(
    () => {
      onAuthStateChanged(auth, user => {
        console.log(user)
        if (user) {
          setuser(user)
          console.log("u are logging")
        }
        else {
          // alert("u are logout")
        }
      })
    }, [currentuser]
  )
  const SignUp = async (email, password, firstname, lastname) => {
    setError("");
    createUserWithEmailAndPassword(auth, email, password).then(
      async (result) => {
        console.log(result)
        updateProfile(auth.currentUser, {
          displayName: firstname + ' ' + lastname,
          photoURL:''
        }).then(() => {
          sendEmailVerification(auth.currentUser).then(() => {
              logout()
          });
      }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
      }).catch((error) => {
          const errorCode = error.code;
        }) 
      }
    ).catch(err => {
      if (err.code === "Email is already used. Please try another email.") {

        setInterval(() => {
          setError("")
        }, 5000)
        setError("Email is already used. Please try another email.")
      }
      else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {

        setInterval(() => {
          setError("")
        }, 5000)
        setError("Password must be 6 characters or more.")
      }

      else {
        setError(err.message)
      }
    })
  }


  const UserLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setuser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    SignUp,
    error,
    currentuser,
    UserLogin,
    logout,
    loading
  }
  return (
    <userContext.Provider value={value}>{children}</userContext.Provider>
  )
}

export default UserAuthContext