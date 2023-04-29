import React from 'react'
import styles from '../../../style.js'
import { Navbar } from '../organisms.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { faPauseCircle } from '@fortawesome/free-regular-svg-icons'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import { faStopCircle } from '@fortawesome/free-regular-svg-icons'
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CardRecipeProcess() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [isStopped, setIsStopped] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && seconds < 2400) { // 40 minutes = 2400 seconds
          interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
          }, 1000);
        }
        return () => clearInterval(interval);
      }, [isRunning, seconds]);

      const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
      }

      const secondsDisplay = formatTime(seconds % 60);
      const minutesDisplay = formatTime(Math.floor(seconds / 60));

      const progress = (seconds / 2400) * 100;

      const handlePauseClick = () => {
        setIsRunning(false);
        setIsPaused(true);
      };

      const handleResumeClick = () => {
        setIsRunning(true);
        setIsPaused(false);
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
  return (
    <div className={`${styles.boxWidth}`}>
        <Navbar />

        <div className={`${styles.container} px-[1rem] desktop:px-0`}>
            <div className='w-full p-[1rem] bg-bgColorTwo text-primary flex justify-between items-center'>
                <h1 className='font-normal tablet:font-medium text-sm tablet:text-base'>Cooking ... </h1>

            </div>

            <div className='h-[24.75rem] w-full flex flex-col laptop:flex-row'>
                {/* blank section */}
                <div className='laptop:max-w-[24rem] w-full p-[1rem] tablet:p-[2rem] bg-fadeBlack border-t laptop:border-l border-zinc-200'>

                </div>

                {/* buttons */}
                <div className='laptop:max-w-[40rem] w-full p-[1rem] tablet:p-[2rem] bg-primary'>
                    <div className='flex items-center space-x-64'>
                        <h1 className='text-[1.5rem] font-medium'>Step 1: Boiling</h1>

                        <div className='flex items-center space-x-2 mt-3'>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} className='text-xl' />
                            <p className='text-[1rem]'>Back</p>
                            <p className='text-[1rem]'>Next</p>
                            <FontAwesomeIcon icon={faArrowAltCircleRight} className='text-xl' />
                        </div>
                    </div>

                    <p className='text-[1rem] font-light mt-2'>Pour water in the pot and add the pork meat and simmer it for 40 minutes</p>

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
                                    textSize: '1.5rem',
                                    textColor: '#000',
                                    pathColor: '#65a30d',
                                    trailColor: '#e4e4e7'
                                })}
                                />
                            </div>

                            {/* pause repeat button */}
                            <div className='flex flex-col'>
                                {isRunning && !isPaused && (
                                <button onClick={handlePauseClick} className="mr-4 px-4 py-2 flex items-center gap-[1rem]">
                                    <FontAwesomeIcon icon={faPlayCircle} className='w-[3rem] h-[3rem] text-fadeBlack'/>
                                    Play
                                </button>
                                )}

                                {!isRunning && isPaused && (
                                <button onClick={handleResumeClick} className="mr-4 px-4 py-2 flex items-center gap-[1rem]">
                                    <FontAwesomeIcon icon={faPauseCircle} className='w-[3rem] h-[3rem] text-fadeBlack'/>
                                    Pause
                                </button>
                                )}

                                {!isStopped && (
                                <button onClick={handleStopClick} className="mr-4 px-4 py-2 flex items-center gap-[1rem]">                               
                                    <FontAwesomeIcon icon={faStopCircle} className='w-[3rem] h-[3rem] text-fadeBlack'/>
                                    Stop
                                </button>
                                )}

                                {isStopped && (
                                <button onClick={handleRepeatClick} className="mr-4 px-4 py-2 flex items-center gap-[1rem]">
                                    <FontAwesomeIcon icon={faArrowRotateRight} className='w-[3rem] h-[3rem] text-fadeBlack'/>
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
  )
}
