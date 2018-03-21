import { IGenerationLogItem } from './manager';

export const getFontSize = (t: number): number => {
    const val = 1 / (1 + Math.pow(Math.E, -t / 10)) * 15;
    if (val < 8) { return 8; }
    return val;
};

/** Calculate distance between two points, pythagoras theorem */
export const distance = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
};
  
  /** Get the angle from one point to another */
export const angleToPoint = (x1: number, y1: number, x2: number, y2: number) => Math.atan2(y2 - y1, x2 - x1);
  
export const radiansToDegrees = (r: number) => r / (Math.PI * 2) * 360;  
export const calculateQ = (values: IGenerationLogItem[], Q: number) => {
    values.sort((a: IGenerationLogItem, b: IGenerationLogItem) => a.score - b.score);
    if (values.length === 0) { return 0; }
    const index = Math.floor(values.length * Q);
    if (values.length % 2) {
        return values[index].score;
    }
    if (index - 1 < 0) { return 0; }
    return (values[index - 1].score + values[index].score) / 2.0;
};

export const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
export const atoi = (s: string | number, radix: number = 10): number => parseInt(String(s), radix);

export const snakeSortComparer = (a: any, b: any): number => {
    let aScore = a.score || 0;
    let bScore = b.score || 0;
    if (aScore > bScore) {
    return -1;
    } else {
    return 1;
    }
};