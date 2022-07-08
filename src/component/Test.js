const timeCnv = (sec) => {
    let minutes = Math.floor(sec / 60);
    let seconds = sec % 60;
    minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutesStr}:${secondsStr}`;
};

console.log(timeCnv(0));
