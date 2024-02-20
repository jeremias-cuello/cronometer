function View(startPauseParam, resetParam, timerElementParam){
    let startPause = startPauseParam;
    let reset = resetParam;
    let timerElement = timerElementParam;
    let stateTime = 'pause';
    let oCronometer = null;

    return {
        init(){
            startPause.addEventListener('click', this.startPause.bind(this));
            reset.addEventListener('click', this.reset.bind(this));
        },
        setCronometer(oCronometerParam) {
            oCronometer = oCronometerParam;
        },
        displayCronometer(seg, min, hour) {
            const addZero = n => n < 10 ? `0${n}` : n;
            const ssmmhh = (s, m, h) => `${addZero(h)}:${addZero(m)}:${addZero(s)}`;
            timerElement.innerText = ssmmhh(seg, min, hour);
        },
        startPause(){
            switch (stateTime) {
                case 'pause':
                    stateTime = 'start';
                    reset.classList.remove('hidden');
                    oCronometer.start();
                    break;
                case 'start':
                    stateTime = 'pause';
                    reset.classList.remove('hidden');
                    oCronometer.pause();
                    break;
            }
        },
        reset() {
            stateTime = 'pause';
            reset.classList.add('hidden');
            oCronometer.reset();
        }
    }
}

export { View };
