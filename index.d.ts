declare class Stopwatch2 {
    startTime: number;
    lastStartTime: number;
    execTime: number;
    lastExecTime: number;
    state: string;
    tag: string;
    static config: {
        __proto__: null;
        performanceMeasurement: boolean;
    };
    static states: {
        __proto__: null;
        start: string;
        pause: string;
        stop: string;
    };
    constructor(tag: string);
    start(): Stopwatch2;
    pause(): Stopwatch2;
    stop(): Stopwatch2;
    sleep(ms: number): void;
    toString(): string;
    static start(...tags: string[]): Stopwatch2[];
    static pause(...tags: string[]): Stopwatch2[];
    static stop(...tags: string[]): Stopwatch2[];
    static sleep(ms: number): void;
    static toString(...tags: string[]): string;
    static clear(): boolean;
    static registerToGlobal(globalName: string): boolean;
    static create(...tags: string[]): Stopwatch2[];
    static getArray(...tags: string[]): Stopwatch2[];
    static getOne(tag: string): Stopwatch2 | null;
    static get(...tags: string[]): Object;
}
export default Stopwatch2;
