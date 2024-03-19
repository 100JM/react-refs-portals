import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom"

const forwardResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onRest}, ref) {
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formatterRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onRest}>
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your score: {score}</h2>}
            <p>The Target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timr with <strong>{formatterRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onRest}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
})

export default forwardResultModal;