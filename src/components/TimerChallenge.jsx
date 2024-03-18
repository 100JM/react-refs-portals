import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

function TimerChallenge({ title, targetTime }) {
    const [timer, setTimer] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);

    const timers = useRef();
    const dialog = useRef();

    function handleStart() {
        timers.current = setTimeout(() => {
            setTimer(true);
            dialog.current.showModal();
        }, targetTime * 1000);

        setTimerStarted(true);
    }

    function handleStop() {
        clearTimeout(timers.current);
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
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerStarted ? 'active' : undefined}>
                    {timerStarted ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}

export default TimerChallenge;