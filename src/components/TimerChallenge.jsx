import { useRef, useState } from "react";

function TimerChallenge({ title, targetTime }) {
    const [timer, setTimer] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);

    const timers = useRef();

    function handleStart() {
        timers.current = setTimeout(() => {
            setTimer(true);
        }, targetTime * 1000);
        
        setTimerStarted(true);
    }

    function handleStop() {
        clearTimeout(timers.current);
    }

    return (
        <section className="challenge">
            <h2>{title}</h2>
            {timer && <p>You lost!</p>} 
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerStarted ? handleStop : handleStart}>
                    {timerStarted ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerStarted ? 'active' : undefined}>
                {timerStarted ? 'Time is running...' : 'Timer inactive'}
            </p>
        </section>
    )
}

export default TimerChallenge;