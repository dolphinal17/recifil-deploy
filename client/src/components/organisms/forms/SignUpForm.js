import React, { useState, useEffect } from 'react'
import { faAt, faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { BtnLS } from '../../atoms/atoms.js'
import { InputBox, InputBoxPassword } from '../../molecules/molecules.js'
import { useAuth } from '../../../context/UserAuthContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { sendEmailVerification, updateProfile, AuthErrorCodes } from 'firebase/auth'
import { auth, db } from '../../../config/firebase.js'
import { doc, setDoc } from 'firebase/firestore'


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



    const handleClick = () => {
        setOpenModal(!openModal);
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
        console.log(name + "::::::::::" + value)
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
        <div className='flex justify-center items-center'>
            <form className='w-full max-w-[28rem] px-[1rem] py-[2rem] sm:px-[3rem] sm:py-[2rem] bg-primary rounded-3xl' onSubmit={SubmitHandler}>

                {
                    err ? (
                        err && <p className='error w-[24rem] rounded-lg text-center bg-red-600 ml-[-1rem] p-2 text-white mb-[1rem]'>{err}</p>
                    ) : (
                        backError && <p className='error w-[24rem] rounded-lg text-center bg-red-600 ml-[-1rem] p-2 text-white mb-[1rem]'>{backError}</p>
                    )
                }


                <h1 className='text-mainBlack text-base tablet:text-xl font-normal tablet:font-medium text-center mb-[2rem]'>Sign Up</h1>

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
                    <InputBoxPassword
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
                    />

                    {/* confirm password */}
                    <InputBoxPassword
                        type="password"
                        icon={faLock}
                        placeHolder="Confirm your password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={UserHandler}
                        onPaste={(e) => {
                            e.preventDefault()
                            return false;
                        }} onCopy={(e) => {
                            e.preventDefault()
                            return false;
                        }}
                    />
                </div>

                <p className='text-xs font-thin tablet:font-light text-fadeBlack text-center mt-[2rem]'>By clicking Sign Up, you agree to our <span onClick={handleClick} className='text-lime-500 hover:underline cursor-pointer'>Terms and Privacy Policy</span></p>

                <div className='flex items-center flex-col gap-[1rem] mt-[0.25rem] tablet:mt-[0.5rem]'></div>

                {/* button Create and Login link*/}
                <div className='flex items-center flex-col gap-[1rem] mt-[2rem]'>
                    <BtnLS
                        val="Sign Up"
                        type="submit"
                    />

                    <h3 className='text-xs font-light tablet:font-normal text-mainBlack'>Already have an account?<Link to='/login'><span className='ml-1 text-lime-500 hover:text-lime-600 font-light tablet:font-normal cursor-pointer'>Login here</span></Link></h3>
                </div>
            </form>



            {openModal && <div className='min-h-screen w-full flex flex-col justify-center items-center fixed z-10 bg-textFadeBlack'>
                <div className='sm:max-w-[450px] max-h-[calc(100vh_-_4rem)] max-w-[340px] border-solid border-[1px] rounded-[5px] px-5 py-4 bg-[#FFFFFF] overflow-auto p-4'>

                    <h2><strong>Terms and Conditions</strong></h2>

                    <p className='mt-3 mb-3'>Welcome to ReciFil!</p>

                    <p className='mb-2'>These terms and conditions outline the rules and regulations for the use of ReciFil's Website, located at https://dolphinal17.github.io/recifil-deploy/#.</p>

                    <p className='mb-2'>By accessing this website we assume you accept these terms and conditions. Do not continue to use ReciFil if you do not agree to take all of the terms and conditions stated on this page.</p>

                    <p className='mb-4'>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of ph. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

                    <h3 className='mb-2'><strong>Cookies</strong></h3>

                    <p className='mb-2'>We employ the use of cookies. By accessing ReciFil, you agreed to use cookies in agreement with the ReciFil's Privacy Policy. </p>

                    <p className='mb-4'>Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

                    <h3 className='mb-2'><strong>License</strong></h3>

                    <p className='mb-2'>Unless otherwise stated, ReciFil and/or its licensors own the intellectual property rights for all material on ReciFil. All intellectual property rights are reserved. You may access this from ReciFil for your own personal use subjected to restrictions set in these terms and conditions.</p>

                    <p className='mb-1'>You must not:</p>
                    <ul className='mb-3'>
                        <li>a. Republish material from ReciFil</li>
                        <li>b. Sell, rent or sub-license material from ReciFil</li>
                        <li>c. Reproduce, duplicate or copy material from ReciFil</li>
                        <li>d. Redistribute content from ReciFil</li>
                    </ul>

                    

                    <p className='mb-3'>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. ReciFil does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of ReciFil,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, ReciFil shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>

                    <p className='mb-3'>ReciFil reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

                    <p className='mb-1'>You warrant and represent that:</p>

                    <ul className='mb-3'>
                        <li>a. You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                        <li>b. The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                        <li>c. The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                        <li>d. The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                    </ul>

                    <p className='mb-4'>You hereby grant ReciFil a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>

                    <h3 className='mb-2'><strong>Hyperlinking to our Content</strong></h3>

                    <p className='mb-1'>The following organizations may link to our Website without prior written approval:</p>

                    <ul className='mb-3'>
                        <li>a. Government agencies;</li>
                        <li>b. Search engines;</li>
                        <li>c. News organizations;</li>
                        <li>d. Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                        <li>e. System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
                    </ul>

                    <p className='mb-3'>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.</p>

                    <p className='mb-1'>We may consider and approve other link requests from the following types of organizations:</p>

                    <ul className='mb-3'>
                        <li>a. commonly-known consumer and/or business information sources;</li>
                        <li>b. dot.com community sites;</li>
                        <li>c. associations or other groups representing charities;</li>
                        <li>d. online directory distributors;</li>
                        <li>e. internet portals;</li>
                        <li>f. accounting, law and consulting firms; and</li>
                        <li>g. educational institutions and trade associations.</li>
                    </ul>

                    <p className='mb-2'>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of ReciFil; and (d) the link is in the context of general resource information.</p>

                    <p className='mb-2'>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.</p>

                    <p className='mb-2'>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to ReciFil. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>

                    <p className='mb-1'>Approved organizations may hyperlink to our Website as follows:</p>

                    <ul className='mb-3'>
                        <li>a. By use of our corporate name; or</li>
                        <li>b. By use of the uniform resource locator being linked to; or</li>
                        <li>c. By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site.</li>
                    </ul>

                    <p className='mb-4'>No use of ReciFil's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>

                    <h3 className='mb-2'><strong>iFrames</strong></h3>

                    <p className='mb-4'>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>

                    <h3 className='mb-2'><strong>Content Liability</strong></h3>

                    <p className='mb-4'>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

                    <h3 className='mb-2'><strong>Reservation of Rights</strong></h3>

                    <p className='mb-4'>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

                    <h3 className='mb-2'><strong>Removal of links from our website</strong></h3>

                    <p className='mb-2'>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>

                    <p className='mb-4'>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>

                    <h3 className='mb-2'><strong>Disclaimer</strong></h3>

                    <p className='mb-1'>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>

                    <ul className='mb-3'>
                        <li>a. limit or exclude our or your liability for death or personal injury;</li>
                        <li>b. limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                        <li>c. limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                        <li>d. exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                    </ul>

                    <p className='mb-2'>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>

                    <p className='mb-3'>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>


                </div>
                
                <button className='sm:max-w-[450px] max-w-[340px] border-solid border-[1px] rounded-[5px] px-5 py-2 bg-[#FFFFFF] overflow-auto p-2 mt-2' onClick={() => setOpenModal(false)}>Close</button>
                
            </div>
            }

        </div>
    )
}