import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

function TimerChallenge({ title, targetTime }) {
    const [timeRemain, setTimeRemain] = useState(targetTime * 1000);
    const timers = useRef();
    const dialog = useRef();
    const timeIsActive = timeRemain > 0 && timeRemain < targetTime * 1000;

    if(timeRemain <= 0){
        clearInterval(timers.current);
        setTimeRemain(targetTime * 1000);
        dialog.current.open();
    }

    function handleStart() {
        timers.current = setInterval(() => {  
            setTimeRemain(prevTimeRemain => prevTimeRemain - 100)
        }, 100);

    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timers.current);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} result="lost"/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timeIsActive ? handleStop : handleStart}>
                        {timeIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timeIsActive ? 'active' : undefined}>
                    {timeIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}

export default TimerChallenge;