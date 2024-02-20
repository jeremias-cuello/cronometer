function View(startPauseParam, resetParam, timerElementParam, lapsParam){
    let startPauseElement = startPauseParam;
    let reset = resetParam;
    let timerElement = timerElementParam;
    let lapElement = lapsParam.button;
    let lapsList = lapsParam.list;
    let stateTime = 'pause';
    let oCronometer = null;

    return {
        init(){
            startPauseElement.addEventListener('click', this.handler.bind(this));
            reset.addEventListener('click', this.handler.bind(this));
            lapElement.addEventListener('click', this.handler.bind(this));
        },
        setCronometer(oCronometerParam) {
            oCronometer = oCronometerParam;
        },
        displayCronometer(seg, min, hour) {
            const addZero = n => n < 10 ? `0${n}` : n;
            const ssmmhh = (s, m, h) => `${addZero(h)}:${addZero(m)}:${addZero(s)}`;
            timerElement.innerText = ssmmhh(seg, min, hour);
        },
        handler(e) {
            startPauseElement.innerText = "Continuar / Pausar";
            const button = e.target.name;

            switch (button) {
                case 'reset': this.reset(); break;
                case 'startPause': this.startPause(); break;
                case 'lap': this.laps(); break;
            }
        },
        startPause(){
            switch (stateTime) {
                case 'pause':
                    stateTime = 'start';
                    reset.classList.remove('hidden');
                    lapElement.classList.remove('hidden');
                    oCronometer.start();
                    break;
                case 'start':
                    stateTime = 'pause';
                    reset.classList.remove('hidden');
                    lapElement.classList.add('hidden');
                    oCronometer.pause();
                    break;
            }
        },
        reset() {
            stateTime = 'pause';
            reset.classList.add('hidden');
            lapElement.classList.add('hidden');
            oCronometer.reset();
            this.removeLaps();
            startPauseElement.innerText = "Iniciar / Pausar";
        },
        laps(){

            const addLap = lap => {
                const li = document.createElement('li');
                li.classList.add(`lap-${lapsList.children.length % 2 === 0 ? 'par' : 'impar'}`);
                li.innerText = lap;
                lapsList.appendChild(li);
            }

            addLap(timerElement.innerText);
        },
        removeLaps(){
            while(lapsList.children.length > 0){
                lapsList.removeChild(lapsList.lastChild);
            }
        }
    }
}

export { View };
