class Time {
    static TICK_PERIOD: number = 50;
    static DAY_PERIOD: number = 24000

    public lastTime: number;
    public dayTime: number;

    constructor({ lastTime, dayTime }: {
        lastTime: number,
        dayTime: number,
    }) {
        this.lastTime = lastTime;
        this.dayTime = dayTime;
        setInterval(this.update.bind(this), Time.TICK_PERIOD);
    }

    private update() {
        if (this.dayTime === Time.DAY_PERIOD - 1) {
            this.dayTime = 0;
        } else {
            this.dayTime += 1;
        }
        this.lastTime += 1;
    }

}

export default Time;