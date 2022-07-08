import React from "react";
import "./App.scss";
import { useState } from "react";

function App() {
    const [brkLength, setBrkLength] = useState(5);
    const [seshLength, setSeshLength] = useState(25);
    const [timerState, setTimerState] = useState("stopped");
    const [timerType, setTimerType] = useState("Session");
    const [timer, setTimer] = useState(1500);
    const [intervalID, setIntervalID] = useState("");

    const timeCnv = (sec) => {
        let minutes = Math.floor(sec / 60);
        let seconds = sec % 60;
        let minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
        let secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutesStr}:${secondsStr}`;
    };
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
                        onClick={() => 1}
                    />
                    <TimeControl
                        titleID="session-label"
                        title="session Length"
                        minID="session-decrement"
                        addID="session-increment"
                        lengthID="session-length"
                        length={seshLength}
                        onClick={() => 1}
                    />
                </div>
                <div className="timer">
                    <div className="timer-wrapper">
                        <div id="timer-label">{timerType}</div>
                        <div id="time-left">{timeCnv(timer)}</div>
                    </div>
                </div>
                <div className="timer-control">
                    <button id="start_stop" onClick={() => 1}>
                        <i class="fa fa-play-circle-o" aria-hidden="true"></i>
                        <i class="fa fa-pause-circle-o" aria-hidden="true"></i>
                    </button>
                    <button id="reset" onClick={() => 1}>
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
            <div className="btn-container">
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
        </div>
    );
}
