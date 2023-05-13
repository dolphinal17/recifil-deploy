import React, {useState, useEffect} from 'react'
import styles from "../../../style.js";
import { Navbar } from "../organisms.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faPauseCircle,
  faStopCircle,
  faPlayCircle,
} from "@fortawesome/free-regular-svg-icons";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useParams } from "react-router-dom";
import { db, auth } from "../../../config/firebase.js";
import { doc, getDoc } from "firebase/firestore";

export default function CardRecipeProcess() {
  //for db
  const { id } = useParams();
  const [steps, setSteps] = useState([]);
  const [steptitle, setSteptitle ] = useState([]);
  const [stepapproach, setStepapproach ] = useState([]);
  const [stepanime, setStepanime ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(null);
  
  const user = auth.currentUser;
  //set for the next and back button
  const [currentstep, SetCurrentstep ] = useState(0);
  
  useEffect(() => {
    async function fetchRecipe() {
      const docRef = doc(db, "recipes", id);
      await getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            setSteps(doc.data().steps);
            setSteptitle(doc.data().titlesteps)
            setStepapproach(doc.data().stepapproach)
            setStepanime(doc.data().animationstep)
            setTimers(doc.data().steptimer)
            setLoading(false);
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    }
  
    fetchRecipe();
  
    const interval = setInterval(() => {
      // Do something here
    }, 1000);
  
    setTimer(interval);
  
    // Cleanup function to clear the interval
    return () => {
      clearInterval(timer);
    };
  }, [id]);



  //for timer
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [timers,setTimers ] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning && seconds < ((timers[currentstep]) * 60)) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);
  //if seconds == time then next step
  if (isRunning && seconds === ((timers[currentstep]) * 60)) {
    if (currentstep === ((steps.length)-1)) {
      // Stop countdown
      setIsRunning(false);
    } else {
      // Move to next step
      SetCurrentstep(currentstep + 1 );
      setSeconds(0);
    }
  }

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const secondsDisplay = formatTime(seconds % 60);
  const minutesDisplay = formatTime(Math.floor(seconds / 60));

  const progress = (seconds / ((timers[currentstep]) * 60)) * 100;

  const handlePauseClick = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handleResumeClick = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleRepeatClick = () => {
    setSeconds(0);
    setIsRunning(true);
    setIsPaused(false);
    setIsStopped(false);
  };

  const handleStopClick = () => {
    setIsRunning(false);
    setIsPaused(false);
    setIsStopped(true);
  };
  console.log("timers",timers[currentstep])
  // console.log("currentstep",currentstep)


//next and back function
const handleNextStep = () => {
  SetCurrentstep(currentstep + 1);
  setSeconds(0);
};
const handleBackStep = () => {
  SetCurrentstep(currentstep - 1);
  setSeconds(0);
};


