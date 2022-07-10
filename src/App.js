import React from "react";
import "./App.scss";
import { useState, useEffect } from "react";
import TimeControl from "./component/TimeControl";

const accurateInterval = (fn, time) => {
    var cancel, nextAt, timeout, wrapper;
    nextAt = new Date().getTime() + time;
    timeout = null;
    wrapper = () => {
        nextAt += time;
        timeout = setTimeout(wrapper, nextAt - new Date().getTime()); // delay = next_time - current_time
        return fn();
    };
    cancel = () => {
        return clearTimeout(timeout);
    };
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return {
        cancel: cancel,
    };
};

function App() {
    const [brkLength, setBrkLength] = useState(5);
    const [seshLength, setSeshLength] = useState(25);
    const [timerState, setTimerState] = useState("stopped");
    const [timerType, setTimerType] = useState("Session");
    const [timer, setTimer] = useState(1500);
    const [intervalID, setIntervalID] = useState("");
    const [audioBeep, setAudioBeep] = useState("");

    // convert time to string pattern
    const timeCnv = (sec) => {
        let minutes = Math.floor(sec / 60);
        let seconds = sec % 60;
        let minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
        let secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutesStr}:${secondsStr}`;
    };

    // update timer according to session lenght
    useEffect(() => {
        setTimer(seshLength * 60);
    }, [seshLength]);

    // change state start / stop
    const changeState = () => {
        if (timerState === "stopped") {
            beginCountDown();
            setTimerState("running");
        } else {
            setTimerState("stopped");
            if (intervalID) {
                intervalID.cancel();
            }
        }
    };
    // check timer for update session/break state
    useEffect(() => {
        console.log(new Date().getTime() % 1000);
        if (timer === 0) {
            audioBeep.play();
        }
        if (timer < 0) {
            if (intervalID) {
                intervalID.cancel();
            }
            if (timerType === "Session") {
                beginCountDown();
                switchTimer(brkLength * 60, "Break");
            } else {
                beginCountDown();
                switchTimer(seshLength * 60, "Session");
            }
        }
    }, [timer, brkLength, seshLength, audioBeep, intervalID, timerType]);

    // try useEffect to countdown
    // useEffect(() => {
    //     var interval = null;
    //     if (timerState === "running") {
    //         interval = setInterval(() => {
    //             setTimer((prevTime) => prevTime - 1);
    //         }, 1000);
    //     }
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [timerState]);

    // start countdown
    const beginCountDown = () => {
        const fcn = () => {
            setTimer((prevTime) => prevTime - 1);
        };
        setIntervalID(accurateInterval(fcn, 1000));
    };
    // update timer and type
    const switchTimer = (num, str) => {
        setTimer(num);
        setTimerType(str);
    };
    // check running state
    const isRunning = () => {
        return timerState === "running";
    };
    // reset all
    const reset = () => {
        setBrkLength(5);
        setSeshLength(25);
        setTimerState("stopped");
        setTimerType("Session");
        setTimer(1500);
        if (intervalID) {
            intervalID.cancel();
        }
        setIntervalID("");
        audioBeep.pause();
        audioBeep.currentTime = 0;
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
                        setLength={setBrkLength}
                        timerState={timerState}
                    />
                    <TimeControl
                        titleID="session-label"
                        title="Session Length"
                        minID="session-decrement"
                        addID="session-increment"
                        lengthID="session-length"
                        length={seshLength}
                        setLength={setSeshLength}
                        timerState={timerState}
                    />
                </div>
                <div className="timer">
                    <div className="timer-wrapper">
                        <div id="timer-label">{timerType}</div>
                        <div id="time-left">{timeCnv(timer)}</div>
                    </div>
                </div>
                <div className="timer-control">
                    <button id="start_stop" onClick={changeState}>
                        <i
                            className="fa fa-play-circle-o"
                            aria-hidden="true"
                            style={
                                isRunning()
                                    ? { color: "#00ff6c" }
                                    : { color: "black" }
                            }
                        ></i>
                        <span> / </span>
                        <i
                            className="fa fa-pause-circle-o"
                            aria-hidden="true"
                            style={
                                isRunning()
                                    ? { color: "black" }
                                    : { color: "#00aaff" }
                            }
                        ></i>
                    </button>
                    <button id="reset" onClick={reset}>
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                </div>
                <audio
                    id="beep"
                    preload="auto"
                    ref={(audio) => {
                        setAudioBeep(audio);
                    }}
                    src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                />
            </div>
        </div>
    );
}

export default App;
