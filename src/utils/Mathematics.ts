
export class Mathematics {
    static getMaxIfHigher(number: number, highNumber: number) {
        return number > highNumber ? highNumber : number;
    }

    static getMinIfLower(number: number, lowNumber: number) {
        return lowNumber > number ? lowNumber : number;
    }

    static percentage(partialValue: number, totalValue: number) {
        return (100 * partialValue) / totalValue;
    }

    static getTimestamp() {
        return Math.round(Date.now() / 1000);
    }

    static random(min: number, max: number) {
        return Math.round(Math.random() * (max - min)) + min
    }
}