
function Cronometer() {
    let seg = 0;
    let min = 0;
    let hour = 0;
    let loop = null;
    let display = null;

    return {
        setDisplay(displayParam){
            display = displayParam;
        },
        start() {
            display(seg, min, hour);
            loop = setInterval(() => {
                seg++;
                seg = seg % 60;
                min = seg === 0 ? ++min : min;
                hour = min >= 60 ? ++hour : hour;
                min = min % 60;
                display(seg, min, hour);
            }, 1000);
        },

        pause(){
            clearInterval(loop);
            display(seg, min, hour);
        },

        reset(){
            seg = 0;
            min = 0;
            hour = 0;
            this.pause();
        }
    }
}

export { Cronometer };
