export class LogicMath {
    static getRotatedX(x: number, y: number, angle: number) {
        return (x * Math.cos(angle) - y * Math.sin(angle)) / 1024;
    }

    static getRotatedY(x: number, y: number, angle: number) {
        return (x * Math.sin(angle) + y * Math.cos(angle)) / 1024;
    }

    static max(min: number, max: number) {
        return min <= max ? max : min;
    }
}