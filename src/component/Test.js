const timeCnv = (sec) => {
    let minutes = Math.floor(sec / 60);
    let seconds = sec % 60;
    minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutesStr}:${secondsStr}`;
};

console.log(timeCnv(0));

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

const beginCountDown = () => {
    const fcn = () => {
        decrementTimer();
        phaseControl();
    };
    setIntervalID(accurateInterval(fcn, 1000));
};
const decrementTimer = () => {
    setTimer(timer - 1);
};
const phaseControl = () => {
    alarm(timer);
    if (timer < 0) {
        intervalID.cancel();
        if (timerType === "Session") {
            beginCountDown();
            switchTimer(brkLength * 60, "Break");
        } else {
            beginCountDown();
            switchTimer(seshLength * 60, "Session");
        }
    }
};
const alarm = (time) => {
    if (time === 0) {
        audioBeep.play();
    }
};
const switchTimer = (num, str) => {
    setTimer(num);
    setTimerType(str);
};
