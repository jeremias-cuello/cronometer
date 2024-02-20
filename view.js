function View(startParam, pauseParam, resetParam, timerElementParam){
    let start = startParam;
    let pause = pauseParam;
    let reset = resetParam;
    let timerElement = timerElementParam;
    let stateTime = 'reset';
    let oCronometer = null;

    return {
        init(){
            start.addEventListener('click', this.start.bind(this));
            pause.addEventListener('click', this.pause.bind(this));
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
        permutButtons(state) {
            stateTime = state;
            switch (state) {
                case 'reset':
                    reset.classList.add('hidden');
                case 'pause':
                    pause.classList.add('hidden');
                    start.classList.remove('hidden');
                    break;
                case 'start':
                    start.classList.add('hidden');
                    pause.classList.remove('hidden');
                    reset.classList.remove('hidden');
                    break;
            }
        },
        start() {
            if(stateTime === 'pause' || stateTime === 'reset') {
                this.permutButtons('start');
                oCronometer.start();
            }
        },
        pause() {
            if(stateTime === 'start') {
                this.permutButtons('pause');
                oCronometer.pause();
            }
        },
        reset() {
            if(stateTime === 'start' || stateTime === 'pause') {
                this.permutButtons('reset');
                oCronometer.reset();
            }
        }
    }
}

export { View };
