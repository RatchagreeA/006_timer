function TimeControl({
    titleID,
    title,
    minID,
    addID,
    lengthID,
    length,
    setLength,
    timerState,
}) {
    const onClick = (e) => {
        if (timerState !== "running") {
            if (e.currentTarget.value === "-") {
                let trg = Math.max(1, length - 1);
                setLength(trg);
            } else {
                let trg = Math.min(60, length + 1);
                setLength(trg);
            }
        }
    };
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
                    <i
                        className="fa fa-arrow-circle-o-down"
                        aria-hidden="true"
                    ></i>
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
                    <i
                        className="fa fa-arrow-circle-o-up"
                        aria-hidden="true"
                    ></i>
                </button>
            </div>
        </div>
    );
}

export default TimeControl;
