import React from "react";
import "./App.scss";
import { useStete } from "react";

function App() {
    const [brkLength, setBrkLength] = useStete("5");
    const [seshLength, setSeshLength] = useStete("25");
    const [timerState, setTimerState] = useStete("stopped");
    const [timerType, setTimerType] = useStete("Session");
    const [timer, setTimer] = useStete(1500);
    const [intervalID, setIntervalID] = useStete("");
    return (
        <div className="App">
            <div className="app-container">
                <div className="main-title">25 + 5 Clock</div>
                <div className="control-container">
                    <TimeControl
                        titleID="break-label"
                        title="Break Length"
                        minID="break-decrement"
                        addID="break-increment"
                        lengthID="break-length"
                        length={brkLength}
                        onClick=""
                    />
                    <TimeControl
                        titleID="session-label"
                        title="session Length"
                        minID="session-decrement"
                        addID="session-increment"
                        lengthID="session-length"
                        length={seshLength}
                        onClick=""
                    />
                </div>
                <div className="timer">
                    <div className="timer-wrapper">
                        <div id="timer-label">{"timerType"}</div>
                        <div id="time-left">{"10:00"}</div>
                    </div>
                </div>
                <div className="timer-control">
                    <button id="start_stop" onClick={"timerControl"}>
                        <i class="fa fa-play-circle-o" aria-hidden="true"></i>
                        <i class="fa fa-pause-circle-o" aria-hidden="true"></i>
                    </button>
                    <button id="reset" onClick={"reset"}>
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                </div>
                <audio
                    id="beep"
                    preload="auto"
                    src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                />
            </div>
        </div>
    );
}

export default App;

function TimeControl({
    titleID,
    title,
    minID,
    addID,
    lengthID,
    length,
    onClick,
}) {
    return (
        <div className="length-control">
            <div id={titleID}>{title}</div>
            <button
                className="btn-level"
                id={minID}
                onClick={onClick}
                value="-"
            >
                <i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i>
            </button>
            <div className="btn-level" id={lengthID}>
                {length}
            </div>
            <button
                className="btn-level"
                id={addID}
                onClick={onClick}
                value="+"
            >
                <i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i>
            </button>
        </div>
    );
}
