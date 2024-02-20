
function View(timerElementParam){
    let timerElement = timerElementParam;
    let stateTime = 'reset';
    let oCronometer = null;

    return {
        setCronometer(oCronometerParam) {
            oCronometer = oCronometerParam;
        },
        displayCronometer(seg, min, hour) {
            const addZero = n => n < 10 ? `0${n}` : n;
            const ssmmhh = (s, m, h) => `${addZero(h)}:${addZero(m)}:${addZero(s)}`;
            timerElement.innerText = ssmmhh(seg, min, hour);
        },
        start() {
            if(stateTime === 'pause' || stateTime === 'reset') {
                stateTime = 'start';
                oCronometer.start();
            }
        },
        pause() {
            if(stateTime === 'start') {
                stateTime = 'pause';
                oCronometer.pause();
            }
        },
        reset() {
            if(stateTime === 'start' || stateTime === 'pause') {
                stateTime = 'reset';
                oCronometer.reset();
            }
        }
    }
}

export { View };
