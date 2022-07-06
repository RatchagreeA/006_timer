import React from "react";
import "./App.scss";
import { useStete } from "react";

function App() {
    return (
        <div className="App">
            <div className="app-container">
                <div className="main-title">25 + 5 Clock</div>
                <div className="control-container">
                    {" "}
                    <TimeControl />
                    <TimeControl />
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

function TimeControl() {
    return (
        <div className="length-control">
            <div id={"this.props.titleID"}>{"this.props.title"}</div>
            <button
                className="btn-level"
                id={"this.props.minID"}
                onClick={"this.props.onClick"}
                value="-"
            >
                <i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i>
            </button>
            <div className="btn-level" id={"this.props.lengthID"}>
                {"this.props.length"}
            </div>
            <button
                className="btn-level"
                id={"this.props.addID"}
                onClick={"this.props.onClick"}
                value="+"
            >
                <i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i>
            </button>
        </div>
    );
}
