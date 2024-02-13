class Stopwatch{
    counter: number;
    intervalId: NodeJS.Timeout | null;

    constructor(){
        this.intervalId = null;

        let savedTime = localStorage.getItem('Stopwatch');

        if (savedTime) {
            timeDiv.innerText = savedTime;
            this.counter = this.timeToSeconds(savedTime);
        } else {
            timeDiv.innerText = '00:00:00';
            this.counter = 0;
        }
    }

    timeToSeconds(time: string): number {
        let [hours, minutes, seconds, milliseconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds  + milliseconds / 100;
    }

    
        start() {
            this.intervalId = setInterval(() => { 
                this.counter++;
                let hours = Math.floor(this.counter / 3600000);
                let minutes = Math.floor((this.counter % 3600000) / 60000);
                let seconds = Math.floor((this.counter % 60000) / 1000);
                let milliseconds = Math.floor((this.counter % 1000) / 10);
        
                let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
                timeDiv.innerText = formattedTime; 
                localStorage.setItem('Stopwatch', formattedTime);
            }, 1);
        }
        
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
    reset(){
        timeDiv.innerText = '00:00:00:00';
        this.counter = 0;
        this.stop();
        localStorage.removeItem('Stopwatch');
    }
} 

const startButton = document.getElementById('start-btn') as HTMLButtonElement;
const stopButton = document.getElementById('stop-btn') as HTMLButtonElement;
const resetButton = document.getElementById('reset-btn') as HTMLButtonElement;
const timeDiv = document.getElementById('Stopwatch') as HTMLDivElement;
let stopwatch = new Stopwatch();


startButton.addEventListener('click', () => {
    stopwatch.start();
});

stopButton.addEventListener('click', () => {
    stopwatch.stop();
});

resetButton.addEventListener('click', () => {
    stopwatch.reset();
}
);