// console.log('step: ', currentstep)
// console.log("total",steps.length)
  return (
    <div className={`${styles.boxWidth}`}>
      <Navbar />

      <div className={`${styles.container} px-[1rem] desktop:px-0`}>
        <div className="w-full p-[1rem] bg-bgColorTwo text-primary flex justify-between items-center">
        {stepapproach && stepapproach[currentstep] && (
        <h1 className="font-normal tablet:font-medium text-sm tablet:text-base">{stepapproach[currentstep ]}...</h1>
            )}
          
        </div>

        <div className="h-[24.75rem] w-full flex flex-col laptop:flex-row">
          {/* blank section  set for animation*/}
          {stepanime && stepanime[currentstep] && (
              <div className="laptop:max-w-[24rem] w-full p-[1rem] tablet:p-[2rem] bg-fadeBlack border-t laptop:border-l border-zinc-200">
              <img src = {stepanime[currentstep ]} style={{width : '900px' , height: '350px'}}/>
              </div>
            )}
          

          {/* buttons */}
          <div className="laptop:max-w-[40rem] w-full p-[1rem] tablet:p-[2rem] bg-primary">
            <div className="flex items-center space-x-64">
            {timers && timers[currentstep] && (
              <h1 className="text-[1.5rem] font-medium">Step {`${ currentstep + 1 }`} : {`(${timers[currentstep]} mins)`}</h1>
            )}

              <div className="flex items-center space-x-2 mt-3">
              {currentstep !== 0 && (
                <React.Fragment>
                  <p className="text-[1rem]" onClick={handleBackStep}>
                <FontAwesomeIcon
                  icon={faArrowAltCircleLeft}
                  className="text-xl"
                /> Back</p>
                </React.Fragment>
              )}
              {currentstep !==  steps.length - 1  && (
                <React.Fragment>
                  <p className="text-[1rem]" onClick={handleNextStep} >Next
                <FontAwesomeIcon
                  icon={faArrowAltCircleRight}
                  className="text-xl"
                />
                </p>
                </React.Fragment>
                )
              }
              </div>
            </div>
            
            {steps && steps[currentstep] && (
              <p className="text-[1rem] font-light mt-2">
                {steps[currentstep ]}
              </p>
            )}

            {/* pomodoro timer */}
            {/* <div className='flex justify-center items-center w-[9.375rem] h-[9.375rem] rounded-full shadow-xl bg-bgColor'> */}
            {/* circle */}
            {/* <div className='flex justify-center items-center w-[8.375rem] h-[8.375rem] rounded-full bg-secondary relative before: absolute w-[90%] h-[90%] rounded-full bg-bgColor'> */}
            {/* time */}
            {/* <div className='relative flex'>
                                <p className='text-[2rem] font-medium last-of-type:-'>25</p>
                                <p className='text-[2rem] font-medium'>:</p>
                                <p className='text-[2rem] font-medium'>00</p>
                            </div>
                        </div>
                    </div> */}

            {/* pause repeat button */}
            {/* <div>
                       <div className='flex'>
                            <FontAwesomeIcon icon={faPauseCircle} className='text-[3.75rem]' />
                            <p>Pause</p>
                       </div>
                        <div className='flex'>
                            <FontAwesomeIcon icon={faArrowRotateRight} className='text-[3.75rem]' />
                            <p>Repeat</p>
                        </div>
                    </div> */}

            <div className="laptop:max-w-[40rem] w-full p-[1rem] tablet:p-[2rem]">
              <div className="w-[70%] m-auto flex items-center space-x-10">
                <div className=" w-[9.375rem] h-[9.375rem]">
                  {/* timer circle */}
                  <CircularProgressbar
                    value={progress}
                    text={`${minutesDisplay}:${secondsDisplay}`}
                    styles={buildStyles({
                      textSize: "1.5rem",
                      textColor: "#000",
                      pathColor: "#65a30d",
                      trailColor: "#e4e4e7",
                    })}
                  />
                </div>

                {/* pause repeat button */}
                <div className="flex flex-col">
                  { isPaused && (
                    <button
                      onClick={handlePauseClick}
                      className="mr-4 px-4 py-2 flex items-center gap-[1rem]"
                    >
                      <FontAwesomeIcon
                        icon={faPauseCircle}
                        className="w-[3rem] h-[3rem] text-fadeBlack"
                      />
                      Pause
                    </button>
                  )}

                  { !isPaused && (
                    <button
                      onClick={handleResumeClick}
                      className="mr-4 px-4 py-2 flex items-center gap-[1rem]"
                    >
                      <FontAwesomeIcon
                        icon={faPlayCircle}
                        className="w-[3rem] h-[3rem] text-fadeBlack"
                      />
                      Play
                    </button>
                  )}

                    {!isStopped && (
                    <button
                      onClick={handleStopClick}
                      className="mr-4 px-4 py-2 flex items-center gap-[1rem]"
                    >
                      <FontAwesomeIcon
                        icon={faStopCircle}
                        className="w-[3rem] h-[3rem] text-fadeBlack"
                      />
                      Stop
                    </button>
                  )}

                  {isStopped && (
                    <button
                      onClick={handleRepeatClick}
                      className="mr-4 px-4 py-2 flex items-center gap-[1rem]"
                    >
                      <FontAwesomeIcon
                        icon={faArrowRotateRight}
                        className="w-[3rem] h-[3rem] text-fadeBlack"
                      />
                      Repeat
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
