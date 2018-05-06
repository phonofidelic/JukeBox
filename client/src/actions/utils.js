

 /** From: https://codereview.stackexchange.com/questions/174883/javascript-timing-class
 * Timer class to manage events which should be run on an interval.
 */
export class Timer {
    /**
     * 
     * @param {Function} onTick The function to call whenever the interval has elapsed. This function may return a promise. If a promise is returned the next tick will not be scheduled until the promise resolves.
     * @param {Object} [options] Any options to modify the instance behavior. By default, onStart and onStop do nothing, and refreshDelay is 5.
     * @param {Function} options.onStart A function to call when the timer is started. If onStart returns a promise, the class will wait until the promise has resolved before starting the timer.
     * @param {Function} options.onStop A function to call when the timer has been stopped.
     * @param {number} options.refreshDelay The minimum number of seconds between ticks.
     */
    constructor(onTick, {
        onStart = () => {},
        onStop = () => {},
        refreshDelay = 5,
    } = {}) {
        if (typeof onTick != 'function') throw Error('onTick must be a function');
        if (typeof onStart != 'function') throw Error('onStart must be a function');
        if (typeof onStop != 'function') throw Error('onStop must be a function');
        // Number.isNaN is more strict than isNaN as it requires that the type be a number.
        if (Number.isNaN(refreshDelay)) throw Error('refreshDelay must be a number');
        this.onTick = onTick;
        this.onStart = onStart;
        this.onStop = onStop;
        this.interval = refreshDelay * 1000;

        this.enabled = false;
        this.timeoutId = null;
    }

    start() {
        // You may wish to instead just return, but throwing an error immediately shows a problem in the code.
        if (this.enabled) throw Error("Timer has already started.");
        this.enabled = true;
        Promise.resolve(this.onStart()).then(() => {
            this.timeoutId = setTimeout(() => this._tick(), this.interval);
        });
    }

    stop() {
        if (!this.enabled) throw Error("Timer has not been started.");
        this.enabled = false;
        this.onStop();
        clearTimeout(this.timeoutId);
    }

    restart() {
        this.stop();
        this.start();
    }

    /**
     * Internal function used to call the onTick function and schedule the next call.
     */
    _tick() {
        Promise.resolve(this.onTick()).then(() => {
            if (this.enabled) {
                this.timeoutId = setTimeout(() => this._tick(), this.interval);
            }
        });
    }
}